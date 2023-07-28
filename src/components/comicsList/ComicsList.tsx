import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/marvelService";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState<Comic[]>([]);
  const [newItemLoading, setNewItemLoading] = useState(true);
  const [offset, setOffset] = useState(200);
  const [comicsEnded, setComicsEnded] = useState(false);
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 1
      ) {
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
  }, [newItemLoading]);

  const onRequest = () => {
    setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList: Comic[]) => {
    if (newComicsList.length < 8) {
      setComicsEnded(true);
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
  };

  function renderItems(arr: Comic[]) {
    const items = arr.map((item, i) => {
      return (
        <motion.li
          className="comics__item"
          tabIndex={0}
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: (i % 8) * 0.25 } }}
        >
          <Link to={`/comics/${item.id}`}>
            <motion.img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </motion.li>
      );
    });
    return (
      <ul className="comics__grid">
        <AnimatePresence>{items}</AnimatePresence>
      </ul>
    );
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading ? <Spinner /> : null;
  const content = !error ? items : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {content}
      {loadingMessage}
      <button
        className="button button__main button__long"
        style={{
          display: comicsEnded ? "none" : "block",
          filter: loading ? "grayscale(1)" : "grayscale(0)",
          opacity: loading ? 0.5 : 1,
          cursor: loading ? "not-allowed" : "pointer",
          pointerEvents: loading ? "none" : "all",
        }}
        onClick={() => onRequest()}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
