
import * as React from 'react';
import { getImages, getSearch } from '../api/unsplash';
import { useQuery } from 'react-query';
import { Navbar } from '../components/navbar';
import { Pagination } from '../components/pagination';

const Gallery: React.FC = () => {
  const [search, setSearch] = React.useState<string>('');
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  

  const { data: newImages } = useQuery(['images', page], () => getImages(page),
		{
      refetchOnWindowFocus: false
    }
	);

  const { data: searchImages } = useQuery(['images', search, page], () => getSearch(search, page),
    {
      refetchOnWindowFocus: false,
      enabled: search != '',
    }
  );
  React.useEffect(() => {
    if (searchImages) {
      setImages(searchImages);
    } else {
      if (newImages) {
        setImages(newImages);
      }
    }
  }, [newImages, searchImages])

  const handleSearch = (e: any) => {
    setSearch(e.target.value)
    setPage(1);
  }
  
  return (
    <>
      <Navbar section='gallery' />
      <div className='px-4 sm:px-24 mb-6'>
        <div className="flex flex-wrap justify-between items-end mt-10 mb-8 gap-4">
          <h2 className="text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Gallery
          </h2>
          <input
            id="search"
            name="search"
            type="text"
            required
            className="block max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={search}
            onChange={handleSearch}
            placeholder="search"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 ml-0 md:ml-3">
          {images?.map((image: any) => (
            <div
              key={image.id}
              className="col-span-1 relative"
            >
              <img
                src={image.urls.thumb              }
                className="object-cover col-span-1 w-[200px] h-[200px] rounded-lg"
              />
            </div>
          ))}
        </div>
        <Pagination page={page} setPage={setPage} />
      </div>
    </>
  )
}

export default Gallery
