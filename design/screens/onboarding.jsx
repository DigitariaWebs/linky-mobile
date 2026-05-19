// ========== Onboarding & Auth — compact, hero-overlay pattern ==========

// Splash — keep simple
const SplashScreen = () => (
  <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "var(--bg)" }}>
    {/* subtle decorative orbits */}
    <div style={{ position: "absolute", top: "-20%", right: "-20%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, var(--primary-soft) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", bottom: "-15%", left: "-20%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-soft) 0%, transparent 60%)" }} />

    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 24, position: "relative", height: "100%" }}>
      <div style={{ width: 76, height: 76, borderRadius: 22, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 46, letterSpacing: -2, boxShadow: "0 12px 32px rgba(14, 110, 85, 0.35)" }}>L</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, letterSpacing: -1.5, lineHeight: 1, marginTop: 6 }}>Linky</div>
      <div style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500, letterSpacing: 0.3 }}>Marketplace & Immobilier de Guinée</div>
    </div>
    <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, display: "flex", gap: 4, justifyContent: "center" }}>
      <div style={{ width: 24, height: 4, background: "var(--primary)", borderRadius: 4 }} />
      <div style={{ width: 4, height: 4, background: "var(--border-strong)", borderRadius: 4 }} />
      <div style={{ width: 4, height: 4, background: "var(--border-strong)", borderRadius: 4 }} />
    </div>
  </div>
);

// Welcome — full-bleed hero with bottom sheet overlay (Findora-style)
const WelcomeCarousel = ({ slide = 0 }) => {
  const slides = [
    {
      eyebrow: "MARKETPLACE · GUINÉE",
      title: "Bienvenue",
      sub: "Achète, vends et loue\npartout en Guinée.",
      hero: photos.marketScene,
    },
    {
      eyebrow: "IMMOBILIER · CONAKRY",
      title: "Ta maison\nt'attend.",
      sub: "Loue ou achète ton prochain logement, vérifié.",
      hero: photos.modernHouse,
    },
    {
      eyebrow: "PAIEMENT · SÉCURISÉ",
      title: "Paie en\nsécurité.",
      sub: "Orange Money, MTN ou carte. Le vendeur est payé après ta confirmation.",
      hero: photos.woman2,
    },
  ];
  const s = slides[slide];

  // Bottom card cuts up to ~50% of width via elliptical top — gives a soft "hill" peak in the middle
  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      {/* Hero photo full-bleed — extends behind status bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "62%", background: `url(${s.hero}) center/cover` }} />
      {/* gradient for status bar contrast */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)" }} />

      {/* Logo centered on hero */}
      <div style={{ position: "absolute", top: "20%", left: 0, right: 0, textAlign: "center", color: "white", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ width: 60, height: 60, borderRadius: 999, margin: "0 auto", background: "rgba(255,255,255,0.96)", color: "var(--primary)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, letterSpacing: -1.5, boxShadow: "0 10px 28px rgba(0,0,0,0.3)" }}>L</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, letterSpacing: 1.2, marginTop: 14 }}>LINKY</div>
        <div style={{ fontSize: 10, opacity: 0.92, letterSpacing: 1.4, fontWeight: 600, marginTop: 2 }}>{s.eyebrow}</div>
      </div>

      {/* Bottom card with elliptical top — sits on top of hero with a soft circular peak */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "44%", pointerEvents: "none" }}>
        {/* The card */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          top: 28,
          background: "var(--bg)",
          pointerEvents: "auto",
        }} />
        {/* Elliptical top curve drawn with SVG */}
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, right: 0, width: "100%", height: 56, display: "block" }}>
          <path d="M0,30 Q50,-6 100,30 Z" fill="var(--bg)" />
        </svg>

        {/* Content inside card */}
        <div style={{ position: "absolute", inset: 0, padding: "32px 24px 22px", display: "flex", flexDirection: "column", pointerEvents: "auto" }}>
          {/* dots */}
          <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 14 }}>
            {slides.map((_, i) => (
              <div key={i} style={{ width: i === slide ? 22 : 5, height: 5, background: i === slide ? "var(--primary)" : "var(--border-strong)", borderRadius: 4, transition: "all 200ms" }} />
            ))}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.05, textAlign: "center", whiteSpace: "pre-line" }}>{s.title}</div>
          <div style={{ color: "var(--text-muted)", fontSize: 12.5, lineHeight: 1.45, textAlign: "center", marginTop: 8, whiteSpace: "pre-line", textWrap: "pretty" }}>{s.sub}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
            <button className="btn btn-compact btn-dark btn-block">Commencer</button>
            <button className="btn btn-compact btn-outline btn-block">J'ai déjà un compte</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Auth choice — compact tiles
