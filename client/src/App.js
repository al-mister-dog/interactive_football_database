import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useGlobalContext } from "./context";
import Nav from "./components/Nav/Nav";
import theme from "./styles/Theme";
import Table from "./pages/Table";
import UserList from "./components/UserList";
import SingleUser from "./pages/SingleUser";
import Leagues from "./pages/Leagues"
import Error from "./pages/Error";

function App() {
  const { footy } = useGlobalContext()


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Table />
          </Route>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/user-list">
            <UserList />
          </Route>
          <Route path="/user/:id">
            <SingleUser />
          </Route>
          <Route exact path="/leagues/:id">
            <Leagues />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
      <div>
        <p>{footy}</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
