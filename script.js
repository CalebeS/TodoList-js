//simulando um banco de dados
let banco = [
    {'tarefa': 'Estudar', 'status': ''},
    {'tarefa': 'Jogar', 'status': 'checked'}
]

//função de criar item e adicionar no html, como filho da div pai.
// adicionando data-indice nos itens criados, para quando for clicado no status ou clicado no X, acionar um evento no banco de dados pelo id do botão clicado, usando data em vez de id pois fica melhor para manipular via JSON
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

//função de limpar tarefas pra evitar duplicação ao chamar a função atualizar tela
// enquanto existir o primeiro filho, remove o ultimo filho da div todoList.
const limparTarefa = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

// função que le o banco e cria um item pra cada elemento do array, que é um objeto
// adicionando indice pra saber diferenciar/separar cada item ou tarefa inserida.
const atualizarTela = () => {
    limparTarefa();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

//chamando a função limpar tarefa antes de atualizar tela pra evitar duplicação de tarefas

const inserirTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        banco.push({'tarefa': texto, 'status': ''})
        atualizarTela();
        evento.target.value = '';
    }
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log(elemento)
}

document.getElementById('newItem').addEventListener('keypress', inserirTarefa);
document.getElementById('todoList').addEventListener('click', clickItem);
//o EventListenner manda pro callback que no caso é o inserirTarefa o evento que esta acontecendo ou aconteceu
// da mesma forma com o clickItem, retorna como callback um evento, e a partir desse evento posso atribuir as funcionalidades, que no caso seria acionar em qual item ou elemento eu estou clicando, e partir desse reconhecimento fazer a ação

