import { defineStore } from "pinia";

export interface ToDoTask {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

export const useToDoListStore = defineStore("toDoList", {
    state: () => ({
        tasks: [] as ToDoTask[],
        lastId: 0,
    }),
    actions: {
        addTask(task: Omit<ToDoTask, "id">): void {
            const newTask: ToDoTask = {
                ...task,
                id: this.lastId++, // Generate unique ID using uuid
                completed: false,
            };
            this.tasks.push(newTask);
        },
        deleteTask(taskId: number): void {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
        },
        toggleTaskCompletion(taskId: number): void {
            this.tasks = this.tasks.map((task) => {
                if (task.id === taskId) {
                    // Toggle the completed status immutably
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
        },
    },
});
