import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PrivateRouteLogin from "./Components/PrivateRouteLogin";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRouteLogin exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
