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
    document.querySelector('[data-list-message]').classList.toggle('list__message_show', !hasBooks);
    // Create new preview elements for filtered books
    const newItemsFragment = document.createDocumentFragment();
    result.slice(0, BOOKS_PER_PAGE).forEach(book => {
        newItemsFragment.appendChild(createPreviewElement(book));
    });
    // Append new preview elements to the list items container
    listItemsContainer.appendChild(newItemsFragment);
    // Update remaining book count for "Show more" button
    updateShowMoreButton();
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close search overlay
    document.querySelector('[data-search-overlay]').open = false;
};