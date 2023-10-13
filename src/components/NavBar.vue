<template>
    <div class="flex flex-col items-start">
        <nav class="font-roboto text-28 font-bold leading-32.81 mb-4 mt-[30px]">
            <router-link
                to="/"
                class="mr-8 relative secondaryText hover:primaryText transition duration-300"
                :class="{ primaryText: route.path === '/' }"
            >
                To Do List
                <span v-if="route.path === '/'" class="active-indicator"></span>
            </router-link>
            <router-link
                to="/backlog"
                class="relative secondaryText hover:primaryText transition duration-300"
                :class="{ primaryText: route.path === '/backlog' }"
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.active-indicator {
    position: absolute;
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
    left: 0;
}
</style>
