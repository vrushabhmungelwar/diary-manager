import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./routes/login";
import { SignUp } from "./routes/signup";
import { AddEvents } from "./routes/Addevent";
import { Forgot } from "./routes/forgotpassword";
import { Reset } from "./routes/resetpassword";
import { EventList } from "./routes/eventlist";
import { AppBar, Button, Toolbar } from "@mui/material";
import { AddToDiary } from "./routes/addToDiary";
import { Diary } from "./routes/diary";

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <AppBar position="static" style={{ marginBottom: "24px" }} >
        <Toolbar variant="dense">
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/")}
          >
            Home
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/list")}
          >
            Events
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/addEvents")}
          >
            Add Event
          </Button>

          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/diary")}
          >
            Diary
          </Button>

          <Button
            variant="text"
            color="inherit"
            sx = {{marginLeft:"auto"}}
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/signUp")}
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/addEvents">
          <AddEvents />
        </Route>
        <Route path="/forgotpassword">
          <Forgot />
        </Route>
        <Route path="/resetpassword">
          <Reset />
        </Route>
        <Route path="/list">
          <EventList />
        </Route>
        <Route path="/add">
          <AddToDiary />
        </Route>
        <Route path="/diary">
          <Diary />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
