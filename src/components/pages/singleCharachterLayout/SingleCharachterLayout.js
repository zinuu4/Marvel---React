import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import motionParams from '../../../services/motionParams';
import useMarvelService from '../../../services/marvelService';
import Spinner from '../../spinner/Spinner';
import AppBanner from "../../appBanner/AppBanner";
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './SingleCharachterLayout.scss';

const SingleCharacterLayout = () => {

    const { charId } = useParams();
    const [char, setChar] = useState({});

    const {loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
    getCharacter(charId)
        .then(onCharLoaded);
    }

    const onCharLoaded = (charData) => {
        setChar(charData);
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    
    return (
        <motion.div {...motionParams}>
            <AppBanner/>
            {errorMessage}
            {loadingMessage}
            {content}
        </motion.div>
    )
}

const View = ({char}) => {
    const {thumbnail, name, description} = char;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character information`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;