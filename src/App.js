import { BrowserRouter as Router, Switch } from "react-router-dom";
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
        <PrivateRouteLogin exact path="/signup" component={SignUp} />
        
      </Switch>
    </Router>
  );
}

export default App;
