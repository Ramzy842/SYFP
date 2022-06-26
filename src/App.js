import { Switch, useLocation } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PrivateRouteLogin from "./Components/PrivateRouteLogin";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { AnimatePresence } from "framer-motion";
import MobileLayout from "./layout/MobileLayout";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <MobileLayout>
          <PrivateRouteLogin exact path="/" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRouteLogin exact path="/signup" component={SignUp} />
        </MobileLayout>
      </Switch>
    </AnimatePresence>
  );
}

export default App;
