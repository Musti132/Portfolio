<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed, useTemplateRef, type Ref } from 'vue';
import Contact from '@/views/Contact.vue';
import Navbar from '@/layout/Navbar.vue';
import { isXLargeScreen, is2XLargeScreen, isDesktop, isLargeScreen, isMediumScreen } from '@/utils/screen';
import { useSpring } from 'motion-v';
import emitter from 'tiny-emitter/instance';
import { useColors } from '@/utils/colors';
const DEFAULT_COLOR = 'rgba(255, 255, 255, 0.18)';
const { colors } = useColors();

/* Widget Properties */
const showWidget = ref<boolean>(false);

/* Canvas Properties */
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
const main = useTemplateRef<HTMLDivElement>('main');

/* Canvas Style Properties */
const lineWidth: number = 2;
const strokeStyle: Ref<string> = ref(colors.value.secondary || DEFAULT_COLOR);

watch(colors.value, (newStyle) => {
    strokeStyle.value = newStyle.secondary || DEFAULT_COLOR;

    if (canvas.value && main?.value) {
        drawBorder(
            canvas?.value?.getContext('2d') as CanvasRenderingContext2D,
            main?.value?.offsetWidth as number,
            main?.value?.offsetHeight as number,
        );
    }
});

/* Screen Size Reactive Properties */
const slideX = useSpring(200, { bounce: 0.2, duration: 600 });
const opacity = useSpring(0, { bounce: 0.2 });

const springX = ref(100);
const springOpacity = ref(0);

slideX.on('change', (latest) => (springX.value = latest));
opacity.on('change', (latest) => (springOpacity.value = latest));

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

    ctx.scale(dpr, dpr);
    drawBorder(ctx, appWidth, appHeight);
};

const getStrokeColor = (width: number): CanvasGradient | string => {
    if (!canvas.value) return DEFAULT_COLOR;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return DEFAULT_COLOR;

    let strokeColor: CanvasGradient | string = strokeStyle.value;

    if (!colors.value.borderGradient) {
        strokeColor = strokeStyle.value;
    } else {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        const colorStops = colors.value.borderGradient.split(',').map((color) => color.trim());

        colorStops.forEach((colorStop, index) => {
            const position = index / (colorStops.length - 1);
            gradient.addColorStop(position, colorStop);
        });

        strokeColor = gradient;
    }

    return strokeColor;
};

const drawBorder = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = getStrokeColor(width);

    const lw = lineWidth;
    const inset = lw / 2;
    ctx.lineWidth = lw;

    const w = Math.max(0, width - lw);
    const h = Math.max(0, height - lw);
    const r = 20;

    if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(inset, inset, w, h, r - lw);
        ctx.stroke();
    } else {
        // fallback for older browsers
        const radius = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(inset + radius, inset);
        ctx.lineTo(inset + w - radius, inset);
        ctx.quadraticCurveTo(inset + w, inset, inset + w, inset + radius);
        ctx.lineTo(inset + w, inset + h - radius);
        ctx.quadraticCurveTo(inset + w, inset + h, inset + w - radius, inset + h);
        ctx.lineTo(inset + radius, inset + h);
        ctx.quadraticCurveTo(inset, inset + h, inset, inset + h - radius);
        ctx.lineTo(inset, inset + radius);
        ctx.quadraticCurveTo(inset, inset, inset + radius, inset);
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
    if (!canvas.value || !main?.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;

    const lw = lineWidth;
    const cssW = main.value.offsetWidth;
    const cssH = main.value.offsetHeight;
    const widgetHeight = document.querySelector('.widget')?.clientHeight || 400;
    ctx.strokeStyle = getStrokeColor(cssW);
    ctx.lineWidth = lw;

    ctx.clearRect(0, 0, cssW, cssH);

    const inset = lw / 2;
    const w = cssW - lw;
    const h = cssH - lw;
    const rBase = 20;
    const r = Math.min(rBase, w / 2, h / 2);

    const cutX = w / 2;
    const yCut = Math.max(inset + r, Math.min(h - r, widgetHeight + 120 - inset));

    ctx.beginPath();

    ctx.moveTo(inset + r, inset); // Start position top left corner
    ctx.lineTo(cutX - r, inset); // Left half of the top edge (from left corner to midpoint)
    ctx.moveTo(inset + r, inset); //  Start position top left corner
    ctx.quadraticCurveTo(inset, inset, inset, inset + r); // top-left corner curve
    ctx.lineTo(inset, h - r); // left side
    ctx.quadraticCurveTo(inset, h, inset + r, h); // bottom-left corner
    ctx.lineTo(w - r, h); // bottom edge
    ctx.quadraticCurveTo(w, h, w, h - r); // bottom-right corner
    ctx.lineTo(w, widgetHeight + 140 - inset); // right side up to widget height,
    ctx.quadraticCurveTo(w, yCut, w - r, yCut); // Curve to left center
    ctx.lineTo(cutX + r, yCut); // Center
    ctx.quadraticCurveTo(cutX, yCut, cutX, yCut + r - 40); // Curve to top center
    ctx.lineTo(cutX, inset + r); // Up to top center
    ctx.quadraticCurveTo(cutX, inset, cutX - r, inset); // Curve to left
    ctx.stroke();
};

onMounted(() => {
    const resizeObserver = new ResizeObserver(() => {
        initializeCanvas();
    });

    resizeObserver.observe(main?.value as Element, {
        box: 'border-box',
    });

    if (!isDesktop) return;
    window.addEventListener('showWidget', showWidgetToggle);
});

onUnmounted(() => {
    if (!isDesktop) return;
    window.removeEventListener('showWidget', showWidgetToggle);
});

const widgetTransformStyle = computed(() => {
    return {
        transform: `translateX(${springX.value}%)`,
        opacity: String(springOpacity.value),
    } as Record<string, string>;
});
</script>

<template>
    <div class="glass-morphism sticky top-0 z-50 mb-8 rounded-md" v-if="!isDesktop">
        <Navbar />
    </div>
    <div
        class="layout flex items-start"
        :class="{ 'gap-4': showWidget }">
        <div ref="main" class="main glass-morphism app flex flex-col gap-8 canvas-shown">
            <div class="container mx-auto max-w-full flex-1">
                <canvas ref="canvas" class="absolute canvas w-full h-full inset-0"></canvas>
                <router-view />
            </div>
            <div class="footer text-light/80 sticky bottom-0 p-2 mb-2 w-full flex justify-end items-center">
                <p class="mr-2 text-md">© 2025 Mustafa Al-Nashie. All rights reserved.</p>
            </div>
        </div>

        <div
            v-if="isDesktop"
            class="widget w-full absolute min-h-[400px] flex flex-col gap-8 flex-animate overflow-hidden"
            :class="{
                'pointer-events-none': !showWidget,
                'min-w-[50%]': is2XLargeScreen,
                'min-w-[600px]': isXLargeScreen,
            }"
            :style="widgetTransformStyle">
            <div
                class="contact-form"
                :class="{
                    'max-w-[400px]': isMediumScreen,
                    'max-w-[600px]': isLargeScreen,
                }">
                <Contact></Contact>
            </div>
        </div>
    </div>
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
</style>
