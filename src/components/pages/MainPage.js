import { useState } from "react";
import { motion } from "framer-motion";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
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

        <div>

          <ErrorBoundary>
              <CharInfo charId={selectedChar}/>
          </ErrorBoundary>

          <ErrorBoundary>
            <CharSearchForm/>
          </ErrorBoundary>
          
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
      
    </motion.div>
  )
}

export default MainPage;