import Appbar from "./components/Appbar";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import defaultTheme from "./theme";
import Main from "./pages/Main";
import Making from "./pages/Making";

function App() {
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <StyledAppContainer>
          <Appbar />
          <Switch>
            <Route path="/making">
              <Making />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </StyledAppContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;

const StyledAppContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  width:100%;
  height:100%;
  font-size:10px;
  background-color:${props => props.theme.color.background};
`;