// ========== Create listing (Product & Real Estate wizards) ==========

const StepDots = ({ total, current }) => (
  <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
    {[...Array(total)].map((_, i) => (
      <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= current ? "var(--primary)" : "var(--border)" }} />
    ))}
  </div>
);

const CreateProductSellerType = () => (
  <>
    <TopBar title="Créer une annonce" back />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={6} current={0} />
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Étape 1 / 6</div>
      <div className="disp-l" style={{ fontSize: 22, marginTop: 6, marginBottom: 18 }}>Tu vends en tant que ?</div>

      {[
        { id: "p", title: "Particulier", desc: "Je vends mes propres affaires d'occasion ou neuves", icon: I.user, selected: true },
        { id: "c", title: "Commerçant / Boutique", desc: "Je vends régulièrement, j'ai une boutique", icon: I.store, selected: false },
      ].map((o) => {
        const Ic = o.icon;
        return (
          <div key={o.id} style={{ padding: 16, borderRadius: 14, border: o.selected ? "2px solid var(--primary)" : "1px solid var(--border)", background: "var(--card)", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: o.selected ? "var(--primary-soft)" : "var(--bg-sunken)", color: o.selected ? "var(--primary)" : "var(--text)", display: "grid", placeItems: "center", flexShrink: 0 }}><Ic size={20} /></div>
            <div style={{ flex: 1 }}>
              <div className="title-m" style={{ fontSize: 14 }}>{o.title}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{o.desc}</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: 999, border: o.selected ? "0" : "1.5px solid var(--border-strong)", background: o.selected ? "var(--primary)" : "transparent", display: "grid", placeItems: "center" }}>
              {o.selected && <I.check size={13} color="white" stroke={3} />}
            </div>
          </div>
        );
      })}
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-primary btn-lg btn-block">Continuer</button>
    </div>
  </>
);

const CreateProductCategory = () => (
  <>
    <TopBar title="Créer une annonce" back />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={6} current={1} />
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Étape 2 / 6 · Catégorie</div>
      <div className="disp-l" style={{ fontSize: 22, marginTop: 6, marginBottom: 18 }}>Quelle catégorie ?</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { t: "Mode & Beauté", c: "1240 articles", icon: I.shirt, tint: "primary", selected: true },
          { t: "Électronique", c: "832 articles", icon: I.phone, tint: "accent" },
          { t: "Maison", c: "560 articles", icon: I.sofa, tint: "cream" },
          { t: "Auto & Moto", c: "298 articles", icon: I.car, tint: "info" },
          { t: "Beauté & Soin", c: "412 articles", icon: I.drop, tint: "primary" },
          { t: "Services", c: "168 services", icon: I.zap, tint: "accent" },
        ].map((cat, i) => {
          const Ic = cat.icon;
          const tints = {
            primary: { bg: "var(--primary-soft)", fg: "var(--primary)" },
            accent: { bg: "var(--accent-soft)", fg: "#8B5A0A" },
            cream: { bg: "var(--bg-sunken)", fg: "var(--text)" },
            info: { bg: "rgba(58,124,168,0.12)", fg: "var(--info)" },
          };
          const t = tints[cat.tint];
          return (
            <div key={cat.t} style={{ padding: 14, borderRadius: 14, border: cat.selected ? "2px solid var(--primary)" : "1px solid var(--border)", background: "var(--card)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: t.bg, color: t.fg, display: "grid", placeItems: "center", marginBottom: 10 }}><Ic size={18} /></div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{cat.t}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{cat.c}</div>
            </div>
          );
        })}
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-primary btn-lg btn-block">Continuer</button>
    </div>
  </>
);

