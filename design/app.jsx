// ========== Main App Shell with left rail navigation ==========

const NAV = [
  {
    id: "system",
    label: "Système",
    items: [
      { id: "tokens", label: "Tokens & identité" },
      { id: "components", label: "Composants" },
    ],
  },
  {
    id: "mobile",
    label: "Application mobile",
    items: [
      { id: "onboarding", label: "Onboarding & Auth" },
      { id: "home", label: "Accueil" },
      { id: "marche", label: "Marché & Filtres" },
      { id: "discover", label: "Découvrir (feed)" },
      { id: "detail", label: "Détails (produit / bien)" },
      { id: "shop", label: "Boutique" },
      { id: "cart", label: "Panier & Checkout" },
      { id: "order", label: "Commande & Escrow" },
      { id: "wallet", label: "Portefeuille" },
      { id: "create", label: "Création d'annonce" },
      { id: "messages", label: "Messages" },
      { id: "profile", label: "Profil & Réglages" },
      { id: "notifications", label: "Notifications" },
      { id: "kyc", label: "KYC vérification" },
      { id: "dispute", label: "Litige" },
      { id: "states", label: "États & Erreurs" },
    ],
  },
  {
    id: "web",
    label: "Site marketing",
    items: [
      { id: "landing", label: "Landing page" },
    ],
  },
  {
    id: "admin",
    label: "Back-office Admin",
    items: [
      { id: "admin-overview", label: "Vue d'ensemble" },
      { id: "admin-users", label: "Utilisateurs" },
      { id: "admin-listings", label: "Annonces" },
      { id: "admin-orders", label: "Commandes & Litiges" },
      { id: "admin-kyc", label: "KYC en attente" },
      { id: "admin-cms", label: "Bannières & Push" },
    ],
  },
];

const PAGE_META = {
  tokens: { title: "Tokens & identité", sub: "Couleurs, typographie, espacements, rayons et photographie." },
  components: { title: "Bibliothèque de composants", sub: "Tous les composants, leurs variantes et états en clair et sombre." },
  onboarding: { title: "Onboarding & authentification", sub: "Splash, carrousel d'accueil, choix d'auth, téléphone, OTP, email, configuration du profil, succès." },
  home: { title: "Accueil", sub: "Tableau de bord : wallet, bannières, catégories, boutiques, produits populaires, immobilier proche." },
  marche: { title: "Marché", sub: "Listes articles et immobilier, filtres avancés, distance au goudron — un argument clé pour la Guinée." },
  discover: { title: "Découvrir — feed vertical immersif", sub: "TikTok-style. Sombre par défaut. Articles et immobilier. Pensé pour fonctionner même en 3G." },
  detail: { title: "Détail produit & détail bien", sub: "Hero, prix dual GNF/EUR, badges, séquestre, avis, et trust strip." },
  shop: { title: "Boutique d'un vendeur", sub: "Profil boutique avec tabs Articles, Avis, À propos." },
  cart: { title: "Panier & paiement", sub: "Récapitulatif, commission transparente, choix Orange Money / MTN / Carte / Wallet, confirmation." },
  order: { title: "Suivi de commande & séquestre", sub: "Timeline du séquestre, bouton 'J'ai reçu', vue vendeur avec décompte de libération automatique." },
  wallet: { title: "Portefeuille", sub: "Solde dual, recharger, retirer, mouvements." },
  create: { title: "Créer une annonce", sub: "Wizards en plusieurs étapes pour produit et immobilier, avec génération IA de description." },
  messages: { title: "Messages", sub: "Liste de conversations, fil de chat avec listing épinglé en haut." },
  profile: { title: "Profil & Réglages", sub: "Quick actions et tous les réglages de l'app." },
  notifications: { title: "Notifications", sub: "Tabs et flux avec marqueurs non-lus." },
  kyc: { title: "KYC — vérification d'identité", sub: "Intro, choix de pièce, capture, état en attente." },
  dispute: { title: "Signaler un problème", sub: "Wizard de litige et suivi du dossier." },
  states: { title: "États : vide, offline, erreur, loading", sub: "Skeletons et illustrations légères." },
  landing: { title: "Landing page publique", sub: "Site marketing en français, mobile et desktop côte à côte." },
  "admin-overview": { title: "Admin — Vue d'ensemble", sub: "KPI, courbe de revenus, top catégories, dernières commandes et litiges." },
  "admin-users": { title: "Admin — Utilisateurs", sub: "Table avec filtres, statuts KYC, actions." },
  "admin-listings": { title: "Admin — Annonces", sub: "Modération des annonces et signalements." },
  "admin-orders": { title: "Admin — Commandes & Litiges", sub: "Détails de transaction et tableau kanban des litiges." },
  "admin-kyc": { title: "Admin — KYC en attente", sub: "Queue de vérification avec preview des documents." },
  "admin-cms": { title: "Admin — Bannières & Push", sub: "Composer bannières et notifications push." },
};

