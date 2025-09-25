import { ref, onMounted, onUnmounted, type Ref } from 'vue';

interface Colors {
    primary: string;
    secondary: string;
    borderGradient: string;
}

export function useColors() {
    const colors: Ref<Colors> = ref<Colors>({
        primary: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim(),
        secondary: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim(),
        borderGradient: getComputedStyle(document.documentElement).getPropertyValue('--border-gradient').trim(),
    });

    const updateColors = () => {
        const rootStyles = getComputedStyle(document.documentElement);
        colors.value.primary = rootStyles.getPropertyValue('--color-primary').trim();
        colors.value.secondary = rootStyles.getPropertyValue('--color-secondary').trim();
        colors.value.borderGradient = rootStyles.getPropertyValue('--border-gradient').trim();
    }

    onMounted(() => {
        updateColors();
        window.addEventListener('color-theme-change', updateColors);
        const observer = new MutationObserver(updateColors);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
        (useColors as any)._observer = observer;
    });

    onUnmounted(() => {
        window.removeEventListener('color-theme-change', updateColors);
        const observer = (useColors as any)._observer;
        if (observer) {
            observer.disconnect();
        }
    });

    return { colors };
}
