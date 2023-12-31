<template>
    <div
        class="w-full h-full max-h-[80vh] overflow-y-auto overflow-x-hidden pt-3 flex flex-col justify-start no-scrollbar"
    >
        <!-- Completed Tasks Section -->

        <div class="h-auto mb-2">
            <div
                @click="toggleCompletedTasksSection"
                class="cursor-pointer flex items-center"
            >
                <img
                    src="../assets/Arrow.svg"
                    class="mr-3.5 transition-transform"
                    :class="{
                        'rotate-90 transition-transform':
                            completedTasksSectionOpen,
                    }"
                />
                <span class="text-lg font-roboto text-md text-secondary"
                    >{{ completedTasks.length }} Done</span
                >
            </div>

            <transition-group name="swipe-fade">
                <div
                    v-if="completedTasksSectionOpen"
                    v-for="task in completedTasks"
                    :key="task.id"
                    class="mb-1"
                >
                    <!--  completed tasks -->
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
                        <div class="relative group">
                            <div
                                @click="toggleMenu(task)"
                                class="p-2 transition w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:svg-black"
                                :class="{
                                    'bg-black transition rounded-full bg-secondaryButton':
                                        task.showMenu,
                                    'svg-black': task.showMenu,
                                }"
                            >
                                <svg
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5"
                                >
                                    <path
                                        d="M12.9465 10.0558C12.9465 11.666 11.6437 12.9688 10.0335 12.9688C8.4233 12.9688 7.12056 11.666 7.12056 10.0558C7.12056 8.44559 8.4233 7.14285 10.0335 7.14285C11.6437 7.14285 12.9465 8.44559 12.9465 10.0558ZM17.1541 7.14285C15.5439 7.14285 14.2411 8.44559 14.2411 10.0558C14.2411 11.666 15.5439 12.9688 17.1541 12.9688C18.7643 12.9688 20.067 11.666 20.067 10.0558C20.067 8.44559 18.7643 7.14285 17.1541 7.14285ZM2.91296 7.14285C1.30274 7.14285 0 8.44559 0 10.0558C0 11.666 1.30274 12.9688 2.91296 12.9688C4.52317 12.9688 5.82591 11.666 5.82591 10.0558C5.82591 8.44559 4.52317 7.14285 2.91296 7.14285Z"
                                        :fill="
                                            task.showMenu
                                                ? '#121212'
                                                : 'darkGray'
                                        "
                                    />
                                </svg>
                            </div>
                            <div
                                v-if="task.showMenu"
                                class="absolute bg-white border border-secondary z-10 w-[124px] h-[62px] rounded text-primary font-roboto text-menu -left-[128px] top-1.5"
                            >
                                <button
                                    class="w-full h-[50%] flex items-center py-2 px-3 hover:text-primaryTextHover"
                                    @click="deleteTask(task)"
                                >
                                    Delete
                                </button>
                                <div class="w-full h-px bg-secondary"></div>
                                <button
                                    class="w-full h-[50%] flex items-center py-2 px-3 hover:text-primaryTextHover"
                                    @click="moveToBacklog(task)"
                                >
                                    Move to Backlog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>

        <div class="w-full h-px bg-chrome mb-1"></div>
        <!-- Open Tasks -->
        <div class="h-100">
            <transition-group name="swipe-fade">
                <div v-for="task in openTasks" :key="task.id" class="mb-1">
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
                        <div class="relative group">
                            <div
                                @click="toggleMenu(task)"
                                class="p-2 transition w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:svg-black"
                                :class="{
                                    'bg-black transition rounded-full bg-secondaryButton':
                                        task.showMenu,
                                    'svg-black': task.showMenu,
                                }"
                            >
                                <svg
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5"
                                >
                                    <path
                                        d="M12.9465 10.0558C12.9465 11.666 11.6437 12.9688 10.0335 12.9688C8.4233 12.9688 7.12056 11.666 7.12056 10.0558C7.12056 8.44559 8.4233 7.14285 10.0335 7.14285C11.6437 7.14285 12.9465 8.44559 12.9465 10.0558ZM17.1541 7.14285C15.5439 7.14285 14.2411 8.44559 14.2411 10.0558C14.2411 11.666 15.5439 12.9688 17.1541 12.9688C18.7643 12.9688 20.067 11.666 20.067 10.0558C20.067 8.44559 18.7643 7.14285 17.1541 7.14285ZM2.91296 7.14285C1.30274 7.14285 0 8.44559 0 10.0558C0 11.666 1.30274 12.9688 2.91296 12.9688C4.52317 12.9688 5.82591 11.666 5.82591 10.0558C5.82591 8.44559 4.52317 7.14285 2.91296 7.14285Z"
                                        :fill="
                                            task.showMenu
                                                ? '#121212'
                                                : 'darkGray'
                                        "
                                    />
                                </svg>
                            </div>
                            <div
                                v-if="task.showMenu"
                                class="absolute bg-white border border-secondary z-10 w-[124px] h-[62px] rounded text-primary font-roboto text-menu -left-[128px] top-1.5"
                            >
                                <button
                                    class="w-full h-[50%] flex items-center py-2 px-3 hover:text-primaryTextHover"
                                    @click="deleteTask(task)"
                                >
                                    Delete
                                </button>
                                <div class="w-full h-px bg-secondary"></div>
                                <button
                                    class="w-full h-[50%] flex items-center py-2 px-3 hover:text-primaryTextHover"
                                    @click="moveToBacklog(task)"
                                >
                                    Move to Backlog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useToDoListStore } from "../store/useTodoListStore";
import { Task } from "../types/types";

const store = useToDoListStore();

const completedTasksSectionOpen = ref(true); // Initially open

const completedTasks = computed(() => store.tasks.filter((t) => t.completed));

const openTasks = computed(() => store.tasks.filter((t: Task) => !t.completed));

const toggleCompletion = (task: Task) => {
    store.toggleTaskCompletion(task.id);
};

const deleteTask = (task: Task) => {
    store.deleteTask(task.id);
};

const moveToBacklog = (task: Task) => {
    store.moveToBacklog(task.id);
};

const toggleMenu = (clickedTask: Task) => {
    // Close all menus first
    store.tasks.forEach((task) => {
        if (task.id !== clickedTask.id) {
            task.showMenu = false;
        }
    });

    clickedTask.showMenu = !clickedTask.showMenu;
};
const toggleCompletedTasksSection = () => {
    completedTasksSectionOpen.value = !completedTasksSectionOpen.value;
};

onMounted(() => {
    document.addEventListener("click", closeMenusOnOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener("click", closeMenusOnOutsideClick);
});

const closeMenusOnOutsideClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.closest(".relative.group") === null) {
        store.tasks.forEach((task) => {
            task.showMenu = false;
        });
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

<!-- create entry-component to make code more maintainable & cleanup view -->
