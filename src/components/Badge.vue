<script setup lang="ts">
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    badgeText?: string;
    badgeHref?: string;
    badgeIcon?: IconProp;
    badgeClear: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'clear';
    iconClass: string;
}

type PropsForDefaults = Omit<Props, 'badgeIcon'> & {
    badgeIcon?: unknown;
};

const props = withDefaults(defineProps<PropsForDefaults>(), {
    badgeText: '',
    badgeHref: '#',
    badgeIcon: undefined,
    badgeClear: false,
    color: 'dark',
    iconClass: '',
});
</script>

<template>
    <a
        :href="props.badgeHref"
        target="_blank"
        rel="noopener noreferrer"
        class="text-light rounded-md text-sm font-medium transition-colors w-fit"
        :aria-label="badgeHref"
        :class="{
            'bg-blue-500 hover:bg-blue-500/50': color === 'primary',
            'bg-gray-500 hover:bg-gray-500/50': color === 'secondary',
            'bg-emerald-500 hover:bg-emerald-500/50': color === 'success',
            'bg-red-500 hover:bg-red-500/50': color === 'danger',
            'bg-yellow-500 hover:bg-yellow-500/50': color === 'warning',
            'bg-teal-500 hover:bg-teal-500/50': color === 'info',
            'bg-light/20 hover:bg-light/30 text-black': color === 'light',
            'bg-light/10 hover:bg-light/16 text-light': color === 'dark',
            'bg-transparent': color === 'clear',
        }">
        <FontAwesomeIcon :class="iconClass" :icon="props.badgeIcon" v-if="props.badgeIcon" class="text-2xl" />
    </a>
</template>
