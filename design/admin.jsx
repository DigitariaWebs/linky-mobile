// ========== Admin Dashboard / Back-office ==========

const ADMIN_NAV = [
  { id: "overview", icon: I.layers, label: "Vue d'ensemble", count: null, active: true },
  { id: "users", icon: I.user, label: "Utilisateurs", count: "1.2k" },
  { id: "listings", icon: I.shop, label: "Annonces", count: "4.8k" },
  { id: "orders", icon: I.package, label: "Commandes & transactions", count: null },
  { id: "wallet", icon: I.wallet, label: "Wallet & finances", count: null },
  { id: "disputes", icon: I.warn, label: "Litiges", count: "3" },
  { id: "kyc", icon: I.shield, label: "KYC en attente", count: "12" },
  { id: "categories", icon: I.layers, label: "Catégories", count: null },
  { id: "banners", icon: I.image, label: "Bannières & promos", count: null },
  { id: "push", icon: I.bell, label: "Notifications push", count: null },
  { id: "moderation", icon: I.eye, label: "Messages signalés", count: "2" },
  { id: "settings", icon: I.settings, label: "Paramètres", count: null },
];

const AdminChrome = () => (
  <div className="admin-chrome">
    <div className="admin-chrome-dot" style={{ background: "#ED6A5E" }} />
    <div className="admin-chrome-dot" style={{ background: "#F4BF4F" }} />
    <div className="admin-chrome-dot" style={{ background: "#61C554" }} />
    <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--text-muted)" }}>admin.linky.gn</div>
  </div>
);

const AdminSide = ({ activeId, collapsed = false }) => (
  <aside className="admin-side">
    {!collapsed && (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 16px" }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>L</div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: -0.3 }}>Linky Admin</div>
          <div style={{ fontSize: 9, color: "var(--text-muted)" }}>v1.0.0</div>
        </div>
      </div>
    )}
    {collapsed && (
      <div style={{ display: "flex", justifyContent: "center", padding: "0 0 16px" }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>L</div>
      </div>
    )}
    {ADMIN_NAV.map((item) => {
      const Ic = item.icon;
      const isActive = activeId === item.id;
      if (collapsed) {
        return (
          <div key={item.id} className={"admin-side-link " + (isActive ? "active" : "")} style={{ justifyContent: "center", padding: 10, position: "relative" }}>
            <Ic size={18} />
            {item.count && <span style={{ position: "absolute", top: 4, right: 4, minWidth: 16, height: 14, padding: "0 4px", borderRadius: 7, background: "var(--danger)", color: "white", fontSize: 8, fontWeight: 700, display: "grid", placeItems: "center" }}>{item.count}</span>}
          </div>
        );
      }
      return (
        <div key={item.id} className={"admin-side-link " + (isActive ? "active" : "")}>
          <Ic size={16} />
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.count && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 999, background: isActive ? "var(--primary)" : "var(--danger)", color: "white" }}>{item.count}</span>}
        </div>
      );
    })}
  </aside>
);

const AdminTopBar = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 22, borderBottom: "1px solid var(--border)", marginBottom: 22 }}>
    <div className="input-row" style={{ flex: 1, maxWidth: 420 }}>
      <span className="icon-left"><I.search size={16} /></span>
      <input className="input" placeholder="Rechercher utilisateur, annonce, commande…" style={{ height: 38, borderRadius: 10, paddingLeft: 38 }} />
    </div>
    <div style={{ marginLeft: "auto" }} />
    <span style={{ padding: "5px 10px", borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", fontSize: 11, fontWeight: 700, display: "flex", gap: 6, alignItems: "center" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--success)" }} /> Production
    </span>
    <button style={{ width: 36, height: 36, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center", position: "relative" }}>
      <I.bell size={16} />
      <span style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, borderRadius: 999, background: "var(--danger)" }} />
    </button>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="avatar avatar-sm" style={{ background: `url(${photos.man3}) center/cover` }} />
      <div>
        <div style={{ fontSize: 12, fontWeight: 600 }}>Alpha Camara</div>
        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Super Admin</div>
      </div>
    </div>
  </div>
);

