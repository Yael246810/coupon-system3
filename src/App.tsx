import { useState } from "react";
import "./App.css";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import Main from "./Components/Layout/Main/Main";
import Menu from "./Components/Layout/Menu/Menu";
import { ToastContainer } from "react-toastify";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className={`App ${theme}`}>
        <button className="themeSwitch" onClick={changeTheme}>
          {theme === "light" ? (
            <span className="moonEmoji">🌚</span>
          ) : (
            <span className="sunEmoji">🌝</span>
          )}
        </button>
        <Header />
        <Menu />
        <Main />
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
