# Purpose
To document learnings from React.JS.

# RenderProps.js
There are two learning points.

First, the use of `this.props.render`. This is a prop that isn't defined within the component--which is called `Mouse` in RenderProps.js. But this prop can be called like a function, to pass the component's properties (in this case mouse events) to other components. Here, there are two components, `Cat` and `Dog`.

Second, following on the heels of the above, we see how JSX in the exported prop `MouseTracker` can generate multiple select options. Here, `animalComponentsForRendering` is an object (in JavaScript's data types, this is a data structure with key-value pairs). We generate multiple select options with the following code:

`Object.keys(animalComponentsForRendering).map((k, idx) => <option value={k}>{k}</option>)`.