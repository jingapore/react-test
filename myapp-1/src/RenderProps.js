import React from "react";
import catSvg from "./static/cat.svg";
import dogSvg from "./static/dog.svg";

// class Cat extends React.Component {
//     render() {
//       const mouse = this.props.mouse;
//       return (
//         <img src={catSvg} alt="foo" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
//       );
//     }
//   }

//   class MouseWithCat extends React.Component {
//     constructor(props) {
//       super(props);
//       this.handleMouseMove = this.handleMouseMove.bind(this);
//       this.state = { x: 0, y: 0 };
//     }

//     handleMouseMove(event) {
//       this.setState({
//         x: event.clientX,
//         y: event.clientY
//       });
//     }

//     render() {
//       return (
//         <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

//           {/*
//             We could just swap out the <p> for a <Cat> here ... but then
//             we would need to create a separate <MouseWithSomethingElse>
//             component every time we need to use it, so <MouseWithCat>
//             isn't really reusable yet.
//           */}
//           <Cat mouse={this.state} />
//         <p>Location is {this.state.x} and {this.state.y}</p>
//         </div>
//       );
//     }
//   }

//   export class MouseTracker extends React.Component {
//     render() {
//       return (
//         <div>
//           <h1>Move the mouse around!</h1>
//           <MouseWithCat />
//         </div>
//       );
//     }
//   }

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src={catSvg} style={{ position: "absolute", left: mouse.x, top: mouse.y }} />
    );
  }
}

class Dog extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src={dogSvg} style={{ position: "absolute", left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

const animalComponentsForRendering = { "cat": Cat, "dog": Dog }

export class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedComponent: "cat" }
  }

  handleOnChange = (e) => {
    console.log(e.target.value);
    this.setState({
      selectedComponent: e.target.value
    });
    console.log(this.state.selectedComponent);
  }

  render() {

    const SelectedComponent = animalComponentsForRendering[this.state.selectedComponent];

    return (

      <div>

        <h1>Move the mouse around!</h1>
        <h2>Select which animal you want as your cursor</h2>

        <select onChange={this.handleOnChange}>
          {
            Object.keys(animalComponentsForRendering).map(
              (k, idx) => <option value={k}>{k}</option>
            )
          }
        </select>  

        <Mouse render={mouse => (<SelectedComponent mouse={mouse} />)} />

      </div>
    );
  }
}