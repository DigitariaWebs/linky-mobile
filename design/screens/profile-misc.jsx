// ========== Messages / Profile / Notifications / KYC / Dispute / States ==========

const MessagesList = () => (
  <>
    <TopBar title="Messages" right={<button style={{ width: 36, height: 36, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center" }}><I.search size={16} /></button>} />
    <div style={{ padding: "0 16px 12px", display: "flex", gap: 6 }}>
      <button className="chip active">Toutes</button>
      <button className="chip">Achats</button>
      <button className="chip">Ventes</button>
      <button className="chip">Immobilier</button>
    </div>
    <div style={{ padding: "0 16px 16px" }}>
      {[
        { name: "Aïssatou B.", photo: photos.woman2, msg: "Bonjour, il est encore disponible ?", time: "2 min", unread: 2, verified: true },
        { name: "Mamadou — Agence Kaloum", photo: photos.man1, msg: "Je peux organiser une visite samedi à 10h", time: "1 h", unread: 1, verified: true },
        { name: "Conakry Tech", photo: photos.man2, msg: "Tu : Merci, je passe demain", time: "Hier", unread: 0, verified: true },
        { name: "Ibrahima S.", photo: photos.man3, msg: "Le prix est négociable ?", time: "Hier", unread: 0 },
        { name: "Fatou D. (Paris)", photo: photos.woman3, msg: "J'envoie ma sœur récupérer le parfum jeudi", time: "12 mai", unread: 0 },
        { name: "Bijoux & Soie", photo: photos.woman4, msg: "Tu : Top, à bientôt", time: "10 mai", unread: 0, verified: true },
      ].map((c, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div className="avatar avatar-lg" style={{ width: 48, height: 48, background: `url(${c.photo}) center/cover` }} />
            {c.verified && <span className="verified-dot" style={{ position: "absolute", bottom: -1, right: -1, width: 16, height: 16, border: "2px solid var(--bg)" }}><I.check size={9} stroke={3} color="white" /></span>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13, fontWeight: c.unread > 0 ? 600 : 500, color: c.unread > 0 ? "var(--text)" : "var(--text)" }}>{c.name}</div>
              <div style={{ fontSize: 10, color: c.unread > 0 ? "var(--primary)" : "var(--text-muted)", fontWeight: c.unread > 0 ? 600 : 400 }}>{c.time}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 3 }}>
              <div style={{ fontSize: 12, color: c.unread > 0 ? "var(--text)" : "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200, fontWeight: c.unread > 0 ? 500 : 400 }}>{c.msg}</div>
              {c.unread > 0 && (
                <div style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: 999, background: "var(--primary)", color: "white", fontSize: 10, fontWeight: 700, display: "grid", placeItems: "center" }}>{c.unread}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
);

const ChatView = () => (
  <>
    <div style={{ padding: "10px 16px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border)" }}>
      <button style={{ width: 32, height: 32, borderRadius: 999, display: "grid", placeItems: "center", marginLeft: -8 }}><I.arrowLeft size={18} /></button>
      <div style={{ position: "relative" }}>
        <div className="avatar" style={{ background: `url(${photos.woman2}) center/cover` }} />
        <span style={{ position: "absolute", bottom: -1, right: -1, width: 11, height: 11, borderRadius: 999, background: "var(--success)", border: "2px solid var(--bg)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 13, fontWeight: 600 }}>
          Maison Aïssatou
          <span className="verified-dot"><I.check size={9} stroke={3} color="white" /></span>
        </div>
        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>En ligne · répond en ~2h</div>
      </div>
      <button style={{ width: 32, height: 32, borderRadius: 999, display: "grid", placeItems: "center" }}><I.moreV size={18} color="var(--text-muted)" /></button>
    </div>

    {/* Pinned listing */}
    <div style={{ margin: "10px 16px 0", padding: 8, background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: `url(${photos.perfume}) center/cover` }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>À propos de</div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Eau de parfum édition limitée</div>
      </div>
      <div className="tabnum" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>{fmtGNF(420000)}</div>
    </div>

    {/* Messages */}
    <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }} className="no-scrollbar">
      <div style={{ textAlign: "center", fontSize: 10, color: "var(--text-faint)", margin: "8px 0" }}>Aujourd'hui</div>

      <div style={{ alignSelf: "flex-start", maxWidth: "75%" }}>
        <div className="card" style={{ padding: "9px 12px", borderRadius: "14px 14px 14px 4px" }}>
          <div style={{ fontSize: 13 }}>Bonjour ! Le parfum est-il toujours disponible ?</div>
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 3, marginLeft: 4 }}>09:24</div>
      </div>

      <div style={{ alignSelf: "flex-end", maxWidth: "75%" }}>
        <div style={{ padding: "9px 12px", borderRadius: "14px 14px 4px 14px", background: "var(--primary-soft)", color: "var(--primary-deep)" }}>
          <div style={{ fontSize: 13 }}>Oui Mariama, je le réserve pour toi. Tu peux passer demain ?</div>
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 3, textAlign: "right", marginRight: 4 }}>09:28 · Vu</div>
      </div>

      <div style={{ alignSelf: "flex-start", maxWidth: "75%" }}>
        <div className="card" style={{ padding: "9px 12px", borderRadius: "14px 14px 14px 4px" }}>
          <div style={{ fontSize: 13 }}>Parfait, je passe entre 14h et 16h. À demain !</div>
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 3, marginLeft: 4 }}>09:31</div>
      </div>

      <div style={{ alignSelf: "flex-end", maxWidth: "75%" }}>
        <div style={{ padding: "9px 12px", borderRadius: "14px 14px 4px 14px", background: "var(--primary-soft)", color: "var(--primary-deep)" }}>
          <div style={{ fontSize: 13 }}>À demain 🌹</div>
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 3, textAlign: "right", marginRight: 4 }}>09:31</div>
      </div>
    </div>

    {/* Input */}
    <div style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", background: "var(--card)", display: "flex", gap: 8, alignItems: "center" }}>
      <button style={{ width: 36, height: 36, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--text-muted)" }}><I.paperclip size={18} /></button>
      <input className="input" style={{ height: 40, flex: 1 }} placeholder="Écris un message" />
      <button style={{ width: 36, height: 36, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--text-muted)" }}><I.smile size={18} /></button>
      <button style={{ width: 38, height: 38, borderRadius: 999, background: "var(--primary)", color: "white", display: "grid", placeItems: "center" }}><I.send size={16} /></button>
    </div>
  </>
);

// ========== Profile ==========

const ProfileScreen = () => (
  <>
    <div style={{ padding: "12px 16px 0" }}>
      <div className="title-l" style={{ fontSize: 22 }}>Profil</div>
    </div>

    <div style={{ padding: "14px 16px 0" }}>
      <div className="card" style={{ padding: 14, display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div className="avatar avatar-lg" style={{ width: 64, height: 64, background: `url(${photos.woman1}) center/cover` }} />
          <span className="verified-dot" style={{ position: "absolute", bottom: -1, right: -1, width: 18, height: 18, border: "2.5px solid var(--card)" }}><I.check size={10} stroke={3} color="white" /></span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <div className="title-m" style={{ fontSize: 16 }}>Mariama Diallo</div>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 6, marginTop: 2 }}>
            <I.pin size={11} style={{ display: "inline", verticalAlign: "-1px" }} /> Conakry · Vérifiée
          </div>
          <button style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600, marginTop: 4, display: "flex", gap: 4, alignItems: "center" }}>Modifier mon profil <I.chevronR size={11} /></button>
        </div>
      </div>
    </div>

    {/* Quick actions */}
    <div style={{ padding: "14px 16px 0" }}>
      <div style={{ display: "flex", gap: 8, overflowX: "auto" }} className="no-scrollbar">
        {[
          [I.package, "Commandes", "3"],
          [I.calendar, "Réservations", null],
          [I.list, "Annonces", "12"],
          [I.heart, "Favoris", "8"],
          [I.wallet, "Wallet", null],
          [I.shield, "KYC", null],
        ].map(([Ic, label, badge], i) => (
          <button key={i} style={{ flexShrink: 0, padding: "8px 14px 8px 10px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--bg-elev)", display: "flex", gap: 6, alignItems: "center", fontSize: 12, fontWeight: 500, position: "relative" }}>
            <Ic size={15} color="var(--text-muted)" />
            {label}
            {badge && <span style={{ marginLeft: 2, fontSize: 10, fontWeight: 700, color: "var(--primary)" }}>{badge}</span>}
          </button>
        ))}
      </div>
    </div>

    {/* Settings */}
    <div style={{ padding: "16px 16px 0" }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8 }}>Réglages</div>
      <div className="card" style={{ overflow: "hidden" }}>
        <SettingsRow icon={I.phone} label="Numéros de téléphone" sub="2 numéros liés" />
        <SettingsRow icon={I.pin} label="Adresses" value="Kaloum" />
        <SettingsRow icon={I.shield} label="Vérification d'identité" right={<span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)" }}>Vérifiée</span>} />
        <SettingsRow icon={I.bell} label="Notifications" right="switch-on" />
        <SettingsRow icon={I.globe} label="Langue" sub="Plus de langues bientôt" value="Français" />
        <SettingsRow icon={I.sparkle} label="Thème" value="Système" />
        <SettingsRow icon={I.cloudOff} label="Mode économie de données" sub="Désactive l'autoplay et baisse la qualité" right="switch-off" />
        <SettingsRow icon={I.eye} label="Confidentialité" />
      </div>
    </div>

    <div style={{ padding: "16px 16px 0" }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 8 }}>À propos</div>
      <div className="card" style={{ overflow: "hidden" }}>
        <SettingsRow icon={I.info} label="À propos de Linky" value="v1.0.0" />
        <SettingsRow icon={I.msg} label="Aide & support" />
        <SettingsRow icon={I.layers} label="Conditions générales" />
        <SettingsRow icon={I.shield} label="Politique de confidentialité" />
      </div>
    </div>

    <div style={{ padding: "16px 16px 24px" }}>
      <button className="btn btn-secondary btn-block" style={{ color: "var(--danger)", borderColor: "rgba(209,79,60,0.3)" }}><I.logout size={16} /> Déconnexion</button>
    </div>
  </>
);

