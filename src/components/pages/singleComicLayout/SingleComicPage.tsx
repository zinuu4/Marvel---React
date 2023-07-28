import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import useMarvelService from "../../../services/marvelService";
import setContent from "../../../utils/setContent";
import AppBanner from "../../appBanner/AppBanner";
import motionParams from "../../../services/motionParams";

import "./singleComicPage.scss";

const SingleComicPage: React.FC = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);

  const { getComics, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, [comicId]);

  const updateComics = () => {
    clearError();
    getComics(comicId + "n")
      .then(onComicLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onComicLoaded = (comicsData: Comic) => {
    setComic(comicsData);
  };

  return (
    <motion.div {...motionParams}>
      <AppBanner />
      {setContent(process, View, comic)}
    </motion.div>
  );
};

interface ViewProps {
  data: Comic;
}

const View: React.FC<ViewProps> = ({ data }) => {
  const { title, description, pageCount, thumbnail, language, price } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Languages: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
