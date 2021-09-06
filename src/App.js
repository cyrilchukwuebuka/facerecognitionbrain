import React, { Component } from "react";
import "./App.css";
import Navigation from "./component/Navigation/Navigation";
import Logo from "./component/Logo/Logo";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";

import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "ca74817fc07c4208a9bf377b9ae75230",
});

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
      iput: "",
    };
  }

  onInputChange = () => {};

  onButtonSubmit = () => {
    console.log("click");
    app.models
      .predict(
        "ca74817fc07c4208a9bf377b9ae75230",
        "data:image/jpeg;base64,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"
      )
      .then(
        function (response) {
          console.log(response);
        },
        function (err) {}
      );
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
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;

// ca74817fc07c4208a9bf377b9ae75230;API KEY