const Rail = ({ active, onChange, theme, setTheme }) => (
  <aside className="rail">
    <div className="rail-header">
      <div className="rail-logo">L</div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, letterSpacing: -0.3, lineHeight: 1 }}>Linky</div>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>Design system v1.0</div>
      </div>
    </div>

    <div style={{ padding: "0 8px 12px" }}>
      <div className="theme-toggle">
        <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}>
          <I.sparkle size={12} /> Clair
        </button>
        <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}>
          <I.bookmark size={12} /> Sombre
        </button>
      </div>
    </div>

    {NAV.map((section) => (
      <div key={section.id} className="rail-section">
        <div className="rail-section-title">{section.label}</div>
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 1 }}>
          {section.items.map((item) => (
            <button
              key={item.id}
              className={"rail-link " + (active === item.id ? "active" : "")}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    ))}

    <div style={{ padding: "20px 8px 0", color: "var(--text-faint)", fontSize: 10, lineHeight: 1.5 }}>
      Linky v1 — Conakry. Toutes les valeurs sont indicatives ; les visuels sont issus d'Unsplash et représentent la direction artistique.
    </div>
  </aside>
);

const Page = ({ id }) => {
  switch (id) {
    case "tokens": return <TokensPage />;
    case "components": return <ComponentsPage />;
    case "onboarding": return <OnboardingPage />;
    case "home": return <HomePage />;
    case "marche": return <MarchePage />;
    case "discover": return <DiscoverPage />;
    case "detail": return <DetailPage />;
    case "shop": return <ShopPage />;
    case "cart": return <CartPage />;
    case "order": return <OrderPage />;
    case "wallet": return <WalletPage />;
    case "create": return <CreatePage />;
    case "messages": return <MessagesPage />;
    case "profile": return <ProfilePage />;
    case "notifications": return <NotificationsPage />;
    case "kyc": return <KYCPage />;
    case "dispute": return <DisputePage />;
    case "states": return <StatesPage />;
    case "landing": return <LandingPage />;
    case "admin-overview": return <AdminOverviewPage />;
    case "admin-users": return <AdminUsersPage />;
    case "admin-listings": return <AdminListingsPage />;
    case "admin-orders": return <AdminOrdersPage />;
    case "admin-kyc": return <AdminKYCPage />;
    case "admin-cms": return <AdminCMSPage />;
    default: return <div>Coming soon</div>;
  }
};

// Onboarding page lays out all 8 frames in a gallery
const OnboardingPage = () => (
  <div className="gallery">
    <FrameCell title="01 · Splash" subtitle="Démarrage, fade-in du logo">
      <Device scrollable={false} label="01 Splash"><SplashScreen /></Device>
    </FrameCell>
    <FrameCell title="02a · Welcome — Bienvenue" subtitle="Carrousel 1/3, hero bleed + bottom sheet">
      <Device scrollable={false} transparentStatusBar label="02a Welcome 1"><WelcomeCarousel slide={0} /></Device>
    </FrameCell>
    <FrameCell title="02b · Welcome — Logement" subtitle="Carrousel 2/3">
      <Device scrollable={false} transparentStatusBar label="02b Welcome 2"><WelcomeCarousel slide={1} /></Device>
    </FrameCell>
    <FrameCell title="02c · Welcome — Paiement" subtitle="Carrousel 3/3">
      <Device scrollable={false} transparentStatusBar label="02c Welcome 3"><WelcomeCarousel slide={2} /></Device>
    </FrameCell>
    <FrameCell title="03 · Choix Auth" subtitle="Local vs Diaspora, suggestion auto">
      <Device scrollable={false} label="03 Choix Auth"><AuthChoice /></Device>
    </FrameCell>
    <FrameCell title="04 · Téléphone (Guinée)" subtitle="Préfixe +224, helper SMS">
      <Device scrollable={false} label="04 Téléphone"><PhoneEntry /></Device>
    </FrameCell>
    <FrameCell title="05 · OTP" subtitle="6 cellules, timer, focus actif">
      <Device scrollable={false} label="05 OTP"><OTPScreen /></Device>
    </FrameCell>
    <FrameCell title="06 · Email (Diaspora)" subtitle="Email + password, OAuth Google/Apple">
      <Device scrollable={false} label="06 Email"><EmailSignup /></Device>
    </FrameCell>
    <FrameCell title="07a · Profil — Identité" subtitle="Étape 1/3">
      <Device scrollable={false} label="07a Profil Identité"><ProfileSetup step={0} /></Device>
    </FrameCell>
    <FrameCell title="07b · Profil — Ville" subtitle="Étape 2/3, typeahead scrollable">
      <Device scrollable={false} label="07b Profil Ville"><ProfileSetup step={1} /></Device>
    </FrameCell>
    <FrameCell title="07c · Profil — Rôles" subtitle="Étape 3/3, multi-select">
      <Device scrollable={false} label="07c Profil Rôles"><ProfileSetup step={2} /></Device>
    </FrameCell>
    <FrameCell title="08 · Bienvenue" subtitle="Confetti léger, CTA Découvrir">
      <Device scrollable={false} label="08 Bienvenue"><OnboardingDone /></Device>
    </FrameCell>
  </div>
);

