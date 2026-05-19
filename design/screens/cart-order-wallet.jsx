// ========== Cart / Checkout / Order / Wallet ==========

const CartScreen = () => (
  <>
    <TopBar title="Mon panier" back sub="3 articles · Maison Aïssatou + Conakry Tech" />
    <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
      {[
        { photo: photos.perfume, title: "Eau de parfum édition limitée", price: 420000, qty: 1, seller: "Maison Aïssatou" },
        { photo: photos.iphone, title: "iPhone 12 Pro 256Go, comme neuf", price: 4800000, qty: 1, seller: "Conakry Tech" },
        { photo: photos.bag, title: "Sac à main cuir véritable", price: 340000, qty: 1, seller: "Maison Aïssatou" },
      ].map((it, i) => (
        <div key={i} className="card" style={{ padding: 10, display: "flex", gap: 10 }}>
          <div style={{ width: 72, height: 72, borderRadius: 10, background: `url(${it.photo}) center/cover, var(--bg-sunken)`, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{it.title}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3 }}>{it.seller}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }} className="tabnum">{fmtGNF(it.price)}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 0, background: "var(--bg-sunken)", borderRadius: 999, padding: 2 }}>
                <button style={{ width: 26, height: 26, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--text-muted)" }}><I.minus size={13} /></button>
                <span style={{ minWidth: 22, textAlign: "center", fontWeight: 600, fontSize: 13 }}>{it.qty}</span>
                <button style={{ width: 26, height: 26, borderRadius: 999, display: "grid", placeItems: "center", background: "var(--card)" }}><I.plus size={13} /></button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Promo */}
      <div className="card" style={{ padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <I.bolt size={18} color="var(--accent)" />
        <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>Code promo</div>
        <I.chevronD size={16} color="var(--text-muted)" />
      </div>

      {/* Recap */}
      <div className="card" style={{ padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
          <span style={{ color: "var(--text-muted)" }}>Sous-total</span>
          <span className="tabnum">{fmtGNF(5560000)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
          <span style={{ color: "var(--text-muted)" }}>Frais Linky <span style={{ color: "var(--primary)" }}>(3%)</span></span>
          <span className="tabnum">{fmtGNF(166800)}</span>
        </div>
        <div className="divider" style={{ margin: "10px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Total</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }} className="tabnum">{fmtGNF(5726800)}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }} className="tabnum">{fmtEUR(gnfToEur(5726800))}</div>
          </div>
        </div>
      </div>
      <div style={{ height: 80 }} />
    </div>

    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-primary btn-lg btn-block">Passer au paiement</button>
    </div>
  </>
);

const PaymentMethod = () => (
  <>
    <TopBar title="Moyen de paiement" back />
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8 }}>Mobile Money</div>
      <div className="card" style={{ overflow: "hidden", marginBottom: 16 }}>
        {[
          { name: "Orange Money", phone: "+224 622 •• 12 88", logo: "#FF7900", initials: "OM", selected: true },
          { name: "MTN Mobile Money", phone: "+224 657 •• 44 02", logo: "#FFC500", initials: "M", selected: false },
        ].map((p, i, arr) => (
          <div key={p.name} style={{ padding: 14, display: "flex", gap: 12, alignItems: "center", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: p.logo, color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14 }}>{p.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }} className="tabnum">{p.phone}</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: 999, border: p.selected ? "0" : "1.5px solid var(--border-strong)", background: p.selected ? "var(--primary)" : "transparent", display: "grid", placeItems: "center" }}>
              {p.selected && <div style={{ width: 8, height: 8, borderRadius: 999, background: "white" }} />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8 }}>Autres options</div>
      <div className="card" style={{ overflow: "hidden", marginBottom: 16 }}>
        <div style={{ padding: 14, display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid var(--border)" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--bg-sunken)", display: "grid", placeItems: "center" }}><I.card size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Carte bancaire</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Visa, Mastercard via Stripe</div>
          </div>
          <I.chevronR size={16} color="var(--text-muted)" />
        </div>
        <div style={{ padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center" }}><I.wallet size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Wallet Linky</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }} className="tabnum">Solde 240 500 GNF</div>
          </div>
          <I.chevronR size={16} color="var(--text-muted)" />
        </div>
      </div>

      <div style={{ background: "var(--bg-elev)", borderRadius: 12, padding: 12, display: "flex", gap: 10, alignItems: "flex-start", border: "1px solid var(--border)" }}>
        <I.info size={16} color="var(--primary)" />
        <div style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.45 }}>
          Tu recevras un <strong style={{ color: "var(--text)" }}>code SMS</strong> sur ton numéro Orange Money pour confirmer le paiement.
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-primary btn-lg btn-block">
        Payer <span className="tabnum" style={{ marginLeft: 8 }}>{fmtGNF(5726800)}</span>
      </button>
    </div>
  </>
);

const OrderConfirmation = () => (
  <>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24, alignItems: "center", textAlign: "center", paddingTop: 60 }}>
      <div style={{ width: 92, height: 92, borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", marginBottom: 18 }}>
        <I.check size={48} stroke={2.5} />
      </div>
      <div className="disp-l" style={{ fontSize: 24 }}>Paiement confirmé</div>
      <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, lineHeight: 1.5, maxWidth: 280 }}>
        Ton paiement est en séquestre. Le vendeur prépare ta commande.
      </div>

      <div className="card" style={{ width: "100%", padding: 16, marginTop: 24, textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
          <span>Numéro de commande</span>
          <span className="tabnum" style={{ color: "var(--text)", fontWeight: 600 }}>#LK-2026-04812</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)" }}>
          <span>Montant payé</span>
          <span className="tabnum" style={{ color: "var(--text)", fontWeight: 600 }}>{fmtGNF(5726800)}</span>
        </div>
      </div>

      <div style={{ marginTop: 24, padding: 12, background: "var(--accent-soft)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.shield size={18} color="#8B5A0A" />
        <div style={{ fontSize: 11.5, color: "#8B5A0A", lineHeight: 1.45, textAlign: "left" }}>
          Le vendeur sera payé <strong>seulement après</strong> ta confirmation de réception.
        </div>
      </div>
    </div>

    <div style={{ padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
      <button className="btn btn-primary btn-lg btn-block">Suivre ma commande</button>
      <button className="btn btn-ghost btn-sm">Voir mes commandes</button>
    </div>
  </>
);

const OrderTrackingBuyer = () => (
  <>
    <TopBar title="Suivi de commande" back sub="#LK-2026-04812" />
    <div style={{ padding: "0 16px 16px" }}>
      <div className="card" style={{ padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 10, background: `url(${photos.perfume}) center/cover, var(--bg-sunken)`, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Eau de parfum édition limitée</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Maison Aïssatou</div>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }} className="tabnum">{fmtGNF(420000)}</div>
      </div>

      {/* Timeline */}
      <div style={{ marginTop: 18, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Statut du séquestre</div>
      <div className="card" style={{ padding: 16 }}>
        {[
          { t: "Commande passée", d: "Lun. 16 mai · 14:32", done: true },
          { t: "Paiement reçu en séquestre", d: "Lun. 16 mai · 14:33", done: true },
          { t: "En cours de remise", d: "Mar. 17 mai · 09:12", done: true, current: true },
          { t: "Confirme la réception", d: "Action requise dès remise", action: true },
        ].map((s, i, arr) => (
          <div key={i} style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 22, height: 22, borderRadius: 999,
                background: s.done ? "var(--primary)" : (s.action ? "var(--accent)" : "var(--border)"),
                color: "white", display: "grid", placeItems: "center",
                boxShadow: s.current ? "0 0 0 6px var(--primary-soft)" : "none",
              }}>
                {s.done ? <I.check size={12} stroke={3} /> : <div style={{ width: 6, height: 6, borderRadius: 999, background: "white" }} />}
              </div>
              {i < arr.length - 1 && <div style={{ flex: 1, width: 2, background: arr[i + 1].done ? "var(--primary)" : "var(--border)", marginTop: 2, minHeight: 30 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 22 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: s.done || s.action ? "var(--text)" : "var(--text-muted)" }}>{s.t}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, padding: 12, background: "var(--accent-soft)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.warn size={18} color="#8B5A0A" />
        <div style={{ fontSize: 11.5, color: "#8B5A0A", lineHeight: 1.45 }}>
          Une fois que tu confirmes, le paiement est libéré vers le vendeur. <strong>Cette action est irréversible.</strong>
        </div>
      </div>

      {/* Hold-to-confirm */}
      <div style={{ marginTop: 18 }}>
        <button style={{ width: "100%", height: 56, borderRadius: 999, background: "var(--primary)", color: "white", position: "relative", overflow: "hidden", display: "grid", placeItems: "center", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "45%", background: "var(--primary-deep)" }} />
          <div style={{ position: "relative", display: "flex", gap: 8, alignItems: "center" }}>
            <I.check size={18} />
            Maintiens pour confirmer la réception
          </div>
        </button>
        <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 8, color: "var(--danger)" }}><I.warn size={14} /> Signaler un problème</button>
      </div>

      <div style={{ height: 16 }} />
    </div>
  </>
);

const OrderTrackingSeller = () => (
  <>
    <TopBar title="Commande à livrer" back sub="#LK-2026-04812 · vente" />
    <div style={{ padding: "0 16px 16px" }}>
      <div className="card" style={{ padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <div className="avatar" style={{ background: `url(${photos.woman3}) center/cover` }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Fatou D.</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Paris, France · diaspora</div>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "var(--primary)", color: "white", display: "grid", placeItems: "center" }}><I.msg size={16} /></button>
      </div>

      <div className="card" style={{ marginTop: 12, padding: 12, display: "flex", gap: 10 }}>
        <div style={{ width: 56, height: 56, borderRadius: 10, background: `url(${photos.perfume}) center/cover, var(--bg-sunken)`, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Eau de parfum édition limitée</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Qté 1 · Pour ta mère à Kaloum</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, marginTop: 4 }} className="tabnum">{fmtGNF(420000)}</div>
        </div>
      </div>

      <div style={{ marginTop: 18, padding: 14, background: "var(--primary-soft)", borderRadius: 14, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: "var(--primary)", color: "white", display: "grid", placeItems: "center" }}><I.wallet size={20} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--primary-deep)", fontWeight: 600 }}>En séquestre</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--primary)" }} className="tabnum">{fmtGNF(420000)}</div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 14, background: "var(--bg-elev)", borderRadius: 14, border: "1px solid var(--border)" }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8 }}>Décompte de libération</div>
        <div style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }} className="tabnum">47</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>h</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, marginLeft: 6 }} className="tabnum">12</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>min</div>
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Si l'acheteur ne confirme pas, le paiement est libéré automatiquement.</div>
      </div>

      <button className="btn btn-secondary btn-block" style={{ marginTop: 14 }}><I.truck size={16} /> Confirmer la remise</button>
    </div>
  </>
);

