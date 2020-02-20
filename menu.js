var leer = require("readline-sync");
var mod = require('./modulos/opciones.js');
let validarOpcion = /^[1-8]$/;
let opcionMenu;
var arreglo = [];
let ciclo = true;

do {
    do {
        console.log("\n1. INGRESAR ELEMENTO EN ARRELGO");
        console.log("2. ELIMINAR UN ELEMENTO EN EL ARREGLO");
        console.log("3. EDITAR UN ELEMENTO EN EL ARREGLO");
        console.log("4. BUSCAR ELEMENTO");
        console.log("5. IMPRIMIR DADO UN ÍNDICE");
        console.log("6. IMPRIMIR TODO EL ARREGLO");
        console.log("7. IMPRIMIR SUMA Y PROMEDIO");
        console.log("8. SALIR\n");
        console.log(arreglo);
        opcionMenu = leer.questionInt("\nIngresa la opción deseada (1-8)\n");
    } while (!validarOpcion.test(opcionMenu));

    switch (opcionMenu) {
        case 1:
            mod.agregarNum(arreglo);
            break;
        case 2:
            mod.eliminarNum(arreglo);
            break;
        case 3:
            mod.editarNum(arreglo);
            break;
        case 4:
            mod.buscar(arreglo);
            break;
        case 5:
            mod.imprimir(arreglo);
            break;
        case 6:
            mod.imprimirArreglo(arreglo);
            break;
        case 7:
            mod.imprimirSumaProm(arreglo);
            break;
        case 8:
            ciclo = false;
            break;

    }
    var respuesta;
    while (ciclo) {
        respuesta = leer.question("¿Desea seguir usando el programa? (si|s) (cualquier otra tecla se toma como NO) ");
        if (respuesta == "no" || respuesta == "n") {
            ciclo = false;
            break;
        }else if(respuesta == "si" || respuesta == "s"){
            break;
        }
    }
} while (ciclo);