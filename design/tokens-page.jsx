// ========== Tokens & Components reference pages ==========

const TokensPage = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

    {/* Logo + identity */}
    <div className="card" style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, letterSpacing: -1 }}>L</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, letterSpacing: -1, lineHeight: 1 }}>Linky</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Marketplace & Immobilier de Guinée</div>
          </div>
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.65 }}>
          Linky se présente comme une marque premium, chaleureuse et locale — pensée pour la Guinée, accessible à la diaspora. Le système visuel s'appuie sur trois piliers&nbsp;: un <strong style={{ color: "var(--primary)" }}>vert émeraude</strong> pour la confiance, un <strong style={{ color: "var(--accent)" }}>safran</strong> pour la valeur, et un <strong>fond crème</strong> pour la chaleur.
        </div>
      </div>

      <div style={{ background: "var(--bg)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14, border: "1px solid var(--border)" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.5, textTransform: "uppercase" }}>Principes</div>
        {[
          ["Confiance", "Couleurs sobres, badges vérifiés, paiement séquestré toujours visible."],
          ["Chaleur", "Crème plutôt que blanc pur, photographie locale, voix au tutoiement."],
          ["Performance", "Designs pensés pour la 3G : skeletons, lazy-load, mode économie."],
          ["Confiance africaine", "Inspiration locale, sans clichés. Pas de motifs ethniques décoratifs."],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 14, fontSize: 13 }}>
            <div style={{ fontWeight: 600 }}>{k}</div>
            <div style={{ color: "var(--text-muted)" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Color */}
    <div className="card" style={{ padding: 28 }}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>Couleurs</h3>
      <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6, marginBottom: 20 }}>Émeraude pour les CTAs, safran pour la valeur, crème comme fond.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
        <Swatch color="#0E6E55" name="primary" hex="#0E6E55" lightText />
        <Swatch color="#0A5240" name="primary-deep" hex="#0A5240" lightText />
        <Swatch color="#E8F2EE" name="primary-soft" hex="#E8F2EE" />
        <Swatch color="#E8A53D" name="accent (saffron)" hex="#E8A53D" lightText />
        <Swatch color="#FCF1DC" name="accent-soft" hex="#FCF1DC" />
        <Swatch color="#1FA971" name="success" hex="#1FA971" lightText />
        <Swatch color="#D14F3C" name="danger" hex="#D14F3C" lightText />
        <Swatch color="#3A7CA8" name="info" hex="#3A7CA8" lightText />
        <Swatch color="#F7F3EC" name="cream / surface-light" hex="#F7F3EC" />
        <Swatch color="#FFFFFF" name="card / surface-card-light" hex="#FFFFFF" />
        <Swatch color="#0E1311" name="surface-dark" hex="#0E1311" lightText />
        <Swatch color="#181E1B" name="surface-card-dark" hex="#181E1B" lightText />
      </div>
    </div>

    {/* Type */}
    <div className="card" style={{ padding: 28 }}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>Typographie</h3>
      <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6, marginBottom: 20 }}>
        Cabinet Grotesk pour le titrage. Inter pour le corps & l'interface. Tabulaire pour les chiffres.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 28, alignItems: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Display XL · 32/36</div>
        <div className="disp-xl">Achète, vends, loue.</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Display L · 26/32</div>
        <div className="disp-l">Marketplace & Immobilier de Guinée</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Title L · 20/26</div>
        <div className="title-l">Tu paies maintenant.</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Title M · 17/22</div>
        <div className="title-m">Le vendeur est payé après confirmation.</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Body L · 16/24</div>
        <div className="body-l" style={{ maxWidth: 540 }}>Linky est la marketplace de confiance pour la Guinée et la diaspora.</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Body M · 14/20</div>
        <div className="body-m" style={{ maxWidth: 540, color: "var(--text-muted)" }}>Recharger ton wallet, payer en mobile money, retirer ton argent — tout, en un geste.</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Caption · 12/16</div>
        <div className="caption" style={{ color: "var(--text-muted)" }}>Vendeur vérifié · répond en moins de 2h</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Micro · 11/14</div>
        <div className="micro" style={{ color: "var(--text-muted)" }}>Nouveau · Boost · Vérifié</div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: 0.6, textTransform: "uppercase" }}>Numerics</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600 }} className="tabnum">1 240 500 GNF · ≈ 113 €</div>
      </div>
    </div>

    {/* Radii + spacing */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div className="card" style={{ padding: 28 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>Rayons</h3>
        <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6, marginBottom: 20 }}>Soft, plus chaleureux que techy.</div>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          {[
            ["sm", 8], ["md", 12], ["lg", 16], ["xl", 20], ["pill", 999],
          ].map(([k, r]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 64, height: 64, borderRadius: r === 999 ? "999px" : r, background: "var(--primary-soft)", border: "1px solid var(--primary)", color: "var(--primary)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>{r === 999 ? "∞" : r}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 28 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>Spacing (base 4)</h3>
        <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6, marginBottom: 20 }}>4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 80</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[4, 8, 12, 16, 20, 24, 32, 40, 56, 80].map((n) => (
            <div key={n} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span className="tabnum" style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", width: 36 }}>{n}px</span>
              <div style={{ height: 12, width: n * 2, background: "var(--primary)", borderRadius: 2, opacity: 0.85 }} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Imagery direction */}
    <div className="card" style={{ padding: 28 }}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>Photographie</h3>
      <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6, marginBottom: 20 }}>Personnes guinéennes et diaspora, intérieurs chaleureux, scènes locales — pas de stock générique.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
        {[photos.woman1, photos.man1, photos.apartment1, photos.perfume, photos.modernHouse, photos.woman2].map((src, i) => (
          <div key={i} style={{ aspectRatio: "3/4", borderRadius: 12, background: `url(${src}) center/cover, var(--bg-sunken)` }} />
        ))}
      </div>
    </div>
  </div>
);

window.TokensPage = TokensPage;
