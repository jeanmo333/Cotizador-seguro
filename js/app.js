
//contenedores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;

}


// realiza una cotizacion con los datos

Seguro.prototype.cotizarSeguro = function () {

    /*
    1 = americano 1.15
    2 = asiatico 1.05
    3 = europeo 1.35
    */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;

        default:
            break;
    }


    //leer el ano
    const deferencia = new Date().getFullYear() - this.year;
    //cada ano que la diferencia es mayor, el costo va a reducir a un 3%
    cantidad -= (cantidad * (deferencia * 3)) / 100;


    /*
    si el seguro es basico de multiplica por un 30% mas
    si el seguro es completo de multiplica por un 50% mas
    */
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
        // cantidad = (cantidad * 30) / 100;
    } else {
        cantidad *= 1.50;
        //cantidad = (cantidad * 50) / 100;
    }

    return cantidad;

    console.log(cantidad);



}



function UI() { }

//llenar la option de los anos
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}



//mostrar alerta en pantalla

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error');
    }
    else {
        div.classList.add('correcto');

    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertar en el html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);


}


UI.prototype.mostrarResultado = (total, seguro) => {

    let textoMarca;
    switch (seguro.marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;

        default:
            break;
    }


    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    // Insertar la informacion
    div.innerHTML = `
     <p class='header'>Tu Resumen: </p>
     <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span> </p>
     <p class="font-bold">Año: <span class="font-normal"> ${seguro.year} </span> </p>
     <p class="font-bold">Tipo: <span class="font-normal"> ${seguro.tipo} </span> </p>
     <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
`;

    const resultadoDiv = document.querySelector('#resultado');



    //mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none'; //se borra el spiner
        resultadoDiv.appendChild(div); // se muestra el resultado
    }, 3000);


}




const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();

});







eventListeners();
function eventListeners() {

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e) {
    e.preventDefault();

    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    //leer el ano selecionnado
    const year = document.querySelector('#year').value;

    //leer el tipo de cubiertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('todo los campos son obligatorios', 'error');
        return;

    }

    ui.mostrarMensaje('cotizando...', 'exito');

    //ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }



    //insertando el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();


    //utilizar el prototype que va cotizar
    ui.mostrarResultado(total, seguro);

}



