// Menu hambúrguer
document.getElementById("btn-menu").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("ativa");
});

// Troca de cor com variável CSS
document.querySelectorAll(".theme-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cor = btn.getAttribute("data-color");
    document.documentElement.style.setProperty('--background-color', cor);
  });
});



// SlideShow
let imagemAtual = 0;
const imagens = document.querySelectorAll(".imagem");

function mostrarImagem(index) {
  imagens.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });
}

function mudarImagem(direcao) {
  imagemAtual += direcao;
  if (imagemAtual >= imagens.length) imagemAtual = 0;
  if (imagemAtual < 0) imagemAtual = imagens.length - 1;
  mostrarImagem(imagemAtual);
}

document.querySelector(".seta.esquerda").addEventListener("click", () => mudarImagem(-1));
document.querySelector(".seta.direita").addEventListener("click", () => mudarImagem(1));
document.addEventListener("DOMContentLoaded", () => mostrarImagem(imagemAtual));

// Quiz com feedback
const perguntas = [
  { pergunta: "O que é uma enchente?", opcoes: ["Aumento da umidade", "Falta de água potável", "Transbordamento de rios", "Queda da temperatura"], correta: 2 },
  { pergunta: "Principal causa de enchentes urbanas?", opcoes: ["Ventos", "Impermeabilização do solo", "Tempestades solares", "Desmatamento"], correta: 1 },
  { pergunta: "Como prevenir enchentes?", opcoes: ["Construir mais ruas", "Eliminar vegetação", "Criar áreas verdes", "Tapar bueiros"], correta: 2 },
  { pergunta: "Tecnologia útil contra enchentes:", opcoes: ["Drones que chovem", "Robôs domésticos", "Sensores e alertas", "Antenas 5G"], correta: 2 },
  { pergunta: "Consequência das enchentes na saúde:", opcoes: ["Leptospirose", "Dor muscular", "Alergia a sol", "Melhora da respiração"], correta: 0 },
  { pergunta: "O que são piscinões urbanos?", opcoes: ["Piscinas públicas", "Lagos", "Reservatórios de água da chuva", "Canais de esgoto"], correta: 2 },
  { pergunta: "Importância da educação ambiental?", opcoes: ["Usar mais carros", "Descartar lixo corretamente", "Evitar estudar", "Desmatar áreas verdes"], correta: 1 },
  { pergunta: "O que fazer durante uma enchente?", opcoes: ["Ir a áreas altas", "Nadar na enchente", "Ficar em porão", "Dirigir rápido"], correta: 0 },
  { pergunta: "Como sensores ajudam?", opcoes: ["Detectam níveis de água", "Impedem chuva", "Mudam cor do céu", "Limpam rios"], correta: 0 },
  { pergunta: "Quem deve agir em alertas?", opcoes: ["Só moradores", "Órgãos públicos e população", "Só empresas privadas", "Ninguém"], correta: 1 }
];

let indiceAtual = 0;
let pontuacao = 0;
const respostasUsuario = [];

function carregarPergunta() {
  document.getElementById("resultadoFinal").textContent = "";
  const p = perguntas[indiceAtual];
  document.getElementById("textoPergunta").textContent = p.pergunta;
  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  p.opcoes.forEach((opcao, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="opcao" value="${i}" /> ${opcao}`;
    opcoesDiv.appendChild(label);
  });
}

document.getElementById("btnResponder").addEventListener("click", () => {
  const selecionado = document.querySelector('input[name="opcao"]:checked');
  if (!selecionado) {
    alert("Escolha uma opção.");
    return;
  }

  const resposta = Number(selecionado.value);
  const correta = perguntas[indiceAtual].correta;

  respostasUsuario.push({
    pergunta: perguntas[indiceAtual].pergunta,
    respostaUsuario: resposta,
    correta: correta,
    opcoes: perguntas[indiceAtual].opcoes
  });

  if (resposta === correta) pontuacao++;

  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    carregarPergunta();
  } else {
    mostrarResultados();
  }
});

function mostrarResultados() {
  document.getElementById("textoPergunta").textContent = "Quiz finalizado!";
  document.getElementById("opcoes").innerHTML = "";
  const resultado = document.getElementById("resultadoFinal");

  let html = `<p>Você acertou ${pontuacao} de ${perguntas.length} perguntas.</p><ul>`;
  respostasUsuario.forEach((res, i) => {
    const classe = res.respostaUsuario === res.correta ? "certa" : "errada";
    html += `<li class="${classe}">
      <strong>${i + 1}. ${res.pergunta}</strong><br>
      Sua resposta: ${res.opcoes[res.respostaUsuario] || "nenhuma"}<br>
      Resposta correta: ${res.opcoes[res.correta]}
    </li>`;
  });
  html += "</ul>";

  resultado.innerHTML = html;
  document.getElementById("btnResponder").disabled = true;
}

document.addEventListener("DOMContentLoaded", carregarPergunta);


// Validação do formulário
document.getElementById("formDuvidas").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");
  const erroEmail = document.getElementById("erroEmail");
  const erroMensagem = document.getElementById("erroMensagem");

  erroEmail.textContent = "";
  erroMensagem.textContent = "";

  if (!email.value.trim()) {
    erroEmail.textContent = "O campo email é obrigatório.";
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
    erroEmail.textContent = "Digite um email válido.";
    return;
  }
  if (!mensagem.value.trim()) {
    erroMensagem.textContent = "O campo mensagem é obrigatório.";
    return;
  }

  erroMensagem.style.color = "green";
  erroMensagem.textContent = "Mensagem enviada com sucesso!";
  this.reset();
});
