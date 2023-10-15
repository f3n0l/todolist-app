<template>
    <div class="h-auto w-full max-h-[42px] flex px-4 sm:px-0">
        <input
            :disabled="isDisabled"
            :class="{
                'cursor-not-allowed border-secondary bg-white ': isDisabled,
            }"
            v-model="taskName"
            type="text"
            class="w-full flex-1 text-primaryText mr-4 p-2 px-3 py-[15px] max-h-[42px] border border-secondary rounded placeholder:text-secondaryText focus:outline-none focus:border-primary font-roboto text-md"
            placeholder="Enter task name"
        />
        <button
            @click="addTask"
            :disabled="isDisabled"
            :class="{
                'cursor-not-allowed bg-secondary  border-gray ': isDisabled,
                'hover:bg-primaryHover': !isDisabled,
            }"
            class="bg-primary flex-none max-h-[42px] text-md font-roboto text-white py-3 px-[15px] rounded border border-darkBlue font-medium"
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
</style>
