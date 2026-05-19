// ========== Landing Page (public marketing site) ==========

const LandingNav = ({ mobile }) => (
  <header style={{
    padding: mobile ? "12px 16px" : "20px 56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--border)",
    background: "var(--bg)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>L</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>Linky</div>
    </div>
    {!mobile && (
      <nav style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--text-muted)" }}>
        <a>Fonctionnalités</a>
        <a>Comment ça marche</a>
        <a>Diaspora</a>
        <a>FAQ</a>
        <a>Aide</a>
      </nav>
    )}
    {mobile ? (
      <button style={{ padding: "8px 14px", borderRadius: 999, background: "var(--primary)", color: "white", fontSize: 13, fontWeight: 600 }}>Télécharger</button>
    ) : (
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>Se connecter</button>
        <button style={{ padding: "10px 18px", borderRadius: 999, background: "var(--primary)", color: "white", fontSize: 14, fontWeight: 600 }}>Télécharger l'app</button>
      </div>
    )}
  </header>
);

const AppStoreBadges = ({ mobile, dark = false }) => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
    {[
      { top: "Télécharger sur", bot: "App Store", icon: <svg width="20" height="22" viewBox="0 0 14 16"><path fill="currentColor" d="M11.5 8.4c0-2 1.7-3 1.8-3-.9-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8s-1.7-.7-2.8-.7c-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2.1.8-1.2 1.1-2.4 1.1-2.4-.1 0-2.2-.8-2.2-3.3zm-2.1-6c.6-.7 1-1.7 1-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.6 1-.1 2-.6 2.5-1.2z"/></svg> },
      { top: "Disponible sur", bot: "Google Play", icon: <svg width="20" height="22" viewBox="0 0 24 24"><path fill="#4285F4" d="M3.6 1.3C3.2 1.7 3 2.3 3 3v18c0 .7.2 1.3.6 1.7L13.7 12 3.6 1.3z"/><path fill="#FFCE00" d="M17.7 16L13.7 12 3.6 22.7 17.7 16z"/><path fill="#34A853" d="M21 11l-3.3-1.9-3.5 3.3 3.5 3.3 3.3-1.9c1-.6 1-2.2 0-2.8z"/><path fill="#EA4335" d="M3.6 1.3L13.7 12 17.7 8 3.6 1.3z"/></svg> },
    ].map((b, i) => (
      <div key={i} style={{ background: dark ? "rgba(255,255,255,0.1)" : "var(--text)", color: dark ? "white" : "var(--bg)", padding: mobile ? "9px 14px" : "10px 18px", borderRadius: 12, display: "flex", gap: 10, alignItems: "center" }}>
        {b.icon}
        <div>
          <div style={{ fontSize: 9, fontWeight: 500, opacity: 0.7 }}>{b.top}</div>
          <div style={{ fontSize: mobile ? 13 : 15, fontWeight: 600, marginTop: -2 }}>{b.bot}</div>
        </div>
      </div>
    ))}
  </div>
);

