import React from "react";

const movies = [
  {
    id: 1,
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
  },
  {
    id: 2,
    title: "John Wick",
    director: "Chad Stahelski",
    year: 2014,
    genre: "Action",
    rating: 7.4,
  },
  {
    id: 3,
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019,
    genre: "Thriller",
    rating: 8.5,
  },
  {
    id: 4,
    title: "The Batman",
    director: "Matt Reeves",
    year: 2022,
    genre: "Crime",
    rating: 7.8,
  },
  {
    id: 5,
    title: "Avatar",
    director: "James Cameron",
    year: 2009,
    genre: "Fantasy",
    rating: 7.9,
  },
];

function MovieCard(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>Director: {props.director}</p>
    </div>
  );
}

function Shell({ children }) {
  return <div>{children}</div>;
}

function App() {
  return (
    <>
      <div>
        {movies.map((movie) => (
          <Shell key={movie.id}>
            <MovieCard title={movie.title} director={movie.director} />
          </Shell>
        ))}
      </div>
    </>
  );
}

export default App;
