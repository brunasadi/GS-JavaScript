// Menu
// Seleciona o botão e o menu
const botaoMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

// Quando clicar no botão, alterna a classe que mostra/esconde o menu
botaoMenu.addEventListener("click", () => {
  menu.classList.toggle("menu-ativo");
});
// Código para mudar a cor de fundo ao clicar no ícone
const iconesCor = document.querySelectorAll(".icone-cor");

iconesCor.forEach((icone) => {
  icone.addEventListener("click", () => {
    const cor = icone.getAttribute("data-cor");
    document.body.style.backgroundColor = cor;
  });
});

// SlideShow
let imagemAtual = 0;

function mostrarImagem(numero) {
  const imagens = document.getElementsByClassName("imagem");

  // Esconde todas
  for (let i = 0; i < imagens.length; i++) {
    imagens[i].style.display = "none";
  }

  // Corrige os limites
  if (numero >= imagens.length) {
    imagemAtual = 0;
  } else if (numero < 0) {
    imagemAtual = imagens.length - 1;
  }

  // Mostra a imagem atual
  imagens[imagemAtual].style.display = "block";
}

function mudarImagem(direcao) {
  imagemAtual += direcao;
  mostrarImagem(imagemAtual);
}

// Mostra a primeira imagem ao carregar
mostrarImagem(imagemAtual);

// Quiz
// Array de perguntas, cada uma com texto, opções e índice da resposta correta
const perguntas = [
  {
    pergunta: "O que é uma enchente?",
    opcoes: [
      "O aumento da umidade do ar",
      "A falta de água potável",
      "O transbordamento de rios",
      "A queda da temperatura",
    ],
    correta: 2,
  },
  {
    pergunta: "Qual é a principal causa das enchentes urbanas?",
    opcoes: [
      "Ventos fortes",
      "Uso de energia",
      "Impermeabilização do solo",
      "Pedestres nas ruas",
    ],
    correta: 2,
  },
  {
    pergunta: "Por que áreas com muito asfalto têm mais enchentes?",
    opcoes: [
      "Atrai chuva",
      "Absorve água",
      "Impede infiltração",
      "Aumenta pressão do ar",
    ],
    correta: 2,
  },
  {
    pergunta: "Qual medida ajuda a prevenir enchentes?",
    opcoes: [
      "Mais prédios",
      "Cortar árvores",
      "Criar áreas verdes",
      "Tapar bueiros",
    ],
    correta: 2,
  },
  {
    pergunta: "Qual é o papel das mudanças climáticas nas enchentes?",
    opcoes: [
      "Pressão atmosférica",
      "Chuvas intensas",
      "Menos umidade",
      "Água fria nos rios",
    ],
    correta: 1,
  },
  {
    pergunta: "O que são áreas de risco?",
    opcoes: [
      "Prédios comerciais",
      "Locais turísticos",
      "Locais baixos e sem estrutura",
      "Solo fértil",
    ],
    correta: 2,
  },
  {
    pergunta: "O que são piscinões urbanos?",
    opcoes: [
      "Piscinas públicas",
      "Reservatórios de água da chuva",
      "Lagos naturais",
      "Parques alagados",
    ],
    correta: 1,
  },
  {
    pergunta: "Como a tecnologia ajuda contra enchentes?",
    opcoes: [
      "Drones que causam chuva",
      "Sensores e alertas",
      "Robôs domésticos",
      "Câmeras para pedestres",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual efeito das enchentes na saúde?",
    opcoes: [
      "Melhora respiração",
      "Reduz estresse",
      "Leptospirose",
      "Mais esportes aquáticos",
    ],
    correta: 2,
  },
  {
    pergunta: "Qual a importância da educação ambiental?",
    opcoes: [
      "Usar canoas",
      "Mais plástico",
      "Descartar lixo corretamente",
      "Competições de água",
    ],
    correta: 2,
  },
];
let perguntaAtual = 0; // Índice da pergunta atual
let pontuacao = 0; // Contador de respostas corretas
const respostasUsuario = []; // Armazena respostas escolhidas

// Mostra a pergunta e suas opções na tela
function mostrarPergunta() {
  const p = perguntas[perguntaAtual];
  document.getElementById("textoPergunta").textContent = `Pergunta ${
    perguntaAtual + 1
  }: ${p.pergunta}`;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = ""; // Limpa opções anteriores

  p.opcoes.forEach((opcao, indice) => {
    const label = document.createElement("label");
    label.className = "opcao";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "resposta";
    input.value = indice;

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opcao));
    opcoesDiv.appendChild(label);
  });
}

// Função chamada ao clicar no botão "Responder"
function responder() {
  const opcoes = document.getElementsByName("resposta");
  let selecionada = -1;

  for (let i = 0; i < opcoes.length; i++) {
    if (opcoes[i].checked) {
      selecionada = parseInt(opcoes[i].value);
      break;
    }
  }

  if (selecionada === -1) {
    alert("Por favor, selecione uma resposta.");
    return;
  }

  respostasUsuario.push(selecionada);

  if (selecionada === perguntas[perguntaAtual].correta) {
    pontuacao++;
  }

  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultadoFinal();
  }
}

// Exibe o resultado final com detalhes das respostas
function mostrarResultadoFinal() {
  const quizDiv = document.querySelector(".quiz");
  quizDiv.innerHTML = `<h3>Você acertou ${pontuacao} de ${perguntas.length} perguntas.</h3>`;

  perguntas.forEach((p, i) => {
    const container = document.createElement("div");
    const acertou = respostasUsuario[i] === p.correta;

    container.className = acertou ? "certa" : "errada";

    container.innerHTML = `
          <p><strong>P${i + 1}:</strong> ${p.pergunta}</p>
          <p>Sua resposta: ${p.opcoes[respostasUsuario[i]] ?? "nenhuma"}</p>
          ${
            !acertou
              ? `<p class="resposta-correta">✔️ Resposta correta: ${
                  p.opcoes[p.correta]
                }</p>`
              : "<p>✔️ Você acertou!</p>"
          }
          <hr>
        `;

    quizDiv.appendChild(container);
  });
}

// Inicia o quiz mostrando a primeira pergunta
mostrarPergunta();

//Formulário
const form = document.getElementById("formDuvidas");
const emailInput = document.getElementById("email");
const erroEmail = document.getElementById("erroEmail");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // evita envio padrão para validar antes

  erroEmail.textContent = "";
  mensagem.textContent = "";

  const email = emailInput.value.trim();

  // Verifica se o email está vazio
  if (email === "") {
    erroEmail.textContent = "O campo email é obrigatório.";
    emailInput.focus();
    return;
  }

  // Verifica se o email tem formato válido usando regex simples
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    erroEmail.textContent = "Por favor, digite um email válido.";
    emailInput.focus();
    return;
  }

  // Se passou na validação, mostra mensagem de sucesso (pode enviar para servidor aqui)
  mensagem.textContent = "Sua dúvida foi enviada com sucesso!";

  // Limpa o formulário
  form.reset();
});
