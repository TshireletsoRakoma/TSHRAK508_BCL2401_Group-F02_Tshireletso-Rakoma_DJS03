// Import necessary data from './data.js'
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

// Define BookPreview web component
class BookPreview extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const { author, id, image, title } = this.dataset;

        this.innerHTML = `
            <style>
                /* Add your CSS styles for the preview here */
                .preview {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .preview:hover {
                    background-color: #e0f7fa; /* Light blue background on hover */
                }

                .preview__image {
                    width: 100px;
                    height: 150px;
                    object-fit: cover;
                    margin-right: 20px;
                    transition: transform 0.3s ease;
                }

                .preview:hover .preview__image {
                    transform: scale(1.1);
                }

                .preview__info {
                    flex: 1;
                }

                .preview__title {
                    margin: 0;
                    font-size: 18px;
                    transition: color 0.3s ease;
                    animation: shining 1s infinite;
                }

                .preview:hover .preview__title {
                    color: #007bb5; /* Light blue text on hover */
                }

                .preview__author {
                    margin: 5px 0;
                    font-size: 14px;
                    color: #666;
                }

                /* Animation for shining effect */
                @keyframes shining {
                    0% {
                        color: #ddd;
                    }
                    50% {
                        color: #fff;
                    }
                    100% {
                        color: #ddd;
                    }
                }
            </style>
            <button class="preview" data-preview="${id}">
                <img class="preview__image" src="${image}" />
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[author]}</div>
                </div>
            </button>
        `;
    }
}

// Define custom element for BookPreview
customElements.define('book-preview', BookPreview);

// Define variables for pagination
let page = 1;
let matches = books;

// Function to render initial book list
const renderInitialBookList = () => {
    const startingFragment = document.createDocumentFragment();
    // Loop through initial matches and create preview elements
    matches.slice(0, BOOKS_PER_PAGE).forEach(book => {
        const previewElement = document.createElement('book-preview');
        previewElement.dataset.id = book.id;
        previewElement.dataset.author = book.author;
        previewElement.dataset.image = book.image;
        previewElement.dataset.title = book.title;
        startingFragment.appendChild(previewElement);
    });
    // Append the starting fragment to the list items container
    document.querySelector('[data-list-items]').appendChild(startingFragment);
};

// Function to render filter options for genres and authors
const renderFilterOptions = () => {
    renderOptions('[data-search-genres]', genres);
    renderOptions('[data-search-authors]', authors);
};

// Function to render options for select elements
const renderOptions = (selector, options) => {
    const fragment = document.createDocumentFragment();
    // Create a default "All" option
    const defaultOption = createOptionElement('any', 'All');
    fragment.appendChild(defaultOption);
    // Create options for each genre or author
    Object.entries(options).forEach(([id, name]) => {
        fragment.appendChild(createOptionElement(id, name));
    });
    // Append options to the select element
    document.querySelector(selector).appendChild(fragment);
};

// Function to create an option element
const createOptionElement = (value, text) => {
    const element = document.createElement('option');
    element.value = value;
    element.innerText = text;
    return element;
};

// Function to handle theme setting based on user preference
const setTheme = () => {
    // Determine theme based on user preference
    const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    const colorDark = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
    const colorLight = theme === 'night' ? '10, 10, 20' : '255, 255, 255';
    const themeSetting = document.querySelector('[data-settings-theme]');
    const root = document.documentElement;
    // Set theme and color variables
    themeSetting.value = theme;
    root.style.setProperty('--color-dark', colorDark);
    root.style.setProperty('--color-light', colorLight);
};

// Function to handle form submission for theme settings
const handleThemeFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    const colorDark = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
    const colorLight = theme === 'night' ? '10, 10, 20' : '255, 255, 255';
    const root = document.documentElement;
    // Update theme and color variables
    root.style.setProperty('--color-dark', colorDark);
    root.style.setProperty('--color-light', colorLight);
    // Close settings overlay
    document.querySelector('[data-settings-overlay]').open = false;
};

// Function to handle form submission for search
const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    // Filter books based on search criteria and update book list
    updateBookList(filterBooks(filters));
};

// Function to filter books based on search criteria
const filterBooks = (filters) => {
    const result = [];
    for (const book of books) {
        let genreMatch = filters.genre === 'any';
        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true; }
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

// Function to update the book list based on filtered results
const updateBookList = (result) => {
    page = 1;
    matches = result;
    const listItemsContainer = document.querySelector('[data-list-items]');
    listItemsContainer.innerHTML = '';
    // Show message if no books match the filter
    const hasBooks = result.length > 0;
    document.querySelector('[data-list-message]').classList.toggle('list__message_show', !
}