const CreateProductDetails = () => (
  <>
    <TopBar title="Créer une annonce" back />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={6} current={3} />
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Étape 4 / 6 · Détails</div>
      <div className="disp-l" style={{ fontSize: 22, marginTop: 6, marginBottom: 18 }}>Décris ton article</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Titre</div>
          <input className="input" defaultValue="iPhone 12 Pro 256Go" />
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500, display: "flex", justifyContent: "space-between" }}>
            <span>Description</span>
            <span style={{ color: "var(--text-faint)" }} className="tabnum">42 / 600</span>
          </div>
          <textarea
            className="input"
            style={{ height: 120, padding: 12, fontFamily: "inherit", resize: "none" }}
            defaultValue="Comme neuf, peu utilisé. Avec boîte et chargeur."
          />
          <button style={{ marginTop: 8, padding: "8px 14px", border: "1.5px dashed var(--accent)", borderRadius: 999, color: "#8B5A0A", fontSize: 12, fontWeight: 600, background: "var(--accent-soft)", display: "inline-flex", gap: 6, alignItems: "center" }}>
            <I.sparkle size={14} /> Générer avec l'IA
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Prix</div>
            <div className="input-row">
              <input className="input tabnum" defaultValue="4 800 000" />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>GNF</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }} className="tabnum">≈ 436 €</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Quantité</div>
            <input className="input tabnum" defaultValue="1" />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>État</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="chip" style={{ flex: 1, justifyContent: "center" }}>Neuf</button>
            <button className="chip active" style={{ flex: 1, justifyContent: "center" }}>Occasion</button>
            <button className="chip" style={{ flex: 1, justifyContent: "center" }}>Reconditionné</button>
          </div>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary">Retour</button>
      <button className="btn btn-primary" style={{ flex: 1 }}>Continuer</button>
    </div>
  </>
);

const CreateProductPhotos = () => (
  <>
    <TopBar title="Créer une annonce" back />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={6} current={4} />
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Étape 5 / 6 · Photos</div>
      <div className="disp-l" style={{ fontSize: 22, marginTop: 6 }}>Ajoute des photos</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>Plus tu en mets, plus tu vends vite. Maximum 8.</div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <div style={{ position: "relative", aspectRatio: "1", borderRadius: 12, background: `url(${photos.iphone}) center/cover`, gridColumn: "span 2", gridRow: "span 2" }}>
          <div style={{ position: "absolute", top: 8, left: 8, background: "var(--accent)", color: "#2A1A05", padding: "3px 8px", borderRadius: 999, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>Principale</div>
          <button style={{ position: "absolute", top: 8, right: 8, width: 26, height: 26, borderRadius: 999, background: "rgba(0,0,0,0.6)", color: "white", display: "grid", placeItems: "center" }}><I.close size={14} /></button>
        </div>
        <div style={{ aspectRatio: "1", borderRadius: 12, background: `url(${photos.iphone2}) center/cover`, position: "relative" }}>
          <button style={{ position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: 999, background: "rgba(0,0,0,0.6)", color: "white", display: "grid", placeItems: "center" }}><I.close size={11} /></button>
        </div>
        <div style={{ aspectRatio: "1", borderRadius: 12, background: "var(--bg-elev)", border: "1.5px dashed var(--border-strong)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <I.camera size={20} color="var(--text-muted)" />
          <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500 }}>Ajouter</span>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: 12, background: "var(--primary-soft)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.info size={16} color="var(--primary)" />
        <div style={{ fontSize: 11.5, color: "var(--primary-deep)", lineHeight: 1.45 }}>
          Maintiens une photo pour la définir comme principale.
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary">Retour</button>
      <button className="btn btn-primary" style={{ flex: 1 }}>Continuer</button>
    </div>
  </>
);

const CreateProductPreview = () => (
  <>
    <TopBar title="Aperçu" back />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={6} current={5} />
      <div className="disp-l" style={{ fontSize: 22, marginBottom: 6 }}>Comme dans le feed</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 18 }}>Voilà comment ton annonce apparaîtra aux acheteurs.</div>

      {/* Mini preview */}
      <div style={{ background: "#0E1311", borderRadius: 18, overflow: "hidden", position: "relative", aspectRatio: "9/14" }}>
        <div style={{ position: "absolute", inset: 0, background: `url(${photos.iphone}) center/cover` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.85) 100%)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
          <div style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>iPhone 12 Pro 256Go</div>
          <div style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginTop: 4 }} className="tabnum">4 800 000 GNF</div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 12, background: "var(--accent-soft)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.bolt size={16} color="#8B5A0A" />
        <div style={{ fontSize: 11.5, color: "#8B5A0A", lineHeight: 1.45 }}>
          <strong>Booste ton annonce</strong> pour apparaître en haut du feed. 5 000 GNF / jour.
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary">Modifier</button>
      <button className="btn btn-primary" style={{ flex: 1 }}>Publier mon annonce</button>
    </div>
  </>
);

