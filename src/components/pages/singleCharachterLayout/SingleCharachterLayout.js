import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import motionParams from '../../../services/motionParams';
import useMarvelService from '../../../services/marvelService';
import setContent from '../../../utils/setContent';
import AppBanner from "../../appBanner/AppBanner";

import './SingleCharachterLayout.scss';

const SingleCharacterLayout = () => {

    const { charId } = useParams();
    const [char, setChar] = useState({});

    const {getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
    getCharacter(charId)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (charData) => {
        setChar(charData);
    };
    
    return (
        <motion.div {...motionParams}>
            <AppBanner/>
            {setContent(process, View, char)}
        </motion.div>
    )
}

const View = ({data}) => {
    const {thumbnail, name, description} = data;

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