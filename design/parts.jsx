// ========== Shared building blocks ==========

const fmtGNF = (n) => new Intl.NumberFormat("fr-FR").format(n) + " GNF";
const gnfToEur = (n) => Math.round(n / 11000); // approx
const fmtEUR = (n) => "≈ " + new Intl.NumberFormat("fr-FR").format(n) + " €";
const DualPrice = ({ amount, size = "m", className = "" }) => {
  const small = size === "s";
  return (
    <div className={className}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: small ? 14 : 18, lineHeight: 1.1 }} className="tabnum">{fmtGNF(amount)}</div>
      <div style={{ fontSize: small ? 10 : 11, color: "var(--text-muted)" }} className="tabnum">{fmtEUR(gnfToEur(amount))}</div>
    </div>
  );
};

// ========== Device frame ==========
const Device = ({ children, statusBar = true, tabBar = null, dark = false, scrollable = true, label, transparentStatusBar = false }) => (
  <div className="device">
    <div className="device-screen" style={dark ? { background: "#0E1311", color: "white" } : undefined} data-screen-label={label}>
      <div className="device-notch" />
      {statusBar && <StatusBar dark={dark} transparent={transparentStatusBar} />}
      <div className="screen-body">
        {scrollable ? <div className="screen-scroll">{children}</div> : children}
      </div>
      {tabBar}
    </div>
  </div>
);

