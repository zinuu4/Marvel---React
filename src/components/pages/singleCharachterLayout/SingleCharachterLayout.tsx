import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import motionParams from "../../../services/motionParams";
import useMarvelService from "../../../services/marvelService";
import setContent from "../../../utils/setContent";
import AppBanner from "../../appBanner/AppBanner";

import "./SingleCharachterLayout.scss";

const SingleCharacterLayout: React.FC = () => {
  const { charId } = useParams();
  const [char, setChar] = useState({});

  const { getCharacter, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (charId) {
      getCharacter(charId)
        .then(onCharLoaded)
        .then(() => setProcess("confirmed"));
    }
  };

  const onCharLoaded = (charData: Char) => {
    setChar(charData);
  };

  return (
    <motion.div {...motionParams}>
      <AppBanner />
      {setContent(process, View, char)}
    </motion.div>
  );
};

interface ViewProps {
  data: {
    thumbnail?: string;
    name?: string;
    description?: string;
  };
}

const View: React.FC<ViewProps> = ({ data }) => {
  const { thumbnail, name, description } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${name} character information`} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
