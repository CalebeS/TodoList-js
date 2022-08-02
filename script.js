//simulando um banco de dados
let banco = [
    {'tarefa': 'Estudar', 'status': ''},
    {'tarefa': 'Jogar', 'status': 'checked'}
]

//função de criar item e adicionar no html, como filho da div pai.
const criarItem = (tarefa, status) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status}>
        <div>${tarefa}</div>
        <input type="button" value="x">
    `
    document.getElementById('todoList').appendChild(item);
}

//função de limpar tarefas pra evitar duplicação ao chamar a função atualizar tela
// enquanto existir o primeiro filho, remove o filho do todoList, removendo o ultimo filho
const limparTarefa = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

// função que le o banco e cria um item pra cada elemento do array, que é um objeto
const atualizarTela = () => {
    limparTarefa();
    banco.forEach(item => criarItem(item.tarefa, item.status));
}

atualizarTela();



