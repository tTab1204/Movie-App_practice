import React from "react";
import "./favorite.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { Popover, Icon } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Movies, setMovies] = useState([]);
  useEffect(() => {
    getFavoredMovies();
  }, []);

  const userFrom = localStorage.getItem("userId");

  const getFavoredMovies = () =>
    Axios.post("/api/favorite/getFavoredMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data.favoredVideos);
        setMovies(response.data.favoredVideos);
      } else {
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    });

  const removeMovie = (movieId, userFrom) => {
    const variables = {
      userFrom: userFrom,
      movieId: movieId,
    };

    Axios.post("/api/favorite/removeFavoredMovie", variables).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          getFavoredMovies();
        } else {
          alert("리스트에서 지우는데 실패했습니다.");
        }
      }
    );
  };

  const renderCards = Movies.map((favoredMovies, index) => {
    const content = (
      <div>
        {favoredMovies.movieImage ? (
          <img src={`${IMAGE_BASE_URL}w200${favoredMovies.movieImage}`}></img>
        ) : (
          "No Image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover
          content={content}
          title={`${favoredMovies.movieTitle}`}
          trigger="click"
        >
          <td>{favoredMovies.movieTitle}</td>
        </Popover>

        <td>{favoredMovies.movieRunTime}</td>
        <td>
          <Button
            onClick={() =>
              removeMovie(favoredMovies.movieId, favoredMovies.userFrom)
            }
          >
            <Icon type="delete" theme="filled" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2> Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
