// eventHandlers.js
// Functions to add event listeners

import { handleThemeFormSubmit, setTheme } from './theme.js';
import { handleSearchFormSubmit } from './search.js';
import { handleShowMoreButtonClick } from './pagination.js';

/**
 * Adds event listeners to various elements
 */
export const addEventListeners = () => {
    document.querySelector('[data-search-cancel]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = false;
    });

    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = false;
    });

    document.querySelector('[data-header-search]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = true;
        document.querySelector('[data-search-title]').focus();
    });

    document.querySelector('[data-header-settings]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = true;
    });

    document.querySelector('[data-list-close]').addEventListener('click', () => {
        document.querySelector('[data-list-active]').open = false;
    });

    document.querySelector('[data-settings-form]').addEventListener('submit', handleThemeFormSubmit);
    document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmit);
    document.querySelector('[data-list-button]').addEventListener('click', handleShowMoreButtonClick);
};