const StatusBar = ({ dark, transparent }) => (
  <div className="status-bar" style={{
    color: transparent ? "white" : (dark ? "white" : undefined),
    position: transparent ? "absolute" : "relative",
    top: transparent ? 0 : undefined,
    left: transparent ? 0 : undefined,
    right: transparent ? 0 : undefined,
    zIndex: transparent ? 30 : undefined,
    background: "transparent",
    textShadow: transparent ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
  }}>
    <span className="tabnum">9:41</span>
    <div className="status-bar-right" style={transparent ? { filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" } : undefined}>
      <I.reception size={14} />
      <I.wifi size={14} />
      <I.battery size={18} />
    </div>
  </div>
);

// 5-tab bar with center FAB-style Découvrir
const TabBar = ({ active = "home", onChange = () => {} }) => {
  const tabs = [
    { id: "home", label: "Accueil", icon: I.home },
    { id: "marche", label: "Marché", icon: I.shop },
    { id: "decouvrir", label: "Découvrir", icon: I.sparkle, fab: true },
    { id: "boutique", label: "Boutique", icon: I.store },
    { id: "profil", label: "Profil", icon: I.user },
  ];
  return (
    <div className="tab-bar">
      {tabs.map((t) => {
        const Ic = t.icon;
        const isActive = active === t.id;
        if (t.fab) {
          return (
            <button key={t.id} className="tab-bar-item" onClick={() => onChange(t.id)}>
              <div className="tab-bar-fab"><Ic size={22} color="white" /></div>
              <span style={{ marginTop: 2, color: isActive ? "var(--primary)" : "var(--text-faint)" }}>{t.label}</span>
            </button>
          );
        }
        return (
          <button
            key={t.id}
            className={"tab-bar-item " + (isActive ? "active" : "")}
            onClick={() => onChange(t.id)}
          >
            <Ic size={22} color={isActive ? undefined : "currentColor"} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Frame cell wrapper for the gallery
const FrameCell = ({ title, subtitle, children, wide = false }) => (
  <div className="frame-cell" style={wide ? { gridColumn: "span 2" } : undefined}>
    {children}
    {(title || subtitle) && (
      <div className="frame-label">
        {title && <strong>{title}</strong>}
        {subtitle && <span>{subtitle}</span>}
      </div>
    )}
  </div>
);

// Section header in stage
const SectionBand = ({ title, count }) => (
  <div className="section-band">
    <h2>{title}</h2>
    {count != null && <span>{count} écran{count > 1 ? "s" : ""}</span>}
    <div className="divider" />
  </div>
);

// In-screen header
const TopBar = ({ title, back = false, right = null, sub = null, dark = false }) => (
  <div style={{ padding: "10px 16px 12px", display: "flex", alignItems: "center", gap: 12, color: dark ? "white" : undefined }}>
    {back && (
      <button style={{ width: 36, height: 36, borderRadius: 999, background: dark ? "rgba(255,255,255,0.1)" : "var(--bg-elev)", border: dark ? "none" : "1px solid var(--border)", display: "grid", placeItems: "center" }}>
        <I.arrowLeft size={18} />
      </button>
    )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="title-l" style={{ fontSize: 18, marginBottom: sub ? 2 : 0 }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}>{sub}</div>}
    </div>
    {right}
  </div>
);

const SearchBar = ({ placeholder = "Cherche un produit, un logement…", compact = false }) => (
  <div className="input-row" style={{ marginInline: 16 }}>
    <span className="icon-left"><I.search size={18} /></span>
    <input className="input" style={{ height: compact ? 42 : 44, borderRadius: 999 }} placeholder={placeholder} />
    <button style={{ position: "absolute", right: 6, top: 5, width: 34, height: compact ? 32 : 34, borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
      <I.camera size={16} />
    </button>
  </div>
);

// Hero photo URLs (reliable Unsplash CDN with specific photo IDs)
const photos = {
  // Real estate / Conakry-ish
  apartment1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=70&auto=format",
  apartment2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=70&auto=format",
  villa: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=70&auto=format",
  modernHouse: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=70&auto=format",
  cityView: "https://images.unsplash.com/photo-1572017022-66e08bd87fb6?w=800&q=70&auto=format",
  land: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=70&auto=format",
  livingRoom: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=70&auto=format",
  // People (West African / Guinean-ish)
  woman1: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=70&auto=format",
  woman2: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=400&q=70&auto=format",
  woman3: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=400&q=70&auto=format",
  man1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70&auto=format",
  man2: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=70&auto=format",
  man3: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&q=70&auto=format",
  // Products
  perfume: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=70&auto=format",
  perfume2: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=70&auto=format",
  iphone: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=70&auto=format",
  iphone2: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=70&auto=format",
  motorcycle: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=70&auto=format",
  fashion: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=70&auto=format",
  fashion2: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=70&auto=format",
  bag: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=70&auto=format",
  laptop: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=70&auto=format",
  watch: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=70&auto=format",
  sneakers: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=70&auto=format",
  kitchen: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&q=70&auto=format",
  tv: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=70&auto=format",
  // City/landing
  conakry: "https://images.unsplash.com/photo-1582215068674-cbb22cc0c70b?w=1200&q=70&auto=format",
  marketScene: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=70&auto=format",
  woman4: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=400&q=70&auto=format",
};

// Verified badge component
const VerifiedBadge = ({ size = "sm", label = false }) => (
  <span className="verified" style={{ fontSize: size === "sm" ? 10 : 12 }}>
    <span className="verified-dot" style={{ width: size === "sm" ? 14 : 16, height: size === "sm" ? 14 : 16 }}>
      <I.check size={size === "sm" ? 9 : 10} stroke={2.5} color="white" />
    </span>
    {label && "Vérifié"}
  </span>
);

// Product card (square)
const ProductCard = ({ photo, title, price, seller, verified, boost, sold, condition, fav = false, compact = false }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ position: "relative", aspectRatio: "1", borderRadius: 16, overflow: "hidden", background: `url(${photo}) center/cover, var(--bg-sunken)` }}>
      <button style={{ position: "absolute", top: 8, right: 8, width: 30, height: 30, borderRadius: 999, background: "rgba(255,255,255,0.92)", display: "grid", placeItems: "center", color: fav ? "var(--danger)" : "var(--text)" }}>
        {fav ? <I.heartFill size={15} /> : <I.heart size={15} />}
      </button>
      {boost && <div style={{ position: "absolute", top: 8, left: 8, background: "var(--accent)", color: "#2A1A05", padding: "3px 8px", borderRadius: 999, fontSize: 9, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", display: "flex", gap: 3, alignItems: "center" }}>
        <I.star size={9} /> Boost
      </div>}
      {condition && <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(0,0,0,0.7)", color: "white", padding: "3px 8px", borderRadius: 999, fontSize: 9, fontWeight: 600 }}>{condition}</div>}
      {sold && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "grid", placeItems: "center", color: "white", fontWeight: 700, fontFamily: "var(--font-display)" }}>VENDU</div>}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.25, color: sold ? "var(--text-muted)" : "var(--text)", textDecoration: sold ? "line-through" : "none", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</div>
      <div className="tabnum" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text)" }}>{fmtGNF(price)}</div>
      {!compact && (
        <div style={{ fontSize: 10, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{seller}</span>
          {verified && <I.check size={11} color="var(--accent)" stroke={2.5} />}
        </div>
      )}
    </div>
  </div>
);

// Property card (16:9)
const PropertyCard = ({ photo, title, price, perMonth = false, location, distanceToRoad, verified, badge, beds, area: areaM2 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, overflow: "hidden" }}>
    <div style={{ position: "relative", aspectRatio: "16/9", background: `url(${photo}) center/cover, var(--bg-sunken)` }}>
      {verified && (
        <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.95)", padding: "4px 10px", borderRadius: 999, display: "flex", gap: 4, alignItems: "center", fontSize: 10, fontWeight: 600, color: "var(--accent)" }}>
          <span className="verified-dot" style={{ width: 13, height: 13 }}><I.check size={8} stroke={3} color="white" /></span>
          Vérifié
        </div>
      )}
      {badge && (
        <div style={{ position: "absolute", top: 10, right: 10, background: "var(--info)", color: "white", padding: "3px 9px", borderRadius: 999, fontSize: 10, fontWeight: 600 }}>{badge}</div>
      )}
      <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.78)", color: "white", padding: "6px 10px", borderRadius: 10, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }} className="tabnum">
        {fmtGNF(price)}{perMonth && <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.85 }}> /mois</span>}
      </div>
    </div>
    <div style={{ padding: "2px 14px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div className="title-m" style={{ fontSize: 15 }}>{title}</div>
      <div style={{ display: "flex", gap: 10, fontSize: 11, color: "var(--text-muted)", alignItems: "center" }}>
        <span style={{ display: "flex", gap: 3, alignItems: "center" }}><I.pin size={12} /> {location}</span>
        {beds && <span style={{ display: "flex", gap: 3, alignItems: "center" }}><I.bed size={12} /> {beds}</span>}
        {areaM2 && <span style={{ display: "flex", gap: 3, alignItems: "center" }}><I.area size={12} /> {areaM2}m²</span>}
      </div>
      {distanceToRoad && (
        <div style={{ display: "inline-flex", alignSelf: "flex-start", gap: 4, alignItems: "center", padding: "4px 10px", borderRadius: 999, background: "var(--accent-soft)", color: "#8B5A0A", fontSize: 11, fontWeight: 600 }}>
          <I.road size={12} /> À {distanceToRoad}m du goudron
        </div>
      )}
    </div>
  </div>
);

// Shop / boutique mini card
const ShopMini = ({ photo, name, products, rating, verified }) => (
  <div style={{ width: 130, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 12, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16 }}>
    <div className="avatar avatar-lg" style={{ background: `url(${photo}) center/cover, var(--bg-sunken)` }} />
    <div style={{ fontSize: 12, fontWeight: 600, textAlign: "center", display: "flex", alignItems: "center", gap: 4 }}>
      {name}
      {verified && <I.check size={11} color="var(--accent)" stroke={2.5} />}
    </div>
    <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{products} articles · ★ {rating}</div>
  </div>
);

// Category tile
const CategoryTile = ({ icon: Ic, label, tint = "primary", w = 88 }) => {
  const colors = {
    primary: { bg: "var(--primary-soft)", fg: "var(--primary)" },
    accent: { bg: "var(--accent-soft)", fg: "#8B5A0A" },
    cream: { bg: "var(--bg-sunken)", fg: "var(--text)" },
    info: { bg: "rgba(58, 124, 168, 0.12)", fg: "var(--info)" },
  };
  const c = colors[tint];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: w, flexShrink: 0 }}>
      <div style={{ width: w - 18, height: w - 18, background: c.bg, color: c.fg, borderRadius: 18, display: "grid", placeItems: "center" }}>
        <Ic size={26} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{label}</div>
    </div>
  );
};

// Settings row
const SettingsRow = ({ icon: Ic, label, value, right = "chevron", danger = false, sub = null }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
    {Ic && (
      <div style={{ width: 36, height: 36, borderRadius: 10, background: danger ? "rgba(209,79,60,0.1)" : "var(--bg-sunken)", color: danger ? "var(--danger)" : "var(--text)", display: "grid", placeItems: "center" }}>
        <Ic size={18} />
      </div>
    )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: danger ? "var(--danger)" : "var(--text)" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{sub}</div>}
    </div>
    {value && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{value}</div>}
    {right === "chevron" && <I.chevronR size={16} color="var(--text-muted)" />}
    {right === "switch-on" && <div className="switch on" />}
    {right === "switch-off" && <div className="switch" />}
    {React.isValidElement(right) && right}
  </div>
);

// Color swatch for tokens page
const Swatch = ({ color, name, hex, lightText = false }) => (
  <div className="swatch-card">
    <div className={"swatch" + (lightText ? "" : " swatch-light")} style={{ background: color, color: lightText ? "white" : undefined }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
        <div className="tabnum" style={{ fontSize: 10, opacity: 0.8, fontWeight: 500 }}>{hex}</div>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  fmtGNF, fmtEUR, gnfToEur, DualPrice,
  Device, TabBar, StatusBar, FrameCell, SectionBand, TopBar, SearchBar,
  ProductCard, PropertyCard, ShopMini, CategoryTile, SettingsRow, VerifiedBadge,
  Swatch, photos,
});
