import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/marvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

interface CharInfoProps {
  charId: number | null;
}

const CharInfo: React.FC<CharInfoProps> = ({ charId }) => {
  const [char, setChar] = useState({});

  const { clearError, getCharacter, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    clearError();
    if (!charId) {
      return;
    }

    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharLoaded = (char: Char) => {
    setChar(char);
  };

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

interface ViewProps {
  data: Char;
}

const View: React.FC<ViewProps> = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  let imgStyle: React.CSSProperties = { objectFit: "cover" };

  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a target="_blank" href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a target="_blank" href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics
          ? comics.length > 0
            ? null
            : "No comics for this character yet"
          : "No comics for this character yet"}
        {comics?.map(({ resourceURI, name }, i) => {
          if (i > 9) return;

          const comicId = resourceURI ? resourceURI.split("/")[6] : null;

          return (
            <Link
              key={i}
              className="char__comics-item"
              to={`/comics/${comicId}`}
            >
              {name}
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
