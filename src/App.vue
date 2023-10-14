<template>
    <div class="flex justify-center items-start min-h-screen">
        <div class="max-w-[812px] p-4 w-screen">
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
