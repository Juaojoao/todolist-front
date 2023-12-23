interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  image?: string;
  quadros?: Quadro[];
  tasksContainers?: TasksContainer[];
}

interface Quadro {
  id: number;
  name: string;
  lists?: List[];
  owner?: number;
}

interface List {
  id: number;
  name: string;
  cards?: Card[];
  quadroId?: number;
}

interface Card {
  id: number;
  name: string;
  description?: string;
  date: string;
  tasks?: Task[];
  list?: number;
}

interface Task {
  id: number;
  description: string;
  status: boolean;
  card?: number;
}

interface TasksContainer {
  id: number;
  name: string;
  tasks?: Task[];
  owner?: number;
}

export type { User, Quadro, List, Card, Task, TasksContainer };
