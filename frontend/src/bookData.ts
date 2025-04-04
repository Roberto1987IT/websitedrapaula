// Import book cover images
import book1 from "./assets/courses/image1.png";
import book2 from "./assets/courses/image2.png";
import book3 from "./assets/courses/image3.png";
import book4 from "./assets/courses/image4.jpg";
import book5 from "./assets/courses/capa-a-integracao-sensorial-ocupacional-na-infancia.png"
import book6 from "./assets/courses/a-linguagem-e-o-brincar-em-condicoes-neurodiverso.png"
import book7 from "./assets/courses/instrumento-de-avaliacao-do-modelo-ludico.png"
import book8 from "./assets/courses/the-role-of-play-in-child-assessment-and-intervetion.png"
export interface Book {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: "impresso" | "ebook" | "audiobook" | "bundle";
  rating: number;
  reviews: number;
  featured?: boolean;
  author: string;
  publicationDate: string;
  publisher: string;
  language: string;
  pages?: number;
  isbn?: string;
  tags: string[];
  dimensions?: string;
  weight?: string;
  format?: string;
  fileSize?: string;
  duration?: string;
  previewLink?: string;
  availability: "in-stock" | "pre-order" | "out-of-stock" | "limited";
  stock?: number;
  recommendedAge?: string;
  relatedBooks?: number[];
  bestSeller?: boolean;
  newRelease?: boolean;
  downloadUrl?: string;
}