const AuthChoice = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 20px 20px" }}>
    <button style={{ width: 34, height: 34, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center", alignSelf: "flex-start" }}>
      <I.arrowLeft size={16} />
    </button>
    <div style={{ marginTop: 18 }}>
      <div className="disp-l" style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: -0.5 }}>Comment veux-tu te connecter ?</div>
      <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 6, lineHeight: 1.45 }}>On adapte le paiement à où tu te trouves.</div>
    </div>

    <div className="card" style={{ padding: 14, marginTop: 22, borderColor: "var(--primary)", boxShadow: "0 0 0 3px var(--primary-soft)" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--primary)", color: "white", display: "grid", placeItems: "center" }}><I.phone size={18} /></div>
        <div style={{ flex: 1 }}>
          <div className="title-m" style={{ fontSize: 13.5 }}>Je suis en Guinée</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>Téléphone + Mobile Money</div>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: 999, background: "var(--primary)", display: "grid", placeItems: "center" }}>
          <I.check size={12} color="white" stroke={3} />
        </div>
      </div>
    </div>

    <div className="card" style={{ padding: 14, marginTop: 10 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--bg-sunken)", color: "var(--text)", display: "grid", placeItems: "center" }}><I.globe size={18} /></div>
        <div style={{ flex: 1 }}>
          <div className="title-m" style={{ fontSize: 13.5 }}>Je suis à l'étranger</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>Email + Carte bancaire</div>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: 999, border: "1.5px solid var(--border-strong)" }} />
      </div>
    </div>

    <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--primary-soft)", borderRadius: 12, display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: "var(--primary-deep)" }}>
      <I.pin size={13} color="var(--primary)" />
      <span>On t'a détecté en Guinée. Tu peux changer.</span>
    </div>

    <div style={{ marginTop: "auto" }}>
      <button className="btn btn-compact btn-dark btn-block">Continuer</button>
    </div>
  </div>
);

// Phone entry — compact
const PhoneEntry = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 20px 20px" }}>
    <button style={{ width: 34, height: 34, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center", alignSelf: "flex-start" }}>
      <I.arrowLeft size={16} />
    </button>
    <div style={{ marginTop: 18 }}>
      <div className="disp-l" style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: -0.5 }}>Ton numéro</div>
      <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 6, lineHeight: 1.45 }}>Tu recevras un code à 6 chiffres par SMS.</div>
    </div>

    <div style={{ marginTop: 22, fontSize: 11, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>Numéro de téléphone</div>
    <div style={{ display: "flex", gap: 8 }}>
      <button className="input input-compact" style={{ width: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 20, height: 14, borderRadius: 2, background: "linear-gradient(to right, #CE1126 33%, #FCD116 33% 67%, #009E49 67%)" }} />
          <span style={{ fontWeight: 600, fontSize: 13 }}>+224</span>
        </span>
        <I.chevronD size={12} />
      </button>
      <input className="input input-compact tabnum" placeholder="6XX XX XX XX" defaultValue="622 55 12 88" style={{ fontWeight: 500 }} />
    </div>

    <div style={{ marginTop: 16, padding: "10px 12px", background: "var(--bg-elev)", borderRadius: 12, display: "flex", gap: 8, alignItems: "flex-start", border: "1px solid var(--border)" }}>
      <I.shield size={14} color="var(--primary)" style={{ marginTop: 1 }} />
      <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.45 }}>
        En continuant, tu acceptes nos <span style={{ color: "var(--primary)", fontWeight: 600 }}>conditions</span> et notre <span style={{ color: "var(--primary)", fontWeight: 600 }}>politique de confidentialité</span>.
      </div>
    </div>

    <div style={{ marginTop: "auto" }}>
      <button className="btn btn-compact btn-dark btn-block">Recevoir le code</button>
    </div>
  </div>
);

