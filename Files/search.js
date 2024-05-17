// search.js
// Functions to handle the search functionality

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

/**
 * Handles the form submission for searching books
 * @param {Event} event 
 */
export const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    updateBookList(filterBooks(filters));
};

/**
 * Filters books based on the provided filters
 * @param {Object} filters 
 * @returns {Array} Filtered books
 */
const filterBooks = (filters) => {
    const result = [];
    for (const book of books) {
        let genreMatch = filters.genre === 'any';
        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) {
                genreMatch = true;
            }
        }
        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book);
        }
    }
    return result;
};

/**
 * Updates the book list with the filtered results
 * @param {Array} result 
 */
const updateBookList = (result) => {
    const listItemsContainer = document.querySelector('[data-list-items]');
    listItemsContainer.innerHTML = '';
    const hasBooks = result.length > 0;
    document.querySelector('[data-list-message]').classList.toggle('list__message_show', !hasBooks);

    const newItemsFragment = document.createDocumentFragment();
    result.slice(0, BOOKS_PER_PAGE).forEach(book => {
        newItemsFragment.appendChild(createPreviewElement(book));
    });

    listItemsContainer.appendChild(newItemsFragment);
    updateShowMoreButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('[data-search-overlay]').open = false;
};

/**
 * Creates a preview element for a book
 * @param {Object} book 
 * @returns {HTMLElement} Preview element
 */
const createPreviewElement = ({ author, id, image, title }) => {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.dataset.preview = id;

    element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
    return element;
};

/**
 * Updates the "Show more" button with the remaining book count
 */
const updateShowMoreButton = () => {
    const remainingCount = Math.max(matches.length - (page * BOOKS_PER_PAGE), 0);
    const showMoreButton = document.querySelector('[data-list-button]');

    showMoreButton.innerText = `Show more (${remainingCount})`;
    showMoreButton.disabled = remainingCount < 1;
};
