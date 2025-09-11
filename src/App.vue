<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import Contact from '@/views/Contact.vue';
import Navbar from '@/layout/Navbar.vue';
import { isXLargeScreen, is2XLargeScreen, isLargeDesktop, isLargeScreen, isMediumScreen } from '@/utils/screen';
import initKonamiCode from './utils/konami';
import { useSpring, motion } from 'motion-v';
import emitter from 'tiny-emitter/instance';

/* Konami Properties */
const rotateValue = ref(0);
const scaleValue = ref(1);

/* Widget Properties */
const showWidget = ref<boolean>(false);
const springProgress = ref(0);

/* Canvas Properties */
const canvas = ref<HTMLCanvasElement | null>(null);
const main = ref<HTMLElement | null>(null);

/* Screen Size Reactive Properties */
const slideX = useSpring(200, { bounce: 0.2, duration: 600 });
const opacity = useSpring(0, { bounce: 0.2 });

// When the spring changes, mirror to simple refs (handy for computed styles)
const springX = ref(100);
const springOpacity = ref(0);

slideX.on('change', (latest) => (springX.value = latest));
opacity.on('change', (latest) => (springOpacity.value = latest));

const x = useSpring(0, {
    bounce: 0.3,
});

x.on('change', (latest) => {
    springProgress.value = latest;
});

watch(showWidget, (newVal) => {
    if (newVal) {
        slideX.set(55);
        opacity.set(1);
        drawWidgetBorder();
        emitter.emit('widgetShown', true);
    } else {
        slideX.set(280);
        opacity.set(0);
        drawBorder(
            canvas?.value?.getContext('2d') as CanvasRenderingContext2D,
            main?.value?.offsetWidth as number,
            main?.value?.offsetHeight as number,
        );
        emitter.emit('widgetShown', false);
    }
});

const showWidgetToggle = () => {
    showWidget.value = !showWidget.value;
};

const initializeCanvas = () => {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;

    const appWidth = main?.value?.offsetWidth || 1000;
    const appHeight = main?.value?.offsetHeight || 500;

    const dpr = window.devicePixelRatio || 1;
    canvas.value.width = appWidth * dpr;
    canvas.value.height = appHeight * dpr;
    canvas.value.style.width = `${appWidth}px`;
    canvas.value.style.height = `${appHeight}px`;
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.scale(dpr, dpr);
    drawBorder(ctx, appWidth, appHeight);
};

const drawBorder = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1;

    if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, width - 1, height - 1, 20);
        ctx.stroke();
    } else {
        // fallback for older browsers
        const radius = 20;
        ctx.beginPath();
        ctx.moveTo(radius, 0.5);
        ctx.lineTo(width - radius, 0.5);
        ctx.quadraticCurveTo(width - 0.5, 0.5, width - 0.5, radius);
        ctx.lineTo(width - 0.5, height - radius);
        ctx.quadraticCurveTo(width - 0.5, height - 0.5, width - radius, height - 0.5);
        ctx.lineTo(radius, height - 0.5);
        ctx.quadraticCurveTo(0.5, height - 0.5, 0.5, height - radius);
        ctx.lineTo(0.5, radius);
        ctx.quadraticCurveTo(0.5, 0.5, radius, 0.5);
        ctx.closePath();
        ctx.stroke();
    }

    if (showWidget.value) {
        drawWidgetBorder();
    }
};

/**
 * Remove top right border to create a 1/4 rectangle cut out effect
 */
const drawWidgetBorder = () => {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext('2d');

    if (!ctx) return;
    if (!main?.value) return;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';

    ctx.lineWidth = 1;

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    const x = main.value.offsetWidth;
    const xWithOffset = main.value.offsetWidth + 40;
    const y = main.value.offsetHeight;
    const yWithOffset = main.value.offsetHeight - 900;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.roundRect(20, 0.5, xWithOffset / 2 - 30, 0, 8); // Top-left corner to top-middle
    ctx.arcTo(xWithOffset / 2, 0.5, xWithOffset / 2, 8, 8); // Top-middle corner
    ctx.roundRect(xWithOffset / 2, 6, 0, yWithOffset / 2 - 20, 8); // Top-middle to center
    ctx.arcTo(xWithOffset / 2, yWithOffset / 2, xWithOffset / 2 + 20, yWithOffset / 2, 8); // Corner center to right-middle
    ctx.roundRect(xWithOffset / 2 + 6, yWithOffset / 2, x - (xWithOffset / 2 + 20), 0, 8); // Center to right-middle
    ctx.arcTo(x, yWithOffset / 2, x, yWithOffset / 2 + 30, 8); // Right-middle corner to bottom-right
    ctx.roundRect(x, yWithOffset / 2 + 6, 0, y, 8); // Right middle to bottom-right
    ctx.moveTo(x, y - 25);
    ctx.arcTo(x, y, 0.5, y, 20);
    ctx.roundRect(10, y, x - 28, 0, 20);

    const left = 0;
    const r = 20;
    const topY = 0.5;

    ctx.moveTo(left + r, y);
    ctx.arc(left + r, y - r, r, Math.PI / 2, Math.PI);
    ctx.lineTo(left, topY + r);
    ctx.arc(left + r, topY + r, r, Math.PI, -Math.PI / 2);

    ctx.stroke();
};

