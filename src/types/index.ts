export interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  email?: string;
  telefone?: string;
  createdAt?: string;
}

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
  dataNascimento?: string;
  createdAt?: string;
}

export interface Consulta {
  id: number;
  data: string;
  medicoId: number;
  pacienteId: number;
  status: string;
  observacoes?: string;
  medico?: Medico;
  paciente?: Paciente;
  createdAt?: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
}