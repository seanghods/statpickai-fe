import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
