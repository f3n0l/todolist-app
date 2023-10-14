<template>
    <div class="flex items-center justify-between w-full mb-4">
        <div class="flex items-center space-x-2">
            <div
                :class="task.completed ? 'bg-blue-500' : 'bg-transparent'"
                @click="toggleCompletion"
                class="w-6 h-6 border-2 border-gray-400 rounded-full cursor-pointer"
            ></div>
            <div :class="task.completed ? 'line-through text-gray-500' : ''">
                <h4>{{ task.name }}</h4>
                <p>{{ task.description }}</p>
            </div>
        </div>
        <div class="relative group">
            <button class="p-2">⋮</button>
            <div
                class="absolute right-0 z-10 bg-white border shadow-md mt-2 w-32 group-hover:block hidden space-y-2 p-2"
            >
                <button @click="deleteThisTask">Delete</button>
                <button @click="moveThisTaskToBacklog">Move to Backlog</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

import { useToDoListStore } from "../store/useTodoListStore";
import { Task } from "../types/types";

const { task } = toRefs(defineProps<{ task: Task }>()); // Now we use the Task type here

const store = useToDoListStore();

const toggleCompletion = () => {
    store.toggleTaskCompletion(task.value.id); // Accessing the id using .value
};

const deleteThisTask = () => {
    store.deleteTask(task.value.id); // Accessing the id using .value
};

const moveThisTaskToBacklog = () => {
    store.moveToBacklog(task.value.id); // Accessing the id using .value
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
/* Add your custom styles here */
</style>
