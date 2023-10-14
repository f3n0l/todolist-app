export type Task = {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    showMenu?: boolean;
};

export type State = {
    tasks: Task[];
    backlog: Task[];
};
