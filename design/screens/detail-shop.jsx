// ========== Product / Property Detail / Shop ==========

const ProductDetail = () => (
  <>
    {/* Hero carousel */}
    <div style={{ position: "relative", aspectRatio: "1", background: `url(${photos.perfume}) center/cover` }}>
      <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.arrowLeft size={18} /></button>
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 8 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.share size={16} /></button>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", color: "var(--danger)", display: "grid", placeItems: "center" }}><I.heartFill size={16} /></button>
      </div>
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", gap: 4, justifyContent: "center" }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: i === 0 ? 22 : 5, height: 5, borderRadius: 4, background: i === 0 ? "white" : "rgba(255,255,255,0.55)" }} />
        ))}
      </div>
    </div>
    <div style={{ padding: 16 }}>
      <div className="title-l" style={{ fontSize: 18, marginBottom: 2 }}>Eau de parfum édition limitée — 50ml</div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 12 }}>
        <span className="chip chip-soft" style={{ fontSize: 10 }}>Neuf</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· 240 vues cette semaine</span>
      </div>
      <DualPrice amount={420000} />

      {/* Trust strip */}
      <div style={{ marginTop: 16, padding: 12, background: "var(--primary-soft)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.shield size={18} color="var(--primary)" />
        <div style={{ fontSize: 11.5, color: "var(--primary-deep)", lineHeight: 1.45 }}>
          <strong>Paiement sécurisé.</strong> Le vendeur n'est payé qu'après ta confirmation de réception.
        </div>
      </div>

      {/* Seller */}
      <div className="card" style={{ marginTop: 14, padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <div className="avatar" style={{ background: `url(${photos.woman2}) center/cover` }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 14, fontWeight: 600 }}>
            Maison Aïssatou
            <span className="verified-dot"><I.check size={9} stroke={3} color="white" /></span>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>4.9 ★ (124 avis) · répond en ~2h</div>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "var(--bg-sunken)", display: "grid", placeItems: "center" }}><I.chevronR size={16} /></button>
      </div>

      {/* Caracteristiques */}
      <div style={{ marginTop: 18, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Caractéristiques</div>
      <div className="card" style={{ padding: 14 }}>
        {[
          [I.drop, "Volume", "50 ml"],
          [I.check, "État", "Neuf, scellé"],
          [I.pin, "Localisation", "Conakry, Kaloum"],
          [I.truck, "Remise", "Sur place ou livraison"],
        ].map(([Ic, k, v], i, arr) => (
          <div key={k} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <Ic size={15} color="var(--text-muted)" />
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{k}</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginLeft: "auto" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div style={{ marginTop: 18, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Description</div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text)" }}>
        Édition limitée 2026, importée directement de Paris. Notes de tête au bergamote, cœur de jasmin et bois de oud en fond. Flacon scellé jamais ouvert, dans son emballage d'origine.
      </div>
      <button style={{ marginTop: 6, fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>Lire plus</button>

      {/* Avis */}
      <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)" }}>Avis (124)</div>
        <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Tout voir</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
        {[
          { name: "Fatou D.", time: "Il y a 3 jours", stars: 5, text: "Parfum sublime, livraison rapide. Je recommande ce vendeur !", photo: photos.woman3 },
          { name: "Ibrahima S.", time: "La semaine dernière", stars: 5, text: "Acheté pour ma femme, elle adore. Très bon emballage.", photo: photos.man2 },
        ].map((r, i) => (
          <div key={i} className="card" style={{ padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div className="avatar avatar-sm" style={{ background: `url(${r.photo}) center/cover` }} />
              <div style={{ fontSize: 12, fontWeight: 600 }}>{r.name}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: "auto" }}>{r.time}</div>
            </div>
            <div style={{ display: "flex", gap: 1, marginBottom: 4 }}>
              {[...Array(5)].map((_, j) => (
                <I.star key={j} size={11} color={j < r.stars ? "var(--accent)" : "var(--border)"} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.text}</div>
          </div>
        ))}
      </div>

      {/* Related */}
      <div style={{ marginTop: 22, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Aussi consultés</div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", margin: "0 -16px", padding: "0 16px" }} className="no-scrollbar">
        <div style={{ width: 130, flexShrink: 0 }}>
          <ProductCard photo={photos.perfume2} title="Parfum oriental 100ml" price={580000} seller="Maison Aïssatou" verified compact />
        </div>
        <div style={{ width: 130, flexShrink: 0 }}>
          <ProductCard photo={photos.bag} title="Sac cuir naturel" price={340000} seller="Bijoux & Soie" verified compact />
        </div>
        <div style={{ width: 130, flexShrink: 0 }}>
          <ProductCard photo={photos.fashion2} title="Foulard soie premium" price={120000} seller="Mode Conakry" compact />
        </div>
      </div>
      <div style={{ height: 100 }} />
    </div>

    {/* Sticky bottom */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary btn-icon" style={{ flexShrink: 0 }}><I.msg size={18} /></button>
      <button className="btn btn-primary" style={{ flex: 1 }}><I.cart size={16} /> Ajouter au panier</button>
      <button className="btn btn-saffron" style={{ paddingInline: 14 }}><I.bolt size={14} /></button>
    </div>
  </>
);

const PropertyDetail = () => (
  <>
    <div style={{ position: "relative", aspectRatio: "1", background: `url(${photos.apartment1}) center/cover` }}>
      <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.arrowLeft size={18} /></button>
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 8 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.share size={16} /></button>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.heart size={16} /></button>
      </div>
      <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", gap: 5, alignItems: "center", padding: "5px 10px", borderRadius: 999, background: "rgba(0,0,0,0.7)", color: "white", fontSize: 11, fontWeight: 600 }}>
        <I.video size={12} /> Visite vidéo
      </div>
      <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", gap: 4, alignItems: "center", padding: "5px 10px", borderRadius: 999, background: "rgba(0,0,0,0.7)", color: "white", fontSize: 10 }}>
        <I.image size={12} /> 1 / 8
      </div>
    </div>

    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <span className="chip chip-soft" style={{ fontSize: 10 }}>Location</span>
        <span className="chip chip-saffron" style={{ fontSize: 10 }}>Meublé</span>
      </div>
      <div className="title-l" style={{ fontSize: 18, marginBottom: 2 }}>Appartement 2 pièces lumineux, Kaloum</div>
      <DualPrice amount={1500000} />
      <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>par mois · charges incluses</div>

      {/* Meta grid */}
      <div className="grid-3" style={{ marginTop: 14, gap: 8 }}>
        {[
          [I.area, "Surface", "68 m²"],
          [I.bed, "Pièces", "2"],
          [I.sofa, "Meublé", "Oui"],
        ].map(([Ic, k, v]) => (
          <div key={k} style={{ background: "var(--bg-elev)", borderRadius: 12, padding: "10px 12px", border: "1px solid var(--border)", textAlign: "center" }}>
            <Ic size={18} color="var(--primary)" style={{ margin: "0 auto" }} />
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6 }}>{k}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 1 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Location card */}
      <div style={{ marginTop: 14, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Localisation</div>
      <div className="card" style={{ padding: 12 }}>
        <div style={{ aspectRatio: "16/9", borderRadius: 10, background: "linear-gradient(135deg, #DCE9DE 0%, #C4D9C8 100%)", position: "relative", overflow: "hidden", marginBottom: 10 }}>
          {/* Schematic map */}
          <svg width="100%" height="100%" viewBox="0 0 280 160" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
            <path d="M0 100 Q70 80 140 100 T280 110" fill="none" stroke="#0E6E55" strokeWidth="6" opacity="0.4" />
            <path d="M0 110 Q70 90 140 110 T280 120" fill="none" stroke="#0E6E55" strokeWidth="3" opacity="0.6" />
            <line x1="100" y1="0" x2="80" y2="160" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
            <line x1="200" y1="0" x2="220" y2="160" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
          </svg>
          {/* Pin */}
          <div style={{ position: "absolute", top: "40%", left: "55%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50% 50% 50% 0", background: "var(--primary)", transform: "rotate(-45deg)", border: "3px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <I.pin size={16} color="var(--primary)" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Kaloum, Conakry</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Quartier résidentiel, proche commerces</div>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: 10, borderRadius: 12, background: "var(--accent-soft)", display: "flex", gap: 10, alignItems: "center" }}>
          <I.road size={20} color="#8B5A0A" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#8B5A0A" }} className="tabnum">À 250m du goudron</div>
            <div style={{ fontSize: 10, color: "#8B5A0A", opacity: 0.85 }}>Accès facile en taxi ou moto</div>
          </div>
        </div>
      </div>

      {/* Owner */}
      <div style={{ marginTop: 16, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Propriétaire</div>
      <div className="card" style={{ padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <div className="avatar" style={{ background: `url(${photos.man1}) center/cover` }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 14, fontWeight: 600 }}>
            Mamadou Bah · Agence
            <span className="verified-dot"><I.check size={9} stroke={3} color="white" /></span>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>12 biens en gestion · répond en ~1h</div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ marginTop: 14, padding: 12, background: "var(--primary-soft)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.shield size={18} color="var(--primary)" />
        <div style={{ fontSize: 11.5, color: "var(--primary-deep)", lineHeight: 1.45 }}>
          <strong>Visite avant signature.</strong> Tu ne paies aucun acompte tant que tu n'as pas visité le bien et confirmé.
        </div>
      </div>

      <div style={{ height: 100 }} />
    </div>

    {/* Sticky bottom */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary btn-icon"><I.msg size={18} /></button>
      <button className="btn btn-primary" style={{ flex: 1 }}>Réserver une visite</button>
    </div>
  </>
);

const PropertyDetailTerrain = () => (
  <>
    <div style={{ position: "relative", aspectRatio: "1", background: `url(${photos.land}) center/cover` }}>
      <div style={{ position: "absolute", top: 12, left: 12 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.arrowLeft size={18} /></button>
      </div>
    </div>
    <div style={{ padding: 16 }}>
      <span className="chip" style={{ fontSize: 10, background: "var(--bg-sunken)" }}>Terrain</span>
      <div className="title-l" style={{ fontSize: 18, marginTop: 8, marginBottom: 6 }}>Terrain constructible 600m², Manéah</div>
      <DualPrice amount={185000000} />

      <div style={{ marginTop: 14, padding: 12, background: "var(--accent-soft)", borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <I.info size={18} color="#8B5A0A" />
        <div style={{ fontSize: 12, color: "#8B5A0A", lineHeight: 1.5 }}>
          Les transactions de terrains se font <strong>hors application</strong>. Linky ne traite ni le paiement, ni les documents notariés.
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: 14, gap: 8 }}>
        {[
          [I.area, "Surface", "600 m²"],
          [I.check, "Titre", "Foncier"],
          [I.road, "Goudron", "800 m"],
        ].map(([Ic, k, v]) => (
          <div key={k} style={{ background: "var(--bg-elev)", borderRadius: 12, padding: "10px 12px", border: "1px solid var(--border)", textAlign: "center" }}>
            <Ic size={18} color="var(--primary)" style={{ margin: "0 auto" }} />
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6 }}>{k}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 1 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 100 }} />
    </div>

    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-primary btn-block"><I.phone size={16} /> Contacter le propriétaire</button>
    </div>
  </>
);

// ========== Boutique / Shop ==========

const ShopProfile = () => (
  <>
    <div style={{ position: "relative", height: 130, background: `url(${photos.marketScene}) center/cover` }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)" }} />
      <div style={{ position: "absolute", top: 12, left: 12 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.arrowLeft size={18} /></button>
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.share size={16} /></button>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "grid", placeItems: "center" }}><I.moreV size={16} /></button>
      </div>
    </div>
    <div style={{ padding: "0 16px", marginTop: -36 }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
        <div style={{ width: 78, height: 78, borderRadius: 22, background: `url(${photos.woman2}) center/cover`, border: "4px solid var(--bg)" }} />
        <div style={{ flex: 1, paddingBottom: 6 }}>
          <button className="btn btn-primary btn-sm">Suivre</button>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="title-l" style={{ fontSize: 18 }}>Maison Aïssatou</div>
          <span className="verified-dot" style={{ width: 18, height: 18 }}><I.check size={11} stroke={3} color="white" /></span>
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 8, marginTop: 2 }}>
          <span><I.pin size={11} style={{ display: "inline", verticalAlign: "-2px" }} /> Kaloum, Conakry</span>
          <span>· répond en ~2h</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
        {[
          ["1.2k", "Abonnés"],
          ["42", "Articles"],
          ["4.9 ★", "Note"],
        ].map(([v, k]) => (
          <div key={k}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16 }} className="tabnum">{v}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{k}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ marginTop: 14, padding: "0 16px", display: "flex", gap: 18, borderBottom: "1px solid var(--border)" }}>
      <div style={{ paddingBottom: 12, borderBottom: "2px solid var(--primary)", fontSize: 13, fontWeight: 600 }}>Articles</div>
      <div style={{ paddingBottom: 12, fontSize: 13, color: "var(--text-muted)" }}>Avis</div>
      <div style={{ paddingBottom: 12, fontSize: 13, color: "var(--text-muted)" }}>À propos</div>
    </div>

    <div style={{ padding: "14px 16px" }} className="grid-2">
      <ProductCard photo={photos.perfume} title="Eau de parfum édition limitée" price={420000} seller="Maison Aïssatou" verified boost compact />
      <ProductCard photo={photos.perfume2} title="Parfum oriental 100ml" price={580000} seller="Maison Aïssatou" verified compact />
      <ProductCard photo={photos.fashion} title="Robe wax taille M" price={185000} seller="Maison Aïssatou" verified compact />
      <ProductCard photo={photos.bag} title="Sac à main cuir véritable" price={340000} seller="Maison Aïssatou" verified compact />
    </div>
  </>
);

Object.assign(window, { ProductDetail, PropertyDetail, PropertyDetailTerrain, ShopProfile });