// OTP — compact
const OTPScreen = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 20px 20px" }}>
    <button style={{ width: 34, height: 34, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center", alignSelf: "flex-start" }}>
      <I.arrowLeft size={16} />
    </button>
    <div style={{ marginTop: 18 }}>
      <div className="disp-l" style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: -0.5 }}>Vérification</div>
      <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 6, lineHeight: 1.45 }}>
        Code envoyé au <strong style={{ color: "var(--text)" }} className="tabnum">+224 622 •• 12 88</strong>
      </div>
    </div>

    <div style={{ display: "flex", gap: 8, marginTop: 26, justifyContent: "space-between" }}>
      {["4", "9", "2", "8", "", ""].map((d, i) => (
        <div key={i} style={{ width: 38, height: 50, borderRadius: 12, border: i === 4 ? "2px solid var(--primary)" : "1px solid var(--border)", background: "var(--bg-elev)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22 }} className="tabnum">{d || (i === 4 ? "|" : "")}</div>
      ))}
    </div>

    <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 20 }}>
      Renvoyer dans <strong className="tabnum" style={{ color: "var(--text)" }}>00:42</strong>
    </div>
    <button className="btn btn-compact btn-ghost btn-sm" style={{ alignSelf: "center", marginTop: 4 }}>Nouveau code</button>

    <div style={{ marginTop: "auto" }}>
      <button className="btn btn-compact btn-dark btn-block">Vérifier</button>
    </div>
  </div>
);

// Email signup — compact
const EmailSignup = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 20px 20px" }}>
    <button style={{ width: 34, height: 34, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center", alignSelf: "flex-start" }}>
      <I.arrowLeft size={16} />
    </button>
    <div style={{ marginTop: 16 }}>
      <div className="disp-l" style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: -0.5 }}>Crée ton compte</div>
      <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 6, lineHeight: 1.45 }}>Pour payer en € avec ta carte.</div>
    </div>

    <div className="col" style={{ gap: 8, marginTop: 18 }}>
      <input className="input input-compact" placeholder="Email" defaultValue="fatou.balde@gmail.com" />
      <input className="input input-compact" placeholder="Mot de passe" defaultValue="••••••••" type="password" />
      <input className="input input-compact" placeholder="Confirmer le mot de passe" defaultValue="••••••••" type="password" />
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
      <div className="divider" />
      <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500 }}>OU</div>
      <div className="divider" />
    </div>

    <div style={{ display: "flex", gap: 8 }}>
      <button className="btn btn-compact btn-outline" style={{ flex: 1 }}>
        <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.2 1-3.8 1-2.9 0-5.4-2-6.3-4.6H2v2.8C3.8 20.4 7.6 23 12 23z"/><path fill="#FBBC05" d="M5.7 14c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V6.9H2c-.8 1.5-1.2 3.3-1.2 5.1S1.2 16.6 2 18.1L5.7 14z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.1-3.1C17.5 2 14.9 1 12 1 7.6 1 3.8 3.6 2 6.9l3.7 2.8c.9-2.6 3.4-4.3 6.3-4.3z"/></svg>
        Google
      </button>
      <button className="btn btn-compact btn-outline" style={{ flex: 1 }}>
        <svg width="12" height="14" viewBox="0 0 14 16"><path fill="currentColor" d="M11.5 8.4c0-2 1.7-3 1.8-3-.9-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8s-1.7-.7-2.8-.7c-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2.1.8-1.2 1.1-2.4 1.1-2.4-.1 0-2.2-.8-2.2-3.3zm-2.1-6c.6-.7 1-1.7 1-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.6 1-.1 2-.6 2.5-1.2z"/></svg>
        Apple
      </button>
    </div>

    <div style={{ marginTop: "auto" }}>
      <button className="btn btn-compact btn-dark btn-block">Créer mon compte</button>
    </div>
  </div>
);

