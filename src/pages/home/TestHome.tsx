import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import HomeVideoSlider, { HomeVideoSliderProps } from './HomeVideoSlider';

const TestHome = () => {
  const [muted, setMuted] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const nextPageRef = useRef(null);
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    ['home', 1],
    ({ pageParam = 1 }) => {
      const apiUrl = `${process.env.REACT_APP_URI}/short-forms/home?page=${pageParam}&size=5`;
      return fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.hasNext ? lastPage.response.nextPage : false;
      },
      suspense: true,
    },
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });
    return () => {
      io.disconnect();
    };
  });
  useEffect(() => {
    if (nextPageRef.current) {
      io.observe(nextPageRef.current);
    }
    return () => {
      io.disconnect();
    };
  });

  const homeVideoSliderProps: HomeVideoSliderProps = {
    data,
    nextPageRef,
    muted,
    setMuted,
    setOpacity,
  };

  return (
    <div className="overflow-hidden bg-slate-500 h-[90vh]">
      <button
        onClick={() => setMuted((prev) => !prev)}
        className="absolute z-10 w-16 h-16 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {!muted && (
          <img
            src="/assets/images/speaker.svg"
            alt="speaker"
            style={{ opacity, transition: 'opacity 0.5s' }}
          />
        )}
        {muted && (
          <img
            src="/assets/images/mute.svg"
            alt="mute"
            style={{ opacity, transition: 'opacity 0.5s' }}
          />
        )}
      </button>
      <HomeVideoSlider {...homeVideoSliderProps} />
    </div>
  );
};

export default TestHome;
