const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const tituloNegrito = document.querySelector(".app__title-strong");
const musicaFocoIput = document.querySelector("#alternar-musica");
const startPause = document.querySelector("#start-pause");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musica.loop = true;
const playPauseIcon = document.querySelector("app__card-primary-butto-icon");
const time = document.querySelector("#timer");

// Inicia a música e pausa
musicaFocoIput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Mudar os estilos dos elementos
focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
});

function alterarContexto(contexto) {
  mostrarTempo();
  html.setAttribute("data-contexto", contexto);
  // Alterando a imagem através do caminho
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  //Alterando o html da página
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      focoBt.classList.add("active");
      curtoBt.classList.remove("active");
      longoBt.classList.remove("active");
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta</strong>`;
      curtoBt.classList.add("active");
      focoBt.classList.remove("active");
      longoBt.classList.remove("active");
      break;
    default:
      titulo.innerHTML = `Hora de voltar a superfície,<br>
            <strong class="app__title-strong">Faça uma  pequena pausa</strong>`;
      longoBt.classList.add("active");
      focoBt.classList.remove("active");
      curtoBt.classList.remove("active");
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    const audioFim = new Audio("/sons/beep.mp3");
    audioFim.play();
    startPause.innerHTML = `Fim`;
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPause.addEventListener("click", iniciarPausar);
function iniciarPausar() {
  const audioIniciar = new Audio("/sons/play.wav");
  if (intervaloId) {
    zerar();
    return;
  }
  audioIniciar.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  startPause.innerHTML = `
    <img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
    <span>Pausar</span>`;
}

// interrompe a execução do intervalo
function zerar() {
  startPause.innerHTML = `
    <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
    <span>Começar</span>`;
  const audioPausado = new Audio("./sons/pause.mp3");
  audioPausado.play();
  clearInterval(intervaloId);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  time.innerHTML = `${tempoFormatado}`;
}

// exibe a função no escopo global
mostrarTempo();
