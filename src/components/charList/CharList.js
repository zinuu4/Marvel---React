import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/marvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);
    
    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [])

    useEffect(() => {
        if (newItemLoading) {
            onRequest();
        }
    }, [newItemLoading])

    const onScroll = () => {
        // if (newItemLoading) {
        //     return;
        // }   
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1) {
            setNewItemLoading(true);
        }
    };

    const onRequest = () => {
        setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }
    
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {

            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <motion.li 
                    className="char__item"
                    ref={el => itemRefs.current[i] = el}
                    tabIndex={0}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyDown={event => {
                        if (event.keyCode === 13) {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {delay: (i%9) * 0.25}}}>
                    <motion.img 
                        src={item.thumbnail} 
                        alt={item.name} 
                        style={imgStyle}
                        initial={{opacity: 0}} 
                        animate={{opacity: 1, transition: {delay: (i%8) * 0.3}}}/>
                    <motion.div 
                        className="char__name"
                        initial={{opacity: 0}} 
                        animate={{opacity: 1, transition: {delay: (i%8) * 0.3}}}>
                    {item.name}</motion.div>
                </motion.li>
            )
        });
        return (
            <ul className="char__grid">
                <AnimatePresence>
                {items}
                </AnimatePresence>
            </ul>
        )
    }
    
    const items = renderItems(charList);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const content  = !(error) ? items : null;
    
    return (
        <div className="char__list">
            {errorMessage}
            {content}
            {loadingMessage}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{
                    'display': charEnded ? 'none' : 'block',
                    'filter': newItemLoading ? 'grayscale(1)' : 'grayscale(0)',
                    'opacity': newItemLoading ? 0.5 : 1,
                    'cursor': newItemLoading ? 'not-allowed' : 'pointer',
                    'pointerEvents': newItemLoading ? 'none' : 'all'
                  }}
                onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;