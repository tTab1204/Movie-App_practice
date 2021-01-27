import React, { useEffect, useState } from "react";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  ETERNAL_API_URL,
} from "../../Config";
import { Row, Button } from "antd";
import MainImage from "./Sections/MainImage";
import GridCards from "./Sections/GridCards";
import { E_data } from "../../E_Config";
import { FaCode } from "react-icons/fa";

function LandingPage() {
  //영화정보 저장 state
  const [Movies, setMovies] = useState([]);
  const [MainImages, setMainImages] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(1);

  const [E_Data, setE_Data] = useState([]);

  const getMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        // 영화 데이터용
        setMovies([...Movies, ...response.results]);
        setMainImages(response.results[0]);
        setCurrentPage(response.page);

        // Etneral Return
        // setE_Data([response])
      });
  };

  useEffect(() => {
    // const E_endpoint = `${E_data}`;
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US%page=1`;
    getMovies(endpoint);
  }, []);

  const onLoadMore = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;

    getMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* MainImages를 가져오기전에 페이지를 랜더링해버려서 
            backdrop_path가 null로 표시되는 오류가 발생한다.
        */}
      {/* 메인 이미지 부분 */}
      {MainImages && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainImages.backdrop_path}`}
          title={MainImages.title}
          description={MainImages.overview}
        />
      )}
      {/* 영화 전체 Grid Cards */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>최신 영화</h2>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  LandingPage
                  movieId={movie.id}
                  movieName={movie.title}
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      {/* 더보기 버튼 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onLoadMore}>더 보기</Button>
      </div>
    </div>
  );
}

export default LandingPage;
