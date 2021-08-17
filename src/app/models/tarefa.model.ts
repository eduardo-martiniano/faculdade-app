export interface Tarefa {
  id: number;
  descricao: string;
  materia_nome: string;
  data_criacao?: Date;
  prazo?: Date;
  status?: string;
  concluido?: boolean;
}
