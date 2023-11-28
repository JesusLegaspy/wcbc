import { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

function useScrollDirection() {
  const lastScrollTopRef = useRef(0);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Check if user is at the top, add a buffer
      if (currentScrollTop < 5) {
        setDirection('up');
        return;
      }

      // Check if user has scrolled to the bottom
      if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight) {
        setDirection('up');
        return;
      }

      // Scroll distance buffer
      if (Math.abs(currentScrollTop - lastScrollTopRef.current) < 75) return;

      // Logic for setting scroll direction
      if (currentScrollTop > lastScrollTopRef.current) {
        setDirection('down');
      } else {
        setDirection('up');
      }

      lastScrollTopRef.current = currentScrollTop;
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return direction;
}

export default useScrollDirection;