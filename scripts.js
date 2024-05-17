// Import necessary data from './data.js'
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

// Define variables for pagination
let page = 1;
let matches = books;

// Function to render initial book list
const renderInitialBookList = () => {
    const startingFragment = document.createDocumentFragment();
    // Loop through initial matches and create preview elements
    matches.slice(0, BOOKS_PER_PAGE).forEach(book => {
        startingFragment.appendChild(createPreviewElement(book));
    });
    // Append the starting fragment to the list items container
    document.querySelector('[data-list-items]').appendChild(startingFragment);
};

// Function to create a preview element
const createPreviewElement = ({ author, id, image, title }) => {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.dataset.preview = id;
    // Populate the preview element with book details
    element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
    return element;
};
