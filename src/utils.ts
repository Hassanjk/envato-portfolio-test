// Import imagesLoaded properly
import imagesLoaded from 'imagesloaded';

/**
 * Preloads images specified by the CSS selector.
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */
export const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        // @ts-ignore - imagesLoaded types are not properly recognized
        imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
};