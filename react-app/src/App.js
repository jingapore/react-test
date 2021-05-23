import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DataForGroupInSelection, Charts } from "./D3Test";
import { RefTest } from "./Ref";
import { MouseTracker } from "./RenderProps";
import { BindFunction } from "./BindFunction";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/d3_data_for_group_in_selection">Data For Group In Selection</Link>
          <Link to="/d3_charts">Charts</Link>
          <Link to="/ref_test">Ref Test</Link>
          <Link to="/render_props">Render Props</Link>
          <Link to="/bind_function">Bind Functions</Link>
        </nav>
      </div>
      <Switch>
        <div>
          <Route path="/d3_data_for_group_in_selection">
            <DataForGroupInSelection />
          </Route>
          <Route path="/d3_charts">
            <Charts />
          </Route>
          <Route path="/ref_text">
            <RefTest />
          </Route>
          <Route path="/render_props">
            <MouseTracker />
          </Route>
          <Route path = "/bind_function">
            <BindFunction />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;