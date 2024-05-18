// theme.js
// Functions to handle theme settings

/**
 * Sets the theme based on user preference or system preference
 */
export const setTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');
    const colorDark = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
    const colorLight = theme === 'night' ? '10, 10, 20' : '255, 255, 255';
    const themeSetting = document.querySelector('[data-settings-theme]');
    const root = document.documentElement;

    themeSetting.value = theme;
    root.style.setProperty('--color-dark', colorDark);
    root.style.setProperty('--color-light', colorLight);
};

/**
 * Handles the form submission to change the theme
 * @param {Event} event 
 */
export const handleThemeFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    const colorDark = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
    const colorLight = theme === 'night' ? '10, 10, 20' : '255, 255, 255';
    const root = document.documentElement;

    root.style.setProperty('--color-dark', colorDark);
    root.style.setProperty('--color-light', colorLight);
    localStorage.setItem('theme', theme);
    document.querySelector('[data-settings-overlay]').open = false;
};
