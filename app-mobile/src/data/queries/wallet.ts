// Wallet queries wired to the real edge functions (Block D). Maps the rail-agnostic
// double-entry ledger (per-currency, integer minor units) onto the GNF-centric Wallet
// shape the existing screens consume. Only GNF is surfaced in the UI for V1.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPost } from '../../lib/api';
import type { Wallet, WalletMovement } from '../types';

interface BalanceRow { wallet_id: string; currency: string; balance_minor: number }
interface HistoryEntry {
  id: string;
  wallet_id: string;
  currency: string;
  direction: 'debit' | 'credit';
  amount_minor: number;
  balance_after: number;
  ref_type: string;
  ref_id: string;
  created_at: string;
}

const REF_LABEL: Record<string, string> = {
  topup: 'Recharge',
  withdrawal: 'Retrait',
  order: 'Commande',
  escrow: 'Séquestre',
  transfer: 'Transfert',
  refund: 'Remboursement',
};

function toMovement(e: HistoryEntry): WalletMovement {
  const incoming = e.direction === 'credit';
  return {
    id: e.id,
    direction: incoming ? 'in' : 'out',
    label: REF_LABEL[e.ref_type] ?? e.ref_type,
    amountGnf: incoming ? e.amount_minor : -e.amount_minor, // signed: +in / -out, matches the UI
    date: e.created_at,
    status: incoming ? 'received' : 'completed',
  };
}

export function useWallet() {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: async (): Promise<Wallet> => {
      const [balance, history] = await Promise.all([
        apiPost<{ balances: BalanceRow[] }>({ path: '/wallet-balance', body: {} }),
        apiPost<{ entries: HistoryEntry[]; next_cursor: unknown }>({ path: '/wallet-history', body: { limit: 50 } }),
      ]);
      const gnf = balance.balances.find((b) => b.currency === 'GNF');
      const balanceGnf = Number(gnf?.balance_minor ?? 0);
      const movements = (history.entries ?? []).filter((e) => e.currency === 'GNF').map(toMovement);
      return { balanceGnf, pendingGnf: 0, movements };
    },
  });
}

interface RechargeArgs {
  amountGnf: number;
  source: 'orange-money' | 'mtn-money' | 'card';
}

const METHOD: Record<RechargeArgs['source'], string> = {
  'orange-money': 'orange_money',
  'mtn-money': 'mtn_money',
  card: 'card',
};

// Records a PENDING top-up intent. No balance change yet — a payment rail confirms + credits later.
export function useRechargeWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ amountGnf, source }: RechargeArgs) =>
      apiPost<{ topup: unknown }>({
        path: '/wallet-topup-intent',
        body: { currency: 'GNF', amount_minor: amountGnf, method: METHOD[source] },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wallet'] }),
  });
}

interface WithdrawArgs {
  amountGnf: number;
  destination?: string;
}

// Records a PENDING withdrawal request (manual payout in V1). Server rejects if balance < amount.
export function useWithdrawWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ amountGnf, destination }: WithdrawArgs) =>
      apiPost<{ withdrawal: unknown }>({
        path: '/wallet-withdraw-request',
        body: { currency: 'GNF', amount_minor: amountGnf, destination },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wallet'] }),
  });
}
