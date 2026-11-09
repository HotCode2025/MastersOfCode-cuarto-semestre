//la palabra async no es necesaria en las funciones, porque ya son asíncronas
//Igual proyectan una sincronía visual
async function hola(nombre) {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            console.log('Hola '+nombre);
            resolve(nombre);
         }, 1000);
    });
}

async function hablar(nombre) {
    return new Promise((resolve, reject) => {  // usamos la sintaxis es6
        setTimeout(function () {
            console.log('Bla bla bla bla...');
            resolve(nombre);
        }, 1000);
    });
}

async function adios(nombre) {
    return new Promise((resolve, reject) =>{
        setTimeout(function () {
            //Validamos el error o aprobacion
            console.log('Adios '+ nombre);
            //if(err) reject('Hay un error');
            resolve();
        }, 1000);
    });
}



//await hola("Ariel") //esto es una mala sintaxis
// await es valido solo dentro de una función async, por eso creamos la función main
async function main() { 
    let nombre = await hola("Ariel");
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log("Termina el proceso...")
}

//console.log("Empezamos el proceso...")
//main()
//console.log("Esta va a ser la segunda instrucción") 


//Codigo en ingles
function sayHello(name) {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            console.log('Hello '+name);
            resolve(name);
         }, 1000);
    });
}

function talk(name) {
    return new Promise((resolve, reject) => {  // usamos la sintaxis es6
        setTimeout(function () {
            console.log('Bla bla bla bla...');
            resolve(name);
        }, 1000);
    });
}

async function sayBye(name) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            //Validamos el error o aprobacion
            console.log('Goodbye '+ name);
            //if(err) reject('Hay un error');
            resolve(name);
        }, 1000);
    });
}

async function conversation(name) { 
    console.log("Code in English")
    console.log("Starting async process...")
    await talk(name);
    await talk(name);
    await talk(name);
    await sayBye(name);
    console.log("Process completed...")
}

conversation("Ariel")