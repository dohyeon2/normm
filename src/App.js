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
import Tournament from './pages/Tournament';
import Loading from "./components/Loading";
import GlobalComponents from "./components/GlobalComponents";
import Statistic from "./pages/Statistic";
import { Error404 } from "./pages/ErrorPage";
import useUser from "./hook/useUser";
import { useEffect } from "react";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const { refreshUser } = useUser();
  useEffect(() => {
    refreshUser();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledAppContainer id="app">
        <Appbar />
        <Switch>
          <Route path="/making/:id">
            <Making />
          </Route>
          <Route path="/making">
            <Making />
          </Route>
          <Route path="/tournament/:id">
            <Tournament />
          </Route>
          <Route path="/statistic/:id">
            <Statistic />
          </Route>
          <Route path="/loading">
            <Loading />
          </Route>
          <Route path="/404">
            <Error404 />
          </Route>
          <Route path="/adminLogin">
            <AdminLogin />
          </Route>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        <GlobalComponents />
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