// Phone mockup for hero (smaller-rendered device frame)
const HeroPhoneMockup = ({ mobile }) => {
  const w = mobile ? 240 : 320;
  const h = mobile ? 490 : 650;
  return (
    <div style={{ position: "relative", width: w, height: h }}>
      {/* Satellite cards behind */}
      {!mobile && (
        <>
          <div style={{ position: "absolute", left: -78, top: 110, padding: 14, borderRadius: 16, background: "var(--card)", boxShadow: "var(--shadow-pop)", display: "flex", gap: 10, alignItems: "center", transform: "rotate(-6deg)", border: "1px solid var(--border)", zIndex: 1 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--primary)", color: "white", display: "grid", placeItems: "center" }}><I.wallet size={18} /></div>
            <div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Wallet</div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)" }} className="tabnum">240 500 GNF</div>
            </div>
          </div>
          <div style={{ position: "absolute", right: -90, top: 380, padding: 12, borderRadius: 14, background: "var(--card)", boxShadow: "var(--shadow-pop)", display: "flex", gap: 8, alignItems: "center", transform: "rotate(8deg)", border: "1px solid var(--border)", zIndex: 1 }}>
            <span className="verified-dot" style={{ width: 26, height: 26 }}><I.check size={14} stroke={3} color="white" /></span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600 }}>Vendeur</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)" }}>vérifié</div>
            </div>
          </div>
        </>
      )}

      {/* Phone */}
      <div style={{ width: w, height: h, borderRadius: w / 7, background: "#0E1311", padding: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)", position: "relative", zIndex: 2 }}>
        <div style={{ width: "100%", height: "100%", borderRadius: w / 8.5, overflow: "hidden", background: "#0E1311", position: "relative" }}>
          {/* Hero discover-style image */}
          <div style={{ position: "absolute", inset: 0, background: `url(${photos.apartment1}) center/cover` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.9) 100%)" }} />
          {/* Top pills */}
          <div style={{ position: "absolute", top: 24, left: 12, right: 12, display: "flex", gap: 6 }}>
            <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.95)", color: "var(--text)", fontSize: 9, fontWeight: 700 }}>Tout</div>
            <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.15)", color: "white", fontSize: 9, fontWeight: 600, backdropFilter: "blur(6px)" }}>Articles</div>
            <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.15)", color: "white", fontSize: 9, fontWeight: 600, backdropFilter: "blur(6px)" }}>Immo</div>
          </div>
          {/* Side rail */}
          <div style={{ position: "absolute", right: 8, bottom: 100, display: "flex", flexDirection: "column", gap: 12 }}>
            {[I.heartFill, I.msg, I.bookmark, I.share].map((Ic, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: 999, background: i === 0 ? "var(--danger)" : "rgba(255,255,255,0.18)", color: "white", display: "grid", placeItems: "center" }}>
                <Ic size={14} />
              </div>
            ))}
          </div>
          {/* Bottom info */}
          <div style={{ position: "absolute", bottom: 16, left: 12, right: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 999, background: `url(${photos.man1}) center/cover`, border: "1.5px solid white" }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: "white", display: "flex", alignItems: "center", gap: 4 }}>
                Mamadou Bah
                <span className="verified-dot" style={{ width: 11, height: 11 }}><I.check size={7} stroke={3} color="white" /></span>
              </div>
            </div>
            <div style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>Villa 4 ch. — Lambanyi</div>
            <div className="tabnum" style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginTop: 4 }}>4 200 000 GNF /mois</div>
            <div style={{ display: "inline-flex", marginTop: 6, gap: 4, alignItems: "center", padding: "3px 8px", borderRadius: 999, background: "var(--accent)", color: "#2A1A05", fontSize: 9, fontWeight: 700 }}>
              <I.road size={9} /> 120m du goudron
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingHero = ({ mobile }) => (
  <section style={{
    padding: mobile ? "40px 16px 32px" : "80px 56px 60px",
    display: "grid",
    gridTemplateColumns: mobile ? "1fr" : "1.1fr 1fr",
    gap: mobile ? 32 : 56,
    alignItems: "center",
    position: "relative",
  }}>
    <div>
      <div style={{ display: "inline-flex", padding: "6px 14px", borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 24 }}>
        Marketplace & Immobilier
      </div>
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: mobile ? 38 : 64,
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        margin: 0,
      }}>
        Achète, vends, loue — <span style={{ color: "var(--primary)" }}>partout en Guinée.</span>
      </h1>
      <p style={{
        marginTop: mobile ? 16 : 24,
        fontSize: mobile ? 15 : 18,
        color: "var(--text-muted)",
        lineHeight: 1.55,
        maxWidth: mobile ? "none" : 520,
        textWrap: "pretty",
      }}>
        Linky est la marketplace de confiance pour la Guinée et la diaspora. Paiement sécurisé via Orange Money, MTN ou carte bancaire.
      </p>
      <div style={{ marginTop: mobile ? 24 : 36 }}>
        <AppStoreBadges mobile={mobile} />
      </div>
      <div style={{ marginTop: mobile ? 20 : 28, display: "flex", gap: mobile ? 14 : 22, flexWrap: "wrap", fontSize: mobile ? 12 : 13, color: "var(--text-muted)" }}>
        {[
          [I.shield, "Paiement sécurisé"],
          [I.check, "Vendeurs vérifiés"],
          [I.pin, "100% local"],
        ].map(([Ic, t]) => (
          <div key={t} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Ic size={14} color="var(--primary)" /> {t}
          </div>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
      <HeroPhoneMockup mobile={mobile} />
    </div>
  </section>
);

const PaymentLogos = ({ mobile }) => (
  <section style={{
    padding: mobile ? "24px 16px" : "40px 56px",
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
    background: "var(--bg-elev)",
  }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--text-muted)", textAlign: "center", marginBottom: mobile ? 14 : 20 }}>
      Compatible avec
    </div>
    <div style={{ display: "flex", gap: mobile ? 14 : 40, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      {[
        { name: "Orange Money", logo: "OM", bg: "#FF7900" },
        { name: "MTN Mobile Money", logo: "MTN", bg: "#FFC500", fg: "#000" },
        { name: "Visa", logo: "VISA", bg: "#1A1F71" },
        { name: "Mastercard", logo: "MC", bg: "#EB001B" },
        { name: "Stripe", logo: "stripe", bg: "#635BFF" },
      ].map((p) => (
        <div key={p.name} style={{ display: "flex", gap: 8, alignItems: "center", opacity: 0.8 }}>
          <div style={{ minWidth: 44, height: 28, padding: "0 8px", background: p.bg, color: p.fg || "white", borderRadius: 5, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, fontFamily: p.name === "Stripe" ? "var(--font-display)" : "var(--font-body)", letterSpacing: 0.3 }}>{p.logo}</div>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)" }}>{p.name}</span>
        </div>
      ))}
    </div>
  </section>
);

const LandingFeatures = ({ mobile }) => (
  <section style={{ padding: mobile ? "48px 16px" : "80px 56px", background: "var(--bg)" }}>
    <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--primary)", marginBottom: 12 }}>Fonctionnalités</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 28 : 44, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>
        Tout ce qu'il faut pour acheter et vendre en sécurité.
      </h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 12 : 18, maxWidth: 1100, margin: mobile ? "32px auto 0" : "56px auto 0" }}>
      {[
        { icon: I.shop, t: "Marketplace produits", d: "Mode, électronique, maison, auto, beauté. Tout, partout, à portée de pouce.", tint: "primary" },
        { icon: I.building, t: "Immobilier en Guinée", d: "Loue, achète, ou propose un terrain — partout au pays, vérifié.", tint: "accent" },
        { icon: I.shield, t: "Paiement séquestré", d: "Le vendeur n'est payé qu'à ta confirmation de réception. Toujours.", tint: "primary" },
        { icon: I.wallet, t: "Wallet intégré", d: "Recharge, paie, retire — Orange Money, MTN ou carte. En un geste.", tint: "accent" },
      ].map((f, i) => {
        const Ic = f.icon;
        const t = f.tint === "primary" ? { bg: "var(--primary-soft)", fg: "var(--primary)" } : { bg: "var(--accent-soft)", fg: "#8B5A0A" };
        return (
          <div key={i} style={{ padding: mobile ? 24 : 32, background: "var(--bg-elev)", borderRadius: 20, border: "1px solid var(--border)" }}>
            <div style={{ width: mobile ? 48 : 56, height: mobile ? 48 : 56, borderRadius: 14, background: t.bg, color: t.fg, display: "grid", placeItems: "center", marginBottom: mobile ? 14 : 22 }}>
              <Ic size={mobile ? 22 : 26} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 20 : 24, fontWeight: 600, letterSpacing: "-0.01em" }}>{f.t}</div>
            <div style={{ fontSize: mobile ? 14 : 15, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.55 }}>{f.d}</div>
          </div>
        );
      })}
    </div>
  </section>
);

