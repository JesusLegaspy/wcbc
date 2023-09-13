import { useState, useEffect, useRef } from 'react';

function useScrollDirection() {
  const lastScrollTopRef = useRef(0);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTopRef.current) {
        setDirection('down');
      } else {
        setDirection('up');
      }
      lastScrollTopRef.current = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return direction;
}

export default useScrollDirection;