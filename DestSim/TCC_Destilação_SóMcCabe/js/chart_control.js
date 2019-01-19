 // Arquivo de controle do gráfico
 function gerar_grafico(duration) {

   // Limpeza da div que contém o gráfico, criação do canvas e adição do gráfico no mesmo
   $("#div_chart").empty();
   var ctx2 = document.createElement("canvas");
   ctx2.setAttribute("id", "myChart");
   ctx2.setAttribute("height", "250px");
   div_chart.appendChild(ctx2);

   //declaração da variável do chart
   var ctx = document.getElementById("myChart");

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
           label: 'Curva de Equilíbrio',
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
           label: "Retas de Retificação e Esgotamento",
           backgroundColor: '#b0bec5',
           showLine: true,
           fill: false,
           data: retificacao,
           borderColor: '#b0bec5',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: "z",
           backgroundColor: '#b0bec5',
           showLine: true,
           fill: false,
           data: esgotamento,
           borderColor: '#b0bec5',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: "Reta de Alimentação",
           backgroundColor: '#00838f',
           showLine: true,
           fill: false,
           data: alimentacao,
           borderColor: '#00838f',
           borderWidth: 2,
           pointRadius: 0.1
         },
         {
           label: "Estágios",
           backgroundColor: '#4db6ac',
           showLine: true,
           fill: false,
           data: degraus,
           borderColor: '#4db6ac',
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
             labelString: 'y (fração molar)'
           },
           ticks: {
             max: 1,
             min: 0
           }
         }],
         xAxes: [{
           scaleLabel: {
             display: true,
             labelString: 'x (fração molar)'
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
