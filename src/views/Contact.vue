<script lang="ts" setup>
import Button from '@/components/Button.vue';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const error = ref(false);

const submitForm = async () => {
    if (!name.value || !message.value) {
        error.value = true;
        return;
    }

    error.value = false;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            message: message.value,
            subject: 'Contact Form',
        }),
    });

    if (response.ok) {
        alert('Message sent successfully!');
        name.value = '';
        email.value = '';
        message.value = '';
    }
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
                <span class="text-red-500" v-if="error">* Please fill in all required fields.</span>
                <div class="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        v-model="name"
                        class="w-full p-3 rounded-lg bg-white/10 border text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                        :class="{ 'border-red-500': error, 'border-white/20': !error }"/>
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
                    class="w-full p-3 rounded-lg bg-white/10 border text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                    :class="{ 'border-red-500': error, 'border-white/20': !error }"></textarea>
                <Button
                    buttonText="Send Message"
                    type="submit"
                    :buttonAction="submitForm"
                    class="self-end bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition"></Button>
            </div>
        </div>
    </div>
</template>
