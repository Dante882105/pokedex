//import { ajax } from "./ajax.js"
        //se toma la pantalla para mostrar la imagen 
        let pantalla = document.querySelector(".pantalla");
        //Se toma el lugar donde los datos se mostrarán
        let data = document.querySelector('.data');
        //Se toma el lugar donde se mostrará el id del pokemon
        let numero = document.querySelector('.numero');

let form = document.querySelector("form");

let pokeName = document.querySelector("input");

let button = document.querySelector("button");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    //ajax(pokeName.value);
    const p = new Promise(function(resolve, reject) {
    //Haciendo una promesa realizamos un XMLHttpRequest().
        let xhr = new XMLHttpRequest();
    //El valor pokeName.value es el valor obtenido en el formulario por medio de la variable pokeName de la linea 5.
        xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/'+pokeName.value);
    //El evento Load se utiliza para obtener la respuesta en el open y su valor normalmente es una cadena de texto la cua ltendremos que parsear a un elemento JSON para utilizarlo con JavaScript.   
        xhr.addEventListener("load", e => {
    //Si el estatus es 200 (el cual indica que fue se obtuvo una respuesta de xhr), le asignamos los valores de resolve y reject    
            if (xhr.status === 200) {
    //Si la respuesta es favorable almacenaremos el resultado de la consulta ajax en el resolve por medio de su respuesta (e es lo obtenido en la open, target es la información que contiene y response es la respuesta obtenida), tengase en cuenta que el valor es una cadena de texto y debe ser parseada según se requiera            
                resolve(e.target.response);
    //En caso de presentarse un error o una respuesta negativa a la solicitud del "load", se lamacenó un mensaje qque utilizaremos como deseemos por medio de reject
            }else{
                reject("No existe dicha selección. Confirma que sea el nombre o número correcto de un pokemón");
            }
        }) 
            xhr.send();
    });

    p.then(res => {
        removerDatos()
    //Por medio del JSON.parse se transfortma la cadena de texto obtenida en el response almacenado ahora en el parámetro res.
        let dataJson = JSON.parse(res);

        //Imagen por defecto
        let imagen = document.createElement('img');
        imagen.className = "imagen";
        //Para obtener una imagen mejor renderizada
        //imagen.src = dataJson.sprites.other.dream_world.front_default;
        imagen.src = dataJson.sprites.front_default;
        pantalla.appendChild(imagen);

        //Número de Identifiación del Pokemon
        let id_poke = document.createElement('h2');
        id_poke.textContent = "#"+dataJson.id;
        numero.appendChild(id_poke);

        //Datos a mostrar en la tapa del pohkedex
        let data_div = document.createElement('div');
        data_div.className = 'data_div'
        
        let listado = document.createElement('table');
        listado.className = "listado";

        data_div.appendChild(listado);
        let data_moves = document.createDocumentFragment();

        let title = document.createElement('strong');
        title.innerText = dataJson.species.name;

        let total_movimientos = dataJson.moves.length;

        if(total_movimientos > 5){
            total_movimientos = 5;
        }
            for(let i = 0; i < total_movimientos; i++){
                let movimientos = dataJson.moves[i];
                let nombre_movimineto = movimientos.move.name;
                let listado_interno = document.createElement('tr');

                let movimientos_mostrados = document.createElement('small');

                movimientos_mostrados.textContent = nombre_movimineto;
                listado_interno.appendChild(movimientos_mostrados);
                data_moves.appendChild(listado_interno);

            }
            data_div.appendChild(title);
            listado.appendChild(data_moves);
            data_div.appendChild(listado);
            data.appendChild(data_div);

    })
    p.catch(error => {
        alert(error);
    })
});
//Función para eliminar elementos DOM de las vistas
function removerDatos(){
    while (pantalla.firstChild) {
        pantalla.removeChild(pantalla.firstChild);
    };
    while (data.firstChild) {
        data.removeChild(data.firstChild);
    };

    while (numero.firstChild) {
        numero.removeChild(numero.firstChild);
    }
}