// ========== Wallet ==========

const WalletScreen = () => (
  <>
    <TopBar title="Mon portefeuille" back right={<button style={{ width: 36, height: 36, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center" }}><I.qr size={16} /></button>} />
    <div style={{ padding: "0 16px" }}>
      <div className="wallet-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>Solde disponible</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, marginTop: 6 }} className="tabnum">240 500</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: -4 }}>GNF · ≈ 22 €</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center" }}>
            <I.wallet size={20} color="white" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <button style={{ flex: 1, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.18)", color: "white", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <I.plus size={15} /> Recharger
          </button>
          <button style={{ flex: 1, height: 40, borderRadius: 999, background: "white", color: "var(--primary-deep)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <I.download size={15} /> Retirer
          </button>
        </div>
      </div>
    </div>

    <div style={{ marginTop: 18, padding: "0 16px", display: "flex", gap: 18, borderBottom: "1px solid var(--border)" }}>
      <div style={{ paddingBottom: 12, borderBottom: "2px solid var(--primary)", fontSize: 13, fontWeight: 600 }}>Mouvements</div>
      <div style={{ paddingBottom: 12, fontSize: 13, color: "var(--text-muted)" }}>Retraits en attente</div>
    </div>

    <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
      {[
        { dir: "in", label: "Vente — iPhone 12 Pro", date: "16 mai · 09:32", amount: 4800000, status: "Reçu", statusColor: "var(--success)" },
        { dir: "in", label: "Vente — Robe wax", date: "14 mai · 18:11", amount: 185000, status: "En séquestre", statusColor: "var(--info)" },
        { dir: "out", label: "Retrait Orange Money", date: "12 mai · 14:02", amount: -2000000, status: "Effectué", statusColor: "var(--text-muted)" },
        { dir: "in", label: "Recharge Carte Visa", date: "10 mai · 21:44", amount: 1500000, status: "Reçu", statusColor: "var(--success)" },
        { dir: "out", label: "Achat — Sneakers Nike", date: "08 mai · 11:25", amount: -620000, status: "Effectué", statusColor: "var(--text-muted)" },
        { dir: "out", label: "Frais Linky · #04781", date: "08 mai · 11:25", amount: -18600, status: "Effectué", statusColor: "var(--text-muted)" },
      ].map((m, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: m.dir === "in" ? "var(--primary-soft)" : "var(--bg-sunken)", color: m.dir === "in" ? "var(--primary)" : "var(--text)", display: "grid", placeItems: "center" }}>
            {m.dir === "in" ? <I.download size={16} /> : <I.upload size={16} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.date} · <span style={{ color: m.statusColor }}>{m.status}</span></div>
          </div>
          <div className="tabnum" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: m.amount > 0 ? "var(--success)" : "var(--text)" }}>
            {m.amount > 0 ? "+" : ""}{fmtGNF(m.amount)}
          </div>
        </div>
      ))}
    </div>
  </>
);

