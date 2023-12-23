const task = [
  {
    id: 1,
    description: "Tarefa 1",
    status: true,
  },
];

export const dataUsers = [
  {
    id: 1,
    email: "exemplo@email.com",
    name: "Nome do Usuário",
    password: "senha123",
    image: "url_da_imagem",
    quadros: [
      {
        id: 1,
        name: "Meu Quadro 1",
        lists: [
          {
            id: 1,
            name: "Lista 1",
            cards: [
              {
                id: 1,
                name: "Card 1",
                description: "Descrição do Card 1",
                date: "2023-12-22T08:00:00Z",
                tasks: task,
              },
              // Mais cards...
            ],
          },
          // Mais listas...
        ],
      },
      // Mais quadros...
    ],
    tasksContainers: [
      {
        id: 1,
        name: "Meu Container de Tarefas",
        tasks: task,
      },
      // Mais containers de tarefas...
    ],
  },
  // Mais usuários...
];
