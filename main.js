'use strict'

async function getContatos(){
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const reponse =  await fetch(url)
    const data = await reponse.json()
    console.log(data)
    return data


}


async function getContato(id){
    const url = `https://bakcend-fecaf-render.onrender.com/contato/${id}`
    const reponse =  await fetch(url)
    const data = await reponse.json()
    console.log(data)
    return data


}

async function postContato(contato) {
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos'
    const options ={
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato)
    }

    const reponse= await fetch(url, options)
    return reponse.ok
}

async function putContato(id,contato) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options ={
        method: 'PUT',
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato)
    }

    const reponse= await fetch(url, options)
    return reponse.ok
}

async function deleteContato(id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    return response.ok
}

const novoContato ={
    "nome": "Amorim",
    "celular": "11999999999",
    "foto": "amorim.png",
    "email": "amorim@gmail.com",
    "endereco": "Av. São Joaquim, 234",
    "cidade": "Las Vegas"
    
}