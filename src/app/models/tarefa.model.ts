export interface Tarefa {
  id: number;
  descricao: string;
  prioridade: number;
  materia_nome: string;
  data_criacao?: Date;
  data_limite?: Date;
  status?: string;
}
