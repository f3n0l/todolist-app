<template>
    <div class="max-w-screen-sm h-[60vw] mt-3 flex flex-col justify-start">
        <!-- Completed Tasks Section -->
        <div class="mb-3">
            <div @click="toggleCompletedTasks" class="cursor-pointer mb-2">
                <div
                    :class="{ 'rotate-180': completedTasksOpen }"
                    class="arrow-icon mr-2"
                ></div>
                <span class="text-lg font-bold"
                    >{{ completedTasks.length }} Done</span
                >
            </div>
            <div class="sections-wrapper">
                <transition name="slide-down">
                    <div v-if="completedTasksOpen">
                        <!-- Completed tasks content -->
                        <div
                            v-for="(task, index) in completedTasks"
                            :key="index"
                            class="entry-wrapper w-full mb-2 p-4 border rounded-lg flex items-center relative"
                        >
                            <input
                                @click="toggleActivation(task.id)"
                                type="checkbox"
                                v-model="task.completed"
                                class="w-6 h-6 bg-red-100 rounded-full mr-4 cursor-pointer"
                            />
                            <div class="ml-4 flex flex-col flex-1">
                                <div
                                    class="text-lg font-semibold"
                                    :class="{ 'line-through': task.completed }"
                                >
                                    {{ task.name }}
                                </div>
                                <div
                                    class="text-sm"
                                    :class="{ 'line-through': task.completed }"
                                >
                                    {{ task.description }}
                                </div>
                            </div>
                            <div
                                @click="toggleMenu(task.id, $event)"
                                class="menu-dots"
                            ></div>

                            <transition name="fade">
                                <div
                                    v-if="activeMenuId === task.id"
                                    class="menu-content"
                                >
                                    <!-- Menu Items -->
                                    <div
                                        @click="deleteTask(task.id)"
                                        class="menu-item"
                                    >
                                        Delete
                                    </div>
                                    <div
                                        @click="moveToBacklog(task.id)"
                                        class="menu-item"
                                    >
                                        Move to Backlog
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <div class="w-full h-px bg-gray-200 mb-3"></div>

        <!-- Open Tasks Section -->
        <div class="mb-6">
            <!-- Open tasks content -->
            <div
                v-for="(task, index) in openTasks"
                :key="index"
                class="entry-wrapper w-full mb-2 p-4 border rounded-lg flex items-center relative"
            >
                <input
                    @click="toggleActivation(task.id)"
                    type="checkbox"
                    v-model="task.completed"
                    class="w-6 h-6 bg-red-100 rounded-full mr-4 cursor-pointer"
                />
                <div class="ml-4 flex flex-col flex-1">
                    <div
                        class="text-lg font-semibold"
                        :class="{ 'line-through': task.completed }"
                    >
                        {{ task.name }}
                    </div>
                    <div
                        class="text-sm"
                        :class="{ 'line-through': task.completed }"
                    >
                        {{ task.description }}
                    </div>
                </div>
                <div
                    @click="toggleMenu(task.id, $event)"
                    class="menu-dots"
                ></div>
                <transition name="fade">
                    <div v-if="activeMenuId === task.id" class="menu-content">
                        <!-- Menu Items -->
                        <div @click="deleteTask(task.id)" class="menu-item">
                            Delete
                        </div>
                        <div @click="moveToBacklog(task.id)" class="menu-item">
                            Move to Backlog
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, Ref, reactive } from "vue";
import { useToDoListStore } from "../store/useTodoListStore";
window.addEventListener("click", () => {
    menuOpen.value = false;
});

const store = reactive(useToDoListStore());
const activeMenuId: Ref<number | null> = ref(null);

const completedTasksOpen = ref(true);

const completedTasks = computed(() =>
    store.tasks.filter((task) => task.completed)
);
const openTasks = computed(() => store.tasks.filter((task) => !task.completed));

const menuOpen = ref(false);

function toggleCompletedTasks() {
    completedTasksOpen.value = !completedTasksOpen.value;
}

function toggleActivation(taskId: number) {
    console.log(taskId);
    store.toggleTaskCompletion(taskId);
}

function deleteTask(taskId: number) {
    store.deleteTask(taskId);
}
// function moveToBacklog(taskId: number) {
//     store.moveToBacklog(taskId);
// }
function toggleMenu(taskId: number, event: MouseEvent) {
    // Prevent the click event from propagating to the parent elements
    event.stopPropagation();

    // Toggle the menu for the clicked entry
    if (activeMenuId.value === taskId) {
        // If the menu is already open for this entry, close it
        activeMenuId.value = null;
    } else {
        // Otherwise, open the menu for this entry
        activeMenuId.value = taskId;
    }
}

onMounted(() => {
    window.addEventListener("click", handleGlobalClick);
});

onBeforeUnmount(() => {
    window.removeEventListener("click", handleGlobalClick);
});

function handleGlobalClick(event: MouseEvent) {
    // Close the menu if the click target is not within the menu or its children
    const menu = document.querySelector(".menu-content");
    if (menu && !menu.contains(event.target as Node)) {
        activeMenuId.value = null;
    }
}
</script>

<style scoped>
/* Your styles here */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.entry-wrapper {
    background-color: #f0f0f0;
    position: relative;
    /* Add other styles as needed */
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
