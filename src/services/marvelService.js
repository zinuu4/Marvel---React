import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError, process, setProcess} = useHttp();

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

  const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }
  
  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
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
      description: comics.description || "There is no description for this comic yet",
			pageCount: comics.pageCount
				? `${comics.pageCount} pages`
				: "No information about the number of pages",
      thumbnail: comics.images[0].path + '.' + comics.images[0].extension,
      language: comics.textObjects[0]?.language || "en-us",
      price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
    };
  };

  return {loading, 
          error, 
          clearError, 
          process,
          setProcess,
          getAllCharacters, 
          getCharacter, 
          getAllComics, 
          getComics, 
          getCharacterByName
        };
}

export default useMarvelService;