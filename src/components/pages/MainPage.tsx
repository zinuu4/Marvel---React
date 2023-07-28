import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import motionParams from "../../services/motionParams";

import decoration from "../../resources/img/vision.png";

const MainPage: React.FC = () => {
  const [selectedChar, setChar] = useState<number | null>(null);

  const onCharSelected = (id: number) => {
    setChar(id);
  };

  return (
    <motion.div {...motionParams}>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>

      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} charId={selectedChar} />
        </ErrorBoundary>

        <div style={{ position: "sticky", top: "10px" }}>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </motion.div>
  );
};

export default MainPage;