const KPICard = ({ label, value, delta, sub, icon: Ic, accent }) => (
  <div className="card" style={{ padding: 18, position: "relative", overflow: "hidden" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>{label}</div>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: accent === "primary" ? "var(--primary-soft)" : accent === "accent" ? "var(--accent-soft)" : "var(--bg-sunken)", color: accent === "primary" ? "var(--primary)" : accent === "accent" ? "#8B5A0A" : "var(--text)", display: "grid", placeItems: "center" }}><Ic size={15} /></div>
    </div>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }} className="tabnum">{value}</div>
    <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
      {delta && <span style={{ fontSize: 11, color: delta.includes("-") ? "var(--danger)" : "var(--success)", fontWeight: 600, display: "flex", gap: 2, alignItems: "center" }}><I.trend size={11} /> {delta}</span>}
      {sub && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{sub}</span>}
    </div>
  </div>
);

const RevenueChart = () => {
  const data = [42, 48, 55, 52, 60, 65, 58, 72, 78, 70, 82, 88, 76, 90, 85, 95, 102, 92, 110, 105, 118, 124, 116, 130, 122, 138, 128, 145, 152, 140];
  const max = Math.max(...data);
  const w = 800; const h = 180;
  const pts = data.map((v, i) => [i * (w / (data.length - 1)), h - (v / max) * (h - 20)]);
  const linePath = "M" + pts.map(p => p.join(",")).join(" L");
  const areaPath = linePath + ` L${w},${h} L0,${h} Z`;
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Volume de transactions</div>
          <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginTop: 6 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }} className="tabnum">425.8M GNF</div>
            <div style={{ fontSize: 12, color: "var(--success)", fontWeight: 600, display: "flex", gap: 3, alignItems: "center" }}><I.trend size={12} /> +24% vs 30j</div>
          </div>
        </div>
        <div style={{ display: "inline-flex", background: "var(--bg-sunken)", borderRadius: 999, padding: 3, gap: 1 }}>
          {["7j", "30j", "90j", "An"].map((p) => (
            <button key={p} style={{ padding: "6px 12px", borderRadius: 999, background: p === "30j" ? "var(--card)" : "transparent", boxShadow: p === "30j" ? "0 1px 3px rgba(0,0,0,0.08)" : "none", fontSize: 11, fontWeight: 600, color: p === "30j" ? "var(--text)" : "var(--text-muted)" }}>{p}</button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 180, display: "block" }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartGrad)" />
        <path d={linePath} stroke="var(--primary)" strokeWidth="2" fill="none" />
        {pts.filter((_, i) => i === pts.length - 1).map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={5} fill="var(--primary)" stroke="white" strokeWidth="2.5" />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "var(--text-muted)" }} className="tabnum">
        <span>15 avril</span><span>22 avril</span><span>29 avril</span><span>06 mai</span><span>13 mai</span><span>aujourd'hui</span>
      </div>
    </div>
  );
};

