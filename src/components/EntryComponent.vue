<template>
    <div
        class="entry-wrapper w-full mb-2 p-4 border rounded-lg flex items-center relative"
    >
        <!-- Circle Div -->
        <input
            @click="toggleActivation"
            type="checkbox"
            value=""
            class="w-6 h-6 bg-red-100 rounded-full mr-4 cursor-pointer"
        />

        <!-- Name and Description Div -->
        <div class="ml-4 flex flex-col flex-1">
            <div
                class="text-lg font-semibold"
                :class="{ 'line-through': activated }"
            >
                {{ taskName }}
            </div>
            <div class="text-sm" :class="{ 'line-through': activated }">
                {{ taskDescription }}
            </div>
        </div>

        <!-- Three Dots Menu -->
        <div @click="toggleMenu" class="menu-dots"></div>

        <!-- Menu Content -->
        <transition name="fade">
            <div v-if="menuOpen" class="menu-content">
                <!-- Menu Items -->
                <div @click="deleteTask" class="menu-item">Delete</div>
                <div @click="moveToBacklog" class="menu-item">
                    Move to Backlog
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts" props="props">
import { ref } from "vue";

const props = defineProps<{
    taskName: string;
    taskDescription: string;
}>();

const { taskName, taskDescription } = props;
const activated = ref(false);
const menuOpen = ref(false);

function toggleActivation() {
    activated.value = !activated.value;
}

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

function deleteTask() {
    // Logic to delete the task
}

function moveToBacklog() {
    // Logic to move the task to the backlog
}
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.entry-wrapper {
    background-color: #f0f0f0;
    position: relative;
}

.menu-dots {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
    position: absolute;
    right: 10px;
    cursor: pointer;
}

.menu-content {
    position: absolute;
    top: 30px;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 4px;
}

.menu-item {
    cursor: pointer;
    padding: 8px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
