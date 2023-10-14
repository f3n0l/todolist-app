<template>
    <div class="flex items-center justify-between w-full mb-4">
        <input
            v-model="taskName"
            type="text"
            class="w-full text-primaryText mr-4 p-2 px-3 py-[15px] max-h-[42px] max-w-[85%] border border-gray-300 rounded placeholder:text-secondaryText focus:outline-none focus:border-primary font-roboto text-md"
            placeholder="Enter task name"
        />
        <button
            @click="addTask"
            class="bg-primary max-h-[42px] text-md font-roboto text-white py-3 px-[15px] rounded hover:bg-primaryHover border-1 border-darkBlue focus:outline-none focus:ring focus:border-blue-300"
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