export const books: Book[] = [
  {
    id: 1,
    image: book1,
    title: "A crianca e a Motricidade Fina",
    description: "A motricidade fina é a maneira como usamos os nossos braços, mãos e dedos. Refere-se às competências necessárias para manipular um objeto, ou seja, como usar a mão e os dedos de forma precisa, de acordo com a exigência da atividade.O desenvolvimento da motricidade fina é essencial para a interação da criança com o meio e acontece quando a criança se relaciona com objetos e usa ferramentas, por exemplo nas atividades da vida diária. Este livro foca-se no desenvolvimento da motricidade fina, nas diversas faixas etárias da infância, ilustrando a sua relação com o dia a dia da criança. Para além do desenvolvimento, explora as competências necessárias para que a motricidade fina se desenvolva sem problemas.São ainda, aconselhados equipamentos e materiais, que podem ajudar as crianças que apresentam dificuldades nesta área.",
    price: 14,
    category: "impresso",
    rating: 4.5,
    reviews: 28,
    featured: true,
    author: "Paula Serrano",
    publicationDate: "2016-09-15",
    publisher: "Papa-Letras",
    language: "Português",
    pages: 120,
    isbn: "9789898214591",
    tags: ["desenvolvimento infantil", "educação", "motricidade", "habilidades manuais"],
    dimensions: "172 x 245 x 7 mm",
    weight: "320g",
    availability: "in-stock",
    stock: 45,
    recommendedAge: "Educadores e pais de crianças de 2-7 anos",
    relatedBooks: [4, 3],
    bestSeller: true,
    newRelease: false
  },
  {
    id: 2,
    image: book2,
    title: "A Integracao Sensorial",
    description: "A integração sensorial é o processo neurológico que organiza as nossas sensações, é a base para todas as formas de aprendizagem para que possamos viver no mundo e este faça sentido. É o alicerce para a aprendizagem académica, para as competências necessárias à realização das atividades da vida diária e sociais, e mesmo para a capacidade de ter empatia pelo outro.Aquilo que vemos, cheiramos, ouvimos, saboreamos ou tocamos é decifrado a cada momento na nossa experiência de viver, juntamente com os nossos «sentidos secretos»: vestibular e propriocetivo. Quando a criança tem problemas no processamento das sensações (disfunção de integração sensorial) tem dificuldade em usar a informação recebida pelos sentidos para conseguir funcionar eficientemente nas atividades quotidianas - podem surgir problemas de coordenação motora, dificuldades na regulação do sono, na alimentação, na atenção, no desempenho das atividades de autocuidado, na aprendizagem, no brincar e no desenvolvimento emocional e social.",
    price: 14.90,
    category: "impresso",
    rating: 5,
    reviews: 42,
    author: "Paula Serrano",
    publicationDate: "2018-09-20",
    publisher: "Papa-Letras",
    language: "Português",
    pages: 168,
    format: "Livro",
    fileSize: "8.2 MB",
    tags: ["integração sensorial", "desenvolvimento infantil", "brincadeiras", "neuroeducação"],
    availability: "in-stock",
    previewLink: "https://example.com/preview/integracao-sensorial",
    recommendedAge: "Profissionais e pais de crianças de 0-5 anos",
    relatedBooks: [3, 1],
    bestSeller: true,
    newRelease: true
  },
  {
    id: 3,
    image: book3,
    title: "Brincar e Integracao Sensorial Nos Primeiros Anos",
    description: "Todos os bebés nascem com características que os tornam únicos. Gradualmente vão-se adaptando à família e ao meio onde nascem e, de forma natural, o desenvolvimento acontece e a autonomia vai surgindo, à medida que se envolvem e se movem no ciclo de vida da família. Desenvolvimento é o termo usado para descrever as mudanças no crescimento físico da criança e na sua capacidade de aprender em termos de comportamento sensório-motor, socioemocional, cognitivo e em competências de comunicação. Todas estas áreas estão ligadas e cada uma depende e influencia as outras, sendo visíveis no comportamento do bebé e na sua cada vez maior autonomia.",
    price: 16.00,
    originalPrice: 24.99,
    category: "impresso",
    rating: 5,
    reviews: 15,
    author: "Paula Serrano",
    publicationDate: "2024-03-30",
    publisher: "Papa-Letras",
    language: "Português",
    pages: 240,
    format: "Livro",
    fileSize: "6.5 MB",
    tags: ["integração sensorial", "brincadeiras", "primeiros anos", "atividades práticas"],
    availability: "in-stock",
    previewLink: "https://example.com/preview/brincar-integracao",
    recommendedAge: "Pais e educadores de crianças de 0-3 anos",
    relatedBooks: [2, 4],
    bestSeller: false,
    newRelease: true
  },
  {
    id: 4,
    image: book4,
    title: "O Desenvolvimento da Autonomia dos 0 aos 3 anos",
    description: "Todos os bebés nascem com características que os tornam únicos. Gradualmente vão-se adaptando à família e ao meio onde nascem e, de forma natural, o desenvolvimento acontece e a autonomia vai surgindo, à medida que se envolvem e se movem no ciclo de vida da família. Desenvolvimento é o termo usado para descrever as mudanças no crescimento físico da criança e na sua capacidade de aprender em termos de comportamento sensório-motor, socioemocional, cognitivo e em competências de comunicação. Todas estas áreas estão ligadas e cada uma depende e influencia as outras, sendo visíveis no comportamento do bebé e na sua cada vez maior autonomia.",
    price: 18.00,
    category: "impresso",
    rating: 4.5,
    reviews: 36,
    featured: true,
    author: "Paula Serrano",
    publicationDate: "2017-04-10",
    publisher: "Papa-Letras",
    language: "Português",
    pages: 200,
    isbn: "9789898214645",
    tags: ["autonomia infantil", "desenvolvimento", "metodologia montessori", "primeira infância"],
    dimensions: "188 x 258 x 15 mm",
    weight: "380g",
    availability: "in-stock",
    stock: 12,
    recommendedAge: "Pais e cuidadores de crianças de 0-3 anos",
    relatedBooks: [1, 2],
    bestSeller: false,
    newRelease: false
  },
  // Add 4 eBooks here
  {
    id: 5,
    image: book5,
    title: "A Integração Sensorial e o Engajamento Ocupacional na Infância (eBook)",
    description: "Este eBook explora a relação entre integração sensorial e engajamento ocupacional na infância, fornecendo ferramentas práticas para profissionais e pais.",
    price: 9.99,
    originalPrice: 14.99,
    discount: 33,
    category: "ebook",
    rating: 4.8,
    reviews: 52,
    featured: true,
    author: "Paula Serrano",
    publicationDate: "2023-05-10",
    publisher: "Papa Letras",
    language: "Português",
    pages: 180,
    format: "PDF",
    fileSize: "4.5 MB",
    tags: ["integração sensorial", "engajamento ocupacional", "desenvolvimento infantil", "ebook"],
    availability: "in-stock",
    stock: 12,
    recommendedAge: "Profissionais e pais de crianças de 0-8 anos",
    relatedBooks: [2, 3],
    bestSeller: true,
    newRelease: true,
    downloadUrl: "/pdfs/Integracao-Sensorial-Engajamento-Ocupacional.pdf"
  },
  {
    id: 6,
    image: book6,
    title: "A Linguagem e o Brincar em Condicoes Neurodiversas (eBook)",
    description: "Uma coleção completa de atividades e brincadeiras sensoriais para estimular o desenvolvimento infantil de forma natural e divertida.",
    price: 7.99,
    originalPrice: 11.99,
    discount: 33,
    category: "ebook",
    rating: 4.9,
    reviews: 78,
    featured: true,
    author: "Paula Serrano",
    publicationDate: "2023-06-15",
    publisher: "Papa-Letras",
    language: "Português",
    pages: 120,
    format: "PDF",
    fileSize: "3.8 MB",
    tags: ["brincadeiras sensoriais", "atividades práticas", "desenvolvimento infantil", "ebook"],
    availability: "in-stock",
    recommendedAge: "Pais e educadores de crianças de 1-6 anos",
    relatedBooks: [5, 7],
    bestSeller: true,
    newRelease: true,
    downloadUrl: "/pdfs/Guia-Pratico-Brincadeiras-Sensoriais.pdf"
  },
  {
    id: 7,
    image: book7,
    title: "Instrumentos de Avaliacao do Modelo Ludico (eBook)",
    description: "Um guia essencial sobre os marcos do desenvolvimento infantil e como identificar precocemente sinais que possam necessitar de atenção especializada.",
    price: 8.99,
    originalPrice: 12.99,
    discount: 31,
    category: "ebook",
    rating: 4.7,
    reviews: 45,
    featured: false,
    author: "Paula Serrano",
    publicationDate: "2023-08-20",
    publisher: "Papa-Letras",
    language: "Português",
    pages: 150,
    format: "PDF",
    fileSize: "5.2 MB",
    tags: ["desenvolvimento infantil", "sinais de alerta", "intervenção precoce", "ebook"],
    availability: "in-stock",
    recommendedAge: "Profissionais, pais e cuidadores",
    relatedBooks: [6, 8],
    bestSeller: false,
    newRelease: true,
    downloadUrl: "/pdfs/Instrumentos-Avaliacao-Brincar-Deficiencia-Fisica.pdf"
  },
  {
    id: 8,
    image: book8,
    title: "The Role of play in child assessment and intervention (eBook)",
    description: "Um manual completo com estratégias práticas para promover a autonomia das crianças nos primeiros anos de vida, seguindo princípios de abordagens baseadas em evidências.",
    price: 6.99,
    originalPrice: 9.99,
    discount: 30,
    category: "ebook",
    rating: 4.6,
    reviews: 63,
    featured: false,
    author: "Paula Serrano",
    publicationDate: "2023-09-10",
    publisher: "Papa-Letras",
    language: "Português",
    pages: 130,
    format: "PDF",
    fileSize: "3.5 MB",
    tags: ["autonomia infantil", "primeira infância", "parentalidade", "educação", "ebook"],
    availability: "in-stock",
    stock: 0,
    recommendedAge: "Pais e educadores de crianças de 0-5 anos",
    relatedBooks: [4, 7],
    bestSeller: true,
    newRelease: true,
    downloadUrl: "/pdfs/E-book The_Role_of_Play_in_Child_Assessement and.pdf"
  }
];

// Helper functions to filter books by different criteria
export const getFeaturedBooks = () => books.filter(book => book.featured);
export const getNewReleases = () => books.filter(book => book.newRelease);
export const getBestSellers = () => books.filter(book => book.bestSeller);
export const getBooksByCategory = (category: Book['category']) => books.filter(book => book.category === category);
export const getRelatedBooks = (bookId: number) => {
  const book = books.find(b => b.id === bookId);
  if (!book || !book.relatedBooks) return [];
  return books.filter(b => book.relatedBooks?.includes(b.id));
};
