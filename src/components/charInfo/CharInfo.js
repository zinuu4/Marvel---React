import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/marvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {clearError, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let imgStyle = {'objectFit' : 'cover'}

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'}
    }

    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a target='_blank' href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a target='_blank' href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'No comics for this character yet'}
            {
                comics.map((item, i) => {
                    if (i > 9 ) return;

                    const comicId = item.resourceURI.split('/')[6]

                    return (
                    <Link key={i} className="char__comics-item" to={`/comics/${comicId}`}>
                        {item.name}
                    </Link>
                    )
                })
            }
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;