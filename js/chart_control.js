 // arquivo de controle do chart

 //declaração da variável do chart
 var ctx = document.getElementById("myChart");

 //criação das variáveis contendo os dados do gráfico
 var linha_aux = []
 var curva_eq = []
 for (i = 0; i <= 100; i++) {
   var aux = {
     x: xvolatil[i],
     y: xvolatil[i]
   };
   var aux1 = {
     x: xvolatil[i],
     y: yvolatil[i]
   };
   linha_aux.push(aux);
   curva_eq.push(aux1);
 }

 //Caracterização do gráfico
 var myLineChart = new Chart(ctx, {

   type: 'scatter',
   data: {
     datasets: [{
         label: 'Curva de Equilíbrio',
         backgroundColor: '#006064',
         showLine: true,
         fill: false,
         data: curva_eq,
         borderColor: '#006064',
         borderWidth: 2,
         pointRadius: 0.1
       },
       {
         label: "Curva Auxiliar",
         backgroundColor: '#4DB6AC',
         showLine: true,
         fill: false,
         data: linha_aux,
         borderColor: '#4DB6AC',
         borderWidth: 2,
         pointRadius: 0.1
       }
     ]
   },
   options: {
     scales: {
       yAxes: [{
         ticks: {
           max: 1,
           min: 0
         }
       }],
       xAxes: [{
         ticks: {
           max: 1,
           min: 0
         }
       }]
     },

   }

 });
