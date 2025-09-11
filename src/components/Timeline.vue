<script lang="ts" setup>
import { ref } from 'vue';

interface TimelineEvent {
    year: string;
    events: Array<{
        title: string;
        description: string;
        month: string;
        active?: boolean;
    }>;
}

const timelineEvents = ref<TimelineEvent[]>([
    {
        year: '2023',
        events: [
            {
                title: 'Graduation',
                description:
                    'Graduated from Syddansk Erhvervsskole as a Data Technician with specialization in Programming.',
                month: 'July',
            },
            {
                title: 'Trainee at Ordbogen A/S',
                description: 'Joined Ordbogen A/S as a Trainee, to enhance my skills in web development, and working on various small projects.',
                month: 'October',
            },
        ],
    },
    {
        year: '2024',
        events: [
            {
                title: 'Full time Junior Developer',
                description:
                    'Promoted to a full-time Junior Developer position at Ordbogen A/S, contributing to various projects. Primarily focusing on their largest platform Grammatip.com.',
                month: 'January',
            },
            {
                title: 'Promoted to Developer',
                description: 'Promoted to a Developer role at Ordbogen A/S, taking on more responsibilities',
                month: 'August',
            },
        ],
    },
    {
        year: '2025',
        events: [
            {
                title: 'Averto Digital - Owner',
                description:
                    'Founded Averto Digital, a freelance web development business, focusing on delivering high-quality web solutions.',
                month: 'March',
                active: true,
            },
            {
                title: 'Ordbogen A/S - Journey ends',
                description:
                    'Looking forward to new challenges and opportunities in the tech industry, aiming to grow as a developer.',
                month: 'August',
            },
        ],
    },
]);

timelineEvents.value.sort((a, b) => parseInt(b.year) - parseInt(a.year)).forEach((yearBlock) => {
    yearBlock.events.sort((a, b) => {
        const monthOrder = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
    });
});
</script>

<template>
    <div class="timeline-container max-w-3xl mx-auto p-4 mt-6 relative">
        <h1 class="text-4xl font-bold mb-8 text-white text-center">Timeline</h1>
        <div class="timeline-line absolute transform mt-2 h-full border-l-1 -mx-3 border-white/20"></div>
        <div v-for="(yearBlock, index) in timelineEvents" :key="index" class="mb-12">
            <h2 class="text-3xl font-bold mb-6 text-white">{{ yearBlock.year }}</h2>
            <div v-for="(event, idx) in yearBlock.events" :key="idx" class="mt-8 pl-4 relative">
                <span
                    class="absolute -left-5 top-2.5 w-4 h-4 rounded-full flex items-center justify-center font-semibold"
                    :class="event.active ? 'bg-cyan-500 animate-ping' : 'bg-gray-600'">
                </span>
                <span
                    v-if="event.active"
                    class="absolute -left-5 top-2.5 w-4 h-4 rounded-full flex items-center justify-center bg-cyan-500 text-white font-semibold"></span>
                <h3 class="text-xl font-medium text-white">{{ event.title }}</h3>
                <p class="text-sm text-white/70 mb-2">{{ event.month }}</p>
                <p class="text-white/80">{{ event.description }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.timeline-line {
    height: calc(100% - 120px);
}
</style>
