<script setup lang="ts">
import Button from '@/components/Button.vue';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    body?: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    buttonText?: string;
    buttonHref?: string;
    buttonIcon?: IconProp;
    buttonTooltip?: string;
    openInNewTab?: boolean;
}

type PropsForDefaults = Omit<Props, 'buttonIcon'> & {
    buttonIcon?: unknown;
};

const props = withDefaults(defineProps<PropsForDefaults>(), {
    body: 'Testing Card',
    subtitle: 'This is a subtitle',
    description: 'This is a description of the card. It can be a bit longer to provide more context.',
    icon: '',
    buttonText: '',
    buttonHref: '#',
    buttonIcon: undefined,
    buttonTooltip: undefined,
    openInNewTab: false,
});
</script>

<template>
    <div
        class="glass-morphism max-w-[320px] border-secondary border-2 min-h-[240px] p-5 rounded-2xl text-gray-100 flex flex-col justify-between h-full gap-4 transition-transform duration-200 hover:-translate-y-1">
        <div class="flex items-center gap-4">
            <div
                v-if="props.icon || $slots.icon"
                class="w-14 h-14 min-w-[56px] rounded-lg overflow-hidden flex items-center justify-center bg-light/6">
                <slot name="icon">
                    <img :src="props.icon" alt="icon" class="object-contain w-10 h-10" />
                </slot>
            </div>

            <div class="flex-1">
                <h3 class="text-lg font-semibold text-light leading-tight">{{ props.body }}</h3>
                <p v-if="props.subtitle" class="text-sm text-light/70 mt-1">{{ props.subtitle }}</p>
            </div>
        </div>
        <div class="gap-2 flex">
            <slot name="badge" class="self-start flex"> </slot>
        </div>

        <div class="flex-1">
            <p v-if="props.description" class="text-sm text-light/70">
                {{ props.description }}
            </p>

            <div v-if="$slots.default" class="slot-body text-sm text-light/80 mt-2">
                <slot />
            </div>
        </div>
        <div class="mt-2 self-end gap-2 flex items-center w-full">
            <div class="flex flex-1 justify-end">
                <Button
                    class="inline-block"
                    :buttonText="props.buttonText"
                    :buttonHref="props.buttonHref"
                    :buttonIcon="props.buttonIcon"
                    :iconClass="'text-primary'"
                    :buttonTooltip="props.buttonTooltip"
                    :openInNewTab="props.openInNewTab"
                    color="dark" />
            </div>
        </div>
    </div>
</template>
