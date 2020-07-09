import React from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";

const Row = styled.div`
  hight: 100%;
  width: 100%;
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const RowHeight = styled.div`
  height: 40vh;
`;

const Img = styled.img`
  height: 70%;
  margin: 10px;
`;

class App extends React.Component {
  state = { photos: [], text: "", videos: [] };

  // componentDidMount() {
  //   // axios
  //   //   .get("https://api.pexels.com/v1/search", {
  //   //     headers: {
  //   //       Authorization:
  //   //         "563492ad6f91700001000001c19522b6f6e14e76bee8c64b6e1dfd40",
  //   //     },
  //   //     params: {
  //   //       query: "Tigers",
  //   //     },
  //   //   })
  //   //   .then((res) => {
  //   //     console.log(res.data.photos);
  //   //     this.setState({
  //   //       photos: res.data.photos,
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // }

  getInputHandle = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  searchHandle = () => {
    axios
      .get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization:
            "563492ad6f91700001000001c19522b6f6e14e76bee8c64b6e1dfd40",
        },
        params: {
          query: this.state.text,
        },
      })
      .then((res) => {
        console.log(res.data.photos);
        this.setState({
          photos: res.data.photos,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  searchVideoHandle = () => {
    axios
      .get("https://api.pexels.com/videos/search", {
        headers: {
          Authorization:
            "563492ad6f91700001000001c19522b6f6e14e76bee8c64b6e1dfd40",
        },
        params: {
          query: this.state.text,
        },
      })
      .then((res) => {
        console.log(res.data.videos);
        this.setState({
          videos: res.data.videos,
        });
      });
  };

  render() {
    return (
      <div className="App">
        <input type="text" onChange={(e) => this.getInputHandle(e)} />
        <button onClick={this.searchVideoHandle}>Search</button>
        {/* <Row>
          {this.state.photos.map((photo) => {
            return (
              <RowHeight key={photo.id}>
                <Img src={photo.src.medium} alt={photo.id} />
              </RowHeight>
            );
          })}
        </Row> */}
        {this.state.videos.map((video) => {
          return (
            <video controls key={video.id} width={320} height={240}>
              <source src={video.video_files[0].link} />
            </video>
          );
        })}
      </div>
    );
  }
}

export default App;
