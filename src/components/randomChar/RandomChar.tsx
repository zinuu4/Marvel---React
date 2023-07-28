import React, { useState, useEffect } from "react";

import useMarvelService from "../../services/marvelService";
import setContent from "../../utils/setContent";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar: React.FC = () => {
  const [char, setChar] = useState({});
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 50000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (char: Char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

interface ViewProps {
  data: Char;
}

const View: React.FC<ViewProps> = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;
  let classNames = "";

  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    classNames = "randomchar__img object-fit-contain";
  } else {
    classNames = "randomchar__img object-fit-cover";
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={classNames} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a target="_blank" href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a target="_blank" href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
