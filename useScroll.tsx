/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

const useScroll = () => {
  const [scollPosition, setScrollPosition] = useState({ y: 0, x: 0 });
  const onScroll = (() => {
      setScrollPosition({ y: window.scrollY, x: window.scrollX })
    });
  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
        document.removeEventListener('scroll', onScroll);
    };
  }, []);
  return scollPosition;
};
export default useScroll;
