<script setup lang="ts">
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'motion-v';

interface Props {
    buttonText?: string;
    buttonHref?: string;
    buttonAction?: () => void;
    buttonIcon?: IconProp;
    buttonClear?: boolean;
    buttonTooltip?: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'clear';
    iconClass?: string;
}

type PropsForDefaults = Omit<Props, 'buttonIcon'> & {
    buttonIcon?: unknown;
};

const props = withDefaults(defineProps<PropsForDefaults>(), {
    buttonText: '',
    buttonHref: '#',
    buttonAction: undefined,
    buttonIcon: undefined,
    buttonClear: false,
    buttonTooltip: undefined,
    color: 'dark',
    iconClass: '',
});

const action = () => {
    if (props.buttonAction) {
        props.buttonAction();
    } else {
        window.open(props.buttonHref, '_blank');
    }
};
</script>

<template>
    <button
        :href="props.buttonHref"
        v-tooltip="{
            text: props.buttonTooltip,
        }"
        @click.prevent="action"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block px-4 py-2 text-light rounded-md text-sm font-medium transition-colors cursor-pointer"
        :aria-label="buttonHref"
        :class="{
            'bg-primary hover:bg-primary/50': color === 'primary',
            'bg-primary/10 hover:bg-secondary/16 text-light': color === 'dark',
            'bg-transparent': color === 'clear',
        }">
        {{ props.buttonText }}
        <FontAwesomeIcon :class="iconClass" :icon="props.buttonIcon" v-if="props.buttonIcon" />
    </button>
</template>
