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
    <motion.button
        :href="props.buttonHref"
        v-tooltip="{
            text: props.buttonTooltip,
        }"
        :whileHover="{ scale: 1.03 }"
        :whilePress="{ scale: 0.98 }"
        @click.prevent="action"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block px-4 py-2 text-white rounded-md text-sm font-medium transition-colors cursor-pointer"
        :class="{
            'bg-blue-500 hover:bg-blue-500/50': color === 'primary',
            'bg-gray-500 hover:bg-gray-500/50': color === 'secondary',
            'bg-emerald-500 hover:bg-emerald-500/50': color === 'success',
            'bg-red-500 hover:bg-red-500/50': color === 'danger',
            'bg-yellow-500 hover:bg-yellow-500/50': color === 'warning',
            'bg-teal-500 hover:bg-teal-500/50': color === 'info',
            'bg-white/20 hover:bg-white/30 text-black': color === 'light',
            'bg-white/10 hover:bg-white/16 text-white': color === 'dark',
            'bg-transparent': color === 'clear',
        }">
        {{ props.buttonText }}
        <FontAwesomeIcon :class="iconClass" :icon="props.buttonIcon" v-if="props.buttonIcon" />
    </motion.button>
</template>
