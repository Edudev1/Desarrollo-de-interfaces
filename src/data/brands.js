const brandImg = (file) =>
  new URL(`../assets/images/brands/${file}`, import.meta.url).href

export const brands = [
  {
    id: 1,
    name: 'Nintendo',
    description: 'Desarrolladora y editora japonesa creadora de sagas icónicas como Mario, Zelda y Pokémon.',
    image: brandImg('nintendo.png'),
  },
  {
    id: 2,
    name: 'Rockstar Games',
    description: 'Estudio estadounidense conocido por desarrollar juegos de mundo abierto como GTA y Red Dead Redemption.',
    image: brandImg('rockstar.png'),
  },
  {
    id: 3,
    name: 'CD Projekt Red',
    description: 'Desarrolladora polaca reconocida por The Witcher y Cyberpunk 2077.',
    image: brandImg('cdprojektred.png'),
  },
  {
    id: 4,
    name: 'Ubisoft',
    description: 'Compañía francesa desarrolladora de franquicias como Assassin’s Creed.',
    image: brandImg('ubisoft.png'),
  },
  {
    id: 5,
    name: 'FromSoftware',
    description: 'Estudio japonés famoso por la saga Dark Souls y Elden Ring.',
    image: brandImg('fromsoftware.png'),
  },
  {
    id: 6,
    name: 'Naughty Dog',
    description: 'Estudio de Sony responsable de The Last of Us y Uncharted.',
    image: brandImg('naughtydog.png'),
  },
  {
    id: 7,
    name: 'Santa Monica Studio',
    description: 'Estudio responsable de la saga God of War y referentes en acción narrativa.',
    image: brandImg('santamonicastudio.png'),
  },
  {
    id: 8,
    name: 'Bethesda Game Studios',
    description: 'Desarrolladora de RPGs como Skyrim y Fallout.',
    image: brandImg('bethesda.png'),
  },
  {
    id: 9,
    name: 'Valve',
    description: 'Desarrolladora estadounidense creadora de sagas como Half-Life, Portal y Left 4 Dead.',
    image: null,
  },
]