import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/marvelService';
import AppBanner from "../appBanner/AppBanner";

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
    <>
      <AppBanner/>
      {errorMessage}
      {loadingMessage}
      {content}
    </>
  )
}

const View = ({comics}) => {
  const {title, description, pageCount, thumbnail, language, price} = comics;
  
  return (
      <div className="single-comic">
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