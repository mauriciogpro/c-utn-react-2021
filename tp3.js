var table = document.getElementsByTagName("tr") // length 12
var titulo = document.getElementsByTagName("h1")

trow = document.querySelectorAll(".trow")
trow.style.display = "none";

function dibujar() {
    i = 0;
    titulo[0].style.color = "green";
    var recorrido = setInterval(() => {
        if (i < table.length) {
            table[i].style.display = ("table-row")
            i++;
        } else {
            clearInterval(recorrido);
        }
    }, 100)
}


function modoDiurno() {
    document.body.style.backgroundColor = "grey";

    for (let i = 1; i < table.length; i++) {
        table[i].style.color = "white";

        if (i % 2 == 0) {
            table[i].style.backgroundColor = "yellow";
        } else {
            table[i].style.backgroundColor = "pink";
        }
    }
}



function modoNocturno() {
    document.body.style.backgroundColor = "gray";

    for (let i = 0; i < table.length; i++) {
        table[i].style.color = "white";

        if (i % 2 == 0) {
            table[i].style.backgroundColor = "teal";
        } else {
            table[i].style.backgroundColor = "green";
        }
    }
}

/* Modificar la tabla de meses desarrollada en la Unidad para que al recargar
( o cargar por primera vez) la página, la tabla se empiece a dibujar de arriba
hacia abajo con un movimiento perceptible (dar un tiempo entre el dibujo de una
fila y la siguiente para que se perciba el movimiento)
*/