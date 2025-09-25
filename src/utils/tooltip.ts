import type { DirectiveBinding } from 'vue';
/**
 * Usage:
 * v-tooltip="'Your tooltip text here'"
 * or
 * v-tooltip="{ text: 'Your tooltip text here' }"
 */

const ToolTipDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const createTooltipElement = (tooltipText: string) => {
            const tooltip = document.createElement('div');
            tooltip.className =
                'tooltip hidden absolute bg-dark text-light text-sm rounded py-1 px-2 z-10';
            tooltip.innerText = tooltipText;

            return tooltip;
        };

        if (typeof binding.value === 'object' && binding.value.enabled === false) {
            return;
        }

        const activeElement = el;

        const tooltipText = typeof binding.value === 'string' ? binding.value : binding.value.text;
        if (!tooltipText) return;

        let tooltipElement: HTMLElement | null = null;

        if (document.querySelector('.tooltip')) {
            tooltipElement = document.querySelector('.tooltip') as HTMLElement;
        } else {
            tooltipElement = createTooltipElement(tooltipText);
            document.body.appendChild(tooltipElement);
        }

        tooltipElement.classList.remove('hidden');
        tooltipElement.style.visibility = 'hidden';

        const rect = activeElement.getBoundingClientRect();
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        const height = tooltipElement.offsetHeight;
        const centerX = rect.left + rect.width / 2 + scrollX;
        const top = rect.top + scrollY - height - 8;

        const showTooltip = () => {
            if (!tooltipElement) return;

            tooltipElement.innerText = tooltipText;
            tooltipElement.style.left = `${centerX}px`;
            tooltipElement.style.top = `${top}px`;
            tooltipElement.style.transform = 'translateX(-50%)';
            tooltipElement.classList.remove('hidden');
            tooltipElement.style.visibility = 'visible';
        };

        const hideTooltip = () => {
            if (tooltipElement) {
                tooltipElement.classList.add('hidden');
            }
        };

        activeElement.addEventListener('mouseenter', showTooltip);
        activeElement.addEventListener('mousemove', showTooltip);
        activeElement.addEventListener('mouseleave', hideTooltip);
    },

    updated(_el: HTMLElement, _binding: DirectiveBinding) {},

    onUnmounted() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach((tooltip) => tooltip.remove());
    },
};

export default ToolTipDirective;
