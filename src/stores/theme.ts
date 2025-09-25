import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'


export const useThemeStore = defineStore('theme', () => {
    const themes = ['glass', 'night-sky', 'fiesta', 'psychedelic', 'neon', 'forest', 'ghost', 'ocean'];
    const theme = ref(document.documentElement.getAttribute('data-theme') || themes[0]);

    const setTheme = (newTheme: string) => {
        theme.value = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        window.dispatchEvent(new Event('color-theme-change'));
    }

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme || themes[0]);
    }

    return { theme, themes, setTheme, initTheme };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}