<template>
    <div class="flex justify-center items-start">
        <div class="max-w-[812px] w-screen h-[100vh] max-h-screen">
            <NavBar />
            <router-view />
            <ToDoInput />
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import ToDoInput from "./components/ToDoInput.vue";
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