const DiscoverTeaser = ({ mobile }) => (
  <section style={{ padding: mobile ? "56px 16px" : "100px 56px", background: "#0E1311", color: "white", position: "relative", overflow: "hidden" }}>
    {/* Saffron orbits */}
    <div style={{ position: "absolute", top: "20%", right: -100, width: 400, height: 400, borderRadius: 999, background: "radial-gradient(circle, rgba(232,165,61,0.2) 0%, transparent 70%)", filter: "blur(20px)" }} />
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 40, alignItems: "center", position: "relative", maxWidth: 1100, margin: "0 auto" }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>Nouveau · Découvrir</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 32 : 56, fontWeight: 700, letterSpacing: "-0.025em", margin: 0, lineHeight: 1.05 }}>
          Découvre des trésors <span style={{ color: "var(--accent)" }}>en swipant.</span>
        </h2>
        <p style={{ marginTop: 20, fontSize: mobile ? 14 : 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, maxWidth: 480 }}>
          Un feed vertical, articles et logements à la file. Pensé pour fonctionner même en 3G, avec mode économie de données.
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            ["TikTok-style", "1.2M articles"],
            ["Sans pub", "Algorithme local"],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.08)", minWidth: 140 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{k}</div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: mobile ? "center" : "flex-end" }}>
        <HeroPhoneMockup mobile={mobile} />
      </div>
    </div>
  </section>
);

