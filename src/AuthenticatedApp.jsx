import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home/home";
import Team from "./components/team/team";
import Message from "./components/message/message";
import Partners from "./components/partners/partners";
import Portfoliocategories from "./components/portfoliocategories/portfoliocategories";
import Portfolio from "./components/portfolio/portfolio";

function AuthenticatedApp() {
  const [lang, setLang] = React.useState(JSON.parse(window.localStorage.getItem('lang')) || 'uz');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
        <Route path="/team" element={<Team lang={lang} setLang={setLang} />} />
        <Route path="/message" element={<Message lang={lang} setLang={setLang} />} />
        <Route path="/partners" element={<Partners lang={lang} setLang={setLang} />} />
        <Route path="/portfoliocategories" element={<Portfoliocategories lang={lang} setLang={setLang} />} />
        <Route path="/portfolio" element={<Portfolio lang={lang} setLang={setLang} />} />
      </Routes>
    </>
  );
}

export default AuthenticatedApp;
