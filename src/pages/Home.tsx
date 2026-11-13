/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react' // <-- Adicionado useCallback
import { useNavigate } from 'react-router-dom'
import { Modal, NativeSelect, TextInput, Button, Table, Title } from '@mantine/core'
import { getConsultas, getPacientes, getMedicos, createConsulta } from '../services/api'

interface Paciente { id: number; nome: string }
interface Medico { id: number; nome: string }
interface Consulta { 
  id: number; 
  data: string; 
  turno: string; 
  paciente: Paciente; 
  medico: Medico; 
}

export default function Home() {
  const navigate = useNavigate()

  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [medicos, setMedicos] = useState<Medico[]>([])
  
  const [modalAberto, setModalAberto] = useState(false)
  const [form, setForm] = useState({ pacienteId: '', medicoId: '', data: '', turno: 'M' })

  // CORREÇÃO: Envolvemos a função em useCallback
  const carregarDados = useCallback(async () => {
    try {
      const [dadosConsultas, dadosPacientes, dadosMedicos] = await Promise.all([
        getConsultas(),
        getPacientes(),
        getMedicos()
      ])
      setConsultas(dadosConsultas)
      setPacientes(dadosPacientes)
      setMedicos(dadosMedicos)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }, []) // O array vazio significa que a função é criada apenas uma vez

  // Carregar dados ao abrir a tela
  useEffect(() => {
    carregarDados()
  }, [carregarDados]) // Agora o ESLint entende perfeitamente

  const salvarConsulta = async () => {
    try {
      const payload = {
        pacienteId: Number(form.pacienteId),
        medicoId: Number(form.medicoId),
        data: form.data,
        turno: form.turno
      }
      
      await createConsulta(payload)
      setModalAberto(false)
      setForm({ pacienteId: '', medicoId: '', data: '', turno: 'M' })
      carregarDados()
    } catch (error) {
      console.error("Erro ao salvar consulta:", error)
      alert("Erro ao salvar consulta. Verifique os dados e tente novamente.")
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#e0f2f1', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: '#008080' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 17, fontWeight: 600 }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.18)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>✚</div>
          Clínica API
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {[{ label: 'Home', path: '/home' }, { label: 'Médicos', path: '/medicos' }, { label: 'Pacientes', path: '/pacientes' }, { label: 'Consultas', path: '/consultas' }].map((item) => (
            <span key={item.label} onClick={() => navigate(item.path)} style={{ color: item.path === '/home' ? '#fff' : 'rgba(255,255,255,0.75)', fontSize: 12, padding: '5px 11px', borderRadius: 6, background: item.path === '/home' ? 'rgba(255,255,255,0.2)' : 'transparent', fontWeight: item.path === '/home' ? 500 : 400, cursor: 'pointer' }}>
              {item.label}
            </span>
          ))}
        </div>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: '#008080', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          ↩ Sair
        </button>
      </nav>

      <div style={{ padding: '32px 28px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: '#008080', margin: 0 }}>Sistema de Gestão Médica</h1>
            <p style={{ fontSize: 13, color: '#666', margin: '4px 0 0' }}>Selecione uma área ou agende uma nova consulta</p>
          </div>
          <Button color="teal" onClick={() => setModalAberto(true)}>+ Nova Consulta</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
          <div onClick={() => navigate('/medicos')} style={{ background: '#fff', borderRadius: 14, padding: '28px 24px', cursor: 'pointer', border: '0.5px solid rgba(0,128,128,0.15)', boxShadow: '0 4px 16px rgba(0,128,128,0.08)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🩺</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 4 }}>Médicos</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Gerenciar médicos da clínica</div>
            <div style={{ background: '#008080', color: '#fff', borderRadius: 8, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 600 }}>ACESSAR →</div>
          </div>
          
          <div onClick={() => navigate('/pacientes')} style={{ background: '#fff', borderRadius: 14, padding: '28px 24px', cursor: 'pointer', border: '0.5px solid rgba(0,128,128,0.15)', boxShadow: '0 4px 16px rgba(0,128,128,0.08)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 4 }}>Pacientes</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Gerenciar pacientes da clínica</div>
            <div style={{ background: '#008080', color: '#fff', borderRadius: 8, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 600 }}>ACESSAR →</div>
          </div>

          <div onClick={() => navigate('/consultas')} style={{ background: '#fff', borderRadius: 14, padding: '28px 24px', cursor: 'pointer', border: '0.5px solid rgba(0,128,128,0.15)', boxShadow: '0 4px 16px rgba(0,128,128,0.08)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 4 }}>Consultas</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Ver todas as consultas</div>
            <div style={{ background: '#008080', color: '#fff', borderRadius: 8, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 600 }}>ACESSAR →</div>
          </div>
        </div>

        <div style={{ background: '#fff', padding: 20, borderRadius: 14, boxShadow: '0 4px 16px rgba(0,128,128,0.08)' }}>
          <Title order={3} style={{ color: '#008080', marginBottom: 16 }}>Consultas Recentes</Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Paciente</Table.Th>
                <Table.Th>Médico</Table.Th>
                <Table.Th>Data</Table.Th>
                <Table.Th>Turno</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {consultas.map((c: Consulta) => (
                <Table.Tr key={c.id}>
                  <Table.Td>{c.paciente?.nome || 'N/A'}</Table.Td>
                  <Table.Td>{c.medico?.nome || 'N/A'}</Table.Td>
                  <Table.Td>{new Date(c.data).toLocaleDateString('pt-BR')}</Table.Td>
                  <Table.Td>{c.turno === 'M' ? 'Manhã' : c.turno === 'T' ? 'Tarde' : 'Não definido'}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>

      <Modal opened={modalAberto} onClose={() => setModalAberto(false)} title="Nova Consulta">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <NativeSelect
            label="Paciente"
            data={[{ value: '', label: 'Selecione um paciente' }, ...pacientes.map((p: Paciente) => ({ value: String(p.id), label: p.nome }))]}
            value={form.pacienteId}
            onChange={(e) => setForm({ ...form, pacienteId: e.currentTarget.value })}
          />

          <NativeSelect
            label="Médico"
            data={[{ value: '', label: 'Selecione um médico' }, ...medicos.map((m: Medico) => ({ value: String(m.id), label: m.nome }))]}
            value={form.medicoId}
            onChange={(e) => setForm({ ...form, medicoId: e.currentTarget.value })}
          />

          <TextInput
            label="Data e Hora"
            placeholder="Ex: 2026-12-30T15:00:00Z"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.currentTarget.value })}
          />

          <NativeSelect
            label="Turno"
            data={[{ value: 'M', label: 'Manhã' }, { value: 'T', label: 'Tarde' }]}
            value={form.turno}
            onChange={(e) => setForm({ ...form, turno: e.currentTarget.value })}
          />

          <Button color="teal" fullWidth onClick={salvarConsulta}>
            Salvar Consulta
          </Button>
        </div>
      </Modal>
    </div>
  )
}