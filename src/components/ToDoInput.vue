<template>
    <div class="flex items-center w-full mb-4">
        <input
            v-model="taskName"
            type="text"
            class="w-full p-2 px-3 py-[15px] border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 font-roboto text-md"
            placeholder="Enter task name"
        />
        <button
            @click="addTask"
            class="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
            Add Task
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToDoListStore } from "../store/useTodoListStore";

const taskName = ref("");
const store = useToDoListStore();

function addTask() {
    if (taskName.value.trim() === "") {
        return;
    }
    const newTask = {
        id: Date.now(), // Use a unique identifier, for example, current timestamp
        name: taskName.value,
        description: "Description for Task",
        completed: false,
    };
    store.addTask(newTask);
    taskName.value = "";
}
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
/* Add your custom styles here */
</style>
