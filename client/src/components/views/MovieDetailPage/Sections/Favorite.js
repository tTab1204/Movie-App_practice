import React, { useEffect, useState } from "react";
import { Button, Icon } from "antd";
import Axios from "axios";

function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const movieImage = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    movieImage: movieImage,
    movieRunTime: movieRunTime,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("좋아요 갯수를 가져오는데 실패했습니다.");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.result);
      } else {
        alert("정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에서 지우는걸 실패했습니다.");
        }
      });
    } else {
      Axios.post("/api/favorite/addFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에서 추가하는데에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button
        style={Favorited ? { color: "blue" } : { color: "gray" }}
        onClick={onClickFavorite}
      >
        {Favorited ? "좋아요" : "좋아요"} {FavoriteNumber}
        <Icon
          type="heart"
          theme={Favorited ? "filled" : "outlined"}
          style={Favorited ? { color: "blue" } : { color: "gray" }}
        />
      </Button>
    </div>
  );
}

export default Favorite;
