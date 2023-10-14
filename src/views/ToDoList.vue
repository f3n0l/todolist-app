<template>
    <div class="w-full h-[60vw] mt-3 flex flex-col justify-start">
        <!-- Completed Tasks Section -->
        <div class="">
            <div class="">
                <div
                    @click="toggleCompletedTasks"
                    class="cursor-pointer mb-2 flex items-center"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-3.5"
                        :class="{ 'rotate-90': completedTasksOpen }"
                    >
                        <path
                            d="M9.13883 6.46634L3.76097 11.8068C3.5016 12.0644 3.0811 12.0644 2.82176 11.8068L2.19452 11.1839C1.93559 10.9268 1.9351 10.5101 2.19341 10.2524L6.45546 5.99999L2.19341 1.74765C1.9351 1.48991 1.93559 1.07318 2.19452 0.816057L2.82176 0.193175C3.08113 -0.0643917 3.50163 -0.0643917 3.76097 0.193175L9.1388 5.53366C9.39817 5.7912 9.39817 6.20878 9.13883 6.46634Z"
                            fill="#CCCCCC"
                        />
                    </svg>
                    <span class="text-lg font-roboto text-md text-secondary"
                        >{{ completedTasks.length }} Done</span
                    >
                </div>
            </div>
            <transition name="slide-down">
                <div v-if="completedTasksOpen">
                    <div class="mb-2">
                        <!-- Completed tasks content -->
                        <TaskEntry
                            v-for="(task, index) in completedTasks"
                            :key="index"
                            :task="task"
                            :taskId="task.id"
                            :toggleActivation="toggleActivation"
                            :toggleMenu="toggleMenu"
                            :deleteTask="deleteTask"
                        />
                    </div>
                </div>
            </transition>
        </div>

        <div class="w-full h-px bg-gray-200 mb-3"></div>

        <!-- Open Tasks Section -->
        <div class="mb-6">
            <!-- Open tasks content -->
            <TaskEntry
                v-for="(task, index2) in openTasks"
                :key="index2"
                :task="task"
                :toggleActivation="toggleActivation"
                :toggleMenu="toggleMenu"
                :deleteTask="deleteTask"
                :moveToBacklog="moveToBacklog"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, Ref } from "vue";
import { useToDoListStore } from "../store/useTodoListStore";
import TaskEntry from "../components/EntryComponent.vue";

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

// function moveToBacklog(taskId: number): void {
//     store.moveToBacklog(taskId);
// }

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
