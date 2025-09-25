<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from '@/components/Card.vue';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Button from '@/components/Button.vue';
import Badge from '@/components/Badge.vue';
import Timeline from '@/components/Timeline.vue';
import Dropdown from '@/components/Dropdown.vue';
import { isDesktop } from '@/utils/screen';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import emitter from 'tiny-emitter/instance';
import { useSpring } from 'motion-v';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();

const GITHUB_LINK = 'https://github.com/musti132';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/mustafa-al-nashie-306362150/';
const SPRING_MAX = 700;
const SPRING_MIN = 0;
const theme = computed(() => themeStore.theme);

const widgetShown = ref(false);
const springProgress = ref(0);

const x = useSpring(0, {
    bounce: 0.2,
});

x.on('change', (latest) => {
    springProgress.value = latest;
});

const router = useRouter();
const widgetBlocker = ref<HTMLElement | null>(null);

emitter.on('widgetShown', (e: boolean) => {
    widgetShown.value = e;

    if (widgetBlocker.value) {
        if (e) {
            x.set(SPRING_MAX);
        } else {
            x.set(SPRING_MIN);
        }
    }
});

interface GithubRepo {
    name: string;
    subtitle: string;
    description: string;
    html_url: string;
}

const repos: Array<GithubRepo> = [
    {
        name: 'CoinRedis',
        subtitle: 'Caching on Multiple Servers',
        description: 'A Redis PHP package for caching on multiple servers. Originally developed for CoinPhon.',
        html_url: 'https://github.com/musti132/CoinRedis',
    },
    {
        name: 'Alpha-Cryptor',
        subtitle: 'Simple, Reusable Letter-Mapping for Text Obfuscation',
        description:
            'A lightweight PHP substitution cipher that shuffles the alphabet, stores the mapping, and applies it for quick text transformation.',
        html_url: 'https://github.com/musti132/Alpha-Cryptor',
    },
    {
        name: 'Forge API SDK',
        subtitle: 'Laravel Forge SDK',
        description: 'A PHP SDK for Laravel Forge API.',
        html_url: 'https://github.com/musti132/forge-api-sdk',
    },
    {
        name: 'CoinPhon',
        subtitle: 'Crypto Payment Gateway',
        description: 'A crypto payment gateway.',
        html_url: 'https://github.com/musti132/coinphon',
    },
    {
        name: 'RatePolicy',
        subtitle: 'Laravel Rate Limiting',
        description: 'Laravel package for managing rate limits like Laravel Policy',
        html_url: 'https://github.com/musti132/RatePolicy',
    },
    {
        name: 'LaravelPostman',
        subtitle: 'Postman Collection Generator',
        description: 'A Laravel package for generating Postman collections.',
        html_url: 'https://github.com/musti132/LaravelPostman',
    },
];

const gotoContact = () => {
    if (!isDesktop) {
        router.push({ name: 'Contact' });
        return;
    }

    const event = new CustomEvent('showWidget');
    window.dispatchEvent(event);
};

const open = (url: string, target: string) => {
    window.open(url, target);
};

const widgetBlockerStyle = computed(() => {
    let padding = 20;
    if (!widgetShown.value) {
        padding = 0;
    }

    return {
        transform: `translateX(${springProgress.value}px)`,
        height: `${springProgress.value + padding}px`,
    } as Record<string, string>;
});
</script>

