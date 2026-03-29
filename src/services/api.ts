const API_URL = 'http://127.0.0.1:3000';

// ========== MÉDICOS ==========
export const getMedicos = async () => {
  const res = await fetch(`${API_URL}/medicos`);
  return res.json();
};

export const getMedico = async (id: number) => {
  const res = await fetch(`${API_URL}/medicos/${id}`);
  return res.json();
};

export const createMedico = async (data: object) => {
  const res = await fetch(`${API_URL}/medicos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateMedico = async (id: number, data: object) => {
  const res = await fetch(`${API_URL}/medicos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteMedico = async (id: number) => {
  await fetch(`${API_URL}/medicos/${id}`, { method: 'DELETE' });
};

// ========== PACIENTES ==========
export const getPacientes = async () => {
  const res = await fetch(`${API_URL}/pacientes`);
  return res.json();
};

export const getPaciente = async (id: number) => {
  const res = await fetch(`${API_URL}/pacientes/${id}`);
  return res.json();
};

export const createPaciente = async (data: object) => {
  const res = await fetch(`${API_URL}/pacientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePaciente = async (id: number, data: object) => {
  const res = await fetch(`${API_URL}/pacientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deletePaciente = async (id: number) => {
  await fetch(`${API_URL}/pacientes/${id}`, { method: 'DELETE' });
};

// ========== CONSULTAS ==========
export const getConsultas = async () => {
  const res = await fetch(`${API_URL}/consultas`);
  return res.json();
};

export const createConsulta = async (data: object) => {
  const res = await fetch(`${API_URL}/consultas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteConsulta = async (id: number) => {
  await fetch(`${API_URL}/consultas/${id}`, { method: 'DELETE' });
}; 
