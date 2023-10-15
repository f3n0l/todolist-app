<template>
    <div class="h-[80vh] w-full flex flex-col">
        <div class="h-auto w-full flex pt-4">
            <input
                v-model="searchTerm"
                type="text"
                placeholder="Search..."
                class="w-full flex-1 text-primaryText mr-4 p-2 px-3 py-[15px] max-h-[42px] border border-secondary rounded placeholder:text-secondaryText focus:outline-none focus:border-primary font-roboto text-md"
            />
            <button
                class="bg-primary border border-darkBlue flex-none mr-4 min-w-[95px] max-h-[42px] text-md font-roboto text-white py-3 px-[15px] hover:bg-primaryHover rounded border-1 border-darkBlue"
                @click="sortBy('name')"
            >
                Sort by Name
            </button>
            <button
                class="bg-primary border border-darkBlue flex-none min-w-[93px] max-h-[42px] text-md font-roboto text-white py-3 px-[15px] hover:bg-primaryHover rounded border-1 border-darkBlue"
                @click="sortBy('date')"
            >
                Sort by Date
            </button>
        </div>
        <div
            class="flex flex-col pt-4 overflow-y-auto overflow-x-hidden no-scrollbar"
        >
            <transition-group name="swipe-fade">
                <div
                    v-for="task in filteredBacklog"
                    :key="task.id"
                    class="mb-1"
                >
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center space-x-2">
                            <div
                                :class="
                                    task.completed
                                        ? 'bg-primary border-none'
                                        : 'bg-transparent'
                                "
                                @click="toggleCompletion(task)"
                                class="w-6 h-6 border border-secondary rounded-full cursor-pointer flex justify-center items-center"
                            >
                                <img
                                    class="h-3 w-3"
                                    :class="task.completed ? 'block' : 'hidden'"
                                    src="../assets/Vector.svg"
                                />
                            </div>
                            <div
                                class="mt-3"
                                :class="
                                    task.completed
                                        ? 'line-through text-secondary'
                                        : ''
                                "
                            >
                                <h4
                                    class="text-md text-primaryText font-roboto leading-normal"
                                    :class="
                                        task.completed ? ' text-secondary' : ''
                                    "
                                >
                                    {{ task.name }}
                                </h4>
                                <p
                                    class="text-sm text-secondary font-roboto leading-normal"
                                >
                                    {{ task.description }}
                                </p>
                            </div>
                        </div>
                        <button
                            class="w-auto border rounded border-secondary flex font-roboto font-medium text-primary leading-normal text-menu items-center py-2 px-3 hover:border-darkGray hover:text-darkBlue"
                            @click="moveToToDoList(task)"
                        >
                            Move to List
                        </button>
                    </div>
                </div>
            </transition-group>
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

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

.swipe-fade-enter-active,
.swipe-fade-leave-active {
    transition: transform 0.5s, opacity 0.7s;
}
.swipe-fade-enter-from,
.swipe-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
.swipe-fade-enter-to,
.swipe-fade-leave-from {
    transform: translateX(0);
    opacity: 1;
}
</style>
