// index.js
// Main file to initialize the application

import { setTheme } from './theme.js';
import { addEventListeners } from './eventHandlers.js';
import { renderInitialBookList, renderFilterOptions } from './render.js';

/**
 * Initial setup function to render book list, filter options, and set the theme
 */
document.addEventListener('DOMContentLoaded', () => {
    renderInitialBookList();
    renderFilterOptions();
    setTheme();
    addEventListeners();
});