const WalletRecharge = () => (
  <>
    <TopBar title="Recharger" back />
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8 }}>Source</div>
      <div className="card" style={{ overflow: "hidden", marginBottom: 18 }}>
        <SettingsRow icon={I.phone} label="Orange Money" sub="+224 622 •• 12 88" right={<div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--primary)", display: "grid", placeItems: "center" }}><div style={{ width: 8, height: 8, borderRadius: 999, background: "white" }} /></div>} />
        <SettingsRow icon={I.phone} label="MTN Mobile Money" sub="+224 657 •• 44 02" right={<div style={{ width: 22, height: 22, borderRadius: 999, border: "1.5px solid var(--border-strong)" }} />} />
        <SettingsRow icon={I.card} label="Carte bancaire" sub="Visa •• 4082" right={<div style={{ width: 22, height: 22, borderRadius: 999, border: "1.5px solid var(--border-strong)" }} />} />
      </div>

      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8 }}>Montant</div>
      <div style={{ background: "var(--bg-elev)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700 }} className="tabnum">500 000</span>
          <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600 }}>GNF</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }} className="tabnum">≈ 45 €</div>
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
        {[100000, 250000, 500000, 1000000].map((v) => (
          <button key={v} className={v === 500000 ? "chip active" : "chip"} style={{ flex: 1, justifyContent: "center" }}>
            {new Intl.NumberFormat("fr-FR").format(v)}
          </button>
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-primary btn-lg btn-block">Recharger 500 000 GNF</button>
    </div>
  </>
);

Object.assign(window, { CartScreen, PaymentMethod, OrderConfirmation, OrderTrackingBuyer, OrderTrackingSeller, WalletScreen, WalletRecharge });