// ========== Notifications ==========

const NotificationsScreen = () => (
  <>
    <TopBar title="Notifications" right={<button style={{ width: 36, height: 36, borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", display: "grid", placeItems: "center" }}><I.settings size={16} /></button>} />
    <div style={{ padding: "0 16px 12px", display: "flex", gap: 6, overflowX: "auto" }} className="no-scrollbar">
      <button className="chip active">Toutes</button>
      <button className="chip">Commandes</button>
      <button className="chip">Messages</button>
      <button className="chip">Promos</button>
    </div>
    <div style={{ padding: "0 16px" }}>
      <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 6, marginBottom: 8 }}>Aujourd'hui</div>
      {[
        { icon: I.check, tint: "primary", title: "Paiement reçu", body: "Mamadou a payé pour ton iPhone 12 Pro · 4 800 000 GNF", time: "Il y a 2 min", unread: true },
        { icon: I.msg, tint: "info", title: "Aïssatou B.", body: "Bonjour, il est encore disponible ?", time: "Il y a 15 min", unread: true },
        { icon: I.bolt, tint: "accent", title: "Boost gratuit !", body: "Ton annonce 'Robe wax' a été boostée gratuitement pour 24h", time: "Il y a 1h", unread: false },
      ].map((n, i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
          <div style={{ width: 38, height: 38, borderRadius: 999, background: `var(--${n.tint}-soft)`, color: n.tint === "primary" ? "var(--primary)" : n.tint === "accent" ? "#8B5A0A" : "var(--info)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <n.icon size={17} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>{n.body}</div>
            <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 4 }}>{n.time}</div>
          </div>
          {n.unread && <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--primary)", marginTop: 6 }} />}
        </div>
      ))}

      <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 16, marginBottom: 8 }}>Cette semaine</div>
      {[
        { icon: I.star, tint: "accent", title: "Nouvel avis 5★", body: "Fatou D. a laissé un avis 5★ sur ta boutique", time: "Hier", unread: false },
        { icon: I.heart, tint: "primary", title: "Article favori", body: "Ibrahima a ajouté ton iPhone 12 Pro à ses favoris", time: "Lun. 14:02", unread: false },
        { icon: I.shield, tint: "primary", title: "KYC validé", body: "Tu es maintenant vendeuse vérifiée. Le badge est visible sur ton profil.", time: "Lun. 09:30", unread: false },
      ].map((n, i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
          <div style={{ width: 38, height: 38, borderRadius: 999, background: `var(--${n.tint}-soft)`, color: n.tint === "primary" ? "var(--primary)" : "#8B5A0A", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <n.icon size={17} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>{n.body}</div>
            <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 4 }}>{n.time}</div>
          </div>
        </div>
      ))}

      <div style={{ height: 16 }} />
    </div>
  </>
);

