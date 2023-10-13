import { defineStore } from "pinia";

export interface BacklogTask {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

export const useBacklogStore = defineStore("backlog", {
    state: () => ({
        tasks: [] as BacklogTask[],
        lastId: 0,
    }),
    actions: {
        addTask(task: Omit<BacklogTask, "id">): void {
            const newTask: BacklogTask = {
                ...task,
                id: this.lastId++, // Generate unique ID
                completed: false,
            };
            this.tasks.push(newTask);
        },
        // Implement other actions as needed
    },
});
