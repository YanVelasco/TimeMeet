const btnAdionarTarefa = document.querySelector('.app__button--add-task');
const formAdicicionarTarefa = document.querySelector('.app__form-add-task');

btnAdionarTarefa.addEventListener('click', () => {
    formAdicicionarTarefa.classList.toggle('hidden');
})