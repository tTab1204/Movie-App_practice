import React, { useState, useEffect } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import { Row, Button } from "antd";
import GridCards from "../LandingPage/Sections/GridCards";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState(null);
  const [OpenActorToggle, setOpenActorToggle] = useState(false);
  const [Actors, setActors] = useState([]);

  useEffect(() => {
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setActors(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    setOpenActorToggle(!OpenActorToggle);
  };

  return (
    <div>
      {/* Header */}
      {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* 좋아요 버튼 */}
          {Movie && (
            <Favorite
              userFrom={localStorage.getItem("userId")}
              movieId={movieId}
              movieInfo={Movie}
            />
          )}
        </div>
        {/* 영화정보 부분 */}
        {Movie && <MovieInfo movie={Movie} />}

        {/* 출연진 부분(더 보기) */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={toggleActorView}>출연진 보기</Button>
        </div>
        {OpenActorToggle && (
          <Row gutter={[16, 16]}>
            {/* && =조건문과 같다. */}
            {Actors &&
              Actors.map((actors, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      actors.profile_path
                        ? `${IMAGE_BASE_URL}w500${actors.profile_path}`
                        : null
                    }
                    actorName={actors.original_name}
                    characterName={actors.character}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