<template>
    <div id="home" class="sm:grid xs:flex sm:grid-rows-1 sm:grid-cols-none lg:grid-cols-5 gap-8 w-full">
        <div class="col-span-2 row-span-1 flex-col">
            <div class="flex xl:flex-row lg:flex-col flex-col justify-between sm:items-center gap-4 ">
                <div class="flex gap-4 items-baseline justify-between sm:justify-between">
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-light glow">MUSTAFA</h1>
                    <div class="flex">
                        <FontAwesomeIcon
                            :icon="['fab', 'linkedin']"
                            class="text-3xl text-light hover:text-light/60 cursor-pointer inline-flex"
                            @click="open(LINKEDIN_LINK, '_blank')" />
                        <FontAwesomeIcon
                            :icon="['fab', 'github']"
                            class="text-3xl text-light hover:text-light/60 cursor-pointer inline-flex"
                            @click="open(GITHUB_LINK, '_blank')" />
                    </div>
                </div>
                <div class="flex gap-4">
                    <Dropdown
                        :items="themeStore.themes"
                        :selected="theme"
                        @update:selected="themeStore.setTheme($event)"></Dropdown>
                </div>
            </div>
            <p class="text-lg sm:text-xl lg:text-2xl text-light mb-6">
                A passionate software developer specializing in web applications, AI integration, and modern
                technologies.
            </p>
            <Button
                class="w-full text-center mr-auto"
                buttonText="Get in Touch"
                :buttonAction="gotoContact"
                color="dark" />

            <Timeline />
        </div>

        <!-- Skills -->
        <div class="col-span-3 row-span-5 sm:mx-auto">
            <div
                ref="widgetBlocker"
                :style="widgetBlockerStyle"
                class="relative transform-gpu lg:col-span-2 pointer-events-none"></div>
            <div class="flex flex-col gap-6 lg:gap-12">
                <h1 class="text-4xl sm:text-6xl font-bold text-light mb-10 lg:text-left md:text-center glow">Skills</h1>

                <p class="text-lg sm:text-xl lg:text-2xl text-light/80 mb-12 max-w-3xl">
                    Proficient in modern web technologies across the full stack, with strong experience in frontend
                    frameworks, backend development, and database management. Skilled in building scalable, maintainable
                    applications with clean, efficient code.
                </p>

                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    <!-- Frontend -->
                    <div class="rounded-2xl border-2 border-secondary glass-morphism p-6 transition-colors max-w-[320px]">
                        <h2 class="text-xl font-semibold text-light mb-4">
                            Frontend
                            <FontAwesomeIcon :icon="['fas', 'code']" class="text-primary inline-block" />
                        </h2>
                        <div class="space-y-2 text-light/80">
                            <p>JavaScript (ES6+), TypeScript</p>
                            <p>Vue.js (3.x), React</p>
                            <p>HTML5 & CSS3</p>
                            <p>Tailwind CSS, Bootstrap</p>
                        </div>
                    </div>

                    <!-- Backend -->
                    <div class="rounded-2xl border-2 border-secondary glass-morphism p-6 transition-colors max-w-[320px]">
                        <h2 class="text-1xl font-semibold text-light mb-4">
                            Backend <FontAwesomeIcon :icon="['fas', 'server']" class="text-primary inline-block" />
                        </h2>
                        <div class="space-y-2 text-light/80">
                            <p>Node.js, PHP, Laravel</p>
                            <p>RESTful APIs, GraphQL</p>
                            <p>Authentication & Authorization</p>
                        </div>
                    </div>

                    <!-- Databases & Tools -->
                    <div class="rounded-2xl border-2 border-secondary glass-morphism p-6 transition-colors max-w-[320px]">
                        <h2 class="text-1xl font-semibold text-light mb-4">
                            Databases & Tools
                            <FontAwesomeIcon :icon="['fas', 'database']" class="text-primary inline-block" />
                        </h2>
                        <div class="space-y-2 text-light/80 text-md">
                            <p>MySQL, PostgreSQL, MongoDB</p>
                            <p>Git & GitHub, Docker</p>
                            <p>CI/CD (GitHub Actions, GitLab CI)</p>
                            <p>Unit Testing (PHPUnit, Pest)</p>
                        </div>
                    </div>
                </div>

                <div class="col-span-5 row-span-1 flex flex-col">
                    <h1 class="text-4xl sm:text-6xl font-bold text-light mb-10 glow">Projects</h1>
                    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg-grid-cols-3 xl:grid-cols-4 gap-4">
                        <Card
                            v-for="repo in repos"
                            :key="repo.name"
                            :body="repo.name"
                            :description="repo.description"
                            :subtitle="repo.subtitle"
                            :buttonHref="repo.html_url"
                            :buttonIcon="faGithub"
                            buttonTooltip="View on GitHub"
                            :openInNewTab="true">
                            <template #badge>
                                <Badge
                                    class="inline-block"
                                    :badgeIcon="['fab', 'laravel']"
                                    :badgeClear="true"
                                    :badgeHref="'https://laravel.com/'"
                                    color="clear"
                                    iconClass="text-rose-500"
                                    v-tooltip="'Laravel'" />
                                <Badge
                                    class="inline-block"
                                    :badgeIcon="['fab', 'vuejs']"
                                    :badgeClear="true"
                                    :badgeHref="'https://vuejs.org/'"
                                    color="clear"
                                    iconClass="text-emerald-500"
                                    v-tooltip="'Vue'" />
                                <Badge
                                    class="inline-block"
                                    :badgeIcon="['fab', 'php']"
                                    :badgeClear="true"
                                    :badgeHref="'https://www.php.net/'"
                                    color="clear"
                                    iconClass="fa-php"
                                    v-tooltip="'PHP'" />
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Projects -->
    <div class="grid sm:grid-cols-1 lg:grid-cols-5 w-full"></div>
</template>
