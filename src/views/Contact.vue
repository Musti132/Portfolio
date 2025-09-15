<script lang="ts" setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue';

const WEB3FORMS_ACCESS_KEY = '5abc17db-b0f1-41d1-86fc-dcf4507eda10';
const name = ref('');
const email = ref('');
const message = ref('');

const submitForm = async () => {
    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name.value,
            email: email.value,
            message: message.value,
        }),
    });
};
</script>

<template>
    <div class="md:max-w-xl xl:max-w-lg 2xl:max-w-full max-h-fit">
        <h1 class="text-6xl font-bold text-white">CONTACT</h1>

        <p class="text-white/70 mt-4 max-w-2xl">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            Feel free to reach out to me through this form below.
        </p>

        <div class="mt-8 flex flex-col gap-4 max-w-2xl">
            <div class="flex flex-col gap-4">
                <div class="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        v-model="name"
                        class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
                    <input
                        type="email"
                        v-model="email"
                        placeholder="Your Email"
                        class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
                </div>
                <textarea
                    rows="5"
                    v-model="message"
                    placeholder="Your Message"
                    class="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"></textarea>
                <Button
                    buttonText="Send Message"
                    type="submit"
                    :buttonAction="submitForm"
                    class="self-end bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition"></Button>
            </div>
        </div>
    </div>
</template>
