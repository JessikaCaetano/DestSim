// Destsim - Software de auxílio ao ensino da modelagem de colunas de destilação pelos métodos de McCabe-Thiele e Ponchon_Savarit
// Desenvolvedora: Jessika Nunes Caetano
// Data da última modificação: 19/01/2019

 // Arquivo de controle do gráfico
 function gerar_grafico_McCabe(duration) {

   // Limpeza da div que contém o gráfico, criação do canvas e adição do gráfico no mesmo
   $("#div_chart").empty();
   var ctx2 = document.createElement("canvas");
   ctx2.setAttribute("id", "grafico_metodo");
   ctx2.setAttribute("height", "250px");
   div_chart.appendChild(ctx2);

   //declaração da variável do chart
   var ctx = document.getElementById("grafico_metodo");

   //Criação das variáveis contendo os dados do gráfico
   var linha_aux = [];
   var curva_eq = [];
   var retificacao = [];
   var esgotamento = [];
   var alimentacao = [];
   var degraus = [];

   // Adição das séries de dados no gráfico
   for (i = 0; i <= 100; i++) {

     var aux_0 = {
       x: xvolatil[i],
       y: xvolatil[i]
     };

     var aux_1 = {
       x: xvolatil[i],
       y: yvolatil[i]
     };

     linha_aux.push(aux_0);
     curva_eq.push(aux_1);

   }

   var aux_2 = {
     x: xD,
     y: xD
   };

   var aux_3 = {
     x: xB,
     y: xB
   };

   var aux_4 = {
     x: xF,
     y: xF
   };

   retificacao.push(aux_2);
   esgotamento.push(aux_3);
   alimentacao.push(aux_4);

   var aux_2 = {
     x: xF,
     y: yK
   };

   var aux_3 = {
     x: xF,
     y: yK
   };

   var aux_4 = {
     x: xF,
     y: yK
   };

   retificacao.push(aux_2);
   esgotamento.push(aux_3);
   alimentacao.push(aux_4);

   for (i = 0; i < x_degrau.length; i++) {

     var aux_5 = {
       x: x_degrau[i],
       y: y_degrau[i]
     };

     degraus.push(aux_5);

   }

   //Caracterização do gráfico
   var myLineChart = new Chart(ctx, {

     type: 'scatter',

     data: {
       datasets: [{
           label: linguagem[95][1],
           backgroundColor: '#546e7a',
           showLine: true,
           fill: false,
           data: curva_eq,
           borderColor: '#546e7a',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: "z",
           backgroundColor: '#90a4ae',
           showLine: true,
           fill: false,
           data: linha_aux,
           borderColor: '#90a4ae',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[96][1],
           backgroundColor: '#26a69a',
           showLine: true,
           fill: false,
           data: retificacao,
           borderColor: '#26a69a',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[97][1],
           backgroundColor: '#ffab0090',
           showLine: true,
           fill: false,
           data: esgotamento,
           borderColor: '#ffab0090',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[98][1],
           backgroundColor: '#00838f',
           showLine: true,
           fill: false,
           data: alimentacao,
           borderColor: '#00838f',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[99][1],
           backgroundColor: '#0097a785',
           showLine: true,
           fill: false,
           data: degraus,
           borderColor: '#0097a785',
           borderWidth: 2,
           pointRadius: 0.1
         }
       ]
     },

     // Configurações do gráfico
     options: {
       legend: {
         labels: {
           // Remover legenda de alguns datasets
           filter: function(item, myLineChart) {
             return !item.text.includes("z");
           },
           boxWidth: 20
         }
       },
       animation: {
         duration: duration
       },
       scales: {
         yAxes: [{
           scaleLabel: {
             display: true,
             labelString: linguagem[100][1],
           },
           ticks: {
             max: 1,
             min: 0
           }
         }],
         xAxes: [{
           scaleLabel: {
             display: true,
             labelString: linguagem[101][1],
           },
           ticks: {
             max: 1,
             min: 0
           }
         }]
       },
       elements: {
         line: {
           tension: 0
         }
       }
     }

   });

 }

 function gerar_grafico_Ponchon(duration) {

   // Limpeza da div que contém o gráfico, criação do canvas e adição do gráfico no mesmo
   $("#div_chart").empty();
   var ctx2 = document.createElement("canvas");
   ctx2.setAttribute("id", "grafico_metodo");
   ctx2.setAttribute("height", "250px");
   div_chart.appendChild(ctx2);

   //declaração da variável do chart
   var ctx = document.getElementById("grafico_metodo");

   //Criação das variáveis contendo os dados do gráfico
   var curva_liquido = [];
   var curva_vapor = [];
   var retificacao = [];
   var esgotamento = [];
   var alimentacao = [];
   var degraus_r = [];
   var degraus_e = [];
   var amarracao = [];

   // Adição das séries de dados no gráfico
   for (i = 0; i <= 100; i++) {

     var aux_0 = {
       x: x_equilibrio[i],
       y: entalpia_liquido[i]
     };

     var aux_1 = {
       x: y_equilibrio[i],
       y: entalpia_vapor[i]
     };

     curva_liquido.push(aux_0);
     curva_vapor.push(aux_1);

   }

   var aux_2 = {
     x: xD,
     y: hD
   };

   var aux_3 = {
     x: xB,
     y: hB
   };

   var aux_4 = {
     x: xB,
     y: (hB - qcB)
   };

   retificacao.push(aux_2);
   esgotamento.push(aux_3);
   alimentacao.push(aux_4);

   var aux_2 = {
     x: xD,
     y: (hD + qcD)
   };

   var aux_3 = {
     x: xB,
     y: (hB - qcB)
   };

   var aux_4 = {
     x: xD,
     y: (hD + qcD)
   };

   retificacao.push(aux_2);
   esgotamento.push(aux_3);
   alimentacao.push(aux_4);

   for (i = 0; i < x_degrau_r.length; i++) {

     var aux_5 = {
       x: x_degrau_r[i],
       y: y_degrau_r[i]
     };

     degraus_r.push(aux_5);

   }

   for (i = 0; i < x_degrau_e.length; i++) {

     var aux_6 = {
       x: x_degrau_e[i],
       y: y_degrau_e[i]
     };

     degraus_e.push(aux_6);

   }

   var marc = 0;
   for (var i = 0; i < reta_amarracao.length; i++) {

     if (reta_amarracao[marc]) {
       var aux_7 = {
         x: reta_amarracao[marc][0],
         y: reta_amarracao[marc][1]
       };
     }

     if (reta_amarracao[marc + 1]) {
       var aux_8 = {
         x: reta_amarracao[marc + 1][0],
         y: reta_amarracao[marc + 1][1]
       };
     }

     amarracao.push(aux_7, aux_8);

     marc = marc + 2;

   }

   //Caracterização do gráfico
   var myLineChart = new Chart(ctx, {

     type: 'scatter',

     data: {
       datasets: [{
           label: linguagem[102][1],
           backgroundColor: '#546e7a',
           showLine: true,
           fill: false,
           data: curva_vapor,
           borderColor: '#546e7a',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[103][1],
           backgroundColor: '#90a4ae',
           showLine: true,
           fill: false,
           data: curva_liquido,
           borderColor: '#90a4ae',
           borderWidth: 2,
           pointRadius: 0.1
         }, {
           label: linguagem[104][1],
           backgroundColor: '#00bfa5',
           showLine: true,
           fill: false,
           data: retificacao,
           borderColor: '#00bfa5',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[105][1],
           backgroundColor: '#00838f',
           showLine: true,
           fill: false,
           data: esgotamento,
           borderColor: '#00838f',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[106][1],
           backgroundColor: '#ffab0090',
           showLine: true,
           fill: false,
           data: alimentacao,
           borderColor: '#ffab0090',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: linguagem[107][1],
           backgroundColor: '#0097a785',
           showLine: true,
           fill: false,
           data: degraus_r,
           borderColor: '#0097a785',
           borderWidth: 2,
           pointRadius: 0.1
         }, {
           label: "z",
           backgroundColor: '#4db6ac',
           showLine: true,
           fill: false,
           data: degraus_e,
           borderColor: '#4db6ac',
           borderWidth: 2,
           pointRadius: 0.1
         },{
           label: linguagem[108][1],
           backgroundColor: '#e0e0e0',
           showLine: true,
           fill: false,
           data:amarracao,
           borderColor: '#bdbdbd95',
           borderDash: [10,5],
           borderWidth: 1.5,
           pointRadius: 0.1
         }
       ]
     },

     // Configurações do gráfico
     options: {
       legend: {
         labels: {
           // Remover legenda de alguns datasets
           filter: function(item, myLineChart) {
             return !item.text.includes("z");
           },
           boxWidth: 20
         }
       },
       animation: {
         duration: duration
       },
       scales: {
         yAxes: [{
           scaleLabel: {
             display: true,
             labelString: linguagem[109][1]
           }
         }],
         xAxes: [{
           scaleLabel: {
             display: true,
             labelString: linguagem[110][1]
           },
           ticks: {
             max: 1,
             min: 0
           }
         }]
       },
       elements: {
         line: {
           tension: 0
         }
       }
     }

   });

 }
