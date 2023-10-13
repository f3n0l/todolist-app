// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ToDoList from "./views/ToDoList.vue";
import Backlog from "./views/Backlog.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "ToDoList",
        component: ToDoList,
    },
    {
        path: "/backlog",
        name: "Backlog",
        component: Backlog,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
