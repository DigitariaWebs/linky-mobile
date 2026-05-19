import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mockOrders, mockWallet } from '../mockOrders';
import type { Order, Wallet, PaymentMethod } from '../types';
import { latency } from './latency';
import { useCart } from '../../stores/cart';
import { getProduct } from '../mockProducts';

const localOrders: Order[] = [...mockOrders];
let localWallet: Wallet = { ...mockWallet, movements: [...mockWallet.movements] };

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<Order[]> => {
      await latency();
      return localOrders;
    },
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['order', id],
    enabled: !!id,
    queryFn: async (): Promise<Order | undefined> => {
      await latency();
      return localOrders.find((o) => o.id === id);
    },
  });
}

export function useWallet() {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: async (): Promise<Wallet> => {
      await latency();
      return localWallet;
    },
  });
}

interface PlaceOrderArgs {
  paymentMethod: PaymentMethod;
}

export function usePlaceOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentMethod }: PlaceOrderArgs): Promise<Order> => {
      // Mock checkout — 1.5s loading delay
      await new Promise((r) => setTimeout(r, 1500));
      const lines = useCart.getState().lines;
      const items = lines
        .map((l) => ({ line: l, product: getProduct(l.productId) }))
        .filter((x) => x.product);
      const subtotal = items.reduce(
        (sum, { line, product }) => sum + (product?.priceGnf ?? 0) * line.quantity,
        0,
      );
      const fees = Math.round(subtotal * 0.03);
      const total = subtotal + fees;
      const ref = `LK-2026-${String(4900 + Math.floor(Math.random() * 99)).padStart(5, '0')}`;
      const first = items[0];
      const order: Order = {
        id: `o_${Date.now()}`,
        reference: ref,
        buyerId: 'u_mariama',
        sellerId: first?.product?.shopId === 's_maison_aissatou' ? 'u_aissatou' : 'u_conakrytech',
        shopId: first?.product?.shopId ?? 's_maison_aissatou',
        productId: first?.product?.id ?? 'p_perfume',
        productSnapshot: {
          title: first?.product?.title ?? '',
          photo: first?.product?.photos[0] ?? '',
          priceGnf: first?.product?.priceGnf ?? 0,
        },
        quantity: first?.line.quantity ?? 1,
        amountGnf: subtotal,
        feesGnf: fees,
        totalGnf: total,
        paymentMethod,
        status: 'paid',
        createdAt: new Date().toISOString(),
        events: [
          { at: new Date().toISOString(), label: 'Commande passée' },
          { at: new Date().toISOString(), label: 'Paiement reçu en séquestre' },
        ],
        releaseAt: new Date(Date.now() + 72 * 3600_000).toISOString(),
      };
      localOrders.unshift(order);
      useCart.getState().clear();
      return order;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] });
      qc.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
}

export function useConfirmReception() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      await new Promise((r) => setTimeout(r, 600));
      const idx = localOrders.findIndex((o) => o.id === orderId);
      if (idx >= 0) {
        const o = localOrders[idx]!;
        const newEvents = [...o.events, { at: new Date().toISOString(), label: 'Réception confirmée — paiement libéré' }];
        localOrders[idx] = { ...o, status: 'released', events: newEvents };
      }
      return orderId;
    },
    onSuccess: (orderId) => {
      qc.invalidateQueries({ queryKey: ['order', orderId] });
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

interface RechargeArgs {
  amountGnf: number;
  source: 'orange-money' | 'mtn-money' | 'card';
}

export function useRechargeWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ amountGnf, source }: RechargeArgs) => {
      await new Promise((r) => setTimeout(r, 1200));
      const sourceLabel =
        source === 'orange-money' ? 'Orange Money' : source === 'mtn-money' ? 'MTN Money' : 'Carte';
      localWallet = {
        ...localWallet,
        balanceGnf: localWallet.balanceGnf + amountGnf,
        movements: [
          {
            id: `wm_${Date.now()}`,
            direction: 'in',
            label: `Recharge ${sourceLabel}`,
            amountGnf,
            date: new Date().toISOString(),
            status: 'received',
          },
          ...localWallet.movements,
        ],
      };
      return amountGnf;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wallet'] }),
  });
}
