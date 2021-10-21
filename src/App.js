import Appbar from "./components/Appbar";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {
  Switch,
  Route,
} from "react-router-dom";
import defaultTheme from "./theme";
import Main from "./pages/Main";
import Making from "./pages/Making";
import Loading from "./components/Loading";
import { useSelector } from 'react-redux';
import Tournament from './pages/Tournament';

function App() {
  const { globalReducer: global } = useSelector(s => s);
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledAppContainer>
        <Appbar />
        <Switch>
          <Route path="/making">
            <Making />
          </Route>
          <Route path="/tournament/:id">
            <Tournament />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
        {<Loading loading={global.loading} />}
      </StyledAppContainer>
    </ThemeProvider>
  );
}

export default App;

const StyledAppContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  width:100%;
  height:100%;
  font-size:10px;
  display:flex;
  flex-direction: column;
  background-color:${props => props.theme.color.background};
`;