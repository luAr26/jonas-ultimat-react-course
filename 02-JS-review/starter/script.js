const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}
const books = getBooks();

const book = getBook(3);
// const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
//   book;
// genres;

// // const primaryGenre = genres[0];
// const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
// primaryGenre;
// secondaryGenre;
// otherGenres;

// const newGenres = [...genres, "horror"];
// console.log(newGenres);
// const updatedBook = {
//   ...book,
//   // Add new property
//   moviePublicationDate: "12.01.2022",
//   // Update property
//   pages: 1210,
// };
// console.log(updatedBook);
// const summary = `${title} was published on ${
//   publicationDate.split("-")[0]
// } and has ${pages} pages. And to not forget, it was written by ${author}.`;
// console.log(summary);

// const stringPages =
//   pages > 1000 ? "Over one thousand" : "Less than a thousand.";
// console.log(stringPages);

// function getYear(date) {
//   return date.split("-")[0];
// }

// const arrowGetYear = (date) => date.split("-")[0];

// const yearPublished = arrowGetYear(publicationDate);
// yearPublished;
// console.log(hasMovieAdaptation && "has movie adaptation.");

// // falsy: 0, null, undefined, "", NaN
// console.log(true && "Some string");
// console.log(false && "other string");

// console.log(true || "Some other string");
// console.log(false || NaN);

// const spanishTranslation = book.translations.spanish || "NOT TRANSLATED";
// console.log(spanishTranslation);

// const count = book.reviews.librarything?.reviewsCount ?? "no data";
// count;

// const getTotalReviewCount = (book) => {
//   const goodreads = book.reviews.goodreads.reviewsCount;
//   const librarything = book.reviews.librarything?.reviewsCount ?? 0;
//   return goodreads + librarything;
// };
// console.log(getTotalReviewCount(book));

/*
const bookTitles = data.map((book) => book.title);
bookTitles;

const longBooks = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.translations.korean)
  .map((book) => book.title);
longBooks;
console.log(longBooks);

const pagesOfBook = books.reduce((sum, book) => sum + book.pages, 0);
pagesOfBook;

const x = [2, 3, 10, 283, 23, 18];
const sorted = x.slice().sort((a, b) => b - a);
x;

const sortedByPages = [...books].sort((a, b) => a.pages - b.pages);
console.log(sortedByPages);

// Add book object to array
const newBook = {
  title: "Harry Potter and the chamber of secrets",
  author: "J.K. Rollings",
};
const booksAfterAdd = [...books, newBook];
booksAfterAdd;

// Delete a book
const booksAfterDelete = books.filter((book) => book.id !== 3);
booksAfterDelete;

// `Update a book object in array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 200 } : book
);
console.log(booksAfterUpdate); */
// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => response.json())
//   .then((json) =>
//     console.log(
//       json.filter((todo) => todo.userId === 1).map((todo) => todo.title)
//     )
//   );

async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
}

const todos = await getTodos();
console.log(todos);
