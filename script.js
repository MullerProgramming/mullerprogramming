class Eletronico {
    constructor(nome) {
        this.nome = nome;
    }

    getNome() {
        return this.nome;
    }
}

class Loja {
    constructor() {
        this.estoque = JSON.parse(localStorage.getItem("estoque")) || [];
    }

    adicionar(eletronico) {
        this.estoque.push(eletronico);
        this.salvar();
    }

    remover(indice) {
        this.estoque.splice(indice, 1);
        this.salvar();
    }

    mostrarEstoque() {
        return this.estoque.map(e => e.nome);
    }

    salvar() {
        localStorage.setItem("estoque", JSON.stringify(this.estoque));
    }
}

const minhaLoja = new Loja();

function adicionarEletronico() {
    const nomeInput = document.getElementById("nomeEletronico");
    const nome = nomeInput.value.trim();

    if (nome) {
        const novoEletronico = new Eletronico(nome);
        minhaLoja.adicionar(novoEletronico);
        atualizarLista();
        mostrarMensagem(`"${nome}" adicionado ao estoque.`);
        nomeInput.value = "";
    }
}

function removerEletronico(indice) {
    const nomeRemovido = minhaLoja.mostrarEstoque()[indice];
    minhaLoja.remover(indice);
    atualizarLista();
    mostrarMensagem(`"${nomeRemovido}" removido do estoque.`);
}

function atualizarLista() {
    const lista = document.getElementById("listaEstoque");
    lista.innerHTML = "";
    minhaLoja.mostrarEstoque().forEach((nome, indice) => {
        const li = document.createElement("li");
        li.textContent = nome;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.classList.add("remover");
        botaoRemover.onclick = () => removerEletronico(indice);

        li.appendChild(botaoRemover);
        lista.appendChild(li);
    });
}

function mostrarMensagem(texto) {
    const msg = document.getElementById("mensagem");
    msg.textContent = texto;
    setTimeout(() => msg.textContent = "", 2000);
}

// Inicializa lista ao carregar
document.addEventListener("DOMContentLoaded", atualizarLista);