<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Card from '@/components/Card.vue';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Button from '@/components/Button.vue';
import Badge from '@/components/Badge.vue';
import Timeline from '@/components/Timeline.vue';
import { isLargeDesktop } from '@/utils/screen';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import emitter from 'tiny-emitter/instance';
import { transform, useSpring } from 'motion-v';

const GITHUB_LINK = 'https://github.com/musti132';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/mustafa-al-nashie-306362150/';

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
    if (widgetBlocker.value) {
        if (e) {
            x.set(700);
        } else {
            x.set(0);
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
    if (!isLargeDesktop) {
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
    return {
        transform: `translateX(${springProgress.value}px)`,
        height: `${springProgress.value}px`,
    } as Record<string, string>;
});
</script>

<template>
    <div id="home" class="grid sm:grid-cols-1 lg:grid-cols-5 w-full">
        <div class="col-span-2 row-span-1 flex-col">
            <div class="flex flex-col lg:flex-row items-center gap-4">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">MUSTAFA</h1>
                <div class="flex gap-4">
                    <FontAwesomeIcon
                        :icon="['fab', 'linkedin']"
                        class="text-3xl text-white/80 cursor-pointer inline-flex"
                        @click="open(LINKEDIN_LINK, '_blank')" />
                    <FontAwesomeIcon
                        :icon="['fab', 'github']"
                        class="text-3xl text-white/80 cursor-pointer inline-flex"
                        @click="open(GITHUB_LINK, '_blank')" />
                </div>
            </div>
            <p class="text-lg sm:text-xl lg:text-2xl text-white/80 mb-6">
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
        <div class="col-span-1 row-span-5 relative"></div>
        <!-- Skills -->
        <div class="col-span-2 row-span-5 sm:mx-auto">
            <div
                ref="widgetBlocker"
                :style="widgetBlockerStyle"
                class="relative transform-gpu mb-4 lg:col-span-2 pointer-events-none"></div>
            <h1 class="text-6xl font-bold text-white mb-10 lg:text-left md:text-center">Skills</h1>
            <p class="text-lg sm:text-xl lg:text-2xl text-white/80 mb-6 max-w-3xl">
                Proficient in JavaScript, TypeScript, Vue.js, React, Node.js, PHP, Laravel, MySQL, and PostgreSQL.
                Experienced with RESTful APIs, GraphQL, and version control using Git.
            </p>

            <div class="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <h2 class="text-2xl font-semibold text-white mb-2">Frontend</h2>
                    <ul class="list-disc list-inside text-white/80">
                        <li>JavaScript (ES6+)</li>
                        <li>TypeScript</li>
                        <li>Vue.js (3.x)</li>
                        <li>React</li>
                        <li>HTML5 & CSS3</li>
                        <li>Tailwind CSS</li>
                        <li>Bootstrap</li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold text-white mb-2">Backend</h2>
                    <ul class="list-disc list-inside text-white/80">
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>PHP</li>
                        <li>Laravel</li>
                        <li>RESTful APIs</li>
                        <li>GraphQL</li>
                        <li>Authentication & Authorization</li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-2xl font-semibold text-white mb-2">Databases & Tools</h2>
                    <ul class="list-disc list-inside text-white/80">
                        <li>MySQL</li>
                        <li>PostgreSQL</li>
                        <li>MongoDB</li>
                        <li>Git & GitHub</li>
                        <li>Docker</li>
                        <li>CI/CD (GitHub Actions, GitLab CI)</li>
                        <li>Unit Testing (Jest, PHPUnit)</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Projects -->
    <div class="grid sm:grid-cols-1 lg:grid-cols-5 w-full">
        <div class="col-span-5 row-span-1 flex items-center flex-col">
            <h1 class="text-6xl font-bold text-white mb-10">Projects</h1>
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
</template>
