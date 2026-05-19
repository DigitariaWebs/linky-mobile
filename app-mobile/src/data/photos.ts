// Mirrored from /design/parts.jsx — reliable Unsplash CDN URLs for V1.
// In V2 these come from Supabase Storage / S3.

// Local welcome carousel heroes — bundled with the app, see assets/images/WELCOME_HEROES.md
export const welcomeHeroes = {
  marche: require('../../assets/images/welcome-1.png') as number,
  immobilier: require('../../assets/images/welcome-2.png') as number,
  paiement: require('../../assets/images/welcome-3.png') as number,
};

// Local role illustrations for profile-setup step 3, see assets/images/ROLE_CARDS.md
export const roleHeroes = {
  buy: require('../../assets/images/role-acheteur.png') as number,
  sell: require('../../assets/images/role-vendeur.png') as number,
  agent: require('../../assets/images/role-agent.png') as number,
};

export const photos = {
  // Real estate
  apartment1: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=70&auto=format',
  apartment2: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=70&auto=format',
  villa: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=70&auto=format',
  modernHouse: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=70&auto=format',
  cityView: 'https://images.unsplash.com/photo-1572017022-66e08bd87fb6?w=800&q=70&auto=format',
  land: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=70&auto=format',
  livingRoom: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=70&auto=format',
  // People
  woman1: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=70&auto=format',
  woman2: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=400&q=70&auto=format',
  woman3: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=400&q=70&auto=format',
  woman4: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?w=400&q=70&auto=format',
  man1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70&auto=format',
  man2: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=70&auto=format',
  man3: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&q=70&auto=format',
  // Products
  perfume: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=70&auto=format',
  perfume2: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=70&auto=format',
  iphone: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=70&auto=format',
  iphone2: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=70&auto=format',
  motorcycle: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=70&auto=format',
  fashion: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=70&auto=format',
  fashion2: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=70&auto=format',
  bag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=70&auto=format',
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=70&auto=format',
  watch: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=70&auto=format',
  sneakers: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=70&auto=format',
  kitchen: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&q=70&auto=format',
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=70&auto=format',
  // Scenes
  conakry: 'https://images.unsplash.com/photo-1582215068674-cbb22cc0c70b?w=1200&q=70&auto=format',
  marketScene: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=70&auto=format',
};

// Public sample video URLs for Découvrir video items (lightweight + cached publicly).
export const videos = {
  apartmentTour: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  perfumeReel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
};