onMounted(() => {
    if (isLargeDesktop) {
        const resizeObserver = new ResizeObserver(() => {
            initializeCanvas();
        });

        resizeObserver.observe(main?.value as Element, {
            box: 'device-pixel-content-box',
        });
    }

    initKonami();
    if (!isLargeDesktop) return;
    window.addEventListener('showWidget', showWidgetToggle);
});

onUnmounted(() => {
    if (!isLargeDesktop) return;
    window.removeEventListener('showWidget', showWidgetToggle);
});

const initKonami = () => {
    initKonamiCode(
        async () => {
            const app = document.querySelector('.app') as HTMLElement;
            if (!app) return;

            app.animate(
                [
                    { border: '0px solid red', boxShadow: '0 0 5px red' },
                    { border: '1px solid red', boxShadow: '0 0 10px red' },
                    { border: '0px solid red', boxShadow: '0 0 20px red' },
                    { border: '1px solid red', boxShadow: '0 0 5px red' },
                ],
                {
                    duration: 1000,
                    iterations: Infinity,
                    easing: 'ease-in-out',
                },
            );

            rotateValue.value += 180;
            scaleValue.value = 0.8;

            setTimeout(() => {
                app.getAnimations().forEach((animation) => animation.cancel());
            }, 3000);
        },
        (key) => {
            console.log('Key in konami code pressed:', key);
        },
    );
};

const widgetTransformStyle = computed(() => {
    return {
        transform: `translateX(${springX.value}%)`,
        opacity: String(springOpacity.value),
    } as Record<string, string>;
});
</script>

<template>
    <div class="glass-morphism sticky top-0 z-50 mb-8 rounded-md" v-if="!isLargeDesktop">
        <Navbar />
    </div>
    <motion.div :animate="{ rotate: rotateValue, scale: scaleValue }" class="layout flex items-start" :class="{ 'gap-4': showWidget }">
        <div
            ref="main"
            class="main app flex flex-col gap-8 min-w-0 flex-animate canvas-shown"
            :class="{
                'glass-border': !isLargeDesktop,
            }">
            <div class="container mx-auto max-w-full flex-1">
                <canvas ref="canvas" class="absolute canvas w-full h-full inset-0"></canvas>
                <router-view />
            </div>
            <div class="footer text-white/80 sticky bottom-0 p-2 mb-2 w-full flex justify-end items-center">
                <p class="mr-2 text-md">© 2025 Mustafa Al-Nashie. All rights reserved.</p>
            </div>
        </div>

        <div
            class="widget w-full absolute min-h-[400px] flex flex-col gap-8 flex-animate overflow-hidden"
            :class="{
                'pointer-events-none': !showWidget,
                'min-w-[50%]': is2XLargeScreen,
                'min-w-[600px]': isXLargeScreen,
            }"
            :style="widgetTransformStyle">
            <div class="contact-form">
                <Contact></Contact>
            </div>
        </div>
    </motion.div>
</template>

<style scoped>
.layout {
    width: 100%;
}

.widget {
    margin-inline: auto;
}

.canvas {
    background: transparent;
    pointer-events: none;
}

.flex-animate {
    transition:
        flex-basis 450ms cubic-bezier(0.22, 0.9, 0.35, 1),
        opacity 350ms ease;
    will-change: flex-basis, opacity;
}

.main .container,
.widget .contact-form {
    border: 0px;
    transition: all 350ms ease;
}

.widget {
    box-sizing: border-box;
}

.widget .contact-form {
    padding: 0.5rem;
}

@keyframes pulseRed {
    0% {
        border: 0px solid red !important;
        box-shadow: 0 0 5px red;
    }
    25% {
        border: 1px solid red !important;
        box-shadow: 0 0 10px red;
    }
    50% {
        border: 0px solid red !important;
        box-shadow: 0 0 20px red;
    }
    100% {
        border: 1px solid red !important;
        box-shadow: 0 0 5px red;
    }
}
</style>
