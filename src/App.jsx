import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes.jsx";
import ScrollToTop from "./routes/ScrollToTop.jsx";

function App() {
  return (
    <div className="app">
      <ScrollToTop/>
      <AllRoutes />
    </div>
  );
}
export default App;
