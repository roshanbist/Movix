import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { fetchDataFromApi } from '../../utils/api';
import useFetch from '../../hooks/useFetch';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/spinner/Spinner';
import Card from '../../components/card/Card';
import './Explore.scss';

let filters = {};

const sortByData = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  {
    value: 'primary_release_date.desc',
    label: 'Release Date Descending',
  },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'original_title.asc', label: 'Title (A-Z)' },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setGenre(null);
    setSortby(null);
    fetchInitialData();
  }, [mediaType]);

  // NOTE: In react-select, the onChange event handler receives two arguments: selectedOption (array of selected option object) and action. Action object contain action, name and option (selected option with its whole data)
  const selectHandler = (selectedOption, actions) => {
    if (actions.name === 'sortby') {
      setSortby(selectedOption);

      if (actions.action !== 'clear') {
        filters.sort_by = selectedOption.value;
      } else {
        // clearing all the selected genre
        delete filters.sort_by;
      }
    }

    if (actions.name === 'genres') {
      setGenre(selectedOption);
      if (actions.action !== 'clear') {
        let genreIds = selectedOption.map((item) => item.id).join(',');
        filters.with_genres = genreIds;
      } else {
        // clearing sortby selected option
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className='explore-page'>
      <ContentWrapper>
        <div className='explore-page__header'>
          <div className='explore-page__title'>
            {`Explore ${mediaType === 'movie' ? 'Movies' : 'Tv Shows'}`}
          </div>
          <div className='explore-page__filters'>
            <Select
              isMulti
              className='react-select-container select-genres'
              classNamePrefix='react-select'
              name='genres'
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              value={genre}
              placeholder='Select genres'
              onChange={selectHandler}
            />
            <Select
              className='react-select-container sortby'
              classNamePrefix='react-select'
              name='sortby'
              options={sortByData}
              isClearable={true}
              value={sortby}
              placeholder='Sort by'
              onChange={selectHandler}
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && data?.results?.length > 0 ? (
          <InfiniteScroll
            className='explore-page__content'
            dataLength={data?.results.length || []}
            next={fetchNextPageData}
            hasMore={data?.total_pages}
            loader={<Spinner />}
          >
            {data?.results?.map((item, index) => (
              <Card data={item} key={index} endpoint={mediaType} />
            ))}
          </InfiniteScroll>
        ) : (
          <p className='explore-page__no-results'>Sorry, Results not found!</p>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