const AdminOverview = () => (
  <div className="admin-main">
    <AdminTopBar />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, margin: 0, letterSpacing: -0.5 }}>Vue d'ensemble</h1>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Activité globale de la plateforme · 30 derniers jours</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-secondary btn-sm"><I.download size={14} /> Exporter</button>
        <button className="btn btn-primary btn-sm"><I.refresh size={14} /> Actualiser</button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 22 }}>
      <KPICard label="Utilisateurs actifs" value="12 482" delta="+12%" icon={I.user} accent="primary" />
      <KPICard label="Volume 30j" value="425.8M" delta="+24%" sub="GNF" icon={I.trend} accent="primary" />
      <KPICard label="Commissions" value="12.8M" delta="+22%" sub="GNF" icon={I.wallet} accent="accent" />
      <KPICard label="Annonces actives" value="4 832" delta="+8%" icon={I.shop} accent="primary" />
      <KPICard label="Litiges ouverts" value="3" delta="-2 vs 7j" icon={I.warn} accent="accent" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 22 }}>
      <RevenueChart />
      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 14 }}>Top catégories</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { name: "Électronique", count: "1 280", pct: 90, color: "var(--primary)" },
            { name: "Mode", count: "942", pct: 70, color: "var(--accent)" },
            { name: "Immobilier — Location", count: "682", pct: 50, color: "var(--info)" },
            { name: "Maison & Cuisine", count: "418", pct: 32, color: "var(--success)" },
            { name: "Auto & Moto", count: "298", pct: 22, color: "#8B7355" },
          ].map((c) => (
            <div key={c.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                <span style={{ fontWeight: 500 }}>{c.name}</span>
                <span className="tabnum" style={{ fontWeight: 600 }}>{c.count}</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: "var(--bg-sunken)", overflow: "hidden" }}>
                <div style={{ width: `${c.pct}%`, height: "100%", background: c.color, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Two-col tables */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>Dernières commandes</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>15 dernières</div>
          </div>
          <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Tout voir</button>
        </div>
        <div>
          {[
            { id: "04812", buyer: "Mariama D.", item: "Eau de parfum…", amount: 420000, status: "Séquestre", color: "var(--info)" },
            { id: "04811", buyer: "Fatou B.", item: "Robe wax taille M", amount: 185000, status: "Livré", color: "var(--success)" },
            { id: "04810", buyer: "Mamadou B.", item: "iPhone 12 Pro", amount: 4800000, status: "Livré", color: "var(--success)" },
            { id: "04809", buyer: "Ibrahima S.", item: "Sneakers Nike", amount: 620000, status: "Litige", color: "var(--danger)" },
            { id: "04808", buyer: "Aïssatou B.", item: "Sac cuir véritable", amount: 340000, status: "Livré", color: "var(--success)" },
          ].map((o, i, arr) => (
            <div key={o.id} style={{ padding: "12px 22px", display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 14, alignItems: "center", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div className="tabnum" style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>#{o.id}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.item}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{o.buyer}</div>
              </div>
              <div className="tabnum" style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-display)" }}>{new Intl.NumberFormat("fr-FR").format(o.amount)}</div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: o.color === "var(--success)" ? "rgba(31,169,113,0.12)" : o.color === "var(--info)" ? "rgba(58,124,168,0.12)" : "rgba(209,79,60,0.12)", color: o.color }}>{o.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>Litiges récents</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>À traiter en priorité</div>
          </div>
          <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Kanban</button>
        </div>
        <div>
          {[
            { id: "DISP-009", title: "Article non reçu", buyer: "Mariama D.", seller: "Conakry Tech", amount: 4800000, time: "Il y a 2h", status: "Examen" },
            { id: "DISP-008", title: "Différent de l'annonce", buyer: "Fatou B.", seller: "Mode Conakry", amount: 185000, time: "Hier", status: "Examen" },
            { id: "DISP-007", title: "Article endommagé", buyer: "Ibrahima S.", seller: "Ibrahima D.", amount: 620000, time: "Il y a 3j", status: "Résolu" },
          ].map((d, i, arr) => (
            <div key={d.id} style={{ padding: "12px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div className="tabnum" style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>#{d.id}</div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: d.status === "Résolu" ? "rgba(31,169,113,0.12)" : "rgba(232,165,61,0.12)", color: d.status === "Résolu" ? "var(--success)" : "#8B5A0A" }}>{d.status}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{d.title}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{d.buyer} → {d.seller} · {d.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Users table
const AdminUsers = () => (
  <div className="admin-main">
    <AdminTopBar />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, margin: 0 }}>Utilisateurs</h1>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>12 482 utilisateurs au total · 1 248 actifs aujourd'hui</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-secondary btn-sm"><I.filter size={14} /> Filtres</button>
        <button className="btn btn-secondary btn-sm"><I.download size={14} /> Exporter</button>
        <button className="btn btn-primary btn-sm"><I.plus size={14} /> Inviter admin</button>
      </div>
    </div>

    <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
      <button className="chip active">Tous (12 482)</button>
      <button className="chip">Vérifiés (8 240)</button>
      <button className="chip">En attente KYC (412)</button>
      <button className="chip">Diaspora (1 824)</button>
      <button className="chip">Suspendus (28)</button>
    </div>

    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1fr 60px", padding: "12px 22px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 0.5, textTransform: "uppercase", background: "var(--bg-elev)", borderBottom: "1px solid var(--border)" }}>
        <div>Utilisateur</div>
        <div>Téléphone / Email</div>
        <div>Rôle</div>
        <div>KYC</div>
        <div>Inscrit</div>
        <div>Statut</div>
        <div></div>
      </div>
      {[
        { name: "Mariama Diallo", photo: photos.woman1, contact: "+224 622 55 12 88", role: "Acheteur · Vendeur", kyc: "Vérifié", kycColor: "var(--success)", joined: "Il y a 2 mois", status: "Actif", statusColor: "var(--success)" },
        { name: "Mamadou Bah", photo: photos.man1, contact: "+224 624 11 09 02", role: "Agent immobilier", kyc: "Vérifié", kycColor: "var(--success)", joined: "Il y a 5 mois", status: "Actif", statusColor: "var(--success)" },
        { name: "Fatou Baldé", photo: photos.woman3, contact: "fatou.balde@gmail.com", role: "Acheteur · Diaspora", kyc: "Vérifié", kycColor: "var(--success)", joined: "Il y a 3 sem.", status: "Actif", statusColor: "var(--success)" },
        { name: "Ibrahima Sow", photo: photos.man3, contact: "+224 657 44 12 30", role: "Acheteur", kyc: "En attente", kycColor: "var(--accent)", joined: "Il y a 8j", status: "Actif", statusColor: "var(--success)" },
        { name: "Aïssatou Barry", photo: photos.woman2, contact: "+224 622 11 87 90", role: "Vendeur", kyc: "Vérifié", kycColor: "var(--success)", joined: "Il y a 1 an", status: "Actif", statusColor: "var(--success)" },
        { name: "Karim Sangaré", photo: photos.man2, contact: "+224 666 02 14 88", role: "Vendeur", kyc: "Rejeté", kycColor: "var(--danger)", joined: "Il y a 4 mois", status: "Suspendu", statusColor: "var(--danger)" },
        { name: "Aminata Diop", photo: photos.woman4, contact: "+224 622 88 33 12", role: "Acheteur", kyc: "Non soumis", kycColor: "var(--text-muted)", joined: "Il y a 2j", status: "Actif", statusColor: "var(--success)" },
      ].map((u, i, arr) => (
        <div key={u.name} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1fr 60px", padding: "14px 22px", alignItems: "center", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", fontSize: 13 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: `url(${u.photo}) center/cover`, flexShrink: 0 }} />
            <div style={{ fontWeight: 600 }}>{u.name}</div>
          </div>
          <div className="tabnum" style={{ color: "var(--text-muted)", fontSize: 12 }}>{u.contact}</div>
          <div style={{ fontSize: 12 }}>{u.role}</div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 999, background: `${u.kycColor === "var(--success)" ? "rgba(31,169,113,0.12)" : u.kycColor === "var(--accent)" ? "rgba(232,165,61,0.12)" : u.kycColor === "var(--danger)" ? "rgba(209,79,60,0.12)" : "var(--bg-sunken)"}`, color: u.kycColor }}>{u.kyc}</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{u.joined}</div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 999, background: u.statusColor === "var(--success)" ? "rgba(31,169,113,0.12)" : "rgba(209,79,60,0.12)", color: u.statusColor }}>{u.status}</span>
          </div>
          <button style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--text-muted)" }}><I.moreV size={16} /></button>
        </div>
      ))}
      <div style={{ padding: "12px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--text-muted)", background: "var(--bg-elev)" }}>
        <div>1 - 7 sur <strong className="tabnum" style={{ color: "var(--text)" }}>12 482</strong></div>
        <div style={{ display: "flex", gap: 4 }}>
          <button className="btn btn-secondary btn-sm" style={{ height: 30, padding: "0 10px" }}><I.chevronL size={14} /></button>
          <button className="btn btn-secondary btn-sm" style={{ height: 30, padding: "0 10px" }}><I.chevronR size={14} /></button>
        </div>
      </div>
    </div>
  </div>
);

const AdminListings = () => (
  <div className="admin-main">
    <AdminTopBar />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, margin: 0 }}>Annonces</h1>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>4 832 annonces actives · 8 signalements en attente</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-secondary btn-sm"><I.filter size={14} /> Filtres</button>
        <button className="btn btn-secondary btn-sm"><I.download size={14} /> Exporter</button>
      </div>
    </div>

    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
      <button className="chip active">Tout</button>
      <button className="chip">Articles</button>
      <button className="chip">Immobilier</button>
      <button className="chip">Signalées <span style={{ marginLeft: 4, color: "var(--danger)", fontWeight: 700 }}>8</span></button>
      <button className="chip">Boostées</button>
    </div>

    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.5fr 1fr 1fr 1fr 0.8fr 60px", padding: "12px 22px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 0.5, textTransform: "uppercase", background: "var(--bg-elev)", borderBottom: "1px solid var(--border)" }}>
        <div>Annonce</div>
        <div>Vendeur</div>
        <div>Catégorie</div>
        <div>Prix</div>
        <div>Vues / Favs</div>
        <div>Statut</div>
        <div></div>
      </div>
      {[
        { photo: photos.iphone, title: "iPhone 12 Pro 256Go, comme neuf", seller: "Conakry Tech", cat: "Électronique", price: "4 800 000", views: "1.2k", favs: "84", status: "Boostée", color: "var(--accent)" },
        { photo: photos.apartment1, title: "Appartement 2P meublé, Kaloum", seller: "Mamadou Bah", cat: "Immobilier · Location", price: "1 500 000", views: "842", favs: "32", status: "Active", color: "var(--success)" },
        { photo: photos.perfume, title: "Eau de parfum édition limitée", seller: "Maison Aïssatou", cat: "Beauté", price: "420 000", views: "640", favs: "42", status: "Active", color: "var(--success)" },
        { photo: photos.fashion, title: "Robe wax élégante taille M", seller: "Mode Conakry", cat: "Mode", price: "185 000", views: "420", favs: "18", status: "Signalée", color: "var(--danger)" },
        { photo: photos.modernHouse, title: "Villa moderne 4 ch., Lambanyi", seller: "Mamadou Bah", cat: "Immobilier · Location", price: "4 200 000", views: "1.4k", favs: "62", status: "Active", color: "var(--success)" },
        { photo: photos.watch, title: "Montre classique homme", seller: "Ibrahima D.", cat: "Mode", price: "920 000", views: "82", favs: "4", status: "Expirée", color: "var(--text-muted)" },
      ].map((l, i, arr) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2.5fr 1.5fr 1fr 1fr 1fr 0.8fr 60px", padding: "12px 22px", alignItems: "center", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", fontSize: 13 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: `url(${l.photo}) center/cover`, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.title}</div>
            </div>
          </div>
          <div style={{ fontSize: 12 }}>{l.seller}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{l.cat}</div>
          <div className="tabnum" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{l.price}</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}><span className="tabnum">{l.views}</span> vues · <span className="tabnum">{l.favs}</span> ❤</div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 999, background: l.color === "var(--success)" ? "rgba(31,169,113,0.12)" : l.color === "var(--accent)" ? "rgba(232,165,61,0.12)" : l.color === "var(--danger)" ? "rgba(209,79,60,0.12)" : "var(--bg-sunken)", color: l.color, alignSelf: "start", marginTop: 2, justifySelf: "start" }}>{l.status}</span>
          <button style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--text-muted)" }}><I.moreV size={16} /></button>
        </div>
      ))}
    </div>
  </div>
);

