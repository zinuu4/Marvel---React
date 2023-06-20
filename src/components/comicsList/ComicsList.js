import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/marvelService';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        const handleScroll = () => {
          if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1) {
            setNewItemLoading(true);
          }
        };
    
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    useEffect(() => {
        if (newItemLoading) {
            onRequest();
        }
    }, [newItemLoading])

    const onRequest = () => {
        setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }
    
    const onComicsListLoaded = (newComicsList) => {
        if (newComicsList.length < 8) {
            setComicsEnded(true)
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {

            return (
                <li 
                    className="comics__item"
                    tabIndex={0}
                    key={i}>
                    <a href="#">
                        <img 
                            src={item.thumbnail} 
                            alt={item.title} 
                            className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const content  = !(error) ? items : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {content}
            {loadingMessage}
            <button 
                className="button button__main button__long"
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;