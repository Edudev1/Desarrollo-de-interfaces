const categoryImg = (file) =>
  new URL(`../assets/images/categories/${file}`, import.meta.url).href

export const categories = [
  {
    id: 1,
    name: 'Acción',
    description: 'Videojuegos centrados en el combate, los reflejos y el dinamismo.',
    image: categoryImg('categoriaAccion.png'),
  },
  {
    id: 2,
    name: 'Aventura',
    description: 'Centrados en la exploración y la historia, con mundos inmersivos y narrativas épicas.',
    image: categoryImg('categoriaAventura.png'),
  },
  {
    id: 3,
    name: 'Deportes',
    description: 'Juegos basados en disciplinas deportivas como fútbol, baloncesto y más.',
    image: categoryImg('categoriaDeportes.png'),
  },
  {
    id: 4,
    name: 'Estrategia',
    description: 'Títulos que requieren planificación táctica y toma de decisiones.',
    image: categoryImg('categoriaEstrategia.png'),
  },
  {
    id: 5,
    name: 'RPG',
    description: 'Role Playing Games donde el jugador progresa y desarrolla habilidades.',
    image: categoryImg('categoriaRPG.png'),
  },
  {
    id: 6,
    name: 'Carreras',
    description: 'Videojuegos centrados en competencias de velocidad con vehículos.',
    image: categoryImg('categoriaCarreras.png'),
  },
  {
    id: 7,
    name: 'Simulación',
    description: 'Juegos que recrean experiencias de la vida real o actividades especializadas.',
    image: categoryImg('categoriaSimulacion.png'),
  },
  {
    id: 8,
    name: 'Battle Royale',
    description: 'Juegos de supervivencia donde muchos jugadores compiten hasta quedar uno.',
    image: categoryImg('categoriaBattleRoyale.png'),
  },
  {
    id: 9,
    name: 'Lucha',
    description: 'Ofrecen combates intensos entre personajes con habilidades únicas.',
    image: null,
  },
]