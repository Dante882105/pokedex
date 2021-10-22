//import { ajax } from "./ajax.js"

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
    //Por medio del JSON.parse se transfortma la cadena de texto obtenida en el response almacenado ahora en el parámetro res.
        let dataJson = JSON.parse(res);
        console.log(dataJson);

        let resultado = document.getElementById("resultado");
    
        let li = document.createElement("li");
                
        resultado.appendChild(li);
    
        let card = document.createElement("div");
        card.className = "card";
        card.setAttribute("draggable", "true");
        card.setAttribute("id", dataJson.id);
        li.appendChild(card);
    
        let name = document.createElement("h1");
        name.textContent = dataJson.species.name+" "+dataJson.id;
        card.prepend(name);
        
        let foto = document.createElement("img");
        foto.setAttribute("draggable", "false");
    //Imagen por defecto
        foto.src = dataJson.sprites.front_default;
    //Para obtener una imagen mejor renderizada
        // foto.src = dataJson.sprites.other.dream_world.front_default;
        card.appendChild(foto);
    
        let poder = document.createElement("div");
        card.append(poder);
    
        let powers = document.createElement("table");
        poder.appendChild(powers);
    
        let add = document.createDocumentFragment();

        let longitud = 5;
    
        if (dataJson.moves.length < 5 ) {
            longitud = dataJson.moves.length;
        }
                    
            for (let i = 0; i < longitud; i++) {
                let array = dataJson.moves[i];
                let movimiento = array.move.name;
                let listado = document.createElement("tr");
                add.appendChild(listado);
                listado.textContent = movimiento;
                    
            }
    
        powers.appendChild(add);

// Agregar un valor de dragable a cada tarjeta que contien los pokemones, para poder arrastarlos a otra ul, se hace por medio de un for.
        let pokemones = document.getElementsByClassName("card");
        for (let i = 0; i < pokemones.length; i++) {
            pokemones[i].addEventListener("dragstart", (e) => iniciarArrastre(e)) 
        }

// Ésta función permite definir el valor de otra variable con los valores del id de cada producto cuando se arrastra alguno de los elementos del mismo.
        function iniciarArrastre(e) {
            e.dataTransfer.setData("pokemon", e.target.id);
            //console.log(e.target.id);
        } 
//elegidos es el id de un ul el cual tiene un dragover para finalizar el arrastrar un elemento.      
        let elegidos = document.getElementById("elegidos");
        elegidos.addEventListener("dragover", (e) => permitirSoltar(e));
//Permitir soltar permite que al arrastrar un elemento en elegidos, se pueda liberar el elemento dentro del mismo.
        function permitirSoltar(e) {
            e.preventDefault();
            console.log("arrastrando");
        }
//Drop permite soltar el elemento y que haga parte del elemento en ése momento del ul con id "elegidos"
        elegidos.addEventListener("drop", (e) => soltar(e))

        function soltar(e) {
            e.preventDefault();
            console.log("arrastrando");
//la variable tarjeta garantiza obtener el id de un elemento previamente creado para poder agregarlo en el ul con id "elegidos".
            var tarjeta = e.dataTransfer.getData("pokemon");
            elegidos.appendChild(document.getElementById(tarjeta));
        }
    })

    p.catch(error => {
        alert(error);
    })
})