const CreatePropertyDetails = () => (
  <>
    <TopBar title="Nouveau bien" back />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={6} current={2} />
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Étape 3 / 6 · Détails du bien</div>
      <div className="disp-l" style={{ fontSize: 22, marginTop: 6, marginBottom: 16 }}>Décris le bien</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Titre</div>
          <input className="input" defaultValue="Appartement 2P meublé, Kaloum" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Prix / mois</div>
            <div className="input-row">
              <input className="input tabnum" defaultValue="1 500 000" />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>GNF</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Surface (m²)</div>
            <input className="input tabnum" defaultValue="68" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Ville</div>
            <button className="input" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 14px", textAlign: "left" }}>
              Conakry <I.chevronD size={14} />
            </button>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Pièces</div>
            <input className="input tabnum" defaultValue="2" />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5, fontWeight: 500 }}>Quartier</div>
          <input className="input" defaultValue="Kaloum" placeholder="Ex: Kaloum, Lambanyi…" />
        </div>

        {/* Distance to road — hero field */}
        <div style={{ padding: 16, borderRadius: 14, background: "var(--accent-soft)", border: "1.5px solid var(--accent)" }}>
          <div style={{ fontSize: 11, color: "#8B5A0A", fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8, display: "flex", gap: 6, alignItems: "center" }}>
            <I.road size={14} /> Distance au goudron · CHAMP CLÉ
          </div>
          <div className="input-row">
            <input className="input tabnum" defaultValue="250" style={{ background: "white" }} />
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#8B5A0A", fontWeight: 700 }}>mètres</span>
          </div>
          <div style={{ fontSize: 11, color: "#8B5A0A", marginTop: 6 }}>Information clé pour les acheteurs — sois précis.</div>
        </div>

        <div style={{ padding: 14, borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Meublé</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Cuisine équipée, lit, salon</div>
          </div>
          <div className="switch on" />
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary">Retour</button>
      <button className="btn btn-primary" style={{ flex: 1 }}>Continuer</button>
    </div>
  </>
);

const CreatePropertyLocation = () => (
  <>
    <TopBar title="Localisation GPS" back />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={6} current={4} />
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Étape 5 / 6 · Localisation</div>
      <div className="disp-l" style={{ fontSize: 22, marginTop: 6, marginBottom: 16 }}>Place l'épingle sur ta carte</div>

      <div style={{ aspectRatio: "1", borderRadius: 16, background: "linear-gradient(135deg, #DCE9DE 0%, #C4D9C8 60%, #B8D0BD 100%)", position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          {/* Roads */}
          <line x1="0" y1="150" x2="300" y2="170" stroke="rgba(255,255,255,0.9)" strokeWidth="14" />
          <line x1="100" y1="0" x2="120" y2="300" stroke="rgba(255,255,255,0.7)" strokeWidth="10" />
          <line x1="220" y1="0" x2="200" y2="300" stroke="rgba(255,255,255,0.5)" strokeWidth="6" />
          {/* Buildings */}
          {[[60, 80, 28], [150, 90, 22], [240, 80, 32], [180, 200, 28], [70, 230, 24]].map(([x, y, s], i) => (
            <rect key={i} x={x} y={y} width={s} height={s} fill="rgba(14,110,85,0.18)" rx="3" />
          ))}
        </svg>
        {/* Pin in center */}
        <div style={{ position: "absolute", top: "47%", left: "50%", transform: "translate(-50%, -100%)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50% 50% 50% 0", background: "var(--primary)", transform: "rotate(-45deg)", border: "4px solid white" }} />
        </div>
        {/* GPS coords */}
        <div style={{ position: "absolute", top: 12, left: 12, padding: "5px 10px", background: "rgba(255,255,255,0.92)", borderRadius: 8, fontSize: 11, fontWeight: 600 }} className="tabnum">
          9.5092° N · 13.7122° W
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <button className="btn btn-secondary" style={{ flex: 1 }}><I.pin size={14} /> Ma position</button>
        <button className="btn btn-secondary" style={{ flex: 1 }}><I.edit size={14} /> Saisir manuellement</button>
      </div>

      <div style={{ marginTop: 14, padding: 12, background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.info size={16} color="var(--text-muted)" />
        <div style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.45 }}>
          Si tu n'as pas de GPS, choisis un quartier proche et précise la rue.
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary">Retour</button>
      <button className="btn btn-primary" style={{ flex: 1 }}>Continuer</button>
    </div>
  </>
);

// ========== Ma Boutique (seller dashboard) ==========

const SellerDashboard = () => (
  <>
    <div style={{ padding: "10px 16px 14px", display: "flex", alignItems: "center", gap: 8 }}>
      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 5px", borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)" }}>
        <div className="avatar avatar-sm" style={{ background: `url(${photos.woman2}) center/cover` }} />
        <span style={{ fontSize: 13, fontWeight: 600 }}>Maison Aïssatou</span>
        <I.chevronD size={14} color="var(--text-muted)" />
      </button>
      <div style={{ flex: 1 }} />
      <button style={{ width: 38, height: 38, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center" }}><I.plus size={18} color="var(--primary)" /></button>
    </div>

    {/* KPI strip */}
    <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      <div className="card" style={{ padding: 12 }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>Revenus 30j</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginTop: 4 }} className="tabnum">2.4M GNF</div>
        <div style={{ fontSize: 10, color: "var(--success)", fontWeight: 600, display: "flex", gap: 3, alignItems: "center" }}><I.trend size={11} /> +18%</div>
      </div>
      <div className="card" style={{ padding: 12 }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>Annonces actives</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginTop: 4 }} className="tabnum">42</div>
        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>2 boostées</div>
      </div>
      <div className="card" style={{ padding: 12 }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>En attente</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginTop: 4 }} className="tabnum">3</div>
        <div style={{ fontSize: 10, color: "var(--accent)", fontWeight: 600 }}>Action requise</div>
      </div>
      <div className="card" style={{ padding: 12 }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>Note moyenne</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginTop: 4, display: "flex", gap: 4, alignItems: "center" }} className="tabnum">4.9 <I.star size={14} color="var(--accent)" /></div>
        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>124 avis</div>
      </div>
    </div>

    {/* Mini chart */}
    <div style={{ padding: "16px 16px 0" }}>
      <div className="card" style={{ padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Vues — 30 derniers jours</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }} className="tabnum">4 280</div>
          </div>
          <span style={{ fontSize: 11, color: "var(--success)", fontWeight: 600, display: "flex", gap: 3, alignItems: "center" }}><I.trend size={11} /> +24%</span>
        </div>
        <div style={{ display: "flex", gap: 3, height: 42, alignItems: "flex-end" }}>
          {[40, 55, 35, 70, 60, 80, 45, 90, 75, 60, 95, 70, 85, 100, 80, 75, 90, 65, 50, 85, 95, 70, 80, 100, 90, 75, 65, 90, 85, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i > 22 ? "var(--primary)" : "var(--primary-soft)", borderRadius: 2 }} />
          ))}
        </div>
      </div>
    </div>

    {/* Mes annonces */}
    <div style={{ padding: "20px 16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div className="title-m" style={{ fontSize: 14 }}>Mes annonces</div>
        <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Tout voir</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { photo: photos.perfume, title: "Eau de parfum édition limitée", price: 420000, views: 280, favs: 42, status: "Boostée", color: "var(--accent)" },
          { photo: photos.fashion, title: "Robe wax taille M", price: 185000, views: 124, favs: 18, status: "Active", color: "var(--success)" },
          { photo: photos.bag, title: "Sac cuir véritable", price: 340000, views: 96, favs: 8, status: "Active", color: "var(--success)" },
        ].map((it, i) => (
          <div key={i} className="card" style={{ padding: 10, display: "flex", gap: 10 }}>
            <div style={{ width: 64, height: 64, borderRadius: 10, background: `url(${it.photo}) center/cover`, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{it.title}</div>
              <div className="tabnum" style={{ fontSize: 13, fontFamily: "var(--font-display)", fontWeight: 600, marginTop: 2 }}>{fmtGNF(it.price)}</div>
              <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 10, color: "var(--text-muted)" }}>
                <span><I.eye size={11} style={{ display: "inline", verticalAlign: "-1px" }} /> {it.views}</span>
                <span><I.heart size={11} style={{ display: "inline", verticalAlign: "-1px" }} /> {it.favs}</span>
                <span style={{ color: it.color, fontWeight: 600 }}>· {it.status}</span>
              </div>
            </div>
            <button style={{ width: 28, height: 28, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--text-muted)" }}><I.moreV size={16} /></button>
          </div>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  </>
);

Object.assign(window, { CreateProductSellerType, CreateProductCategory, CreateProductDetails, CreateProductPhotos, CreateProductPreview, CreatePropertyDetails, CreatePropertyLocation, SellerDashboard });
