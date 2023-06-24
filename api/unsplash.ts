export const getImages = async (page: number): Promise<any> => {
	const url_to_fetch = `https://api.unsplash.com/photos/?client_id=YXjseP6NyYK6BcsjOuUGAnHHakhPTTxytiFoury-AOs&per_page=12&page=${page}`

	const data = await fetch(url_to_fetch, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

  if (data.status == 200) {
	  const data_json = await data.json();
	  return data_json;
  }
  return null;
};

export const getSearch = async (search: string, page: number): Promise<any> => {
	const url_to_fetch = `https://api.unsplash.com/search/photos?client_id=YXjseP6NyYK6BcsjOuUGAnHHakhPTTxytiFoury-AOs&per_page=12&query=${search}&page=${page}`

	const data = await fetch(url_to_fetch, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
  if (data.status == 200) {
	  const data_json = await data.json();
	  return data_json.results;
  }
  return null;
};