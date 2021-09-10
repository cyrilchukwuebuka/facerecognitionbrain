import React, { Component } from "react";
import "./App.css";
import Navigation from "./component/Navigation/Navigation";
import Logo from "./component/Logo/Logo";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";




const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (result) => {
    const clarifaiFace = result.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  };

  displayFaceBox(box){
    console.log(box)
    this.setState({box: box})
  }

  imageDetect = () => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "z2ncvmcz35wz_5161_5_2651",
        app_id: "d02d3ac77a764045ac8014d1d768c92b",
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key ca74817fc07c4208a9bf377b9ae75230",
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/versions/45fb9a671625463fa646c3523a3087d5/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        this.displayFaceBox(this.calculateFaceLocation(result))
        // console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
      )
      .catch((error) => console.log("error", error));
  };

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log("click");
    this.imageDetect();
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

// ca74817fc07c4208a9bf377b9ae75230;API KEY
// https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_960_720.jpg