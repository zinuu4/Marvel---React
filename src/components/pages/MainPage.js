import { useState } from "react";
import { motion } from "framer-motion";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import motionParams from "../../services/motionParams";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
      setChar(id);
  }

  return (
    <motion.div {...motionParams}>

      <ErrorBoundary>
          <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
          <ErrorBoundary>
              <CharList 
                  onCharSelected={onCharSelected}
                  charId={selectedChar}/>
          </ErrorBoundary>
          <ErrorBoundary>
              <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
      
    </motion.div>
  )
}

export default MainPage;