const HomePage = () => (
  <div className="gallery">
    <FrameCell title="Accueil · principal" subtitle="Greeting, wallet, bannière, catégories, listes">
      <Device tabBar={<TabBar active="home" />} label="09 Accueil"><HomeScreen /></Device>
    </FrameCell>
  </div>
);

const MarchePage = () => (
  <div className="gallery">
    <FrameCell title="Marché · Articles" subtitle="Grille 2 colonnes, segmented top">
      <Device tabBar={<TabBar active="marche" />} label="10 Marché Articles"><MarcheArticles /></Device>
    </FrameCell>
    <FrameCell title="Marché · Immobilier" subtitle="Stack de property cards 16:9, distance au goudron">
      <Device tabBar={<TabBar active="marche" />} label="11 Marché Immobilier"><MarcheImmobilier /></Device>
    </FrameCell>
    <FrameCell title="Filtres immobilier" subtitle="Bottom sheet plein écran, slider distance au goudron">
      <Device scrollable={false} tabBar={null} label="12 Filtres"><MarcheFilters /></Device>
    </FrameCell>
  </div>
);

const DiscoverPage = () => (
  <div className="gallery">
    <FrameCell title="Découvrir · Produit (parfum)" subtitle="Carrousel auto-rotate, rail d'actions, dual price">
      <Device dark scrollable={false} tabBar={<TabBar active="decouvrir" />} label="13 Discover Produit">
        <DiscoverCard
          media={photos.perfume}
          title="Eau de parfum édition limitée — 50ml"
          price={420000}
          seller="Maison Aïssatou"
          sellerPhoto={photos.woman2}
          liked
          likes="1.2k"
          showCarouselDots
          dotIdx={1}
        />
      </Device>
    </FrameCell>
    <FrameCell title="Découvrir · Bien (apparte)" subtitle="Vidéo autoplay (WiFi only), distance au goudron en saffran">
      <Device dark scrollable={false} tabBar={<TabBar active="decouvrir" />} label="14 Discover Bien">
        <DiscoverCard
          media={photos.modernHouse}
          title="Villa moderne 4 chambres — Lambanyi"
          price={4200000}
          perMonth
          seller="Mamadou Bah"
          sellerPhoto={photos.man1}
          location="Lambanyi, Conakry"
          distanceToRoad={120}
          showVideoIndicator
          likes="3.4k"
        />
      </Device>
    </FrameCell>
    <FrameCell title="Découvrir · Fin du feed" subtitle="État final pour la journée, retour demain">
      <Device dark scrollable={false} tabBar={<TabBar active="decouvrir" />} label="15 Discover Fin">
        <DiscoverEndState />
      </Device>
    </FrameCell>
  </div>
);

const DetailPage = () => (
  <div className="gallery">
    <FrameCell title="Détail · Produit" subtitle="Hero, séquestre, avis, sticky CTA">
      <Device scrollable={false} label="16 Détail Produit">
        <div className="screen-scroll"><ProductDetail /></div>
      </Device>
    </FrameCell>
    <FrameCell title="Détail · Bien (location)" subtitle="Meta grid, carte schématique, distance au goudron">
      <Device scrollable={false} label="17 Détail Bien">
        <div className="screen-scroll"><PropertyDetail /></div>
      </Device>
    </FrameCell>
    <FrameCell title="Détail · Terrain" subtitle="Pas de paiement in-app — contacter le propriétaire">
      <Device scrollable={false} label="18 Détail Terrain">
        <div className="screen-scroll"><PropertyDetailTerrain /></div>
      </Device>
    </FrameCell>
  </div>
);

