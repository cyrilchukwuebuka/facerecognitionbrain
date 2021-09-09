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

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/versions/45fb9a671625463fa646c3523a3087d5/outputs",
      requestOptions
    )
      .then((response) =>
      response.json()
      )
      .then((result) =>
      console.log(result)
      // console.log(outputs[0].data.regions[0].result.regions[0].region_info.bounding_box)
      )
      .catch((error) => console.log("error", error));
  };

  calculateFaceLocation = (data) => {};

  onInputChange = (e) => {
    this.setState({input: e.target.value})
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
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

// ca74817fc07c4208a9bf377b9ae75230;API KEY
