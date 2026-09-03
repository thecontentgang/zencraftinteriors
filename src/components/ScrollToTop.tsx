import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // Get the current URL path
    const { pathname } = useLocation();

    useEffect(() => {
        // Instantly scroll to the top left corner (x: 0, y: 0) whenever the path changes
        window.scrollTo(0, 0);
    }, [pathname]);

    // This component doesn't render any HTML
    return null;
};

export default ScrollToTop;