const ShopPage = () => (
  <div className="gallery">
    <FrameCell title="Boutique · Profil vendeur" subtitle="Cover, avatar, stats, onglet Articles">
      <Device tabBar={<TabBar active="boutique" />} label="19 Boutique"><ShopProfile /></Device>
    </FrameCell>
  </div>
);

const CartPage = () => (
  <div className="gallery">
    <FrameCell title="Panier" subtitle="Items, qty stepper, code promo, récap, frais transparents">
      <Device scrollable={false} label="20 Panier"><CartScreen /></Device>
    </FrameCell>
    <FrameCell title="Moyens de paiement" subtitle="Orange Money / MTN / Carte / Wallet">
      <Device scrollable={false} label="21 Paiement"><PaymentMethod /></Device>
    </FrameCell>
    <FrameCell title="Confirmation" subtitle="Paiement en séquestre, ID commande, callout">
      <Device scrollable={false} label="22 Confirmation"><OrderConfirmation /></Device>
    </FrameCell>
  </div>
);

const OrderPage = () => (
  <div className="gallery">
    <FrameCell title="Suivi · Vue acheteur" subtitle="Timeline séquestre, bouton hold-to-confirm">
      <Device scrollable={false} label="23 Suivi Acheteur"><OrderTrackingBuyer /></Device>
    </FrameCell>
    <FrameCell title="Suivi · Vue vendeur" subtitle="Décompte de libération auto, action remise">
      <Device scrollable={false} label="24 Suivi Vendeur"><OrderTrackingSeller /></Device>
    </FrameCell>
  </div>
);

const WalletPage = () => (
  <div className="gallery">
    <FrameCell title="Portefeuille" subtitle="Solde, mouvements colorés in/out, status séquestre">
      <Device label="25 Wallet"><WalletScreen /></Device>
    </FrameCell>
    <FrameCell title="Recharger" subtitle="Sélection source, montant, quick chips">
      <Device scrollable={false} label="26 Recharger"><WalletRecharge /></Device>
    </FrameCell>
  </div>
);

const CreatePage = () => (
  <div className="gallery">
    <FrameCell title="Produit · 1 Type vendeur" subtitle="Particulier vs Commerçant">
      <Device scrollable={false} label="27 Type vendeur"><CreateProductSellerType /></Device>
    </FrameCell>
    <FrameCell title="Produit · 2 Catégorie" subtitle="Grille 2 colonnes, tints chaleureuses">
      <Device scrollable={false} label="28 Catégorie"><CreateProductCategory /></Device>
    </FrameCell>
    <FrameCell title="Produit · 4 Détails + IA" subtitle="Bouton 'Générer avec l'IA' saffran">
      <Device scrollable={false} label="29 Détails"><CreateProductDetails /></Device>
    </FrameCell>
    <FrameCell title="Produit · 5 Photos" subtitle="Drag-drop, badge photo principale">
      <Device scrollable={false} label="30 Photos"><CreateProductPhotos /></Device>
    </FrameCell>
    <FrameCell title="Produit · 6 Aperçu" subtitle="Preview feed + booster">
      <Device scrollable={false} label="31 Aperçu"><CreateProductPreview /></Device>
    </FrameCell>
    <FrameCell title="Bien · 3 Détails" subtitle="Distance au goudron en saffran — hero field">
      <Device scrollable={false} label="32 Détails Bien"><CreatePropertyDetails /></Device>
    </FrameCell>
    <FrameCell title="Bien · 5 GPS" subtitle="Map schématique, pin déplaçable">
      <Device scrollable={false} label="33 GPS"><CreatePropertyLocation /></Device>
    </FrameCell>
    <FrameCell title="Ma Boutique (seller dash)" subtitle="KPI, chart vues, gestion d'annonces">
      <Device tabBar={<TabBar active="boutique" />} label="34 Seller Dashboard"><SellerDashboard /></Device>
    </FrameCell>
  </div>
);

const MessagesPage = () => (
  <div className="gallery">
    <FrameCell title="Liste de conversations" subtitle="Avatar + verified, unread, filtres">
      <Device tabBar={<TabBar active="profil" />} label="35 Messages"><MessagesList /></Device>
    </FrameCell>
    <FrameCell title="Conversation" subtitle="Listing épinglé, bulles asymétriques">
      <Device scrollable={false} label="36 Chat"><ChatView /></Device>
    </FrameCell>
  </div>
);

