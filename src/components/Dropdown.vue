<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emits = defineEmits<{
    (e: 'update:selected', value: string): void;
}>();

const props = defineProps<{
    items?: string[];
    selected?: string;
}>();

const isOpen = ref(false);
const items = ref<string[]>(props.items || []);
const selectedItem = ref<string | null>(null);

onMounted(() => {
    if (!props.items || props.items.length === 0) {
        items.value = [];
    }

    if (props.selected && items.value.includes(props.selected)) {
        selectedItem.value = props.selected;
    } else {
        selectedItem.value = items.value[0];
    }
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectItem = (item: string) => {
    selectedItem.value = item;
    emits('update:selected', item);
    toggleDropdown();
};
</script>

<template>
    <div class="flex flex-col relative">
        <div
            class="selected flex cursor-pointer bg-light/10 hover:bg-light/4 text-light p-2 rounded-md"
            @click="toggleDropdown()">
            <div class="flex items-center">
                <span class="text-light font-semibold">{{ selectedItem }}</span>
                <FontAwesomeIcon
                    :icon="['fas', 'caret-down']"
                    :class="{
                        'rotate-180': isOpen,
                        'rotate-0': !isOpen,
                    }"
                    class="text-lg ml-2 text-light/80 cursor-pointer transition-all" />
            </div>
        </div>
        <div
            class="items flex bg-dark text-light p-2 rounded-md mt-2 absolute top-10 z-1"
            :class="{
                hidden: !isOpen,
                visible: isOpen,
            }">
            <div class="flex flex-col gap-4 w-[200px] transition-none">
                <span
                    v-for="item in items"
                    :key="item"
                    @click="selectItem(item)"
                    class="text-light hover:bg-secondary hover:text-dark transition-none rounded-md cursor-pointer p-1"
                    >{{ item }}</span
                >
            </div>
        </div>
    </div>
</template>
