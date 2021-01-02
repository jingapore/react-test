import React, { useState, useRef, createRef, useEffect, Component } from "react";
import * as d3 from "d3";

const generateDataset = () => {
  Array(10).fill(0).map(() => ([
    Math.random() * 80 + 10,
    Math.random() * 35 + 10,
  ]))
}

const generateCircles = () => {

}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Svg = () => {
  return (
    <svg style={{ border: "2px solid gold" }} />
  )
}

const Circles = () => {
  const [dataset, setDataset] = useState(
    generateDataset()
  )
  const ref = useRef()
  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement.selectAll("circle")
      .data(dataset)
      .join("circle")
      .attr("cx", d => d[0])
      .attr("cy", d => d[1])
      .attr("r", 3)
  }, [dataset])
  useInterval(() => {
    const newDataset = generateDataset()
    setDataset(newDataset)
  }, 2000)
  return (
    <svg
      viewBox="0 0 100 50"
      ref={ref}
    />
  )
}

const AnimatedCircles = () => {
  const [visibleCircles, setVisibleCircles] = useState(
    generateCircles()
  )
  const [dataset, setDataset] = useState(
    generateDataset()
  )
  const ref = useRef()
  useInterval(() => {
    setVisibleCircles(generateCircles())
  }, 2000)
  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement.selectAll("circle")
      .data(visibleCircles, d => d)
      .join(
        enter => (
          enter.append("circle")
            .attr("cx", d => d * 15 + 10)
            .attr("cy", 10)
            .attr("r", 0)
            .attr("fill", "cornflowerblue")
            .call(enter => (
              //call invokes function, in this case enter, once, passing in the selection, i.e. elements to DOM
              //(https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_call)
              //"You also animate enter, update and exit by creating transitions inside the enter, update and exit functions.
              //To avoid breaking the method chain, use selection.call to create transitions, or return an undefined enter or update selection to prevent merging: 
              //the return value of the enter and update functions specifies the two selections to merge and return by selection.join."
              enter.transition().duration(1200)
                .attr("cy", 10)
                .attr("r", 6)
                .style("opacity", 1)
            ))
        ),
        update => (
          update.attr("fill", "lightgrey")
        ),
        exit => (
          exit.attr("fill", "tomato")
            .call(exit => (
              exit.transition().duration(1200)
                .attr("r", 0)
                .style("opacity", 0)
                .remove()
            ))
        ),
      )
  }, [visibleCircles])
  return (
    <svg
      viewBox="0 0 100 20"
      ref={ref}
    />
  )
}

export const DataForGroupInSelection = () => {

  const ref = useRef();

  useEffect(() => {

    var selection_1 = d3.select(ref.current)
      .selectAll("div")
      .data(["a", "b", "c"], d => d)
      .join(
        enter => (enter.append("div").attr("id", d => "id_" + d).text(d => d).style("color", "green"))
      );

    var selection_2 = d3.select(ref.current)
      .selectAll("div")
      // .data(
      //   ["z", "y", "x", "d", "c", "b"], 
      //   function(d) {
      //     return d
      //   }
      //   ).join(enter => enter.append("div").text(d => "new: " + d).style("color", "red"))
      .data(
        [{ name: "z", value: "z-value" }, { name: "y", value: "y-value" }, { name: "x", value: "x-value" }, { name: "d", value: "d-value" }, { name: "c", value: "c-value" }, { name: "b", value: "b-value" }],
        function (d) {
          console.log("Using `this` object is...");
          console.log(this.__data__);
          console.log("Using `d` object is...");
          console.log(d);
          return d.name ? d.name : d; //test if d.name exists, if does not exist, return d
        }
      ).join(enter => enter.append("div").text(d => "new: " + d.name + " with value: " + d.value).style("color", "red"))


    console.log(d3.select(ref.current).selectAll("div").each((d, i) => { console.log("The data in created div with index " + i + " is " + d) }));
  });

  return (
    <div
      ref={ref}
      class="ref-class"
    />
  )

}

export class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [10, 20], value: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeData = this.changeData.bind(this);
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  changeData(event) {
    event.preventDefault();
    this.setState({ data: [...this.state.data, this.state.value].map(Number) });
    console.log("add data using changeData func to " + this.state.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.changeData}>
          <input type="text" value={this.state.value} onChange={this.handleInputChange} />
          <input type="submit" value="Submit" />
        </form>
        <BarChart data={this.state.data} size={[500, 500]} />
      </div>
    )
  }
}

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.barChartRef = createRef();
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {

    const data = this.props.data;
    console.log("inside drawChart func");
    console.log(data);
    console.log(data.length);

    const svg_width = this.props.size[0];
    const svg_height = this.props.size[1];
    const svg = d3.select(this.barChartRef.current)
      .attr("width", svg_width)
      .attr("height", svg_height);
    console.log(Math.max(data));
    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, svg_width]);
    const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([0, svg_height]);

    svg.selectAll("rect")
      .data(data)
      .join(
        enter => enter
          .append("rect")
          .attr("fill", "red"),

        update => update
          .attr("fill", "green")
      )
      .attr("x", (d, i) => {
        return xScale(i);
      })
      .attr("y", (d, i) => {
        console.log("looking at yScale now");
        console.log(yScale(d)); 
        return (svg_height - yScale(d))
      })
      .attr("width", 25)
      .attr("height", (d, i) => yScale(d));
  }

  render() {
    return (
      <div>
        <svg ref={this.barChartRef} />
        <p>
          Data is {this.props.data.map((item, index) => (<div> #{index}: {item} </div>))}
        </p>
      </div>
    )
  }
}