const ProfilePage = () => (
  <div className="gallery">
    <FrameCell title="Profil" subtitle="Avatar vérifié, quick actions, réglages, KYC">
      <Device tabBar={<TabBar active="profil" />} label="37 Profil"><ProfileScreen /></Device>
    </FrameCell>
  </div>
);

const NotificationsPage = () => (
  <div className="gallery">
    <FrameCell title="Notifications" subtitle="Tabs, regroupées par période, dots unread">
      <Device label="38 Notifications"><NotificationsScreen /></Device>
    </FrameCell>
  </div>
);

const KYCPage = () => (
  <div className="gallery">
    <FrameCell title="KYC · Intro" subtitle="Bénéfices, badge preview, CTA">
      <Device label="39 KYC Intro"><KYCIntro /></Device>
    </FrameCell>
    <FrameCell title="KYC · Choix de pièce" subtitle="CNI, électeur, passeport, RCS">
      <Device scrollable={false} label="40 KYC Pièce"><KYCDocumentChoice /></Device>
    </FrameCell>
    <FrameCell title="KYC · Capture" subtitle="Caméra, guides de cadrage, fond sombre">
      <Device scrollable={false} dark label="41 KYC Capture"><KYCCapture /></Device>
    </FrameCell>
    <FrameCell title="KYC · Soumis" subtitle="En attente, checklist verte, retour profil">
      <Device scrollable={false} label="42 KYC Soumis"><KYCSubmitted /></Device>
    </FrameCell>
  </div>
);

const DisputePage = () => (
  <div className="gallery">
    <FrameCell title="Signalement · Wizard" subtitle="Choix du problème, description, photos">
      <Device scrollable={false} label="43 Dispute Wizard"><DisputeWizard /></Device>
    </FrameCell>
    <FrameCell title="Signalement · Statut" subtitle="Timeline résolution, contact support">
      <Device label="44 Dispute Status"><DisputeStatus /></Device>
    </FrameCell>
  </div>
);

const StatesPage = () => (
  <div className="gallery">
    <FrameCell title="Panier vide" subtitle="Illustrated empty, CTA">
      <Device scrollable={false} label="45 Empty Cart"><EmptyCart /></Device>
    </FrameCell>
    <FrameCell title="Favoris vides">
      <Device scrollable={false} label="46 Empty Favs"><EmptyFavorites /></Device>
    </FrameCell>
    <FrameCell title="Messages vides">
      <Device scrollable={false} label="47 Empty Msgs"><EmptyMessages /></Device>
    </FrameCell>
    <FrameCell title="Hors ligne" subtitle="Banner et retry">
      <Device scrollable={false} label="48 Offline"><OfflineState /></Device>
    </FrameCell>
    <FrameCell title="Erreur" subtitle="Action correctrice + support">
      <Device scrollable={false} label="49 Error"><ErrorState /></Device>
    </FrameCell>
    <FrameCell title="Chargement (skeleton)" subtitle="Shimmer cream-to-white">
      <Device scrollable={false} label="50 Loading"><LoadingState /></Device>
    </FrameCell>
  </div>
);
const LandingPage = window.LandingPage;
const AdminOverviewPage = window.AdminOverviewPage;
const AdminUsersPage = window.AdminUsersPage;
const AdminListingsPage = window.AdminListingsPage;
const AdminOrdersPage = window.AdminOrdersPage;
const AdminKYCPage = window.AdminKYCPage;
const AdminCMSPage = window.AdminCMSPage;

const Placeholder = ({ label }) => (
  <div className="card" style={{ padding: 60, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
    <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--bg-sunken)", display: "grid", placeItems: "center", color: "var(--text-muted)" }}>
      <I.layers size={26} />
    </div>
    <div className="title-m">En préparation : {label}</div>
    <div className="muted">Cette section sera ajoutée à mesure que le système est construit.</div>
  </div>
);

const App = () => {
  const [active, setActive] = React.useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || "tokens";
  });
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    window.location.hash = active;
  }, [active]);

  const meta = PAGE_META[active] || { title: active, sub: "" };

  return (
    <div className="app-shell">
      <Rail active={active} onChange={setActive} theme={theme} setTheme={setTheme} />
      <main className="stage">
        <div className="stage-header">
          <div className="stage-title">
            <h1>{meta.title}</h1>
            <p>{meta.sub}</p>
          </div>
        </div>
        <Page id={active} />
      </main>
    </div>
  );
};

window.App = App;
