var leer = require("readline-sync");
var archivo = require('fs');

exports.agregarNum = (arreglo) => {
    const validarOpcion = /^(\d+\.\d+)$|^(\d+)$/;
    let agregado = false;
    do {
        var num = leer.questionInt("Ingrese el número que desea poner en el arreglo\n");
        if (!validarOpcion.test(num))
            console.log("Ingrese una opción válida. Solo números, no letras o caracteres especiales.");
    } while (!validarOpcion.test(num));
    console.log("Agregando número...");
    if (arreglo.length == 0) {
        console.log("Número agregado correctamente.");
        arreglo.push(num);
        agregado = true;
    }
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] == null) {
            arreglo[i] = num;
            console.log("Número agregado correctamente en una posición vacía.");
            agregado = true;
            break;
        }
    }
    if (agregado == false) {
        arreglo.push(num)
        console.log("Número agregado hasta el final correctamente.");
    }
}

exports.eliminarNum = (arreglo) => {
    const validarOpcion = /^\d+$/;
    do {
        var pos = leer.questionInt("Ingrese la posición del elemento que desea eliminar del arreglo ");
        if (!validarOpcion.test(pos))
            console.log("Ingrese una opción válida. Solo números enteros.");
    } while (!validarOpcion.test(pos));

    if (pos >= arreglo.length) {
        console.log("Vuelva a intentarlo. Rango del arreglo: 0-" + (arreglo.length - 1));
    } else {
        console.log("Número eliminado correctamente.");
        arreglo[pos] = null;
    }
}

exports.editarNum = (arreglo) => {
    let statusPos = false;
    let statusNum = false;
    const validarOpcionPos = /^\d+$/;
    const validarOpcionNum = /^(\d+\.\d+)$|^(\d+)$/;

    do {
        var pos = leer.questionInt("Ingrese la posición del elemento que desea eliminar del arreglo ");
        var num = leer.questionFloat("Ingrese el número que desea poner en el arreglo ");

        if (validarOpcionPos.test(pos))
            statusPos = true
        else
            console.log("Ingrese una opción válida. Solo números enteros.");
        if (validarOpcionNum.test(num))
            statusNum = true
        else
            console.log("Ingrese una opción válida. Solo números, no letras o caracteres especiales.");
    } while (!statusNum || !statusPos);

    if (pos >= arreglo.length) {
        console.log("Vuelva a intentarlo. Rango del arreglo: 0-" + (arreglo.length - 1));
    } else {
        arreglo[pos] = num;
        console.log("Número editado correctamente.");
    }

}

exports.buscar = (arreglo) => {
    const validarOpcion = /^(\d+\.\d+)$|^(\d+)$/;
    let encontrado = false;
    if (arreglo.length > 0){
        do {
            var num = leer.questionFloat("Ingrese el número que desea buscar en el arreglo ");
            if (!validarOpcion.test(num))
                console.log("Ingrese una opción válida. Solo números, no letras o caracteres especiales.");
        } while (!validarOpcion.test(num));
    
        for (let i = 0; i < arreglo.length; i++) {
            if (num == arreglo[i]) {
                console.log("Se encontró el valor " + num + " en la posición " + i);
                encontrado = true
            }
        }
        if (encontrado == false)
            console.log("No se ha encontrado ninguna coincidencia en el arreglo.")
    }else{
        console.log("El arreglo está vacío.")
    }
}

exports.imprimir = (arreglo) => {
    const validarOpcion = /^\d+$/;
    let nombre;
    if (arreglo.length > 0) {
        do {
            var pos = leer.questionInt("Ingrese la posición del elemento que desea imprimir del arreglo ");
            if (!validarOpcion.test(pos))
                console.log("Ingrese una opción válida. Solo números enteros.");
        } while (!validarOpcion.test(pos));

        if (pos >= arreglo.length) {
            console.log("Vuelva a intentarlo. Rango del arreglo: 0-" + (arreglo.length - 1));
        } else {
            console.log("El valor de la posición " + pos + " es: " + arreglo[pos]);
            escribirArchivo(arreglo, pos);
        }
    } else {
        console.log("El arreglo está vacío.")
    }
}

exports.imprimirArreglo = (arreglo) => {
    if (arreglo.length == 0) {
        console.log("El arreglo está vacío.");
    } else {
        var texto ="";
        var no = true
        arreglo.forEach(element => {
            if (no) {
                texto = element;
                no = false;
            }
            texto=texto+"  "+element;
        });
        console.log(texto);
        escribirArchivo(arreglo);
    }
}

exports.imprimirSumaProm = (arreglo) => {
    if (arreglo.length == 0) {
        console.log("El arreglo está vacío.");
    } else {
        var sum = suma(arreglo);
        var prom = promedio(arreglo, sum);
        var texto  = "La sumatoria es: "+sum+"\n"+"El promedio es: "+prom;
        console.log("La sumatoria es: "+sum);
        console.log("El promedio es: "+prom);
        escribirArchivo(texto);
    }
}

escribirArchivo = (arreglo, pos) => {
    while (true) {
        let guardar = leer.question("¿Desea guardar dicho valor en un archivo? (Si|s) (cualquier otra tecla se toma como NO)");
        if (guardar == "s" || guardar == "si") {
            nombre = leer.question("Ingrese el nombre del archivo ");
            console.log("Guardando archivo...")
            try {
                archivo.writeFileSync(`./${nombre}.txt`, arreglo[pos]);
                console.log("Se ha guardado correctamente.")
                break;
            } catch (e) {
                console.log("Ha ocurrido un error al intentar guardar el archivo.");
                console.log(e);
            }
        } else {
            console.log("--- No se guardará en archivo ---")
            break;
        }
    }
}

escribirArchivo = (arreglo) => {
    while (true) {
        let guardar = leer.question("¿Desea guardar dicho valor en un archivo? (Si|s) (cualquier otra tecla se toma como NO)");
        if (guardar == "s" || guardar == "si") {
            nombre = leer.question("Ingrese el nombre del archivo ");
            console.log("Guardando archivo...")
            try {
                archivo.writeFileSync(`./${nombre}.txt`, arreglo);
                console.log("Se ha guardado correctamente.")
                break;
            } catch (e) {
                console.log("Ha ocurrido un error al intentar guardar el archivo.");
                console.log(e);
            }
        } else {
            console.log("--- No se guardará en archivo ---")
            break;
        }
    }
}

escribirArchivo = (texto) => {
    while (true) {
        let guardar = leer.question("¿Desea guardar dicho valor en un archivo? (Si|s) (cualquier otra tecla se toma como NO)");
        if (guardar == "s" || guardar == "si") {
            nombre = leer.question("Ingrese el nombre del archivo ");
            console.log("Guardando archivo...")
            try {
                archivo.writeFileSync(`./${nombre}.txt`, texto);
                console.log("Se ha guardado correctamente.")
                break;
            } catch (e) {
                console.log("Ha ocurrido un error al intentar guardar el archivo.");
                console.log(e);
            }
        } else {
            console.log("--- No se guardará en archivo ---")
            break;
        }
    }
}

suma = (arreglo) => {
    var sum = 0;
    arreglo.forEach(element => {
        sum += element;
    });
    return sum;
}
promedio = (arreglo, sumatoria) => {
    var prom = 0;
    prom = sumatoria / arreglo.length;
    return prom;
}