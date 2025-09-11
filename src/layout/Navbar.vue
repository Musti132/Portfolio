<script setup lang="ts">
const views = ['Home', 'Contact'];
</script>

<template>
    <nav class="flex items-center bg-none py-4 px-8 rounded-lg">
        <ul class="flex gap-16 w-full justify-center">
            <li v-for="view in views" :key="view">
                <a
                    @click="$event.preventDefault(); $router.push({ name: view })"
                    href="/contact"
                    :class="{
                        'text-cyan-500': $route.name === view,
                        'text-white/80': $route.name !== view,
                    }"
                    class="text-lg font-semibold hover:text-white/60 transition-colors cursor-pointer"
                    >{{ view.toUpperCase() }}</a
                >
            </li>
        </ul>
    </nav>
</template>
