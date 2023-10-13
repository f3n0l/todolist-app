import { defineStore } from "pinia";

export interface BacklogTask {
    id: number;
    name: string;
    description: string;
}

export const useBacklogStore = defineStore("backlog", {
    state: () => ({
        tasks: [] as BacklogTask[],
    }),
    actions: {
        addTask(task: Omit<ToDoTask, "id">): void {
            const newTask: ToDoTask = {
                ...task,
                id: ++this.lastId,
                completed: false,
            };
            this.tasks.push(newTask);
        },
        moveToToDoList(taskId: number) {
            const taskIndex = this.tasks.findIndex(
                (task) => task.id === taskId
            );
            if (taskIndex !== -1) {
                const taskToMove = this.tasks.splice(taskIndex, 1)[0];
                // Call your to-do list store's addTask action here
                useToDoListStore.addTask(taskToMove);
            }
        },
    },
});
