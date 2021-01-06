import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import style from "./App.module.css";
import Main from "./component/Main";
import Login from "./component/Login";
import Register from "./component/Register";
const setting = {
  type: "story",
  dateRange: "all",
  sort: "byPopularity",
  query: "",
  page: 0,
};
function App() {
  return (
    <div className={style.app}>
      <div className={style.container}>
        <Router>
          <Switch>
            <Route
              exact
              path="/query=:query?/sort=:sort/page=:page/dateRange=:dateRange/type=:type"
            >
              <Main />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Redirect
              to={`/query=${setting.query}/sort=${setting.sort}/page=${setting.page}/dateRange=${setting.dateRange}/type=${setting.type}`}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
