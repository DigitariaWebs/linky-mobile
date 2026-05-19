// ========== Accueil + Marché + Découvrir ==========

const HomeScreen = () => (
  <>
    {/* Greeting bar */}
    <div style={{ padding: "10px 16px 14px", display: "flex", alignItems: "center", gap: 12 }}>
      <div className="avatar" style={{ background: `url(${photos.woman1}) center/cover` }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Salut 👋</div>
        <div className="title-m" style={{ fontSize: 15 }}>Mariama Diallo</div>
      </div>
      <button style={{ width: 38, height: 38, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center", position: "relative" }}>
        <I.bell size={18} />
        <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 999, background: "var(--danger)", border: "2px solid var(--bg-elev)" }} />
      </button>
      <button style={{ width: 38, height: 38, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center", position: "relative" }}>
        <I.cart size={18} />
        <span style={{ position: "absolute", top: -3, right: -3, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 999, background: "var(--primary)", color: "white", fontSize: 9, fontWeight: 700, display: "grid", placeItems: "center" }}>3</span>
      </button>
    </div>

    <SearchBar />

    {/* Wallet glance */}
    <div style={{ padding: "14px 16px 0" }}>
      <div className="wallet-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>Wallet Linky</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24, marginTop: 4 }} className="tabnum">240 500 GNF</div>
            <div style={{ fontSize: 11, opacity: 0.8 }} className="tabnum">≈ 22 €</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center" }}>
            <I.wallet size={18} color="white" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button style={{ flex: 1, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.18)", color: "white", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <I.plus size={14} /> Recharger
          </button>
          <button style={{ flex: 1, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.18)", color: "white", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <I.download size={14} /> Retirer
          </button>
        </div>
      </div>
    </div>

    {/* Banner carousel */}
    <div style={{ padding: "20px 16px 0" }}>
      <div style={{ borderRadius: 16, overflow: "hidden", background: `linear-gradient(105deg, var(--primary-deep) 0%, var(--primary) 60%, rgba(232, 165, 61, 0.4) 100%)`, position: "relative", aspectRatio: "16/8", color: "white", padding: 18 }}>
        <div style={{ position: "absolute", right: -20, bottom: -20, width: 140, height: 140, background: `url(${photos.iphone}) center/cover`, borderRadius: "50%", border: "8px solid rgba(255,255,255,0.1)" }} />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", opacity: 0.85 }}>Marché Black Friday</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1.15, marginTop: 4, maxWidth: "60%" }}>Jusqu'à -30% sur l'électronique</div>
        <div style={{ marginTop: 8, fontSize: 11, opacity: 0.8 }}>Du 25 au 30 novembre</div>
      </div>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 10 }}>
        <div style={{ width: 18, height: 4, background: "var(--primary)", borderRadius: 4 }} />
        <div style={{ width: 4, height: 4, background: "var(--border-strong)", borderRadius: 4 }} />
        <div style={{ width: 4, height: 4, background: "var(--border-strong)", borderRadius: 4 }} />
      </div>
    </div>

    {/* Categories */}
    <div style={{ marginTop: 20 }}>
      <div style={{ padding: "0 16px", display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div className="title-m" style={{ fontSize: 14 }}>Catégories</div>
        <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Tout voir</button>
      </div>
      <div style={{ display: "flex", gap: 12, padding: "0 16px", overflowX: "auto" }} className="no-scrollbar">
        <CategoryTile icon={I.shirt} label="Mode" tint="primary" />
        <CategoryTile icon={I.phone} label="Électronique" tint="accent" />
        <CategoryTile icon={I.sofa} label="Maison" tint="cream" />
        <CategoryTile icon={I.car} label="Auto" tint="info" />
        <CategoryTile icon={I.drop} label="Beauté" tint="primary" />
        <CategoryTile icon={I.building} label="Location" tint="accent" />
        <CategoryTile icon={I.building} label="Vente" tint="info" />
        <CategoryTile icon={I.area} label="Terrains" tint="cream" />
      </div>
    </div>

    {/* Featured shops */}
    <div style={{ marginTop: 22 }}>
      <div style={{ padding: "0 16px", display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div className="title-m" style={{ fontSize: 14 }}>Boutiques mises en avant</div>
        <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Tout voir</button>
      </div>
      <div style={{ display: "flex", gap: 10, padding: "0 16px", overflowX: "auto" }} className="no-scrollbar">
        <ShopMini photo={photos.woman2} name="Maison Aïssatou" products={42} rating={4.9} verified />
        <ShopMini photo={photos.man1} name="Conakry Tech" products={128} rating={4.8} verified />
        <ShopMini photo={photos.woman3} name="Bijoux & Soie" products={67} rating={4.7} verified />
      </div>
    </div>

    {/* Popular products */}
    <div style={{ marginTop: 24, padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div className="title-m" style={{ fontSize: 14 }}>Produits populaires</div>
        <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Tout voir</button>
      </div>
      <div className="grid-2" style={{ gap: 14 }}>
        <ProductCard photo={photos.perfume} title="Eau de parfum édition limitée" price={420000} seller="Maison Aïssatou" verified boost />
        <ProductCard photo={photos.iphone} title="iPhone 12 Pro 256Go, comme neuf" price={4800000} seller="Conakry Tech" verified />
        <ProductCard photo={photos.fashion} title="Robe wax élégante taille M" price={185000} seller="Mode Conakry" verified />
        <ProductCard photo={photos.sneakers} title="Sneakers Nike Air taille 42" price={620000} seller="Ibrahima" />
      </div>
    </div>

    {/* Découvrir teaser */}
    <div style={{ padding: "24px 16px 0" }}>
      <div style={{ background: "var(--surface-dark, #0E1311)", color: "white", borderRadius: 18, padding: 18, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 80, height: 110, position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: `url(${photos.perfume2}) center/cover`, transform: "rotate(-8deg) translateX(-6px)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: `url(${photos.apartment2}) center/cover`, transform: "rotate(4deg) translateX(8px) translateY(4px)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: `url(${photos.motorcycle}) center/cover`, transform: "rotate(0deg) translateX(0) translateY(0)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--accent)" }}>Nouveau</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.2, marginTop: 2 }}>Découvre en swipant</div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>Articles et logements, à la file.</div>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: "white", color: "var(--text)", display: "grid", placeItems: "center" }}><I.chevronR size={16} /></button>
      </div>
    </div>

    {/* Real estate near */}
    <div style={{ marginTop: 24 }}>
      <div style={{ padding: "0 16px", display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div className="title-m" style={{ fontSize: 14 }}>Immobilier près de toi</div>
        <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600 }}>Tout voir</button>
      </div>
      <div style={{ display: "flex", gap: 12, padding: "0 16px", overflowX: "auto" }} className="no-scrollbar">
        <div style={{ width: 230, flexShrink: 0 }}>
          <PropertyCard photo={photos.apartment1} title="Appartement 2P, Kaloum" price={1500000} perMonth verified location="Kaloum" distanceToRoad={250} beds="2" area={68} />
        </div>
        <div style={{ width: 230, flexShrink: 0 }}>
          <PropertyCard photo={photos.modernHouse} title="Villa moderne, Lambanyi" price={4200000} perMonth verified location="Lambanyi" distanceToRoad={120} beds="4" area={180} />
        </div>
      </div>
    </div>

    <div style={{ height: 20 }} />
  </>
);

// ========== Marché ==========

const MarcheArticles = () => (
  <>
    <div style={{ padding: "10px 16px 8px" }}>
      <div className="title-l">Marché</div>
    </div>
    <div style={{ padding: "0 16px 12px" }}>
      <div style={{ display: "inline-flex", background: "var(--bg-sunken)", borderRadius: 999, padding: 4, gap: 2, width: "100%" }}>
        <button className="btn btn-sm" style={{ flex: 1, background: "var(--bg-elev)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", color: "var(--text)" }}>Articles</button>
        <button className="btn btn-sm" style={{ flex: 1, color: "var(--text-muted)" }}>Immobilier</button>
      </div>
    </div>
    <SearchBar compact />
    <div style={{ padding: "12px 16px 0", display: "flex", gap: 8, overflowX: "auto" }} className="no-scrollbar">
      <button className="chip" style={{ display: "flex", gap: 5 }}><I.filter size={12} /> Filtres</button>
      <button className="chip active">Tout</button>
      <button className="chip">Mode</button>
      <button className="chip">Électronique</button>
      <button className="chip">Maison</button>
      <button className="chip">Beauté</button>
    </div>
    <div style={{ padding: "14px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)" }}><strong className="tabnum" style={{ color: "var(--text)" }}>2 480</strong> résultats</div>
      <button style={{ fontSize: 11, color: "var(--text)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
        <I.sort size={12} /> Pertinence
      </button>
    </div>
    <div style={{ padding: "12px 16px 16px" }} className="grid-2">
      <ProductCard photo={photos.perfume} title="Eau de parfum édition limitée" price={420000} seller="Maison Aïssatou" verified boost condition="Neuf" />
      <ProductCard photo={photos.fashion} title="Robe wax élégante taille M" price={185000} seller="Mode Conakry" verified condition="Neuf" />
      <ProductCard photo={photos.iphone} title="iPhone 12 Pro 256Go" price={4800000} seller="Conakry Tech" verified condition="Occasion" />
      <ProductCard photo={photos.sneakers} title="Sneakers Nike Air taille 42" price={620000} seller="Ibrahima" condition="Occasion" />
      <ProductCard photo={photos.bag} title="Sac à main cuir véritable" price={340000} seller="Bijoux & Soie" verified />
      <ProductCard photo={photos.tv} title="Smart TV 55'' 4K, garantie" price={6200000} seller="Conakry Tech" verified boost />
      <ProductCard photo={photos.watch} title="Montre classique homme" price={920000} seller="Ibrahima" sold />
      <ProductCard photo={photos.kitchen} title="Robot pâtissier neuf scellé" price={1480000} seller="Maison & Cuisine" verified />
    </div>
  </>
);

const MarcheImmobilier = () => (
  <>
    <div style={{ padding: "10px 16px 8px" }}>
      <div className="title-l">Marché</div>
    </div>
    <div style={{ padding: "0 16px 12px" }}>
      <div style={{ display: "inline-flex", background: "var(--bg-sunken)", borderRadius: 999, padding: 4, gap: 2, width: "100%" }}>
        <button className="btn btn-sm" style={{ flex: 1, color: "var(--text-muted)" }}>Articles</button>
        <button className="btn btn-sm" style={{ flex: 1, background: "var(--bg-elev)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", color: "var(--text)" }}>Immobilier</button>
      </div>
    </div>
    <SearchBar compact placeholder="Quartier, type, surface…" />
    <div style={{ padding: "12px 16px 0", display: "flex", gap: 8, overflowX: "auto" }} className="no-scrollbar">
      <button className="chip" style={{ display: "flex", gap: 5 }}><I.filter size={12} /> Filtres</button>
      <button className="chip active">Location</button>
      <button className="chip">Vente</button>
      <button className="chip">Terrains</button>
      <button className="chip">Meublé</button>
    </div>
    <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
      <PropertyCard photo={photos.apartment1} title="Appartement 2 pièces, Kaloum" price={1500000} perMonth verified location="Kaloum, Conakry" distanceToRoad={250} beds="2" area={68} />
      <PropertyCard photo={photos.modernHouse} title="Villa moderne, Lambanyi" price={4200000} perMonth verified badge="Nouveau" location="Lambanyi" distanceToRoad={120} beds="4" area={180} />
      <PropertyCard photo={photos.villa} title="Maison familiale, Dixinn" price={285000000} verified location="Dixinn, Conakry" distanceToRoad={80} beds="5" area={240} />
      <PropertyCard photo={photos.apartment2} title="Studio meublé bord de mer" price={2800000} perMonth verified badge="Réservé" location="Kipé" distanceToRoad={300} beds="1" area={42} />
    </div>
  </>
);

const MarcheFilters = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--card)" }}>
    {/* Bottom sheet UI as full screen */}
    <div style={{ padding: "16px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <button style={{ fontSize: 13, color: "var(--text-muted)" }}>Annuler</button>
      <div className="title-m" style={{ fontSize: 15 }}>Filtres</div>
      <button style={{ fontSize: 13, color: "var(--primary)", fontWeight: 600 }}>Réinitialiser</button>
    </div>
    <div style={{ overflowY: "auto", padding: 16 }} className="no-scrollbar">
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Type</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        <button className="chip active" style={{ flex: 1, justifyContent: "center" }}>Location</button>
        <button className="chip" style={{ flex: 1, justifyContent: "center" }}>Vente</button>
        <button className="chip" style={{ flex: 1, justifyContent: "center" }}>Terrain</button>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Prix par mois</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }} className="tabnum">
        <span>500 000 GNF</span>
        <span>5 000 000 GNF</span>
      </div>
      <div style={{ height: 6, background: "var(--border)", borderRadius: 999, marginTop: 8, marginBottom: 4, position: "relative" }}>
        <div style={{ position: "absolute", left: "10%", right: "30%", top: 0, bottom: 0, background: "var(--primary)", borderRadius: 999 }} />
        <div style={{ position: "absolute", left: "10%", top: -5, width: 16, height: 16, borderRadius: 999, background: "var(--card)", border: "3px solid var(--primary)" }} />
        <div style={{ position: "absolute", left: "67%", top: -5, width: 16, height: 16, borderRadius: 999, background: "var(--card)", border: "3px solid var(--primary)" }} />
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginTop: 22, marginBottom: 10 }}>Ville</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {["Conakry", "Kindia", "Kankan", "Labé", "Boké"].map((c) => (
          <button key={c} className={"chip" + (c === "Conakry" ? " active" : "")}>{c}</button>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Pièces</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {["Studio", "1", "2", "3", "4+"].map((c, i) => (
          <button key={c} className={"chip" + (i === 2 ? " active" : "")} style={{ flex: 1, justifyContent: "center" }}>{c}</button>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Distance max au goudron</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }} className="tabnum">
        <span>0 m</span>
        <span style={{ color: "var(--accent)" }}>500 m</span>
        <span>2 km</span>
      </div>
      <div style={{ height: 6, background: "var(--border)", borderRadius: 999, marginTop: 8, marginBottom: 4, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, right: "70%", top: 0, bottom: 0, background: "var(--accent)", borderRadius: 999 }} />
        <div style={{ position: "absolute", left: "30%", top: -5, width: 16, height: 16, borderRadius: 999, background: "var(--card)", border: "3px solid var(--accent)" }} />
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginTop: 22, marginBottom: 10 }}>Meublé</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>Uniquement meublé</div>
        <div className="switch on" />
      </div>
    </div>
    <div style={{ padding: 16, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
      <button className="btn btn-secondary" style={{ flex: 1 }}>Effacer</button>
      <button className="btn btn-primary" style={{ flex: 2 }}>Voir 48 biens</button>
    </div>
  </div>
);

// ========== Découvrir ==========

const DiscoverCard = ({ media, type = "product", title, price, perMonth, seller, sellerPhoto, location, distanceToRoad, liked = false, likes = "1.2k", showVideoIndicator = false, showCarouselDots = false, dotIdx = 0 }) => (
  <div className="discover" style={{ width: "100%", height: "100%" }}>
    <div style={{ position: "absolute", inset: 0, background: `url(${media}) center/cover` }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 50%, rgba(0,0,0,0.85) 100%)" }} />

    <div className="discover-overlay-top">
      <button className="chip" style={{ background: "rgba(255,255,255,0.95)", color: "var(--text)", border: 0, height: 26 }}>Tout</button>
      <button className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: 0, height: 26, backdropFilter: "blur(8px)" }}>Articles</button>
      <button className="chip" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: 0, height: 26, backdropFilter: "blur(8px)" }}>Immo</button>
      <div style={{ flex: 1 }} />
      <button style={{ width: 30, height: 30, borderRadius: 999, background: "rgba(255,255,255,0.15)", color: "white", display: "grid", placeItems: "center", backdropFilter: "blur(8px)" }}>
        <I.cloudOff size={14} />
      </button>
    </div>

    {showVideoIndicator && (
      <div style={{ position: "absolute", top: 96, left: 16, display: "flex", gap: 6, alignItems: "center", color: "white", background: "rgba(0,0,0,0.5)", padding: "5px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, zIndex: 5 }}>
        <I.video size={13} /> Visite vidéo
      </div>
    )}
    {showCarouselDots && (
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", gap: 4, justifyContent: "center", zIndex: 5 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: i === dotIdx ? 22 : 5, height: 5, borderRadius: 4, background: i === dotIdx ? "white" : "rgba(255,255,255,0.45)" }} />
        ))}
      </div>
    )}

    <div className="discover-rail">
      <div className="discover-rail-item">
        <div className="discover-rail-circle" style={{ background: liked ? "var(--danger)" : "rgba(255,255,255,0.18)" }}>
          {liked ? <I.heartFill size={20} color="white" /> : <I.heart size={20} color="white" />}
        </div>
        <span>{likes}</span>
      </div>
      <div className="discover-rail-item">
        <div className="discover-rail-circle"><I.msg size={18} color="white" /></div>
        <span>Message</span>
      </div>
      <div className="discover-rail-item">
        <div className="discover-rail-circle"><I.bookmark size={18} color="white" /></div>
        <span>248</span>
      </div>
      <div className="discover-rail-item">
        <div className="discover-rail-circle"><I.share size={18} color="white" /></div>
        <span>Partager</span>
      </div>
      <div className="discover-rail-item">
        <div className="discover-rail-circle"><I.info size={18} color="white" /></div>
        <span>Détails</span>
      </div>
    </div>

    <div className="discover-overlay-bot">
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
        <div className="avatar" style={{ width: 32, height: 32, background: `url(${sellerPhoto}) center/cover`, border: "2px solid white" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white", display: "flex", alignItems: "center", gap: 5 }}>
            {seller}
            <span className="verified-dot" style={{ width: 13, height: 13 }}><I.check size={8} stroke={3} color="white" /></span>
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>Vendeur vérifié · 4.9 ★</div>
        </div>
        <button style={{ height: 30, padding: "0 14px", borderRadius: 999, background: "white", color: "var(--text)", fontSize: 11, fontWeight: 700 }}>Suivre</button>
      </div>
      <div style={{ color: "white", fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, lineHeight: 1.25, marginBottom: 6 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <div className="tabnum" style={{ color: "white", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 }}>
          {fmtGNF(price)}{perMonth && <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.8 }}> /mois</span>}
        </div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>{fmtEUR(gnfToEur(price))}</div>
      </div>
      {location && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <span style={{ display: "flex", gap: 4, alignItems: "center", color: "rgba(255,255,255,0.85)", fontSize: 11 }}>
            <I.pin size={12} /> {location}
          </span>
          {distanceToRoad && (
            <span style={{ display: "flex", gap: 4, alignItems: "center", padding: "3px 8px", borderRadius: 999, background: "var(--accent)", color: "#2A1A05", fontSize: 10, fontWeight: 700 }}>
              <I.road size={11} /> À {distanceToRoad}m du goudron
            </span>
          )}
        </div>
      )}
      <button style={{ width: "100%", height: 44, borderRadius: 999, background: "rgba(255,255,255,0.95)", color: "var(--text)", fontWeight: 600, fontSize: 14 }}>Voir le détail</button>
    </div>
  </div>
);

const DiscoverEndState = () => (
  <div className="discover" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
    {/* Decorative saffron orbits */}
    <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: 999, border: "1px solid rgba(232,165,61,0.2)" }} />
    <div style={{ position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)", width: 160, height: 160, borderRadius: 999, border: "1px solid rgba(232,165,61,0.3)" }} />

    <div style={{ width: 100, height: 100, borderRadius: 999, background: "radial-gradient(circle, var(--accent) 0%, rgba(232,165,61,0.3) 70%, transparent 100%)", display: "grid", placeItems: "center", marginBottom: 28, zIndex: 1 }}>
      <I.sparkle size={44} color="#2A1A05" />
    </div>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "white", lineHeight: 1.25, maxWidth: 240, zIndex: 1 }}>Tu as tout vu pour aujourd'hui</div>
    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 10, maxWidth: 240, lineHeight: 1.5, zIndex: 1 }}>Reviens demain pour de nouveaux articles et logements à découvrir.</div>
    <button className="btn btn-saffron" style={{ marginTop: 28, zIndex: 1 }}><I.refresh size={14} /> Actualiser</button>
  </div>
);

Object.assign(window, { HomeScreen, MarcheArticles, MarcheImmobilier, MarcheFilters, DiscoverCard, DiscoverEndState });
