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