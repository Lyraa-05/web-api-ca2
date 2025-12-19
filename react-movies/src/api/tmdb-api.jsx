//updated basic discover movies to include movies that have atleast 1000 votes to avoid obscure movies, now there is a different output to popularmovies.
export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&sort_by=vote_average.desc&vote_count.gte=1000`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getUpcomingMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

//new popular movies API
export const getPopularMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Uh oh :("); 
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};


//movie Credits + Movie Recommendations new implementation
export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Failed to fetch credits");
      });
    }
    return response.json();
  });
};

export const getMovieRecommendations = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Failed to fetch recommendations");
      });
    }
    return response.json();
  });
};

export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


export const getGenres = () => {
  return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


