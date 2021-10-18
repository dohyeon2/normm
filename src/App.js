import Appbar from "./components/Appbar";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledAppContainer>
        <Appbar />
        테스트
      </StyledAppContainer>
    </ThemeProvider>
  );
}

export default App;

const StyledAppContainer = styled.div`
  width:100%;
  height:100%;
  background-color:#1A1B1C;
`;