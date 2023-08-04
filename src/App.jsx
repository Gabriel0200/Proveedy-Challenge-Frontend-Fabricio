import { BrowserRouter } from "react-router-dom";
import { ReactRouter } from "./components/ReactRouter";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ReactRouter />
      </BrowserRouter>
    </>
  );
};
