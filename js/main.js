'use strict'

import { getContatos, getContatosPorNome, postContato } from './contatos.js'
import { uploadImageToAzure } from './uploadImageToAzure.js'

function criarCard(contato) {
    const container = document.getElementById('container')
    const card = document.createElement('div')
    card.classList.add('card-contato')
    card.innerHTML = `
        <img src="${contato.foto}" alt="">
        <h2>${contato.nome}</h2>
        <p>${contato.celular}</p>
    `
    container.appendChild(card)
}

async function exibirContatos() {
    const contatos = await getContatos()
    contatos.forEach(criarCard)

}
async function exibirPesquisa(evento) {
    if(evento.key == 'Enter'){
        const contatos = await getContatosPorNome(evento.target.value)
        container.replaceChildren()
        contatos.forEach(criarCard)
    }
}

function cadastroContato () {
    document.querySelector('main').className = 'form-show'
}

function voltarHome () {
    document.querySelector('main').className = 'card-show'
}

async function salvarContato () {


    const uploadParams = {
        file: document.getElementById('foto').files[0],
        storageAccount: 'uploadimagethayla',
        sasToken: 'sp=racwl&st=2025-05-15T17:18:55Z&se=2025-05-16T01:18:55Z&sv=2024-11-04&sr=c&sig=j%2FSyyUeTH7NM5gHPk6xHYMfHl291CewwzrZbsS%2FOxXI%3D',
        containerName: 'fotos',
    };
    

    const contato = {
            "nome": document.getElementById('nome').value,
            "celular": document.getElementById('celular').value,
            "foto": await uploadImageToAzure(uploadParams),
            "email": document.getElementById('email').value,
            "endereco": document.getElementById('endereco').value,
            "cidade": document.getElementById('cidade').value
    }

    if (await postContato(contato)){
        await alert('Cadastro realizado com sucesso!!!')
        exibirContatos()
        voltarHome()
    }
}

exibirContatos()

document.getElementById('pesquisar')
    .addEventListener('keydown', exibirPesquisa)

document.getElementById('button-contato')
    .addEventListener('click', cadastroContato)

document.getElementById('cancelar')
    .addEventListener('click', voltarHome)

document.getElementById('salvar')
    .addEventListener('click', salvarContato)

