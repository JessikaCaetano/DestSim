$(".button-collapse").sideNav();
$(document).ready(function() {
  $('select').material_select();
});


//Inserindo dados na caixa de rolagem do componentes 1 e 2
select_componentes = document.getElementById("select_componentes")

var opt = document.createElement("option")
opt.value = 0;
opt.text = 'Escolha uma opção';
opt.selected='selected'
opt.disabled='disabled'

select_componentes.add(opt, select_componentes.options[0])



for (i = 0; i <= 19; i++) {
  var opt = document.createElement("option")
  opt.value = i
  opt.text = data.componentes[i]
  select_componentes.add(opt, select_componentes.options[i+1])
}

select_componentes2 = document.getElementById("select_componentes2")
var opt2 = document.createElement("option")
opt2.value = 0;
opt2.text = 'Escolha uma opção';
opt2.selected='selected'
opt2.disabled='disabled'
select_componentes2.add(opt2, select_componentes2.options[0])
for (i = 0; i <= 19; i++) {
  var opt = document.createElement("option")
  opt.value = i
  opt.text = data.componentes[i]
  select_componentes2.add(opt, select_componentes2.options[i+1])
}


var pressao = 101.325
var temperaturas = Array()
var P1sat = Array()
var P2sat = Array()
var xvolatil = Array()
var yvolatil = Array()
var alfa = Array()
var A1, A2, B1, B2, C1, C2
var tipodemistura, metodoativ, componente1, componente2

//Adicionando os valores dos componentes 1 e 2 a partir das caixas de rolagem
// function addcomp1(){
//   componente1 = componentes[document.getElementById("select_componentes").value]
// }
// function addcomp2(){
//   componente2 = componentes[document.getElementById("select_componentes2").value]
// }
// function addcomp3(){
//   metodoativ = metodoatividade[document.getElementById("select_atividade").value]
// }

componente1 = "Benzeno"
componente2 = "Tolueno"
tipodemistura = "Mistura Ideal"

mistura = componente1 + " e " + componente2

if(tipodemistura == "Mistura Ideal")
{
  curvaeq_ideal()
}

// }
