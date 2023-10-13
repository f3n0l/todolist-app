<template>
    <div>
        <h1 class="text-3xl font-semibold mb-4">Backlog</h1>

        <div v-if="backlogItems.length === 0" class="text-gray-500">
            No items in the backlog.
        </div>

        <ul v-else>
            <li v-for="item in backlogItems" :key="item.id" class="mb-2">
                <span class="font-semibold">{{ item.title }}</span>
                <p class="text-gray-700">{{ item.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
const backlogItems = [
    {
        id: 1,
        title: "Feature A Implementation",
        description: "Implement feature A with necessary functionalities.",
    },
    {
        id: 2,
        title: "Bug Fixing: Issue #123",
        description: "Fix the bug reported in issue #123 from the bug tracker.",
    },
    // Add more backlog items as needed
];
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