// Profile setup — three steps
const ProfileSetup = ({ step = 0 }) => {
  const labels = ["Identité", "Ville", "Rôle"];
  const scrollable = step === 1; // city has typeahead list, allow scrolling

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 20px 16px", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 5 }}>
        {labels.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? "var(--primary)" : "var(--border)" }} />
        ))}
      </div>
      <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 14 }}>Étape {step + 1} / 3 · {labels[step]}</div>
      <div className="disp-l" style={{ fontSize: 22, lineHeight: 1.15, letterSpacing: -0.5, marginTop: 4 }}>
        {step === 0 && "Dis-nous qui tu es"}
        {step === 1 && "Tu es où en Guinée ?"}
        {step === 2 && "Tu veux faire quoi ?"}
      </div>

      <div style={{ flex: 1, overflow: scrollable ? "auto" : "hidden", marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }} className="no-scrollbar">
        {step === 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 4, marginBottom: 6 }}>
              <div style={{ position: "relative" }}>
                <div className="avatar avatar-lg" style={{ width: 80, height: 80, background: `url(${photos.woman1}) center/cover` }} />
                <div style={{ position: "absolute", bottom: -2, right: -2, width: 28, height: 28, borderRadius: 999, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", border: "3px solid var(--bg)" }}><I.camera size={13} /></div>
              </div>
            </div>
            <input className="input input-compact" placeholder="Nom complet" defaultValue="Mariama Diallo" />
            <input className="input input-compact" placeholder="Surnom (optionnel)" />
          </>
        )}

        {step === 1 && (
          <>
            <input className="input input-compact" defaultValue="Conakry" />
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase" }}>Suggestions</div>
            {["Conakry", "Kindia", "Kankan", "Labé", "Boké", "Faranah", "Mamou", "Nzérékoré", "Siguiri"].map((c) => (
              <div key={c} style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid var(--border)", background: c === "Conakry" ? "var(--primary-soft)" : "var(--bg-elev)", display: "flex", alignItems: "center", gap: 10 }}>
                <I.pin size={14} color={c === "Conakry" ? "var(--primary)" : "var(--text-muted)"} />
                <span style={{ fontSize: 13, fontWeight: c === "Conakry" ? 600 : 500, color: c === "Conakry" ? "var(--primary)" : "var(--text)" }}>{c}</span>
                {c === "Conakry" && <I.check size={14} color="var(--primary)" stroke={2.5} style={{ marginLeft: "auto" }} />}
              </div>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Coche tout ce qui s'applique — tu peux changer plus tard.</div>
            {[
              { id: "buy", t: "Acheteur", d: "Acheter ou louer", icon: I.cart, on: true },
              { id: "sell", t: "Vendeur", d: "Vendre tes produits", icon: I.store, on: true },
              { id: "agent", t: "Agent immo", d: "Lister des biens", icon: I.building, on: false },
            ].map((r) => {
              const Ic = r.icon;
              return (
                <div key={r.id} style={{ padding: 12, borderRadius: 12, border: r.on ? "2px solid var(--primary)" : "1px solid var(--border)", background: "var(--card)", display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: r.on ? "var(--primary-soft)" : "var(--bg-sunken)", color: r.on ? "var(--primary)" : "var(--text)", display: "grid", placeItems: "center" }}><Ic size={16} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="title-m" style={{ fontSize: 13.5 }}>{r.t}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.d}</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: 999, border: r.on ? "0" : "1.5px solid var(--border-strong)", background: r.on ? "var(--primary)" : "transparent", display: "grid", placeItems: "center" }}>
                    {r.on && <I.check size={12} color="white" stroke={3} />}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, paddingTop: 12 }}>
        <button className="btn btn-compact btn-outline" style={{ flex: 1 }}>Retour</button>
        <button className="btn btn-compact btn-dark" style={{ flex: 2 }}>{step === 2 ? "Terminer" : "Continuer"}</button>
      </div>
    </div>
  );
};

// Done — compact celebration
const OnboardingDone = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24, alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative" }}>
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 37) % 100}%`,
          top: `${(i * 71) % 100}%`,
          width: 5, height: 5, borderRadius: 999,
          background: ["var(--primary)", "var(--accent)", "var(--success)"][i % 3],
          opacity: 0.55,
        }} />
      ))}
    </div>
    <div style={{ width: 78, height: 78, borderRadius: 999, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", boxShadow: "0 12px 32px rgba(14, 110, 85, 0.4)", marginBottom: 18, zIndex: 1 }}>
      <I.check size={38} stroke={2.5} />
    </div>
    <div className="disp-l" style={{ fontSize: 22, zIndex: 1, letterSpacing: -0.5 }}>Bienvenue, Mariama !</div>
    <div style={{ color: "var(--text-muted)", fontSize: 12.5, marginTop: 6, zIndex: 1, maxWidth: 240, lineHeight: 1.45 }}>Ton compte est prêt. Découvre des milliers d'articles et de logements.</div>

    <div style={{ marginTop: 28, width: "100%", display: "flex", flexDirection: "column", gap: 8, zIndex: 1 }}>
      <button className="btn btn-compact btn-dark btn-block">Découvrir Linky</button>
      <button className="btn btn-compact btn-ghost btn-sm">Vérifier mon identité maintenant</button>
    </div>
  </div>
);

Object.assign(window, { SplashScreen, WelcomeCarousel, AuthChoice, PhoneEntry, OTPScreen, EmailSignup, ProfileSetup, OnboardingDone });
