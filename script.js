//simulando um banco de dados, onde inicia como um array vazio.
let banco = [];
//função pra pegar itens no localstorage, se tiver algo no local storage chamado todoList então pega, se não retorna vazio, usando o (??)
//o local storage só funciona com string, portando vamos ter que transformar os dados em string, utilizando o JSON.stringfy() pra enviar pro banco.
//pra pegar o item enviado no banco, vamos receber em string JSON e transformar em um array ou objeto.
//local storage possui chave e valor, então vamos criar chaves unicas e mandar o json para os valores (value)
// pra enviar localStorage.setItem('teste', 'calebe')(chave e valor)
// pra pegar do local storage localStorage.getItem('teste') => calebe.
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));


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
//enquanto existir o primeiro filho, remove o ultimo filho da div todoList.
const limparTarefa = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefa();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
//função pra atualizar a tela após adicionar um item ou tarefa.
//chamando a função limpar tarefa antes de atualizar tela pra evitar duplicação de tarefas ao serem adicionadas.
//adicionando indice pra saber diferenciar/separar cada item clicado ou tarefa inserida.
}

//função de inserir tarefa que recebe um evento, como parâmetro passado pelo callback do addEventListenner
//o evento passado pelo callback é o keypress, que esta relacionado ao id newItem do html, ao clicar o botão ENTER ele adiciona um item.
//depois vamos checar (if) se a tecla pressionada foi ENTER, se foi ele pega os dados contidos atualmente no banco, adiciona um novo ao final do array (.push), ou colocando um item em determinada posição(tarefa e status)
//depois de adicionar o objeto ele envia novamente pro banco (setBanco)
//depois atualiza a tela pra modificar no html o que o banco enviou.
const inserirTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}
//removendo item pelo indice especifico.
//.splice altera o conteúdo de um array, adicionando ou removendo
//ele não removeu do html, mais sim do banco, e chamando a  função atualizar tela modificou minha tela, mostrando os itens que consta no banco.

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}
//? seria o mesmo que então, e o : seria o mesmo que se não 
//se o status estiver desmarcado então(?) marca, se não(:) desmarca.

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice)
    }else if(elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}
//função pra verificar qual botão foi clicado, o de adicionar ou marcar como feito(checkbox)
//verificando qual botão foi clicado (if) se foi o button(X, passando pelo input=value)remove o item da lista(removeItem), identificado pelo indice(item)especifico.
//se não for o X e for o checkbox ele atualiza o status do item ou elemento.
//.dataset é a propriedade do elemento pra poder pegar o valor do indice no data-indice


document.getElementById('newItem').addEventListener('keypress', inserirTarefa);
document.getElementById('todoList').addEventListener('click', clickItem);
//o EventListenner manda pro callback que no caso é o inserirTarefa o evento que esta acontecendo ou aconteceu
// da mesma forma com o clickItem, retorna como callback um evento, e a partir desse evento posso atribuir as funcionalidades, que no caso seria acionar em qual item ou elemento eu estou clicando, e partir desse reconhecimento fazer a ação
atualizarTela();


