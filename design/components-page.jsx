// ========== Component library page ==========

const ComponentsPage = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

    {/* Buttons */}
    <div className="lib-card" style={{ gridColumn: "span 2" }}>
      <h3>Buttons</h3>
      <div className="lib-row">
        <span className="lib-label">Primary</span>
        <button className="btn btn-primary btn-sm">Continuer</button>
        <button className="btn btn-primary">Continuer</button>
        <button className="btn btn-primary btn-lg">Continuer</button>
        <button className="btn btn-primary btn-disabled">Disabled</button>
      </div>
      <div className="lib-row">
        <span className="lib-label">Secondary</span>
        <button className="btn btn-secondary btn-sm">Annuler</button>
        <button className="btn btn-secondary">Voir le détail</button>
        <button className="btn btn-secondary btn-lg">Voir le détail</button>
      </div>
      <div className="lib-row">
        <span className="lib-label">Ghost</span>
        <button className="btn btn-ghost btn-sm">Plus tard</button>
        <button className="btn btn-ghost">J'ai déjà un compte</button>
        <button className="btn btn-ghost btn-lg">Tout voir</button>
      </div>
      <div className="lib-row">
        <span className="lib-label">Danger</span>
        <button className="btn btn-danger btn-sm">Supprimer</button>
        <button className="btn btn-danger">Signaler un problème</button>
      </div>
      <div className="lib-row">
        <span className="lib-label">Saffron</span>
        <button className="btn btn-saffron btn-sm"><I.zap size={14} /> Booster</button>
        <button className="btn btn-saffron"><I.sparkle size={14} /> Générer avec l'IA</button>
      </div>
      <div className="lib-row">
        <span className="lib-label">Icon / FAB</span>
        <button className="btn btn-secondary btn-icon"><I.heart size={18} /></button>
        <button className="btn btn-primary btn-icon"><I.plus size={20} /></button>
        <div className="tab-bar-fab" style={{ top: 0 }}><I.sparkle size={22} color="white" /></div>
      </div>
    </div>

    {/* Inputs */}
    <div className="lib-card">
      <h3>Inputs</h3>
      <div className="col" style={{ gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Texte</div>
          <div className="input-row">
            <span className="icon-left"><I.search size={18} /></span>
            <input className="input" placeholder="Cherche un produit, un logement…" />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Téléphone (+224 Guinée par défaut)</div>
          <div className="input-group">
            <button className="input" style={{ width: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 20, height: 14, borderRadius: 2, background: "linear-gradient(to right, #CE1126 33%, #FCD116 33% 67%, #009E49 67%)", display: "inline-block" }} />
                +224
              </span>
              <I.chevronD size={14} />
            </button>
            <input className="input" placeholder="6XX XX XX XX" />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Montant (dual GNF + EUR)</div>
          <div className="input-row">
            <input className="input tabnum" defaultValue="450 000" style={{ paddingRight: 110 }} />
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 6, color: "var(--text-muted)", fontSize: 12 }} className="tabnum">
              GNF <span style={{ color: "var(--text-faint)" }}>· ≈ 41 €</span>
            </span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>OTP — 6 chiffres</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["4", "9", "2", "", "", ""].map((d, i) => (
              <div key={i} style={{ width: 42, height: 52, borderRadius: 12, border: i === 3 ? "2px solid var(--primary)" : "1px solid var(--border)", background: "var(--bg-elev)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20 }} className="tabnum">{d}</div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--danger)", marginBottom: 5, fontWeight: 500 }}>État erreur</div>
          <input className="input" defaultValue="exemple@" style={{ borderColor: "var(--danger)", boxShadow: "0 0 0 4px rgba(209,79,60,0.08)" }} />
          <div style={{ fontSize: 11, color: "var(--danger)", marginTop: 4 }}>Email invalide</div>
        </div>
      </div>
    </div>

    {/* Chips / segmented */}
    <div className="lib-card">
      <h3>Chips & sélections</h3>
      <div className="lib-row">
        <span className="lib-label">Filter</span>
        <button className="chip active">Tout</button>
        <button className="chip">Mode</button>
        <button className="chip">Électronique</button>
        <button className="chip">Immobilier</button>
        <button className="chip">Auto</button>
      </div>
      <div className="lib-row">
        <span className="lib-label">État</span>
        <button className="chip">Neuf</button>
        <button className="chip active">Occasion</button>
        <button className="chip">Reconditionné</button>
      </div>
      <div className="lib-row">
        <span className="lib-label">Status</span>
        <span className="chip chip-soft"><I.check size={11} /> Disponible</span>
        <span className="chip chip-saffron"><I.bolt size={11} /> Boost</span>
        <span className="chip chip-info">Réservé</span>
        <span className="chip chip-danger">Litige</span>
      </div>
      <div className="lib-row">
        <span className="lib-label">Pill segment</span>
        <div style={{ display: "inline-flex", background: "var(--bg-sunken)", borderRadius: 999, padding: 4, gap: 2 }}>
          <button className="btn btn-sm" style={{ background: "var(--bg-elev)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", color: "var(--text)" }}>Articles</button>
          <button className="btn btn-sm" style={{ color: "var(--text-muted)" }}>Immobilier</button>
        </div>
      </div>
    </div>

    {/* Cards row */}
    <div className="lib-card">
      <h3>Cards</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <ProductCard photo={photos.perfume} title="Eau de parfum 50ml — édition limitée" price={420000} seller="Maison Mariama" verified boost />
        <ProductCard photo={photos.iphone} title="iPhone 12 Pro 256Go — comme neuf" price={4800000} seller="Conakry Tech" verified />
      </div>
      <div style={{ marginTop: 14 }}>
        <PropertyCard photo={photos.apartment1} title="Appartement 2 pièces, Kaloum" price={1500000} perMonth verified location="Kaloum, Conakry" distanceToRoad={250} beds="2" area={68} />
      </div>
    </div>

    {/* Lists */}
    <div className="lib-card">
      <h3>Listes</h3>
      <div className="card" style={{ overflow: "hidden", marginBottom: 12 }}>
        <SettingsRow icon={I.user} label="Mariama Diallo" sub="+224 622 55 12 88" right="chevron" />
        <SettingsRow icon={I.bell} label="Notifications" right="switch-on" />
        <SettingsRow icon={I.cloudOff} label="Mode économie de données" sub="Désactive l'autoplay vidéo" right="switch-off" />
        <SettingsRow icon={I.logout} label="Déconnexion" danger right="chevron" />
      </div>
      <div className="card" style={{ padding: 12, display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
        <div className="avatar" style={{ background: `url(${photos.woman2}) center/cover` }} />
        <div style={{ flex: 1 }}>
          <div className="title-m" style={{ fontSize: 14 }}>Aïssatou B.</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Bonjour, il est encore disponible ?</div>
        </div>
        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>2 min</div>
        <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--primary)" }} />
      </div>
    </div>

    {/* Badges */}
    <div className="lib-card">
      <h3>Badges & statuts</h3>
      <div className="lib-row">
        <span className="lib-label">Verified</span>
        <VerifiedBadge label />
      </div>
      <div className="lib-row">
        <span className="lib-label">Boost</span>
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "4px 10px", borderRadius: 999, background: "var(--accent)", color: "#2A1A05", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>
          <I.star size={10} /> Boost
        </span>
      </div>
      <div className="lib-row">
        <span className="lib-label">Listing</span>
        <span className="chip chip-soft">Nouveau</span>
        <span className="chip chip-saffron">Promo</span>
        <span className="chip chip-info">Réservé</span>
        <span className="chip" style={{ color: "var(--text-faint)" }}>Vendu</span>
      </div>
      <div className="lib-row">
        <span className="lib-label">Distance</span>
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "5px 10px", borderRadius: 999, background: "var(--accent-soft)", color: "#8B5A0A", fontSize: 11, fontWeight: 600 }}>
          <I.road size={11} /> À 250m du goudron
        </span>
      </div>
    </div>

    {/* Modals & sheets */}
    <div className="lib-card">
      <h3>Modals & sheets</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Bottom sheet preview */}
        <div style={{ background: "var(--bg-sunken)", borderRadius: 16, padding: 12, position: "relative", height: 240, overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--card)", padding: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24, boxShadow: "0 -8px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ width: 36, height: 4, background: "var(--border-strong)", borderRadius: 999, margin: "0 auto 12px" }} />
            <div className="title-m">Confirmer ?</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Cette action est irréversible.</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Annuler</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Confirmer</button>
            </div>
          </div>
        </div>
        {/* Toast */}
        <div style={{ background: "var(--bg-sunken)", borderRadius: 16, padding: 16, height: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="card" style={{ padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--success)", color: "white", display: "grid", placeItems: "center" }}><I.check size={16} stroke={3} /></div>
            <div style={{ fontSize: 12, fontWeight: 500 }}>Article ajouté à tes favoris</div>
          </div>
          <div className="card" style={{ padding: "10px 14px", display: "flex", gap: 10, alignItems: "center", borderColor: "var(--danger)" }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--danger)", color: "white", display: "grid", placeItems: "center" }}><I.warn size={16} /></div>
            <div style={{ fontSize: 12, fontWeight: 500 }}>Code OTP incorrect. Réessaie.</div>
          </div>
          <div style={{ background: "rgba(58,124,168,0.1)", borderRadius: 12, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
            <I.cloudOff size={16} color="var(--info)" />
            <div style={{ fontSize: 12, color: "var(--info)", fontWeight: 600 }}>Tu es hors ligne. Mode lecture seule.</div>
          </div>
        </div>
      </div>
    </div>

    {/* Skeletons & states */}
    <div className="lib-card">
      <h3>États (loading / empty)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ aspectRatio: "1", borderRadius: 16 }} className="skel" />
          <div style={{ height: 12, marginTop: 8, borderRadius: 6 }} className="skel" />
          <div style={{ height: 12, marginTop: 6, width: "60%", borderRadius: 6 }} className="skel" />
        </div>
        <div style={{ background: "var(--bg-sunken)", borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", marginBottom: 10 }}>
            <I.cart size={26} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Panier vide</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Va découvrir des articles</div>
        </div>
      </div>
    </div>

  </div>
);

window.ComponentsPage = ComponentsPage;
