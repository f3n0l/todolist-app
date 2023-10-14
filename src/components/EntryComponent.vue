<template>
    <div class="w-full mb-2 p-4 rounded-lg flex items-center relative">
        <input
            @click.stop="toggleActivation"
            type="checkbox"
            v-model="task.completed"
            class="w-6 h-6 rounded-full mr-4 cursor-pointer"
        />
        <div class="ml-4 flex flex-col flex-1">
            <div
                class="text-md text-primaryText font-roboto leading-normal"
                :class="{ 'line-through': task.completed }"
            >
                {{ task.name }}
            </div>
            <div
                class="text-sm text-secondary font-roboto leading-normal"
                :class="{ 'line-through': task.completed }"
            >
                {{ task.description }}
            </div>
        </div>
        <div
            @click="toggleMenu($event, task.id)"
            class="menu-dots flex cursor-pointer"
        >
            <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12.9465 10.0558C12.9465 11.666 11.6437 12.9688 10.0335 12.9688C8.4233 12.9688 7.12056 11.666 7.12056 10.0558C7.12056 8.44559 8.4233 7.14285 10.0335 7.14285C11.6437 7.14285 12.9465 8.44559 12.9465 10.0558ZM17.1541 7.14285C15.5439 7.14285 14.2411 8.44559 14.2411 10.0558C14.2411 11.666 15.5439 12.9688 17.1541 12.9688C18.7643 12.9688 20.067 11.666 20.067 10.0558C20.067 8.44559 18.7643 7.14285 17.1541 7.14285ZM2.91296 7.14285C1.30274 7.14285 0 8.44559 0 10.0558C0 11.666 1.30274 12.9688 2.91296 12.9688C4.52317 12.9688 5.82591 11.666 5.82591 10.0558C5.82591 8.44559 4.52317 7.14285 2.91296 7.14285Z"
                    fill="#AAAAAA"
                />
            </svg>
        </div>
        <transition name="fade">
            <div
                v-if="isActive && activeMenuId === task.id"
                class="menu-content"
            >
                <!-- Menu Items -->
                <div @click="deleteTask" class="menu-item">Delete</div>
                <div @click="moveToBacklog" class="menu-item">
                    Move to Backlog
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";

interface Task {
    name: string;
    description: string;
    completed: boolean;
    id: number;
}

defineProps({
    task: {
        type: Object as PropType<Task>,
        required: true,
    },
    toggleActivation: {
        type: Function as PropType<() => void>,
        required: true,
    },
    toggleMenu: {
        type: Function as PropType<(id: number) => void>,
        required: true,
    },
    deleteTask: {
        type: Function as PropType<() => void>,
        required: true,
    },
    moveToBacklog: {
        type: Function as PropType<() => void>,
        required: true,
    },
});

const isActive = ref(false);
const activeMenuId = ref<number | null>(null);
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
/* Your styles here */
/* Same styles as before */

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
