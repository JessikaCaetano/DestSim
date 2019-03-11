var enUS = [["aba_1", "Introduction"],[
      "aba_2", "Simulation"],[
      "aba_3", "Instructions"],[
      "aba_4", "About the Methods"],[
      "inicio_titulo", "DestSim - Software for Modeling the Separation of Binary Mixtures in Distillation Columns"],[
      "inicio_1", "Hello! Welcome to DestSim!"],[
      "inicio_2", "This software was developed aiming to facilitate the visualization of the two main graphic methods taught in Chemical Engineering courses for modeling operations in distillation columns, McCabe-Thiele's and Ponchon-Savarit's. In it, a continuous reflux system is considered], in which the components of a binary mixture, fed into the column as saturated liquid, are separated. At the top of the column a total condenser is connected, while at the base of the column there is a partial boiler."],[
      "inicio_3", "By using the software, the user can simulate the application of these two methods in predefined examples applied to ideal and non-ideal mixtures or specify the components of the mix, its compositions and how it should be treated."],[
      "inicio_4", "The program generates the chart of the chosen method's application, returning the number of plates required to obtain the specified separation and the feed plate of the mixture in the column. It also provides the user with compositions of liquid and vapor phases at each stage of the distillation. It is possible to change the reflux rate and observe in real time the influence of the same on the results."],[
      "inicio_5", "We hope that the tool will support teachers and students in the study of distillation operations."],[
      "inicio_6", "Thank you for the support and have a nice experience!"],[
      "inicio_comecar", "Start"],[
      "manual_titulo", "Instructions"],[
      "manual_1", "Hello! Follow the next steps to use DestSim:"],[
      "manual_2", "<strong>1º</strong> If you don't have enough data to perform a specific simulation, click the <em> Ideal Example </em> or <em> Not Ideal Example </em> buttons at the bottom of the <em>Data Input</em> card, which make it possible to observe some predefined simulations, and skip to step 9. If not, continue with the steps below."],[
      "manual_3", "<strong>2º</strong> Choose two substances to be the components of the mixture in the sections <em> Component 1 </em> and <em> Component 2 </em>. After this step, the composition fields will be unlocked."],[
      "manual_4", "<strong>3º</strong> Select, in the <em> Composition </em> section, the base (mass or molar) in which the data you fill in the composition fields is in."],[
      "manual_5", "<strong>4º</strong> Fill in the <em> Composition </em> section with the data for the composition of the mixture in the feed, top and bottom of the column. If you want to convert the filled data from the molar base to mass base and vice versa, simply change the selected base."],[
      "manual_6", "<strong>Important:</strong> The composition data should refer to the most volatile component of the mixture, indicated in the <em> Composition </em> section once you have chosen the components."],[
      "manual_7", "<strong>5º</strong> Select the graphical method (McCabe-Thiele or Ponchon-Savarit) that you want to apply in the <em> Chart Method </em> section."],[
      "manual_8", "<strong>6º</strong> Select how the mixture should be treated (Ideal or Not Ideal) in the <em> Mixture Type </em> section. According to your choices in this field and in the previous one, the selection fields for activity and / or enthalpy calculation methods can be unblocked or not, as follows:"],[
      "manual_9", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMcCabe-Thiele and Ponchon-Savarit Methods for Ideal Mixtures -> Do not require activity coefficients and residual properties;"],[
      "manual_10", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMcCabe-Thiele Method for Non-ideal Mixtures -> Requires calculation of activity coefficients, but not residual properties;"],[
      "manual_11", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPonchon-Savarit Method for Non-ideal Mixtures -> Requires calculation of activity coefficients and residual properties."],[
      "manual_12", "According to your choices in the last two items, select the method that should be used to calculate the activity and residual enthalpy coefficients in the <em> Activity Calculation Method </em> and <em> Residual Entalphy Calculation Method </em>."],[
      "manual_13", "Make sure all the required data has been entered, and then click the <em> Calculate </em> button."],[
      "manual_14", "<strong>9º</strong> In the <em> Reflux Ratio </em> section, set the reflux ratio value you want to use. Now you can see the graph of the applied method in the Simulation Results card, and just below the required number of stages and the feed plate. You can also change the reflux ratio, if you want to observe the influence of it in the graphic method. In the Stage Composition card, a table shows the composition of the outgoing liquid and steam streams of each distillation stage, relative to the more volatile component. "],[
      "manual_comecar", "Start"],[
      "sobre_metodos_titulo_1", "McCabe-Thiele's Method"],[
      "sobre_metodos_titulo_2", "Ponchon-Savarit's Method"],[
      "sobre_metodos_titulo_3", "Activity Coefficients / Excess Properties"],[
      "sobre_metodos_titulo_4", "Residual Properties"],[
      "sobre_metodos_1", "McCabe-Thiele's Method is a way of calculating the number of ideal stages required in a distillation using the Thermodynamic Equilibrium Curve of the mixture to be separated. In this method, by means of mass balances, three lines are designed: the Feed Line, the Stripping Line and the Rectification Line. Between these lines and the equilibrium curve steps are drawn. At the end of the method's application, the number of stages required is equal to the number of steps and the feed plate is the step that meets the Feed Line. The compositions of the liquid and vapor outlet streams of each stage can be obtained at the points at which the steps touch the equilibrium curve."],[
      "sobre_metodos_2", "This method takes into account that the molar flux in the liquid and vapor phases is constant within each stage, with no enthalpy change from one stage to another. Therefore, it is applicable only for mixtures whose saturation temperatures of the components are not too far apart (the temperature does not vary much with the composition of the mixture). "],[
      "sobre_metodos_3", "For further details, reference is made to the book <em>Unit Operations of Chemical Engineering</em> by W. L. McCabe, J. C. Smith and P. Harriott. "],[
      "sobre_metodos_4", "The Ponchon-Savarit's Method aims to calculate the number of ideal stages required in a distillation from the Enthalpy-Composition Diagram of the mixture to be separated. In this method, unlike McCabe-Thiele's, considerations for the constant molar flow within the column are not made, allowing its application to a wider range of mixtures and obtaining a more accurate result if the available thermodynamic data are correct. The application of this method, however, is restricted to the distillation of binary mixtures and extraction in ternary systems. "],[
      "sobre_metodos_5", "This method also envolves drawing Stripping, Rectification and Feed lines, based on mass and energy balances. The method is based on the so-called Lever Arm Rule, used to simplify mass and energy balances in straight lines. As an aid, isotherms are used, which can be obtained from the junction of the Enthalpy-Composition Diagram with the Equilibrium Cruiser of the mixture. "],[
      "sobre_metodos_6", "For further details, it is suggested to consult the books, <em>Equilibrium-Stage Separation Operations in Chemical Engineering</em>, by EJ Henley and JD Seader and <em> Design of Equilibrium Stage Procecess </em> by B.D. Smith. "],[
      "sobre_metodos_7", "Excess Properties are used to measure the difference between thermodynamic properties of a real mixture and an ideal solution at the same temperature and pressure. To know the behavior of the enthalpy of a real liquid mixture according to its composition, it is necessary to calculate its Excess Enthalpy. This value can be obtained from Excess Gibbs Free Energy, which is correlated with the activity coefficient of each component of the mixture by means of some different experimental methods such as Van Laar's, NRTL, Wilson's and UNIFAC. "],[
      "sobre_metodos_8", "Activity coefficients are a function of temperature and composition of a mixture, and are obtained experimentally. "],[
      "sobre_metodos_9", "For further details, it is suggested to consult the book <em>Introduction to Chemical Engineering Thermodynamics</em> by J. M. Smith, H. C. Van Ness and M. M. Abbot."],[
      "sobre_metodos_10", "Residual Properties consist of measuring the difference between thermodynamic properties of a mixture of real gases and an ideal gas mixture at the same temperature and pressure. In order to know the enthalpy behavior of a real gaseous mixture according to its composition it is necessary to calculate its Residual Enthalpy. There are correlations to find this value from the manipulation of cubic state equations. These are simple polynomial equations designed to describe the PVT behavior of liquids and vapors over wide ranges of temperature and pressure. Their parameters vary according to the models, such as van der Waals, Soave / Redlich / Kwong, Peng Robinson and Redlich / Kwong."],[
      "sobre_metodos_11", "For further details, it is suggested to consult the book <em> Introduction to Chemical Engineering Thermodynamics </em> by J. M. Smith, H. C. Van Ness and M. M. Abbot"],[
      "nome_card_1", "Data Input"],[
      "informativo_1", "Don't know where to start? Choose your mixture or use the example buttons at the end of this section."],[
      "componente_1", "Component 1"],[
      "componente_2", "Component 2"],[
      "label_composicao", "Composition (fraction of the most volatile component):"],[
      "tipo_composicao_1", "Molar"],[
      "tipo_composicao_2", "Mass"],[
      "campo_alimentacao", "Feed"],[
      "campo_topo", "Top"],[
      "campo_fundo", "Bottom"],[
      "metodo", "Graphic method:"],[
      "mistura", "Mixture Type:"],[
      "mistura_ideal", "Ideal Mixture"],[
      "mistura_nao_ideal", "Non-Ideal Mixture"],[
      "metodo_atividade", "Activity calculation method:"],[
      "metodo_residual", "Residual enthalpy calculation method:"],[
      "simulacao_calcular", "Calculate"],[
      "ou", "or"],[
      "exemplo_1", "Examples McCabe-Thiele"],[
      "ideal_1", "Ideal"],[
      "nao_ideal_1", "Non-Ideal"],[
      "exemplo_2", "Examples Ponchon-Savarit"],[
      "ideal_2", "Ideal"],[
      "nao_ideal_2", "Non-Ideal"],[
      "nome_card_2", "Simulation Results"],[
      "escolha_razao", "Please define the Reflux Ratio value."],[
      "range_label", "Reflux Ratio:"],[
      "duvidas_1", "Do you want to know more?"],[
      "label_info_6", "Plates are listed top to bottom on the chart."],[
      "label_info_7", "It is considered that the mixtureenters the column as a saturated liquid."],[
      "label_info_1", "When the reflux ratio tends to its minimum value, the number of stages tends to infinity."],[
      "label_info_2", "When the reflux ratio tends to a high value, the minimum number of plates is obtained."],[
      "label_info_3", "A very high minimum reflux ratio or minimum number of plates may mean that the mixture is difficult to distillate."],[
      "resposta_1", "Number of ideal stages: <span id='num_estagios'></span>"],[
      "resposta_2", "Feed plate: <span id='prato_alimentacao'></span>"],[
      "resposta_3", "Minimum reflux ratio: <span id='Rd_min'></span>"],[
      "resposta_4", "Minimum number of plates: <span id='Num_min'></span>"],[
      "informativo_2", "Want to know the composition of each stage? They are on a table just below."],[
      "nome_card_3", "Stages Composition"],[
      "duvidas_2", "Doubts?"],[
      "label_info_4", "The compositions of the outflows of the stages are given in relation to the more volatile component."],[
      "label_info_5", "For the McCabe-Thiele's method, the compositions of the stages correspond to the points where the steps touch the equilibrium curve. As for the Ponchon-Savarit method, such compositions can be obtained by the coordinates of the ends of the tie lines of each stage. "],[
      "coluna_1", "Stage"],[
      "coluna_2", "x (molar fraction)"],[
      "coluna_3", "y (molar fraction)"],[
      "coluna_4", "Stages"],[
      "coluna_5", "x (molar fraction)"],[
      "coluna_6", "y (molar fraction)"],[
      "bd_componentes", ["Acetonitrile", "Methyl Acetate", "Acetic Acid", "Water", "Benzene", "Chloroform", "Cyclopentane", "Cyclohexane", "Dichloromethane", "Ethanol", "Ethylene Glycol", "Methanol", "n-Hexane", "Nitromethane", "n-Pentane", "o-Xylene", "2-Propanol", "Propanone", "Carbon tetrachloride", "Toluene", "n-Octane"]],[
      "bd_misturas_vl", ["Acetonitrile and Water", "Methanol and Acetonitrile", "Ethanol and Acetonitrile", "Acetonitrile and Toluene", "Water and Acetic Acid", "Methanol and Acetic Acid", "Ethanol and Acetic Acid", "Ethanol and Water", "Methanol and Water", "2-Propanol and Water", "Propanone and Benzene", "Carbon Tetrachloride and Benzene", "Methanol and Benzene", "Chloroform and Benzene", "Ethanol and Benzene", "Benzene and Toluene", "Chloroform and Methanol", "Chloroform and Ethanol", "Chloroform and Toluene", "Methanol and Cyclohexane", "Ethanol and Cyclohexane", "Propanone and Ethanol", "Methanol and Ethanol", "Ethanol and Water", " Dichloromethane and Ethanol ", "Propanone and Ethanol", "Ethanol and 2-Propanol ", "n-Pentane and Ethanol", "n-Hexane and Ethanol", "Ethanol and Toluene", "Propanone and Methanol", "Dichloromethane and Methanol", "Methanol and Toluene", "Methanol and n-Hexane", "Propanone and Carbon Tetrachloride", "Methyl Acetate and Methanol", "Methyl Acetate and Ethanol"]],
      ["bd_misturas_NRTL", ["Methanol and Acetonitrile", "Ethanol and Acetonitrile", "Acetonitrile and Toluene", "Methyl Acetate and Methanol", "Methyl Acetate and Ethanol", "Methanol and Acetic Acid", "Ethanol and Acetic Acid", "Methanol and Water", "Propanone and Water", "Ethanol and Water", "Methanol and Benzene", "Ethanol and Benzene", "Propanone and Benzene", "Chloroform and Benzene", "Benzene and Toluene", "Chloroform and Methanol", "Chloroform and Ethanol", "Propanone and Chloroform", "Chloroform and Toluene", "Methanol and Cyclohexane", "Ethanol and Cyclohexane", "Propanone and Cyclohexane", "Propanone and Ethanol", , "Ethanol and 2-Propanol", "n-Pentane and Ethanol", "n-Hexane and Ethanol", "Ethanol and Toluene", "Methanol and Ethanol", "Dichloromethane and Methanol", " Methanol and n-Hexane ", " Methanol and Toluene ", " Propanone and Toluene "]],
      ["bd_misturas_Wilson", ["Acetonitrile and Water", "Methanol and Acetonitrile", "Ethanol and Acetonitrile", "Acetonitrile and Toluene", "Methyl Acetate and Water", "Methyl Acetate and Methanol", "Methyl Acetate and Ethanol", "Methyl Acetate and Chloroform", "Water and Acetic Acid", "Ethanol and Acetic Acid", "Methanol and Acetic Acid", "Propanone and Water", "Ethanol and Water", "Methanol and Water", " -Propanol and Water", "Carbon Tetrachloride and Benzene", "Ethanol and Benzene", "Propanone and Benzene", "Chloroform and Benzene", "Methanol and Benzene", "Benzene and Nitromethane", "Benzene and Toluene", "Chloroform and Methanol", "Chloroform and Ethanol", "Chloroform and Toluene", "Methanol and Cyclohexane", "Propanone and Cyclohexane", "Ethanol and Cyclohexane", "Methanol and Ethanol", "Propanone and Ethanol", "Ethanol and 2-Propanol", "Pentane and Ethanol", "Hexane and Ethanol", "Ethanol and Toluene", "Propanone and Methanol", "Methanol and Hexane", "Methanol and Toluene", "Dichloromethane and Methanol", "Propanone and Carbon Tetrachloride"]],
      ["grafico_legenda_1", "Equilibrium Curve"],[
      "grafico_legenda_2", "Rectification Line"],[
      "grafico_legenda_3", "Stripping Line"],[
      "grafico_legenda_4", "Feed Line"],[
      "grafico_legenda_5", "Stages"],[
      "grafico_eixo_1", "y (molar fraction)"],[
      "grafico_eixo_2", "x (molar fraction)"],[
      "grafico_legenda_6", "Vapor Enthalpy"],[
      "grafico_legenda_7", "Liquid Entalphy"],[
      "grafico_legenda_8", "Rectification Line"],[
      "grafico_legenda_9", "Stripping Line"],[
      "grafico_legenda_10", "Feed Line"],[
      "grafico_legenda_11", "Stages"],[
      "grafico_legenda_12", "Tie Lines"],[
      "grafico_eixo_1", "Enthalpy (kJ/mol)"],[
      "grafico_eixo_2", "x e y (molar fraction)"],[
      "linguagem_1", "Language:"],[
      "linguagem_2", "Language:"],[
      "linguagem_3", "Language:"],[
      "linguagem_4", "Language:"],[
      "linguagem_5", "Language:"
    ]];
    var ptBR = [
      ["aba_1", "Início"],
      ["aba_2", "Simulação"],[
        "aba_3", "Manual"],[
        "aba_4", "Sobre os Métodos"],[
        "inicio_titulo", "DestSim - Software para Modelagem da Separação de Misturas Binárias em Colunas de Destilação"],[
        "inicio_1", "Olá! Seja bem vindo ao DestSim!"],[
        "inicio_2", "Este software foi desenvolvido com o intuito de facilitar a vizualização dos dois principais métodos gráficos ensinados nos cursos de Engenharia Química para modelagem de operações em colunas de destilação, McCabe-Thiele e Ponchon-Savarit. Nele, considera-se um sistema de destilação contínua com refluxo, no qual são separados os componentes de uma mistura binária alimentada na coluna como líquido saturado.No topo da coluna é conectado um condensador total, enquanto na base da coluna há um refervedor parcial."],[
        "inicio_3", "Ao utilizar o software, o usuário pode simular a aplicação destes dois métodos em exemplos pré-definidos aplicados a misturas ideais e não ideais ou especificar os componentes da mistura, suas composições e como ela deve ser tratada."],[
        "inicio_4", "O programa gera o gráfico de aplicação do método escolhido, retornando o número de pratos necessários para obter a separação especificada e o prato de alimentação da mistura na coluna. Fornece também ao usuário as composições das fases líquida e vapor em cada estágio da destilação. É possível alterar a taxa de refluxo e observar em tempo real a influência da mesma nos resultados."],[
        "inicio_5", "Espera-se que a ferramenta sirva de apoio aos professores e alunos no estudo de operações de destilação."],[
        "inicio_6", "Obrigada pelo apoio e tenha uma ótima experiência!"],[
        "inicio_comecar", "Começar"],[
        "manual_titulo", "Manual"],[
        "manual_1", "Olá! Siga os seguintes passos para utilizar o DestSim:"],[
        "manual_2", "<strong>1º</strong> Caso não tenha dados suficientes para realizar uma simulação específica, clique nos botões <em>Exemplo Ideal</em> ou <em>Exemplo Não Ideal</em>, situados na parte inferior do card <em>Entrada de Dados</em>, que possibilitam observar algumas simulações pré-definidas, e pule para a 9ª etapa. Caso contrário, continue com as etapas abaixo."],[
        "manual_3", "<strong>2º</strong> Escolha duas substâncias para serem os componentes da mistura nas seções <em>Componente 1</em> e <em>Componente 2</em>. Após esta etapa, os campos de composição serão liberados."],[
        "manual_4", "<strong>3º</strong> Selecione, na seção <em>Composição</em>, a base (mássica ou molar) na qual estão os dados que você irá preencher nos campos de composição."],[
        "manual_5", "<strong>4º</strong> Preencha, ainda na seção <em>Composição</em>, os dados referentes à composição da mistura nas correntes de alimentação, topo e fundo. Caso você queira converter os dados preenchidos da base molar para mássica e vice-versa, basta alterar a base selecionada."],[
        "manual_6", "<strong>Importante:</strong> Os dados de composição devem se referir ao componente mais volátil da mistura, indicado na seção <em>Composição</em> após a escolha dos componentes da mesma."],[
        "manual_7", "<strong>5º</strong> Selecione o método gráfico (McCabe-Thiele ou Ponchon-Savarit) que você deseja aplicar na seção <em>Método Gráfico</em>."],[
        "manual_8", "<strong>6º</strong> Selecione como a mistura deve ser tratada (Ideal ou Não Ideal) na seção <em>Tipo de Mistura</em>. De acordo com as suas escolhas neste campo e no anterior, os campos de seleção de métodos de cálculo de atividade e/ou de entalpia residual podem ser liberados ou não, da seguinte forma:"],[
        "manual_9", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMétodos de McCabe-Thiele e Ponchon-Savarit para Misturas Ideais --> Não utilizam coeficientes de atividade e propriedades residuais;"],[
        "manual_10", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMétodo de McCabe-Thiele para Misturas Não Ideais --> Requer cálculo dos coeficientes de atividade, mas não de propriedades residuais;"],[
        "manual_11", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMétodo de Ponchon-Savarit para Misturas Não Ideais --> Requer cálculo dos coeficientes de atividade e de propriedades residuais."],[
        "manual_12", "De acordo com suas escolhas nos últimos dois itens, selecione o método que deverá ser utilizado para cálculo dos coeficientes de atividade e entalpia residual nos campos <em>Método de cálculo de atividade</em> e <em>Método de cálculo de entalpia residual</em>."],[
        "manual_13", "Certifique-se de que todos os dados necessários foram inseridos e, então, clique no botão <em>Calcular</em>."],[
        "manual_14", "<strong>9º</strong> Na seção <em>Razão de Refluxo</em>, defina o valor da razão de refluxo que deseja utilizar. Agora, você pode ver o gráfico do método aplicado no card <em>Resultados da Simulação</em>, e logo abaixo o número de estágios requerido e o prato de alimentação. Pode também alterar a razão de refluxo, caso desejar observar a influência da mesma no método gráfico. No card <em>Composição dos Estágios</em>, uma tabela mostra a composição das correntes líquida e vapor de saída de cada estágio da destilação, em relação ao componente mais volátil."],[
        "manual_comecar", "Começar"],[
        "sobre_metodos_titulo_1", "Método de McCabe-Thiele"],[
        "sobre_metodos_titulo_2", "Método de Ponchon-Savarit"],[
        "sobre_metodos_titulo_3", "Coeficientes de Atividade/Propriedades em Excesso"],[
        "sobre_metodos_titulo_4", "Propriedades Residuais"],[
        "sobre_metodos_1", "O Método de McCabe-Thiele é uma forma de calcular o número de estágios ideais necessários em uma destilação por meio da Curva de Equilíbrio Termodinâmico da mistura a ser separada. Neste método, por meio de balanços de massa, são traçadas três retas: a Linha de Alimentação, a Linha de Esgotamento e a Linha de Retificação. Entre tais retas e a cruva de equilíbrio são traçados degraus. Ao final da aplicação do método, o número de estágios necessários é igual ao número de degraus e o prato de alimentação é o degrau que é cortado pela Reta de Alimentação. As composições das correntes líquida e vapor de saída de cada estágio podem ser obtida nos pontos em que os degraus tocam a curva de equilíbrio."],[
        "sobre_metodos_2", "Este método leva em consideração que o fluxo molar nas fases líquida e vapor é constante dentro de cada estágio, não havendo variação de entalpia de um estágio para outro. Portanto, é aplicável apenas para misturas cujas temperaturas de saturação dos componentes não são muito distantes entre si (a temperatura não varia muito com a composição da mistura)."],[
        "sobre_metodos_3", "Para mais detalhes, sugere-se a consulta do livro <em>Unit Operations of Chemical Engineering</em>, de W. L. McCabe, J. C. Smith e P. Harriott."],[
        "sobre_metodos_4", "O Método de Ponchon-Savarit objetiva calcular o número de estágios ideais necessários em uma destilação a partir do Diagrama de Entalpia-Composição da mistura a ser separada. Neste método, ao contrário do de McCabe-Thiele, não são feitas considerações em relação ao fluxo molar constante dentro da coluna, permitindo sua aplicação a uma gama maior de misturas e obtenção de um resultado mais preciso caso os dados termodinâmicos disponíveis estejam corretos. A aplicação deste método, porém, está restrita à destilação de misturas binárias e extração em sistemas ternários."],[
        "sobre_metodos_5", "Neste método também são traçadas retas de Esgotamento, Retificação e Alimentação, com base em balanços de massa e de energia. O método se baseia na chamada Regra do Braço de Alavanca, utilizada para simplificar balanços de massa e energia em linhas retas. Como auxílio, são utilizadas isotermas, que podem ser obtidas a partir da junção do Diagrama de Entalpia-Composição com a Cruva de Equilíbrio da mistura."],[
        "sobre_metodos_6", "Para mais detalhes, sugere-se a consulta dos livros, <em>Equilibrium-Stage Separation Operations in Chemical Engineering</em>, de E. J. Henley e J. D. Seader e <em>Design of Equilibrium Stage Procecess</em>, de B. D. Smith."],[
        "sobre_metodos_7", "As Propriedades em Excesso tem como finalidade medir a diferença entre propriedades termodinâmicas de uma mistura real e de uma solução ideal na mesma temperatura e pressão. Para se conhecer o comportamento da entalpia de uma mistura real líquida de acordo com sua composição é necessário calcular a Entalpia em Excesso. Este valor pode ser obtido a partir da Energia Livre de Gibbs em Excesso, que é correlacionada com o coeficiente de atividade de cada componente da mistura por meio de alguns métodos experimentais diferentes entre si, como o de Van Laar, NRTL, Wilson e UNIFAC."],[
        "sobre_metodos_8", "Os coeficientes de atividade são função da temperatura e da composição de uma mistura, e são obtidos de forma experimental."],[
        "sobre_metodos_9", "Para mais detalhes, sugere-se a consulta do livro <em>Introdução à Termodinâmica da Engenharia Química</em>, de J. M. Smith, H. C. Van Ness e M. M. Abbot."],[
        "sobre_metodos_10", "As Propriedades Residuais consistem na medição da diferença entre propriedades termodinâmicas de uma mistura de gases reais e de uma mistura de gases ideais na mesma temperatura e pressão. Para se conhecer o comportamento da entalpia de uma mistura real gasosa de acordo com sua composição é necessário calcular sua Entalpia Residual. Existem correlações para encontrar este valor a partir da manipulação de equações de estado cúbicas. Estas são equações polinomiais simples elaboradas com o intuito de descrever o comportamento PVT de líquidos e vapores em largas faixas de temperatura e pressão. Seus parâmetros variam de acordo com os modelos, como, por exemplo, van der Waals, Soave/Redlich/Kwong, Peng Robinson e Redlich/Kwong."],[
        "sobre_metodos_11", "Para mais detalhes, sugere-se a consulta do livro <em>Introdução à Termodinâmica da Engenharia Química</em>, de J. M. Smith, H. C. Van Ness e M. M. Abbot."],[
        "nome_card_1", "Entrada de Dados"],[
        "informativo_1", "Não sabe por onde começar? Escolha sua mistura ou utilize os botões de exemplo no final desta seção."],[
        "componente_1", "Componente 1"],[
        "componente_2", "Componente 2"],[
        "label_composicao", "Composição (fração do componente mais volátil):"],[
        "tipo_composicao_1", "Molar"],[
        "tipo_composicao_2", "Mássica"],[
        "campo_alimentacao", "Alimentação"],[
        "campo_topo", "Topo"],[
        "campo_fundo", "Fundo"],[
        "metodo", "Método gráfico:"],[
        "mistura", "Tipo de mistura:"],[
        "mistura_ideal", "Mistura Ideal"],[
        "mistura_nao_ideal", "Mistura Não Ideal"],[
        "metodo_atividade", "Método de cálculo da atividade:"],[
        "metodo_residual", "Método de cálculo da entalpia residual:"],[
        "simulacao_calcular", "Calcular"],[
        "ou", "ou"],[
        "exemplo_1", "Exemplos McCabe-Thiele"],[
        "ideal_1", "Ideal"],[
        "nao_ideal_1", "Não Ideal"],[
        "exemplo_2", "Exemplos Ponchon-Savarit"],[
        "ideal_2", "Ideal"],[
        "nao_ideal_2", "Não Ideal"],[
        "nome_card_2", "Resultados da Simulação"],[
        "escolha_razao", "Por favor, escolha uma razão de refluxo."],[
        "range_label", "Razão de Refluxo:"],[
        "duvidas_1", "Quer saber mais?"],[
        "label_info_6", "Os pratos são enumerados no gráfico de cima para baixo."],[
        "label_info_7", "Considera-se que a mistura entra na coluna como líquido saturado."],[
        "label_info_1", "Quando a razão de refluxo tende ao seu valor mínimo, o número de estágios tende ao infinito."],[
        "label_info_2", "Quando a razão de refluxo tende a um valor alto, obtém-se o número mínimo de pratos."],[
        "label_info_3", "Uma razão de refluxo mínima ou um número mínimo de pratos muito altos podem significar que a sua mistura é difícil de destilar."],[
          "resposta_1", "Número de estágios ideais: <span id='num_estagios'></span>"],[
          "resposta_2", "Prato de alimentação: <span id='prato_alimentacao'></span>"],[
          "resposta_3", "Taxa de refluxo mínima: <span id='Rd_min'></span>"],[
          "resposta_4", "Número mínimo de pratos: <span id='Num_min'></span>"],[
        "informativo_2", "Quer saber a composição de cada estágio? Estão em uma tabela logo abaixo."],[
        "nome_card_3", "Composição dos Estágios"],[
        "duvidas_2", "Dúvidas?"],[
        "label_info_4", "As composições das correntes de saída dos estágios são dadas em relação ao componente mais volátil."],[
        "label_info_5", "Para o método de McCabe-Thiele, as composições dos estágios correspondem aos pontos onde os degraus tocam a curva de equilíbrio. Já para o método de Ponchon-Savarit, tais composições podem ser obtidas pelas coordenadas das extremidades das retas de amarração de cada estágio."],[
        "coluna_1", "Estágio"],[
        "coluna_2", "x (fração molar)"],[
        "coluna_3", "y (fração molar)"],[
        "coluna_4", "Estágio"],[
        "coluna_5", "x (fração molar)"],[
        "coluna_6", "Estágio"],[
        "bd_componentes", ["Acetonitrila", "Acetato de Metila", "Ácido Acético", "Água", "Benzeno", "Clorofórmio", "Ciclopentano", "Ciclohexano", "Diclorometano", "Etanol", "Etilenoglicol", "Metanol", "n-Hexano", "Nitrometano", "n-Pentano", "o-Xileno", "2-Propanol", "Propanona", "Tetracloreto de Carbono", "Tolueno", "n-Octano"]],[
        "bd_misturas_vl", ["Acetonitrila e Água", "Metanol e Acetonitrila", "Etanol e Acetonitrila", "Acetonitrila e Tolueno", "Água e Ácido Acético", "Metanol e Ácido Acético", "Etanol e Ácido Acético", "Propanona e Água", "Etanol e Água", "Metanol e Água", "2-Propanol e Água", "Propanona e Benzeno", "Tetracloreto de Carbono e Benzeno", "Metanol e Benzeno", "Clorofórmio e Benzeno", "Etanol e Benzeno", "Benzeno e Tolueno", "Clorofórmio e Metanol", "Clorofórmio e Etanol", "Clorofórmio e Tolueno", "Metanol e Ciclohexano", "Etanol e Ciclohexano", "Propanona e Etanol", "Metanol e Etanol", "Etanol e Água", "Diclorometano e Etanol", "Propanona e Etanol", "Etanol e 2-Propanol", "n-Pentano e Etanol", "n-Hexano e Etanol", "Etanol e Tolueno", "Propanona e Metanol", "Diclorometano e Metanol", "Metanol e Tolueno", "Metanol e n-Hexano", "Propanona e Tetracloreto de Carbono", "Acetato de Metila e Metanol", "Acetato de Metila e Etanol"]],[
        "bd_misturas_NRTL", ["Metanol e Acetonitrila", "Etanol e Acetonitrila", "Acetonitrila e Tolueno", "Acetato de Metila e Metanol", "Acetato de Metila e Etanol", "Metanol e Ácido Acético", "Etanol e Ácido Acético", "Metanol e Água", "Propanona e Água", "Etanol e Água", "Metanol e Benzeno", "Etanol e Benzeno", "Propanona e Benzeno", "Clorofórmio e Benzeno", "Benzeno e Tolueno", "Benzeno e Nitrometano", "Clorofórmio e Metanol", "Clorofórmio e Etanol", "Propanona e Clorofórmio", "Clorofórmio e Tolueno", "Metanol e Ciclohexano", "Etanol e Ciclohexano", "Propanona e Ciclohexano", "Propanona e Etanol", "Etanol e 2-Propanol", "n-Pentano e Etanol", "n-Hexano e Etanol", "Etanol e Tolueno", "Metanol e Etanol", "Diclorometano e Metanol", "Propanona e Metanol", "Metanol e n-Hexano", "Metanol e Tolueno", "Propanona e Tolueno"]],[
        "bd_misturas_Wilson", ["Acetonitrila e Água", "Metanol e Acetonitrila", "Etanol e Acetonitrila", "Acetonitrila e Tolueno", "Acetato de Metila e Água", "Acetato de Metila e Metanol", "Acetato de Metila e Etanol", "Acetato de Metila e Clorofórmio", "Água e Ácido Acético", "Etanol e Ácido Acético", "Metanol e Ácido Acético", "Propanona e Água", "Etanol e Água", "Metanol e Água", "2-Propanol e Água", "Tetracloreto de Carbono e Benzeno", "Etanol e Benzeno", "Propanona e Benzeno", "Clorofórmio e Benzeno", "Metanol e Benzeno", "Benzeno e Nitrometano", "Benzeno e Tolueno", "Propanona e Clorofórmio", "Clorofórmio e Metanol", "Clorofórmio e Etanol", "Clorofórmio e Tolueno", "Metanol e Ciclohexano", "Propanona e Ciclohexano", "Etanol e Ciclohexano", "Metanol e Etanol", "Propanona e Etanol", "Diclorometano e Etanol", "Etanol e 2-Propanol", "Pentano e Etanol", "Hexano e Etanol", "Etanol e Tolueno", "Propanona e Metanol", "Metanol e Hexano", "Metanol e Tolueno", "Diclorometano e Metanol", "Propanona e Tetracloreto de Carbono"]],[
        "grafico_legenda_1", "Curva de Equilíbrio"],[
        "grafico_legenda_2", "Reta de Retificação"],[
        "grafico_legenda_3", "Reta de Esgotamento"],[
        "grafico_legenda_4", "Reta de Alimentação"],[
        "grafico_legenda_5", "Estágios"],[
        "grafico_eixo_1", "y (fração molar)"],[
        "grafico_eixo_2", "x (fração molar)"],[
        "grafico_legenda_6", "Entalpia Vapor"],[
        "grafico_legenda_7", "Entalpia Líquido"],[
        "grafico_legenda_8", "Reta de Retificação"],[
        "grafico_legenda_9", "Reta de Esgotamento"],[
        "grafico_legenda_10", "Reta de Alimentação"],[
        "grafico_legenda_11", "Estágios"],[
        "grafico_legenda_12", "Linhas de Amarração"],[
        "grafico_eixo_1", "Entalpia (kJ/mol)"],[
        "grafico_eixo_2", "x e y (fração molar)"],[
        "linguagem_1", "Idioma:"],[
        "linguagem_2", "Idioma:"],[
        "linguagem_3", "Idioma:"],[
        "linguagem_4", "Idioma:"],[
        "linguagem_5", "Idioma:"
      ]];