const HowItWorks = ({ mobile }) => (
  <section style={{ padding: mobile ? "48px 16px" : "80px 56px" }}>
    <div style={{ textAlign: "center", marginBottom: mobile ? 32 : 56 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--primary)", marginBottom: 12 }}>Comment ça marche</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 28 : 44, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>
        Acheter ou vendre, en trois étapes.
      </h2>
      <div style={{ display: "inline-flex", marginTop: 24, background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 999, padding: 4, gap: 2 }}>
        <button style={{ padding: "8px 20px", borderRadius: 999, background: "var(--primary)", color: "white", fontSize: 13, fontWeight: 600 }}>Pour acheter</button>
        <button style={{ padding: "8px 20px", borderRadius: 999, color: "var(--text-muted)", fontSize: 13, fontWeight: 500 }}>Pour vendre</button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: mobile ? 24 : 32, maxWidth: 1100, margin: "0 auto" }}>
      {[
        { n: "01", t: "Trouve ton article", d: "Cherche, scrolle Découvrir, ou utilise les filtres avancés.", color: "var(--primary)" },
        { n: "02", t: "Paie en sécurité", d: "Orange Money, MTN ou carte. Le montant reste en séquestre.", color: "var(--accent)" },
        { n: "03", t: "Confirme la réception", d: "Le vendeur reçoit le paiement seulement quand tu confirmes.", color: "var(--primary)" },
      ].map((s, i) => (
        <div key={i} style={{ padding: mobile ? 22 : 28, borderRadius: 20, background: "var(--bg-elev)", border: "1px solid var(--border)" }}>
          <div className="tabnum" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: s.color, opacity: 0.9 }}>{s.n}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, marginTop: 12 }}>{s.t}</div>
          <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.55 }}>{s.d}</div>
        </div>
      ))}
    </div>
  </section>
);

const DiasporaSection = ({ mobile }) => (
  <section style={{ padding: mobile ? "48px 16px" : "80px 56px", background: "var(--accent-soft)" }}>
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 40, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#8B5A0A", marginBottom: 12 }}>Pour la diaspora</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 28 : 44, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15, color: "#2A1A05" }}>
          Tu es à l'étranger ?<br /> Tu achètes pour ta famille en Guinée.
        </h2>
        <p style={{ marginTop: 20, fontSize: mobile ? 14 : 16, color: "#5A3D0F", lineHeight: 1.55, maxWidth: 480 }}>
          Paie en € avec ta carte bancaire. Ta famille reçoit l'article à Conakry — en mains propres, vérifié.
        </p>
        <button style={{ marginTop: 28, padding: "12px 22px", borderRadius: 999, background: "#2A1A05", color: "white", fontWeight: 600, fontSize: 14 }}>Payer en €, recevoir en GNF</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
        {/* France → Guinea visual */}
        <div style={{ padding: 18, background: "white", borderRadius: 16, boxShadow: "var(--shadow-card)", textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>🇫🇷</div>
          <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6, color: "#2A1A05" }}>Paris</div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", marginTop: 4 }} className="tabnum">120 €</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#8B5A0A" }}>
          <I.arrowRight size={28} />
          <I.heart size={16} color="#D14F3C" />
        </div>
        <div style={{ padding: 18, background: "white", borderRadius: 16, boxShadow: "var(--shadow-card)", textAlign: "center" }}>
          <div style={{ width: 28, height: 21, borderRadius: 3, margin: "0 auto", background: "linear-gradient(to right, #CE1126 33%, #FCD116 33% 67%, #009E49 67%)" }} />
          <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6, color: "#2A1A05" }}>Conakry</div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", marginTop: 4 }} className="tabnum">1.32M GNF</div>
        </div>
      </div>
    </div>
  </section>
);

