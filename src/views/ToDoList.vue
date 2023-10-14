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

        <!-- Completed Tasks Section -->
        <button @click="toggleCompletedTasksSection">
            {{ completedTasksSectionOpen ? "Hide" : "Show" }} Completed Tasks
            ({{ completedTasks.length }})
        </button>
        <div v-if="completedTasksSectionOpen">
            <h3>Done</h3>
            <div v-for="task in completedTasks" :key="task.id">
                <!-- Render completed tasks here -->
                <div class="flex items-center justify-between w-full mb-4">
                    <div class="flex items-center space-x-2">
                        <div
                            :class="
                                task.completed
                                    ? 'bg-blue-500'
                                    : 'bg-transparent'
                            "
                            @click="toggleCompletion(task)"
                            class="w-6 h-6 border-2 border-gray-400 rounded-full cursor-pointer"
                        ></div>
                        <div
                            :class="
                                task.completed
                                    ? 'line-through text-gray-500'
                                    : ''
                            "
                        >
                            <h4>{{ task.name }}</h4>
                            <p>{{ task.description }}</p>
                        </div>
                    </div>
                    <div class="relative group">
                        <button @click="toggleMenu(task)" class="p-2">⋮</button>
                        <div
                            v-if="task.showMenu"
                            class="absolute right-0 z-10 bg-white border shadow-md mt-2 w-32 space-y-2 p-2"
                        >
                            <button @click="deleteTask(task)">Delete</button>
                            <button @click="moveToBacklog(task)">
                                Move to Backlog
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Open Tasks -->
        <div>
            <h3>Open Tasks</h3>
            <div v-for="task in openTasks" :key="task.id">
                <div class="flex items-center justify-between w-full mb-4">
                    <div class="flex items-center space-x-2">
                        <div
                            :class="
                                task.completed
                                    ? 'bg-blue-500'
                                    : 'bg-transparent'
                            "
                            @click="toggleCompletion(task)"
                            class="w-6 h-6 border-2 border-gray-400 rounded-full cursor-pointer"
                        ></div>
                        <div
                            :class="
                                task.completed
                                    ? 'line-through text-gray-500'
                                    : ''
                            "
                        >
                            <h4>{{ task.name }}</h4>
                            <p>{{ task.description }}</p>
                        </div>
                    </div>
                    <div class="relative group">
                        <button @click="toggleMenu(task)" class="p-2">⋮</button>
                        <div
                            v-if="task.showMenu"
                            class="absolute right-0 z-10 bg-white border shadow-md mt-2 w-32 space-y-2 p-2"
                        >
                            <button @click="deleteTask(task)">Delete</button>
                            <button @click="moveToBacklog(task)">
                                Move to Backlog
                            </button>
                        </div>
                    </div>
                </div>
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
const completedTasksSectionOpen = ref(true); // Set to true to open by default

const completedTasks = computed(() => store.tasks.filter((t) => t.completed));

const openTasks = computed(() => store.tasks.filter((t: Task) => !t.completed));

const toggleCompletion = (task: Task) => {
    store.toggleTaskCompletion(task.id);
};

const deleteTask = (task: Task) => {
    store.deleteTask(task.id);
};

const moveToBacklog = (task: Task) => {
    store.moveToBacklog(task.id);
};

const sortBy = (type: "name" | "date") => {
    if (type === "name") {
        store.tasks.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        store.tasks.sort((a, b) => a.id - b.id); // Assuming id is the timestamp
    }
};

const toggleMenu = (task: Task) => {
    if (!task.hasOwnProperty("showMenu")) {
        task.showMenu = false; // Initialize showMenu property if it doesn't exist
    }
    task.showMenu = !task.showMenu;
};

const toggleCompletedTasksSection = () => {
    completedTasksSectionOpen.value = !completedTasksSectionOpen.value;
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
/* Add your custom styles here */
</style>
