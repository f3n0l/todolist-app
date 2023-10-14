<template>
    <div class="h-auto w-full max-h-[42px] flex">
        <input
            :disabled="isDisabled"
            :class="{ 'cursor-not-allowed': isDisabled }"
            v-model="taskName"
            type="text"
            class="w-full text-primaryText mr-4 p-2 px-3 py-[15px] max-h-[42px] border border-gray-300 rounded placeholder:text-secondaryText focus:outline-none focus:border-primary font-roboto text-md"
            placeholder="Enter task name"
        />
        <button
            @click="addTask"
            :disabled="isDisabled"
            :class="{
                'cursor-not-allowed': isDisabled,
                'hover:bg-primaryHover': !isDisabled,
            }"
            class="bg-primary min-w-[93px] max-h-[42px] text-md font-roboto text-white py-3 px-[15px] rounded border-1 border-darkBlue focus:outline-none focus:ring focus:border-blue-300"
        >
            Add Task
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useToDoListStore } from "../store/useTodoListStore";
import { useRoute } from "vue-router";

const taskName = ref("");
const store = useToDoListStore();
const route = useRoute();

const isDisabled = computed(() => {
    return route.path === "/backlog";
});

function addTask() {
    if (taskName.value.trim() === "") {
        return;
    }
    const newTask = {
        id: Date.now(),
        name: taskName.value,
        description: "Description for Task",
        completed: false,
        creationDate: new Date(),
    };
    store.addTask(newTask);
    taskName.value = "";
}
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.cursor-not-allowed {
    cursor: not-allowed;
}

/* Gray out when the route is /backlog */
:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
}
button.cursor-not-allowed:hover {
    color: #9ca3af;
}
</style>