// ========== KYC ==========

const KYCIntro = () => (
  <>
    <TopBar title="Vérification" back />
    <div style={{ padding: "0 24px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ paddingTop: 20, textAlign: "center" }}>
        <div style={{ width: 88, height: 88, borderRadius: 22, margin: "0 auto", background: `radial-gradient(circle, var(--accent) 0%, var(--accent-soft) 100%)`, display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(232,165,61,0.3)" }}>
          <I.shield size={42} color="white" />
        </div>
        <div className="disp-l" style={{ fontSize: 22, marginTop: 18 }}>Deviens Vendeur vérifié</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5, maxWidth: 260, margin: "6px auto 0" }}>
          Affiche un badge de confiance et rassure tes acheteurs.
        </div>
      </div>

      {/* Badge preview */}
      <div style={{ marginTop: 22, padding: 18, background: "var(--bg-elev)", borderRadius: 16, border: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center" }}>
        <div className="avatar" style={{ background: `url(${photos.woman1}) center/cover` }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Mariama Diallo</div>
            <span className="verified-dot"><I.check size={9} stroke={3} color="white" /></span>
          </div>
          <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>Vendeur vérifié</div>
        </div>
      </div>

      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          [I.check, "Badge doré visible sur tes annonces"],
          [I.trend, "+30% de conversion en moyenne"],
          [I.zap, "Accès prioritaire au support"],
        ].map(([Ic, t], i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 30, height: 30, borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center" }}><Ic size={15} /></div>
            <div style={{ fontSize: 13 }}>{t}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto", paddingTop: 16 }}>
        <button className="btn btn-primary btn-lg btn-block">Commencer la vérification</button>
        <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 4 }}>Plus tard</button>
      </div>
    </div>
  </>
);

const KYCDocumentChoice = () => (
  <>
    <TopBar title="Vérification" back sub="Étape 1 / 3" />
    <div style={{ padding: "0 16px 16px" }}>
      <div className="disp-l" style={{ fontSize: 22, marginBottom: 16 }}>Quelle pièce d'identité ?</div>
      {[
        { id: "cni", t: "Carte Nationale d'Identité", d: "Délivrée par la République de Guinée", icon: I.card, selected: true },
        { id: "elec", t: "Carte d'électeur", d: "Acceptée pour la vérification", icon: I.card },
        { id: "pass", t: "Passeport", d: "Idéal pour la diaspora", icon: I.globe },
        { id: "rcs", t: "Registre de commerce", d: "Pour les commerçants", icon: I.archive },
      ].map((o) => {
        const Ic = o.icon;
        return (
          <div key={o.id} style={{ padding: 14, borderRadius: 14, border: o.selected ? "2px solid var(--primary)" : "1px solid var(--border)", background: "var(--card)", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: o.selected ? "var(--primary-soft)" : "var(--bg-sunken)", color: o.selected ? "var(--primary)" : "var(--text)", display: "grid", placeItems: "center" }}><Ic size={18} /></div>
            <div style={{ flex: 1 }}>
              <div className="title-m" style={{ fontSize: 13 }}>{o.t}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{o.d}</div>
            </div>
            <I.chevronR size={16} color="var(--text-muted)" />
          </div>
        );
      })}
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-primary btn-block">Continuer</button>
    </div>
  </>
);

const KYCCapture = () => (
  <div style={{ flex: 1, background: "#0E1311", color: "white", position: "relative", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <button style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center" }}><I.close size={18} color="white" /></button>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Recto de la CNI</div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>Étape 1 / 3 · cadre la pièce dans la zone</div>
      </div>
    </div>
    <div style={{ flex: 1, position: "relative", display: "grid", placeItems: "center" }}>
      {/* Frame guide */}
      <div style={{ width: 240, height: 150, border: "3px solid var(--accent)", borderRadius: 14, position: "relative" }}>
        {[[-2,-2],[ -2,"auto",2,"auto"],["auto",-2,"auto",2],["auto","auto",2,2]].map((_, i) => null)}
        <div style={{ position: "absolute", top: -2, left: -2, width: 26, height: 26, border: "5px solid white", borderRight: "none", borderBottom: "none", borderTopLeftRadius: 14 }} />
        <div style={{ position: "absolute", top: -2, right: -2, width: 26, height: 26, border: "5px solid white", borderLeft: "none", borderBottom: "none", borderTopRightRadius: 14 }} />
        <div style={{ position: "absolute", bottom: -2, left: -2, width: 26, height: 26, border: "5px solid white", borderRight: "none", borderTop: "none", borderBottomLeftRadius: 14 }} />
        <div style={{ position: "absolute", bottom: -2, right: -2, width: 26, height: 26, border: "5px solid white", borderLeft: "none", borderTop: "none", borderBottomRightRadius: 14 }} />
      </div>
      <div style={{ position: "absolute", bottom: 80, left: 16, right: 16, textAlign: "center", fontSize: 12, opacity: 0.85 }}>
        Place la pièce sur un fond uni. Aucune ombre ni reflet.
      </div>
    </div>
    <div style={{ padding: "0 16px 24px", display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
      <button style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center" }}><I.image size={18} color="white" /></button>
      <button style={{ width: 68, height: 68, borderRadius: 999, background: "white", border: "5px solid rgba(255,255,255,0.4)" }} />
      <button style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center" }}><I.refresh size={18} color="white" /></button>
    </div>
  </div>
);

const KYCSubmitted = () => (
  <div style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
    <div style={{ width: 88, height: 88, borderRadius: 999, background: "var(--accent-soft)", display: "grid", placeItems: "center" }}>
      <div className="skel" style={{ position: "absolute", width: 88, height: 88, borderRadius: 999, opacity: 0.3 }} />
      <I.shield size={42} color="var(--accent)" />
    </div>
    <div className="disp-l" style={{ fontSize: 22, marginTop: 20 }}>On vérifie tes documents</div>
    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.5, maxWidth: 260 }}>
      Sous 48h, on te notifie. En attendant, tu peux continuer à utiliser Linky normalement.
    </div>

    <div style={{ marginTop: 32, width: "100%", padding: 14, background: "var(--bg-elev)", borderRadius: 12, border: "1px solid var(--border)" }}>
      {[
        ["CNI Recto", true],
        ["CNI Verso", true],
        ["Selfie avec CNI", true],
      ].map(([t, done]) => (
        <div key={t} style={{ display: "flex", gap: 10, padding: "6px 0", fontSize: 12, alignItems: "center" }}>
          <I.check size={14} color="var(--success)" stroke={3} />
          {t}
        </div>
      ))}
    </div>

    <button className="btn btn-primary" style={{ marginTop: 32 }}>Retour à mon profil</button>
  </div>
);

// ========== Dispute ==========

const DisputeWizard = () => (
  <>
    <TopBar title="Signaler un problème" back sub="Commande #LK-2026-04812" />
    <div style={{ padding: "0 16px 16px" }}>
      <StepDots total={4} current={0} />
      <div className="disp-l" style={{ fontSize: 20, marginBottom: 14 }}>Que s'est-il passé ?</div>
      {[
        { t: "Je n'ai pas reçu mon article", icon: I.package, selected: true },
        { t: "L'article est différent de l'annonce", icon: I.warn, selected: false },
        { t: "L'article est endommagé", icon: I.trash, selected: false },
        { t: "Autre problème", icon: I.more, selected: false },
      ].map((o, i) => {
        const Ic = o.icon;
        return (
          <div key={i} style={{ padding: 14, borderRadius: 14, border: o.selected ? "2px solid var(--danger)" : "1px solid var(--border)", background: "var(--card)", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: o.selected ? "rgba(209,79,60,0.1)" : "var(--bg-sunken)", color: o.selected ? "var(--danger)" : "var(--text)", display: "grid", placeItems: "center" }}><Ic size={17} /></div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{o.t}</div>
            <div style={{ width: 22, height: 22, borderRadius: 999, border: o.selected ? "0" : "1.5px solid var(--border-strong)", background: o.selected ? "var(--danger)" : "transparent", display: "grid", placeItems: "center" }}>
              {o.selected && <div style={{ width: 8, height: 8, borderRadius: 999, background: "white" }} />}
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Décris ce qui s'est passé</div>
        <textarea className="input" style={{ height: 100, padding: 12, resize: "none", fontFamily: "inherit" }} defaultValue="J'avais rendez-vous lundi mais le vendeur n'est pas venu. Depuis, plus de nouvelles." />
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>Photos (optionnel)</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 64, height: 64, borderRadius: 10, background: "var(--bg-elev)", border: "1.5px dashed var(--border-strong)", display: "grid", placeItems: "center", color: "var(--text-muted)" }}><I.plus size={20} /></div>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <button className="btn btn-danger btn-lg btn-block">Envoyer le signalement</button>
    </div>
  </>
);

const DisputeStatus = () => (
  <>
    <TopBar title="Mon signalement" back sub="#LK-DISP-009" />
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ padding: 14, background: "rgba(209,79,60,0.06)", borderRadius: 14, border: "1px solid rgba(209,79,60,0.2)", display: "flex", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--danger)", color: "white", display: "grid", placeItems: "center" }}><I.warn size={18} /></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--danger)" }}>Article non reçu</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Commande #LK-2026-04812 · 4 800 000 GNF en séquestre</div>
        </div>
      </div>

      <div style={{ marginTop: 18, fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>État du dossier</div>
      <div className="card" style={{ padding: 16 }}>
        {[
          { t: "Reçu", d: "Lun. 16 mai · 18:04", done: true },
          { t: "En cours d'examen", d: "Notre équipe a contacté les 2 parties", done: true, current: true },
          { t: "Résolution", d: "Décision sous 72h", done: false },
        ].map((s, i, arr) => (
          <div key={i} style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: s.done ? "var(--primary)" : "var(--border)", color: "white", display: "grid", placeItems: "center", boxShadow: s.current ? "0 0 0 6px var(--primary-soft)" : "none" }}>
                {s.done && <I.check size={12} stroke={3} />}
              </div>
              {i < arr.length - 1 && <div style={{ flex: 1, width: 2, background: arr[i + 1].done ? "var(--primary)" : "var(--border)", marginTop: 2, minHeight: 30 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 22 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.t}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary btn-block" style={{ marginTop: 16 }}><I.msg size={16} /> Contacter le support</button>
    </div>
  </>
);

// ========== States ==========

const EmptyState = ({ icon: Ic, title, sub, cta }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
    <div style={{ width: 92, height: 92, borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", marginBottom: 22 }}>
      <Ic size={42} />
    </div>
    <div className="disp-l" style={{ fontSize: 20 }}>{title}</div>
    <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, maxWidth: 240, lineHeight: 1.5 }}>{sub}</div>
    {cta && <button className="btn btn-primary" style={{ marginTop: 24 }}>{cta}</button>}
  </div>
);

const EmptyCart = () => <><TopBar title="Mon panier" back /><EmptyState icon={I.cart} title="Ton panier est vide" sub="Découvre des milliers d'articles et de boutiques de confiance" cta="Aller au marché" /></>;
const EmptyFavorites = () => <><TopBar title="Favoris" back /><EmptyState icon={I.heart} title="Aucun favori" sub="Touche le ❤ sur les articles que tu aimes pour les retrouver ici" cta="Découvrir" /></>;
const EmptyMessages = () => <><TopBar title="Messages" /><EmptyState icon={I.msg} title="Aucune conversation" sub="Contacte un vendeur depuis une annonce pour démarrer une discussion" /></>;

const OfflineState = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
    <div style={{ width: 92, height: 92, borderRadius: 999, background: "rgba(58,124,168,0.1)", color: "var(--info)", display: "grid", placeItems: "center", marginBottom: 22 }}>
      <I.cloudOff size={42} />
    </div>
    <div className="disp-l" style={{ fontSize: 20 }}>Pas de connexion</div>
    <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, maxWidth: 240, lineHeight: 1.5 }}>Tu peux toujours consulter ce que tu as déjà vu. Réessaie quand tu auras du réseau.</div>
    <button className="btn btn-primary" style={{ marginTop: 24 }}><I.refresh size={16} /> Réessayer</button>
    <div style={{ marginTop: 18, padding: "6px 12px", borderRadius: 999, background: "var(--bg-elev)", border: "1px solid var(--border)", fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 6, alignItems: "center" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--danger)" }} />
      Hors ligne depuis 2 min
    </div>
  </div>
);

const ErrorState = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
    <div style={{ width: 92, height: 92, borderRadius: 999, background: "rgba(209,79,60,0.1)", color: "var(--danger)", display: "grid", placeItems: "center", marginBottom: 22 }}>
      <I.warn size={42} />
    </div>
    <div className="disp-l" style={{ fontSize: 20 }}>Une erreur est survenue</div>
    <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, maxWidth: 240, lineHeight: 1.5 }}>On n'a pas pu charger ces informations. Réessaie ou contacte le support si le problème persiste.</div>
    <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
      <button className="btn btn-secondary">Support</button>
      <button className="btn btn-primary"><I.refresh size={16} /> Réessayer</button>
    </div>
  </div>
);

const LoadingState = () => (
  <>
    <TopBar title="Marché" back />
    <div style={{ padding: "0 16px 12px", display: "flex", gap: 8 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skel" style={{ height: 28, width: 70, borderRadius: 999 }} />
      ))}
    </div>
    <div style={{ padding: "0 16px" }} className="grid-2">
      {[...Array(6)].map((_, i) => (
        <div key={i}>
          <div className="skel" style={{ aspectRatio: "1", borderRadius: 16 }} />
          <div className="skel" style={{ height: 12, marginTop: 8, borderRadius: 6 }} />
          <div className="skel" style={{ height: 12, marginTop: 6, width: "60%", borderRadius: 6 }} />
        </div>
      ))}
    </div>
  </>
);

Object.assign(window, {
  MessagesList, ChatView,
  ProfileScreen,
  NotificationsScreen,
  KYCIntro, KYCDocumentChoice, KYCCapture, KYCSubmitted,
  DisputeWizard, DisputeStatus,
  EmptyCart, EmptyFavorites, EmptyMessages, OfflineState, ErrorState, LoadingState,
});
