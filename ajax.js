//usando ajax y realizando un export

export function ajax(pokemon) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', ' https://pokeapi.co/api/v2/pokemon/'+pokemon);

        xhr.addEventListener("load", function mostrarPoke(e){

            if (xhr.status == 200) {

                let dataJson = JSON.parse(e.target.response);
                console.log(dataJson);
    
                let resultado = document.getElementById("resultado");
    
                let li = document.createElement("li");
                
                resultado.appendChild(li);
    
                let card = document.createElement("div");
                card.className = "card";
                li.appendChild(card);
    
                let name = document.createElement("h1");
                name.textContent = dataJson.species.name+" "+dataJson.id;
                card.prepend(name);
    
                let foto = document.createElement("img");
                foto.src = dataJson.sprites.front_default;
                card.appendChild(foto);
    
                let poder = document.createElement("div");
                card.append(poder);
    
                let powers = document.createElement("table");
                poder.appendChild(powers);
    
                let add = document.createDocumentFragment();
                
                console.log(dataJson.moves.length);
    
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
            } else {
                alert("No existe dicha selección. Confirma que sea el nombre o número correcto de un pokemón");
            }
            
        })
    
        xhr.send();

 }



