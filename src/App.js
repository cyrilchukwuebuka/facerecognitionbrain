import React, { Component } from "react";
import "./App.css";
import Navigation from "./component/Navigation/Navigation";
import Logo from "./component/Logo/Logo";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";

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
      input: "",
      imageUrl: ''
    };
  }

  onInputChange = () => {};

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    console.log("click");
    app.models
      .predict(
        "ca74817fc07c4208a9bf377b9ae75230",
        this.state.input)
      .then(
        function (response) {
          console.log(response);
        },
        function (err) {
          console.log(err);
        }
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;

// ca74817fc07c4208a9bf377b9ae75230;API KEY
