let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let diasDelMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let meseslargos = [];
let mesescortos = [];


for (let i = 0; i < 13; i++) {

    if (diasDelMes[i] >= 31) {
        meseslargos.push(meses[i]);
    }
    else if (diasDelMes[i] <= 30) {
        mesescortos.push(meses[i]);
    }
}

console.log(meseslargos + ' tienen 31 dias')
console.log(mesescortos + ' tienen 30 dias')