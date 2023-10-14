<template>
    <div class="flex flex-col items-start">
        <nav class="font-roboto text-28 font-bold leading-32.81 mb-4 mt-[30px]">
            <router-link
                to="/"
                class="mr-8 relative hover:text-primaryText transition duration-300"
                :class="{
                    'text-primaryText': route.path === '/',
                    'text-secondaryText': route.path !== '/',
                }"
            >
                To Do List
                <span v-if="route.path === '/'" class="active-indicator"></span>
            </router-link>
            <router-link
                to="/backlog"
                class="relative hover:text-primaryText transition duration-300"
                :class="{
                    'text-primaryText': route.path === '/backlog',
                    'text-secondaryText': route.path !== '/backlog',
                }"
            >
                Backlog
                <span
                    v-if="route.path === '/backlog'"
                    class="active-indicator"
                ></span>
            </router-link>
        </nav>
        <div class="w-full h-px bg-gray-200"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showBorder = ref(false);

onMounted(() => {
    watchEffect(() => {
        showBorder.value = route.path === "/" || route.path === "/backlog";
    });
});
</script>

<style scoped lang="css">
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.active-indicator {
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #0080ff;
    border-radius: 99px;
    transition: width 0.3s, left 0.3s;
    z-index: 1;
}

.router-link-active .active-indicator {
    width: 100%;
}
</style>
