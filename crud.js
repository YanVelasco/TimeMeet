const paragrafoDesc = document.querySelector(
  ".app__section-active-task-description"
);
let tarefaSelecionada = null;
let liTarefaSelecionada = null;
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const btnAdionarTarefa = document.querySelector(".app__button--add-task");
const formAdicicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");
  const svg = document.createElement("svg");
  svg.innerHTML = `
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                    fill="#01080E"></path>
            </svg>
        `;
  const paragrafo = document.createElement("p");

  paragrafo.textContent = tarefa.descricao;
  paragrafo.classList.add("app__section-task-list-item-description");

  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");

  botao.onclick = () => {
    const novaDescricao = prompt("Qual o novo nome da terefa?");
    paragrafo.textContent = novaDescricao;
    if (novaDescricao) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      tarefa.descricao = novaDescricao;
      atualizarTarefas();
    }
  };

  const imagemBotao = document.createElement("img");
  imagemBotao.setAttribute("src", "/imagens/edit.png");

  botao.append(imagemBotao);

  li.append(svg);
  li.append(paragrafo);
  li.append(botao);

  li.onclick = () => {
    document
      .querySelectorAll(".app__section-task-list-item-active")
      .forEach((element) => {
        element.classList.toggle("app__section-task-list-item-active");
      });
    if (tarefaSelecionada == tarefa) {
      paragrafoDesc.textContent = "";
      tarefaSelecionada = null;
      liTarefaSelecionada = null;
      return;
    }
    tarefaSelecionada = tarefa;
    liTarefaSelecionada = li;
    paragrafoDesc.textContent = tarefa.descricao;
    li.classList.toggle("app__section-task-list-item-active");
  };

  return li;
}

btnAdionarTarefa.addEventListener("click", () => {
  formAdicicionarTarefa.classList.toggle("hidden");
});

formAdicicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textArea.value,
  };
  tarefas.push(tarefa);
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
  atualizarTarefas();
  textArea.value = "";
  formAdicicionarTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
});

btnCancelar.onclick = () => {
  textArea.value = "";
  formAdicicionarTarefa.classList.add("hidden");
};

document.addEventListener("focoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada.querySelector("button").disabled = true;
  }
});