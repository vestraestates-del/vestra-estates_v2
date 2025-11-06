
export interface WineItem {
  id: number;
  name: string;
  vineyard: string;
  vintage: number;
  region: string;
  value: string;
  image: string;
  description: string;
}

export const initialWines: WineItem[] = [
  {
    id: 1,
    name: "Domaine de la Romanée-Conti, Romanée-Conti Grand Cru",
    vineyard: "Domaine de la Romanée-Conti",
    vintage: 1990,
    region: "Burgundy, France",
    value: "Est. $28,000/bottle",
    image: "https://images.pexels.com/photos/925687/pexels-photo-925687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Often considered the pinnacle of Pinot Noir, a legendary vintage from one of the world's most revered producers."
  },
  {
    id: 2,
    name: "Screaming Eagle Cabernet Sauvignon",
    vineyard: "Screaming Eagle Winery",
    vintage: 1992,
    region: "Napa Valley, USA",
    value: "Est. $500,000 (6L)",
    image: "https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "The inaugural vintage of Napa's most famous cult wine, a benchmark for California Cabernet with unparalleled rarity."
  },
  {
    id: 3,
    name: "Château d'Yquem",
    vineyard: "Château d'Yquem",
    vintage: 1811,
    region: "Sauternes, Bordeaux, France",
    value: "Est. $117,000/bottle",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "The 'Comet Vintage', one of the most legendary sweet wines ever produced, renowned for its longevity and complexity."
  },
  {
    id: 4,
    name: "Penfolds Grange Hermitage",
    vineyard: "Penfolds",
    vintage: 1951,
    region: "South Australia, Australia",
    value: "Est. $142,000/bottle",
    image: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "The first experimental vintage of Australia's most iconic wine. A piece of winemaking history with fewer than 20 bottles known to exist."
  }
];