const AdminDisputes = () => (
  <div className="admin-main">
    <AdminTopBar />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, margin: 0 }}>Litiges</h1>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>3 en cours · délai de résolution 72h</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-secondary btn-sm"><I.list size={14} /> Liste</button>
        <button className="btn btn-primary btn-sm"><I.grid size={14} /> Kanban</button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      {[
        { title: "Reçu", count: 2, color: "var(--info)", items: [
          { id: "DISP-011", t: "Article différent", who: "Aminata D.", amount: 280000, time: "Il y a 30 min" },
          { id: "DISP-010", t: "Non reçu", who: "Karim S.", amount: 1200000, time: "Il y a 2h" },
        ]},
        { title: "En examen", count: 2, color: "var(--accent)", items: [
          { id: "DISP-009", t: "Article non reçu", who: "Mariama D.", amount: 4800000, time: "Il y a 6h" },
          { id: "DISP-008", t: "Article différent", who: "Fatou B.", amount: 185000, time: "Hier" },
        ]},
        { title: "Résolu — Remboursé", count: 12, color: "var(--success)", items: [
          { id: "DISP-007", t: "Article endommagé", who: "Ibrahima S.", amount: 620000, time: "Il y a 3j" },
        ]},
        { title: "Résolu — Rejeté", count: 3, color: "var(--text-muted)", items: [
          { id: "DISP-005", t: "Pas de réception", who: "Karim T.", amount: 450000, time: "La semaine dernière" },
        ]},
      ].map((col) => (
        <div key={col.title} style={{ background: "var(--bg-elev)", borderRadius: 14, padding: 12, border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: col.color }} />
              {col.title}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)" }} className="tabnum">{col.count}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {col.items.map((it) => (
              <div key={it.id} className="card" style={{ padding: 12, cursor: "grab" }}>
                <div className="tabnum" style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, marginBottom: 6 }}>#{it.id}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{it.t}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{it.who} · {it.time}</div>
                <div className="tabnum" style={{ fontSize: 12, fontFamily: "var(--font-display)", fontWeight: 700, marginTop: 6 }}>{new Intl.NumberFormat("fr-FR").format(it.amount)} GNF</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Dispute detail preview */}
    <div style={{ marginTop: 22 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Aperçu — #DISP-009 (sélectionné)</div>
      <div className="card" style={{ padding: 22, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 22 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>Article non reçu</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Commande #LK-2026-04812 · ouvert il y a 6h</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(232,165,61,0.12)", color: "#8B5A0A" }}>En examen</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="card" style={{ padding: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>Acheteur</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div className="avatar avatar-sm" style={{ background: `url(${photos.woman1}) center/cover` }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Mariama Diallo</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Vérifiée · 124 commandes</div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>Vendeur</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div className="avatar avatar-sm" style={{ background: `url(${photos.man2}) center/cover` }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Conakry Tech</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Vérifié · 4.8 ★</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: 12, background: "var(--bg-elev)", borderRadius: 10, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>
            <strong style={{ color: "var(--text)" }}>Description de Mariama :</strong> "J'avais rendez-vous lundi mais le vendeur n'est pas venu. Depuis, plus de nouvelles."
          </div>
        </div>
        <div style={{ paddingLeft: 22, borderLeft: "1px solid var(--border)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>Décision</div>
          <div className="wallet-card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, opacity: 0.8 }}>En séquestre</div>
            <div className="tabnum" style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>4 800 000 GNF</div>
          </div>
          <button className="btn btn-primary btn-block" style={{ marginBottom: 8 }}>Rembourser l'acheteur</button>
          <button className="btn btn-secondary btn-block" style={{ marginBottom: 8 }}>Libérer au vendeur</button>
          <button className="btn btn-ghost btn-sm btn-block">Demander plus d'infos</button>
        </div>
      </div>
    </div>
  </div>
);

const AdminKYCQueue = () => (
  <div className="admin-main">
    <AdminTopBar />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, margin: 0 }}>KYC en attente</h1>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>12 dossiers à examiner · objectif 48h</div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14 }}>
      {/* Queue list */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>File d'attente</div>
        </div>
        {[
          { name: "Ibrahima Sow", photo: photos.man3, doc: "CNI", time: "Il y a 30 min", selected: true },
          { name: "Aminata Diop", photo: photos.woman4, doc: "Passeport", time: "Il y a 2h" },
          { name: "Karim Sangaré", photo: photos.man2, doc: "Carte d'électeur", time: "Il y a 4h" },
          { name: "Salimatou Bah", photo: photos.woman2, doc: "CNI", time: "Hier" },
          { name: "Ousmane Kaba", photo: photos.man1, doc: "RCS", time: "Hier" },
        ].map((u, i, arr) => (
          <div key={u.name} style={{ padding: "12px 18px", display: "flex", gap: 10, alignItems: "center", background: u.selected ? "var(--primary-soft)" : "transparent", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", borderLeft: u.selected ? "3px solid var(--primary)" : "3px solid transparent" }}>
            <div className="avatar avatar-sm" style={{ background: `url(${u.photo}) center/cover` }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{u.doc} · {u.time}</div>
            </div>
            <I.chevronR size={14} color="var(--text-muted)" />
          </div>
        ))}
      </div>

      {/* Detail */}
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 22 }}>
          <div className="avatar avatar-lg" style={{ background: `url(${photos.man3}) center/cover` }} />
          <div style={{ flex: 1 }}>
            <div className="title-l" style={{ fontSize: 18 }}>Ibrahima Sow</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>+224 657 44 12 30 · Conakry · inscrit il y a 8j</div>
          </div>
          <button className="btn btn-ghost btn-sm">Voir profil <I.chevronR size={14} /></button>
        </div>

        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>Documents soumis · CNI</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 22 }}>
          {["Recto", "Verso", "Selfie + CNI"].map((label, i) => (
            <div key={label}>
              <div style={{ aspectRatio: "1.6/1", borderRadius: 10, background: "linear-gradient(135deg, #c9b885, #a89668)", display: "grid", placeItems: "center", color: "white", fontSize: 11, fontWeight: 600, position: "relative" }}>
                <I.card size={28} style={{ opacity: 0.5 }} />
                <div style={{ position: "absolute", bottom: 6, left: 6, fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "rgba(0,0,0,0.5)" }}>2.4 MP</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 14, background: "var(--bg-elev)", borderRadius: 12, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>Vérification automatique</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["Visage cohérent avec la pièce", "OK", "var(--success)"],
              ["Pièce non expirée (2029)", "OK", "var(--success)"],
              ["Données lisibles (OCR)", "OK", "var(--success)"],
              ["Pièce non détectée comme contrefaite", "OK", "var(--success)"],
            ].map(([t, s, c]) => (
              <div key={t} style={{ display: "flex", justifyContent: "space-between", color: "var(--text)", fontSize: 12 }}>
                <span>{t}</span>
                <span style={{ color: c, fontWeight: 600 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <button className="btn btn-secondary" style={{ flex: 1, color: "var(--danger)" }}><I.close size={16} /> Rejeter</button>
          <button className="btn btn-primary" style={{ flex: 2 }}><I.check size={16} /> Approuver et accorder le badge</button>
        </div>
      </div>
    </div>
  </div>
);

const AdminPushComposer = () => (
  <div className="admin-main">
    <AdminTopBar />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, margin: 0 }}>Notifications push</h1>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Compose et programme une notification ciblée</div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22 }}>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Titre</div>
            <input className="input" defaultValue="Soldes Black Friday — jusqu'à -30%" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500, display: "flex", justifyContent: "space-between" }}>
              <span>Corps</span>
              <span className="tabnum" style={{ color: "var(--text-faint)" }}>82 / 240</span>
            </div>
            <textarea className="input" style={{ height: 80, padding: 12, resize: "none", fontFamily: "inherit" }} defaultValue="Découvre les meilleures offres de l'année sur l'électronique. Du 25 au 30 novembre." />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Image (optionnelle)</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 88, height: 56, borderRadius: 10, background: `url(${photos.iphone}) center/cover` }} />
              <button style={{ width: 88, height: 56, borderRadius: 10, background: "var(--bg-elev)", border: "1.5px dashed var(--border-strong)", color: "var(--text-muted)", display: "grid", placeItems: "center" }}><I.plus size={20} /></button>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Deep link</div>
            <input className="input" defaultValue="linky://discover?campaign=blackfriday" />
          </div>

          <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Audience cible</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span className="chip active">Tous les utilisateurs (12 482)</span>
            <span className="chip">Acheteurs récents</span>
            <span className="chip">Diaspora</span>
            <span className="chip">Vendeurs vérifiés</span>
            <span className="chip">Inactifs 30j</span>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Programmation</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="chip active">Envoyer maintenant</button>
              <button className="chip">Planifier</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase" }}>Aperçu mobile</div>
        <div style={{ width: "100%", aspectRatio: "9/16", borderRadius: 22, background: "#0E1311", padding: 8, position: "relative" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 16, background: `url(${photos.conakry}) center/cover`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 30%)" }} />
            <div style={{ position: "absolute", top: 40, left: 12, right: 12, display: "flex", gap: 10, padding: 12, borderRadius: 16, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", color: "var(--text)" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>L</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
                  <span>LINKY</span>
                  <span>maintenant</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 1 }}>Soldes Black Friday — jusqu'à -30%</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Découvre les meilleures offres de l'année sur l'électronique…</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 14, padding: 14 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Reach estimé</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }} className="tabnum">12 482 destinataires</div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }}>Envoyer test</button>
            <button className="btn btn-primary" style={{ flex: 1 }}><I.send size={14} /> Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminWindow = ({ activeId, collapsed = false, children }) => (
  <div className="admin-canvas">
    <div className="admin-window">
      <AdminChrome />
      <div className={"admin-grid" + (collapsed ? " collapsed" : "")}>
        <AdminSide activeId={activeId} collapsed={collapsed} />
        {children}
      </div>
    </div>
  </div>
);

const AdminOverviewPage = () => (
  <div>
    <SectionBand title="Vue d'ensemble · sidebar étendu" />
    <AdminWindow activeId="overview"><AdminOverview /></AdminWindow>
    <SectionBand title="Vue d'ensemble · sidebar collapsed" />
    <AdminWindow activeId="overview" collapsed><AdminOverview /></AdminWindow>
  </div>
);

const AdminUsersPage = () => <AdminWindow activeId="users"><AdminUsers /></AdminWindow>;
const AdminListingsPage = () => <AdminWindow activeId="listings"><AdminListings /></AdminWindow>;
const AdminOrdersPage = () => <AdminWindow activeId="disputes"><AdminDisputes /></AdminWindow>;
const AdminKYCPage = () => <AdminWindow activeId="kyc"><AdminKYCQueue /></AdminWindow>;
const AdminCMSPage = () => <AdminWindow activeId="push"><AdminPushComposer /></AdminWindow>;

Object.assign(window, { AdminOverviewPage, AdminUsersPage, AdminListingsPage, AdminOrdersPage, AdminKYCPage, AdminCMSPage });
