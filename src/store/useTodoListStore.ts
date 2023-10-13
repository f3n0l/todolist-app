import { defineStore } from "pinia";

export interface ToDoTask {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}
// The useToDoListStore store is defined here
export const useToDoListStore = defineStore("toDoList", {
    state: () => ({
        tasks: [] as ToDoTask[],
        lastId: 0,
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
        deleteTask(taskId: number): void {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
        },
        toggleTaskCompletion(taskId: number): void {
            const task = this.tasks.find((task) => task.id === taskId);
            if (task) {
                task.completed = !task.completed;
            }
        },
        moveToBacklog(taskId: number) {
            const taskIndex = this.tasks.findIndex(
                (task) => task.id === taskId
            );
            if (taskIndex !== -1) {
                const taskToMove = this.tasks.splice(taskIndex, 1)[0];
                // Call your backlog store's addTask action here
                useBacklogStore.addTask(taskToMove);
            }
        },
    },
});