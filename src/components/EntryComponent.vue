<template>
    <div class="flex items-center justify-between w-full mb-4">
        <div class="flex items-center space-x-2">
            <div
                :class="task.completed ? 'bg-blue-500' : 'bg-transparent'"
                @click="toggleCompletion(task)"
                class="w-6 h-6 border-2 border-gray-400 rounded-full cursor-pointer"
            ></div>
            <div :class="task.completed ? 'line-through text-gray-500' : ''">
                <h4>{{ task.name }}</h4>
                <p>{{ task.description }}</p>
            </div>
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useToDoListStore } from "../store/useTodoListStore";
import { Task } from "../types/types";

const { task } = defineProps<{ task: Task }>();

const store = useToDoListStore();

const toggleCompletion = (task: Task) => {
    store.toggleTaskCompletion(task.id);
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
