import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Router from "./routes";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import useTheme from "./hooks/useTheme";
const store = createStore(reducers);

function App() {
  const {themeColor} = useTheme();
  
  return (
    <ThemeProvider theme={themeColor}>
      <Provider store={store}>
        <Router />
        <GlobalStyle />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
