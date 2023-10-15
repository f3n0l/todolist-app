<template>
    <div class="h-auto w-full flex">
        <div class="h-auto w-full max-h-[42px] flex">
            <input
                v-model="searchTerm"
                type="text"
                placeholder="Search..."
                class="w-full flex-1 text-primaryText mr-4 p-2 px-3 py-[15px] max-h-[42px] border border-gray-300 rounded placeholder:text-secondaryText focus:outline-none focus:border-primary font-roboto text-md"
            />
            <button
                class="bg-primary flex-none mr-4 min-w-[95px] max-h-[42px] text-md font-roboto text-white py-3 px-[15px] hover:bg-primaryHover rounded border-1 border-darkBlue focus:outline-none focus:ring focus:border-blue-300"
                @click="sortBy('name')"
            >
                Sort by Name
            </button>
            <button
                class="bg-primary flex-none min-w-[93px] max-h-[42px] text-md font-roboto text-white py-3 px-[15px] hover:bg-primaryHover rounded border-1 border-darkBlue focus:outline-none focus:ring focus:border-blue-300"
                @click="sortBy('date')"
            >
                Sort by Date
            </button>
        </div>
        <div v-for="task in filteredBacklog" :key="task.id">
            <div class="flex items-center justify-between w-full mb-4">
                <div class="flex items-center space-x-2">
                    <div
                        :class="
                            task.completed ? 'bg-blue-500' : 'bg-transparent'
                        "
                        @click="toggleCompletion(task)"
                        class="w-6 h-6 border-2 border-gray-400 rounded-full cursor-pointer"
                    ></div>
                    <div
                        :class="
                            task.completed ? 'line-through text-gray-500' : ''
                        "
                    >
                        <h4>{{ task.name }}</h4>
                        <p>{{ task.description }}</p>
                    </div>
                </div>
                <button @click="moveToToDoList(task)" class="p-2">
                    Move to ToDoList
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useToDoListStore } from "../store/useTodoListStore";

import { Task } from "../types/types";

const store = useToDoListStore();
const searchTerm = ref("");
const filteredBacklog = computed(() => {
    if (searchTerm.value) {
        return store.backlog.filter((t) => t.name.includes(searchTerm.value));
    }
    return store.backlog;
});

const toggleCompletion = (task: Task) => {
    store.toggleTaskCompletion(task.id);
};

const moveToToDoList = (task: Task) => {
    store.moveTaskToToDoList(task.id);
};

const sortBy = (type: "name" | "date") => {
    if (type === "name") {
        store.backlog.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "date") {
        store.backlog.sort(
            (a, b) => a.creationDate.getTime() - b.creationDate.getTime()
        );
    }
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* Add your custom styles here */
</style>
