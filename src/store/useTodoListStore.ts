import { defineStore } from "pinia";
import { Task, State } from "../types/types";

export const useToDoListStore = defineStore({
    id: "toDoListStore",

    state: (): State => ({
        tasks: [],
        backlog: [],
    }),

    actions: {
        addTask(task: Task) {
            this.tasks.push(task);
        },
        toggleTaskCompletion(id: number) {
            const task = this.tasks.find((t) => t.id === id);
            if (task) {
                task.completed = !task.completed;
            }
        },
        deleteTask(id: number) {
            this.tasks = this.tasks.filter((t) => t.id !== id);
        },
        moveToBacklog(id: number) {
            const taskIndex = this.tasks.findIndex((t) => t.id === id);
            if (taskIndex !== -1) {
                const [task] = this.tasks.splice(taskIndex, 1);
                this.backlog.push(task);
            }
        },
        moveTaskToToDoList(id: number) {
            const taskIndex = this.backlog.findIndex((t) => t.id === id);
            if (taskIndex !== -1) {
                const [task] = this.backlog.splice(taskIndex, 1);
                this.tasks.push(task);
            }
        },
    },
});
