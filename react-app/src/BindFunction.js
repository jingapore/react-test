import React from "react";

// test how different approaches to rendering function 
// according to: https://reactjs.org/docs/faq-functions.html

class ButtonFunction1 extends React.Component {
    constructor(props) {
        super(props);
        this.eventHandler = this.eventHandler.bind(this);
        this.state = {count: 0};
    }

    eventHandler(event) {
        console.log(event);
        console.log(this);
        this.setState((previousState, props)=>({count: previousState.count+1}));
    }

    render() {
        return (
            <div>
                <button onClick={this.eventHandler}>Bind In Constructor, state is {this.state.count}</button>
            </div>)
    }
}

class ButtonFunction2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    eventHandler(event) {
        console.log(event);
        console.log(this);
        this.setState((previousState, props)=>({count: previousState.count+1}));
    }

    render() {
        return (
            <div>
                <button onClick={() => this.eventHandler()}>Arrow Function in Render, state is {this.state.count}</button>
            </div>)
    }
}

class ButtonFunction3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    eventHandler(event) {
        console.log(event);
        console.log(this);
        this.setState((previousState, props)=>({count: previousState.count+1}));
    }

    render() {
        return (
            <div>
                <button onClick={this.eventHandler}>No Bind In Constructor, state is {this.state.count}</button>
            </div>
        )
    }
}

export class BindFunction extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ButtonFunction1 />
                <ButtonFunction2 />
                <ButtonFunction3 />
            </div>
        )
    }
}