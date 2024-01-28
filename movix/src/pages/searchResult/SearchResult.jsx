import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import Card from '../../components/card/Card';
import Spinner from '../../components/spinner/Spinner';
import './SearchResult.scss';

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const { query } = useParams();

  // NOTE: by default length of data received is 20, useful in setting pageNum

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prevPageNum) => prevPageNum + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else {
          setData(res);
        }
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className='search-results'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className='search-results__title'>{`Search ${
                data?.results.length > 1 ? 'results' : 'result'
              } of "${query}" `}</div>
              <InfiniteScroll
                className='search-results__content'
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => (
                  <Card data={item} key={index} fromSearch={true} />
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <p className='no-results'>Sorry, Results not found!</p>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
