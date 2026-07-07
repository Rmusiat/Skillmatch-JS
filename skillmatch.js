/* SkillMtach JS - SISTEMA DE COMPATIBILIDADE DE VAGAS

Sistema para analisar aderência de um candidato, para vaga de Front-End Júnior. No qual o sistema faz um calculo de compatibilidade do
candidato em relaçao a vaga, comparando as habilidades do candidato com os requisitos da vaga. O sistema irá verificar as seguintes informações:
 
 - Habiliddes do Candidato
 - Requisitos da Vaga
 - Lista de habilidades faltantes. 
 - Percentual de classificação da compatibilidade do candidato com a vaga
  - Indicar a vaga que tem maior compatibilidadec com o candidato.
 - Sugestão de estudos com base nas habilidades faltantes, para ser adotada pelo candidato.
 */

//CRIANDO CLASSE VAGA
class Vaga {
  constructor(empresa, cargo, requisitos, salario, modalidade) {
    this.empresa    = empresa;
    this.cargo      = cargo;
    this.requisitos = requisitos;
    this.salario    = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

//CRIANDO CLASSE VAGA FRONT-END HERDANDO CLASSE
class VagaFrontEnd extends Vaga {
  constructor(empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}

//CRIANDO PERFIL DO CANDIDATO
const candidato = {
  nome: "Ricardo",
  area: "Front-End",
  habilidades: ["HTML", "CSS", "JavaScript"],
  experiencia: 8
};

//CRIANDO ARRAY DAS VAGAS
const vagas = [
  new Vaga("ProSolutions", "Front-End Developer", ["HTML", "CSS", "JavaScript", "React"], 3500, "Remoto"),
  new Vaga("DataTech", "Desenvolvedor Front-End Jr", ["HTML", "CSS", "JavaScript"], 3000, "Híbrido"),
  new Vaga("Digital Systems", "Front-End React", ["HTML", "CSS", "JavaScript", "React", "Git"], 4200, "Híbrido")
];

//FUNÇÃO PARA CALCULAR PERCENTUAL DE COMPATIBILIDADE DAS HABILIDADES DO CANDIDATO COM REQUISITOS DA VAGA
function calcularCompatibilidade(candidato, vaga) {
  let match = 0;
  
  candidato.habilidades.forEach((habilidade) => {
    if (vaga.requisitos.includes(habilidade)) {
        match++;
    }
  });

  let percentual = ((match / vaga.requisitos.length) * 100).toFixed(0);
  
  return percentual;
         
}

//FUNÇÃO PARA LISTAR AS HABILIDADE COMPATIVEIS DO CANDIDATO
function habilidadesEncontradas(candidato, vaga) {
  return vaga.requisitos.filter((requisito) => {
    return candidato.habilidades.includes(requisito);
  });
}

//FUNÇÃO PARA CLASSIFICAR COMPATIBILIDADE DA VAGA
function classificaCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta Compatibilidade";
  } else if (percentual >= 50 & percentual <= 79) {
    return "Média Compatibilidade";
  } else {
    return "Baixa Compatibilidade";
  }
}

//FUNÇÃO PARA LISTAR AS HABILIDADES FALTANTES DO CANDIDATO
function listaHabilidadesFaltantes(candidato, vaga) {
  return vaga.requisitos.filter((requisito) => {
    return !candidato.habilidades.includes(requisito);
  });
}

//FUNÇÃO PARA ENCONTRAR A VAGA COM MAIOR COMPATIBILIDADE
function melhorVaga(candidato, vagas) {
 return vagas.reduce((melhor, vagaAtual) => {
    let pMelhor = calcularCompatibilidade(candidato, melhor);
    let pAtual  = calcularCompatibilidade(candidato, vagaAtual);

    if (pMelhor > pAtual) {
      return vagaAtual;
    } else {
      return melhor;
    }
  });
}

//FUNÇÃO PARA GERAR RECOMENDAÇÃO DE ESTUDO
function recomendarEstudos(candidato, vagas) {
  let todasFaltantes = vagas.map((vaga) => {
    return listaHabilidadesFaltantes(candidato, vaga);
  });
   
   // TRANSFORMA O ARRAY DE ARRAYS EM UM ARRAY SIMPLES
  let listaUnificada = [].concat(...todasFaltantes);

  // REMOVE AS HABILIDADES DUPLICADAS
  let semDuplicadas = listaUnificada.filter((habilidade, indice) => {
    return listaUnificada.indexOf(habilidade) === indice;
  });

  // MONTA A MENSAGEM FINAL
  let lista = semDuplicadas;
    
  if (todasFaltantes.length === 0) {
    console.log("Você já tem todas as habilidades necessárias!");
  } else {
    console.log(`Priorize estudar ${lista}, pois esses conteúdos aparecem nas vagas analisadas.`);
  }
}

