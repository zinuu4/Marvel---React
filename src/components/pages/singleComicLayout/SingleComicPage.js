import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import useMarvelService from '../../../services/marvelService';
import AppBanner from "../../appBanner/AppBanner";
import motionParams from '../../../services/motionParams';

import './singleComicPage.scss';

const SingleComicPage = () => {

  const { comicId } = useParams();
  const [comics, setComics] = useState([]);

  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, [comicId]);

  const updateComics = () => {
    clearError();
    getComics(comicId + 'n')
      .then(onComicLoaded);
  };

  const onComicLoaded = (comicsData) => {
    setComics(comicsData);
  };

  const errorMessage = error ? <ErrorMessage/> : null;
  const loadingMessage = loading ? <Spinner/> : null;
  const content = !(loading || error || !comics) ? <View comics={comics}/> : null; 

  return (
    <motion.div {...motionParams}>

      <AppBanner/>
      {errorMessage}
      {loadingMessage}
      {content}
      
    </motion.div>
  )
}

const View = ({comics}) => {
  const {title, description, pageCount, thumbnail, language, price} = comics;
  
  return (
      <div className="single-comic">
        <Helmet>
          <meta
           name="description"
            content={`${title} comics book`}
          />
          <title>{title}</title>
        </Helmet>
          <img src={thumbnail} alt={title} className="single-comic__img"/>
          <div className="single-comic__info">
              <h2 className="single-comic__name">{title}</h2>
              <p className="single-comic__descr">{description}</p>
              <p className="single-comic__descr">{pageCount}</p>
              <p className="single-comic__descr">Languages: {language}</p>
              <div className="single-comic__price">{price}</div>
          </div>
          <Link to='/comics' className="single-comic__back">Back to all</Link>
      </div>
  )
}

export default SingleComicPage;