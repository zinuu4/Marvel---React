import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=18e46518a017d239d36c7fd777ef758b';
  const _baseOffset = 200;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name ? char.name.slice(0, 28) + '...' : char.name,
      description: char.description ? char.description.slice(0, 150) + '...' : char.description = 'No description for this character yet',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      thumbnail: comics.images[0].path + '.' + comics.images[0].extension,
      price: comics.prices[0].price
    }
  }

  return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics};
}

export default useMarvelService;