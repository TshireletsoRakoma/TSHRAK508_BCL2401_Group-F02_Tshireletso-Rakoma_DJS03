# Book List Application

This application allows users to browse a list of books, apply filters, and view additional details about each book.

## Functionality

### Initial Setup

- The application loads with an initial list of books displayed.
- Filter options for genres and authors are rendered.
- The theme of the application (light or dark) is set based on the user's preference.

### Filtering Books

- Users can filter books by title, author, and genre using the search form.
- The list of books updates dynamically based on the applied filters.

### Pagination

- The list of books is paginated, showing a limited number of books per page.
- Users can click on the "Show more" button to load additional books.

### Book Details

- Clicking on a book preview reveals additional details about the book, including the book cover, title, author, publication year, and description.

### Theme Settings

- Users can toggle between light and dark themes using the theme settings form.

## Code Structure

The application is structured to promote code reusability and maintainability through the use of abstractions:

1. **Rendering Functions**: Abstract rendering functions are used to generate HTML elements for various components, such as book previews and filter options.
2. **Filtering Functions**: The filtering logic is abstracted into a separate function, allowing for easy modification and extension of the filtering criteria.
3. **Pagination Functions**: Functions for handling pagination are encapsulated, making it straightforward to manage pagination-related tasks.
4. **Event Handlers**: Event handlers are modularized, enabling independent handling of user interactions while promoting code readability.
5. **Theme Management**: The theme management functionality is encapsulated, facilitating easy theme switching and customization.

## Usage of Abstractions

- Abstraction of rendering functions reduces code duplication and promotes consistency in UI elements.
- Separation of filtering logic into a distinct function enhances code clarity and facilitates future updates or changes to the filtering criteria.
- Modularization of event handlers improves code organization and readability, making it easier to understand and maintain.
- Encapsulation of pagination functions simplifies pagination management and enables seamless integration of pagination features.
- Abstracting theme management functionality enhances maintainability and allows for easy customization of the application's appearance.

## Dependencies

- The application relies on data imported from './data.js'.
- It utilizes standard HTML, CSS, and JavaScript for rendering and functionality.

## Credits

This application was created by [Your Name] and is provided under the [License Name] license.