const TrustPillars = ({ mobile }) => (
  <section style={{ padding: mobile ? "48px 16px" : "80px 56px" }}>
    <div style={{ textAlign: "center", marginBottom: mobile ? 32 : 48 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--primary)", marginBottom: 12 }}>Trust & sécurité</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 28 : 44, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>
        Conçu pour la confiance.
      </h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 24, maxWidth: 900, margin: "0 auto" }}>
      {[
        { icon: I.shield, t: "Vérification KYC", d: "Chaque vendeur peut afficher un badge doré après contrôle d'identité." },
        { icon: I.wallet, t: "Paiement séquestré", d: "Le vendeur n'est payé qu'après ta confirmation. Sans exception." },
        { icon: I.eye, t: "Modération active", d: "Une équipe humaine examine les signalements en moins de 48h." },
      ].map((p, i) => {
        const Ic = p.icon;
        return (
          <div key={i} style={{ padding: mobile ? 22 : 28, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
              <Ic size={26} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>{p.t}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.5 }}>{p.d}</div>
          </div>
        );
      })}
    </div>
  </section>
);

const Testimonials = ({ mobile }) => (
  <section style={{ padding: mobile ? "48px 16px" : "80px 56px", background: "var(--bg-elev)" }}>
    <div style={{ textAlign: "center", marginBottom: mobile ? 32 : 48 }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 28 : 40, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>
        Ils utilisent Linky.
      </h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 18, maxWidth: 1100, margin: "0 auto" }}>
      {[
        { name: "Mariama Diallo", role: "Vendeuse — Maison Aïssatou", city: "Kaloum, Conakry", photo: photos.woman1, q: "J'avais un commerce sur WhatsApp. Avec Linky, j'ai doublé mes ventes en deux mois. Et je suis payée seulement quand mes clientes confirment." },
        { name: "Mamadou Bah", role: "Agent immobilier", city: "Conakry", photo: photos.man1, q: "Mes 12 biens en gestion ont chacun leur fiche pro. La distance au goudron est devenue mon argument de vente n°1." },
        { name: "Fatou Baldé", role: "Diaspora — investisseuse", city: "Paris, France", photo: photos.woman3, q: "Je voulais acheter un appartement pour mes parents. Payer en € depuis Paris, voir le bien vérifié à Conakry — c'est exactement ce qu'il fallait." },
      ].map((t, i) => (
        <div key={i} style={{ padding: 28, background: "var(--bg)", borderRadius: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 38, lineHeight: 0.4, color: "var(--primary)" }}>"</div>
          <div style={{ fontSize: 15, lineHeight: 1.55, marginTop: 8, color: "var(--text)", textWrap: "pretty" }}>{t.q}</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: `url(${t.photo}) center/cover` }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.role} · {t.city}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const FAQ = ({ mobile }) => (
  <section style={{ padding: mobile ? "48px 16px" : "80px 56px" }}>
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1.4fr", gap: 56, maxWidth: 1100, margin: "0 auto" }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--primary)", marginBottom: 12 }}>FAQ</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 28 : 40, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>
          Tes questions, nos réponses.
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { q: "Comment fonctionne le paiement séquestré ?", a: "Tu paies au moment de la commande. Le montant est conservé par Linky. Le vendeur le reçoit seulement après ta confirmation de réception, ou automatiquement après 72h si tu n'as pas réagi.", open: true },
          { q: "Quels moyens de paiement sont acceptés ?", a: "Orange Money, MTN Mobile Money, cartes Visa/Mastercard (via Stripe pour la diaspora), et le wallet Linky." },
          { q: "Comment devenir Vendeur vérifié ?", a: "Soumets ta CNI, ta carte d'électeur, ton passeport ou ton registre de commerce. La vérification prend moins de 48h." },
          { q: "Quels sont les frais Linky ?", a: "3% sur chaque transaction, prélevés sur le vendeur. Tu vois toujours le détail au moment de payer." },
          { q: "Comment payer depuis l'étranger ?", a: "Inscris-toi avec ton email, ajoute ta carte bancaire — Linky convertit automatiquement en GNF." },
          { q: "Mes annonces ont-elles une date d'expiration ?", a: "60 jours par défaut. Tu peux les renouveler gratuitement ou les booster pour les remettre en haut du feed." },
        ].map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
            <div style={{ padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{f.q}</div>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: f.open ? "var(--primary)" : "var(--bg-sunken)", color: f.open ? "white" : "var(--text)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                {f.open ? <I.minus size={16} /> : <I.plus size={16} />}
              </div>
            </div>
            {f.open && <div style={{ paddingBottom: 18, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 540 }}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTABand = ({ mobile }) => (
  <section style={{
    padding: mobile ? "48px 16px" : "80px 56px",
    background: "linear-gradient(135deg, var(--accent) 0%, #C68420 100%)",
    color: "#2A1A05",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: `radial-gradient(circle at 20% 30%, white 0%, transparent 40%)` }} />
    <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: mobile ? 32 : 56, fontWeight: 700, letterSpacing: "-0.025em", margin: 0, lineHeight: 1.05 }}>
        Télécharge Linky<br /> aujourd'hui.
      </h2>
      <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
        <AppStoreBadges mobile={mobile} dark />
      </div>
    </div>
  </section>
);

const LandingFooter = ({ mobile }) => (
  <footer style={{ padding: mobile ? "32px 16px 24px" : "56px 56px 32px", background: "var(--bg-elev)", borderTop: "1px solid var(--border)" }}>
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr 1fr", gap: mobile ? 28 : 40, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ gridColumn: mobile ? "span 2" : "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, letterSpacing: -0.5 }}>L</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>Linky</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>Marketplace & immobilier de Guinée. Conakry, République de Guinée.</div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {[I.globe, I.msg, I.link].map((Ic, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 999, background: "var(--bg-sunken)", display: "grid", placeItems: "center", color: "var(--text-muted)" }}><Ic size={14} /></div>
          ))}
        </div>
      </div>
      {[
        { t: "Produit", links: ["Marketplace", "Immobilier", "Découvrir", "Wallet"] },
        { t: "Vendre", links: ["Devenir vendeur", "KYC", "Boosts", "Tarifs"] },
        { t: "Aide", links: ["Centre d'aide", "Litiges", "Contact", "Status"] },
        { t: "Légal", links: ["CGU", "Confidentialité", "Cookies", "Mentions"] },
      ].map((c) => (
        <div key={c.t}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>{c.t}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {c.links.map((l) => <a key={l} style={{ fontSize: 13, color: "var(--text)", textDecoration: "none" }}>{l}</a>)}
          </div>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 1100, margin: "32px auto 0", paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12, color: "var(--text-muted)" }}>
      <div>© 2026 Linky SARL · Tous droits réservés</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <I.globe size={12} /> Français · <span style={{ opacity: 0.6 }}>plus de langues bientôt</span>
      </div>
    </div>
  </footer>
);

const Landing = ({ mobile }) => (
  <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-body)" }} data-screen-label={mobile ? "Landing Mobile" : "Landing Desktop"}>
    <LandingNav mobile={mobile} />
    <LandingHero mobile={mobile} />
    <PaymentLogos mobile={mobile} />
    <LandingFeatures mobile={mobile} />
    <DiscoverTeaser mobile={mobile} />
    <HowItWorks mobile={mobile} />
    <DiasporaSection mobile={mobile} />
    <TrustPillars mobile={mobile} />
    <Testimonials mobile={mobile} />
    <FAQ mobile={mobile} />
    <CTABand mobile={mobile} />
    <LandingFooter mobile={mobile} />
  </div>
);

const LandingPage = () => (
  <div>
    <SectionBand title="Desktop · 1280px" />
    <div className="landing-desktop-wrap">
      <div className="landing-desktop">
        <Landing mobile={false} />
      </div>
    </div>
    <SectionBand title="Mobile · 390px" />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="landing-mobile-wrap">
        <div className="landing-mobile">
          <Landing mobile />
        </div>
      </div>
    </div>
  </div>
);

window.LandingPage = LandingPage;
