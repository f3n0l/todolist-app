<template>
    <div class="container mx-auto p-4">
        <ToDoInput :disabled="true" />
        <input
            v-model="searchTerm"
            type="text"
            placeholder="Search..."
            class="mb-4"
        />
        <button @click="sortBy('name')">Sort by Name</button>
        <button @click="sortBy('date')">Sort by Date</button>
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
import ToDoInput from "../components/ToDoInput.vue";
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
    } else {
        store.backlog.sort((a, b) => a.id - b.id); // Assuming id is the timestamp
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
