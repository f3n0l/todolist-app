export type Task = {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    showMenu?: boolean;
    creationDate: Date;
};

export type State = {
    tasks: Task[];
    backlog: Task[];
};
