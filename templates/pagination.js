// pagination.js
// Functions to handle pagination and "Show more" button functionality

import { books, BOOKS_PER_PAGE } from './data.js';

let page = 1;
let matches = books;

/**
 * Handles the click event on the "Show more" button
 */
export const handleShowMoreButtonClick = () => {
    const fragment = document.createDocumentFragment();
    matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE).forEach(book => {
        fragment.appendChild(createPreviewElement(book));
    });

    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;
    updateShowMoreButton();
};

/**
 * Updates the "Show more" button with the remaining book count
 */
export const updateShowMoreButton = () => {
    const remainingCount = Math.max(matches.length - (page * BOOKS_PER_PAGE), 0);
    const showMoreButton = document.querySelector('[data-list-button]');

    showMoreButton.innerText = `Show more (${remainingCount})`;
    showMoreButton.disabled = remainingCount < 1;
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
