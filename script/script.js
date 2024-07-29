// const crypto = require('node:crypto');

class Produto {
    constructor(id, nome, preco) {
        this.id = id
        this.nome = nome;
        this.preco = preco;
        this.quantidade = 1;
    }

    validateData() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === "")
                return false;
        }
        return true;
    }
}

function registerTask(id, nome, preco) {

    const produto = new Produto(id, nome, preco);

    if (produto.validateData()) {
        database.CreateProduto(produto);
    }
}

function GetId(number) {
    let id = "";
    for (let i = 0; i < (number * 8); i++) {
        id += Math.round(Math.random() * 1);
    }
    let numeroDecimal = parseInt(id, 2);
    let numeroHexadecimal = numeroDecimal.toString(16).toUpperCase();
    return numeroHexadecimal;
}

class Database {
    constructor() {
        const contador = localStorage.getItem('contador');

        if (contador === null) {
            localStorage.setItem('contador', 0);
        }
    }

    GetProduto() {
        const produtos = new Array();
        const contador = localStorage.getItem('contador');

        for (let i = 1; i <= contador; i++) {
            const key = localStorage.key(i);
            const produto = JSON.parse(localStorage.getItem(key));

            if (produto === null) {
                continue;
            }

            produto.id = key;
            produtos.push(produto);
        }
        return produtos;
    }

    CreateProduto(produto) {
        const contador = localStorage.getItem('contador');
        let id = 0

        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == produto.id) {
                id = localStorage.key(i)
                const elemento = JSON.parse(localStorage.getItem(id))
                produto.quantidade = parseInt(elemento.quantidade) + 1
            } else {
                id = produto.id
                console.log("entrou no else")
            }
        }
        localStorage.setItem(id, JSON.stringify(produto));
        localStorage.setItem('contador', (parseInt(contador) + 1));
    }

    RemoveProduto(id) {
        const contador = localStorage.getItem('contador');
        localStorage.removeItem(id);
        localStorage.setItem('contador', (parseInt(contador) - 1));
    }

    SearchProdutos(nome) {
        let produtosFiltrados = new Array();
        produtosFiltrados = this.GetProduto();

        if (nome !== '') {
            produtosFiltrados = produtosFiltrados.filter(p => p.nome === nome)
        }

        return produtosFiltrados;
    }
}

// function SearchProdutos() {
//     const nome = document.getElementById("nome").value;
//     const produtosS = database.SearchProdutos(nome);

//     LoadProdutos(produtosS)
// }

// function LoadProdutos(produtos) {

//     if (produtos === undefined) {
//         produtos = database.GetProduto();
//     }

//     // const produtos = database.GetProduto();
//     const listprodutos = document.getElementById("list-produtos");
//     listprodutos.innerHTML = '';

//     produtos.forEach((p) => {
//         const row = listprodutos.insertRow();
//         row.insertCell(0).innerHTML = `${p.nome}`;
//         row.insertCell(1).innerHTML = `${p.preco}`;
//         row.insertCell(2).innerHTML = `${p.quantidade}`;
//         row.insertCell(3).innerHTML = `${p.descricao.substring(0, 40)}`;

//         const btn = document.createElement('button');
//         btn.className = 'btn';
//         btn.id = p.id;
//         btn.innerHTML = 'Delete';
//         btn.onclick = () => {
//             const id = p.id
//             database.RemoveProduto(id);

//             window.location.reload();
//         }

//         row.insertCell(4).append(btn);
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//     if (document.body.contains(document.getElementById('list-produtos'))) {
//         LoadProdutos();
//     }
// })
document.addEventListener("DOMContentLoaded", () => {
    if (document.body.contains(document.getElementById('carrinho'))) {
        const carrinho = document.getElementById('carrinho')
        carrinho.textContent = localStorage.getItem('contador')
    }
})

document.addEventListener("click", () => {
    if (document.body.contains(document.getElementById('carrinho'))) {
        const carrinho = document.getElementById('carrinho')
        carrinho.textContent = localStorage.getItem('contador')
    }
})

const database = new Database();