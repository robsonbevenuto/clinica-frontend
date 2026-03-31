import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getConsultas, createConsulta, deleteConsulta, getMedicos, getPacientes } from '../services/api'
import type { Consulta, Medico, Paciente } from '../types/index'

export default function Consultas() {
  const navigate = useNavigate()
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [open, setOpen] = useState(false)
  const [medicoId, setMedicoId] = useState('')
  const [pacienteId, setPacienteId] = useState('')
  const [data, setData] = useState('')
  const [observacoes, setObservacoes] = useState('')

  useEffect(() => { carregarDados() }, [])

  const carregarDados = async () => {
    const [c, m, p] = await Promise.all([getConsultas(), getMedicos(), getPacientes()])
    setConsultas(c); setMedicos(m); setPacientes(p)
  }

  const handleCriar = async () => {
    await createConsulta({ medicoId: Number(medicoId), pacienteId: Number(pacienteId), data: new Date(data).toISOString(), observacoes })
    setOpen(false)
    setMedicoId(''); setPacienteId(''); setData(''); setObservacoes('')
    carregarDados()
  }

  const handleDeletar = async (id: number) => {
    if (confirm('Deseja deletar esta consulta?')) {
      await deleteConsulta(id)
      carregarDados()
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #cce8e8',
    borderRadius: 8,
    fontSize: 13,
    color: '#333',
    background: '#f7fdfd',
    boxSizing: 'border-box' as const,
    outline: 'none',
    fontFamily: 'inherit',
    marginBottom: 12,
  }

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
  }

  const statusColor = (status: string) => {
    if (status === 'CONCLUIDA') return { bg: '#e8f5e9', color: '#2e7d32' }
    if (status === 'CANCELADA') return { bg: '#ffebee', color: '#c62828' }
    return { bg: '#e0f2f1', color: '#008080' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#e0f2f1', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: '#008080' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 17, fontWeight: 600 }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.18)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>✚</div>
          Clínica API
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {[{ label: 'Home', path: '/home' }, { label: 'Médicos', path: '/medicos' }, { label: 'Pacientes', path: '/pacientes' }, { label: 'Consultas', path: '/consultas' }].map((item) => (
            <span key={item.label} onClick={() => navigate(item.path)} style={{ color: item.path === '/consultas' ? '#fff' : 'rgba(255,255,255,0.75)', fontSize: 12, padding: '5px 11px', borderRadius: 6, background: item.path === '/consultas' ? 'rgba(255,255,255,0.2)' : 'transparent', fontWeight: item.path === '/consultas' ? 500 : 400, cursor: 'pointer' }}>
              {item.label}
            </span>
          ))}
        </div>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: '#008080', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          ↩ Sair
        </button>
      </nav>

      {/* Corpo */}
      <div style={{ padding: '28px' }}>

        {/* Cabeçalho */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#008080', margin: 0 }}>📅 Consultas</h1>
            <p style={{ fontSize: 12, color: '#666', margin: '4px 0 0' }}>Gerenciar consultas da clínica</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            style={{ background: '#008080', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em' }}
            onMouseEnter={e => e.currentTarget.style.background = '#006666'}
            onMouseLeave={e => e.currentTarget.style.background = '#008080'}
          >
            + Nova Consulta
          </button>
        </div>

        {/* Cards das consultas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {consultas.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: '#999', fontSize: 13 }}>
              Nenhuma consulta cadastrada ainda.
            </div>
          ) : (
            consultas.map((c) => {
              const s = statusColor(c.status)
              return (
                <div key={c.id} style={{ background: '#fff', borderRadius: 14, padding: '20px', border: '0.5px solid rgba(0,128,128,0.15)', boxShadow: '0 4px 16px rgba(0,128,128,0.08)' }}>

                  {/* Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                      📅 {new Date(c.data).toLocaleDateString('pt-BR')}
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: s.bg, color: s.color }}>
                      {c.status}
                    </span>
                  </div>

                  {/* Médico */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🩺</div>
                    <div>
                      <div style={{ fontSize: 11, color: '#888' }}>Médico</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{c.medico?.nome}</div>
                    </div>
                  </div>

                  {/* Paciente */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🧑‍💼</div>
                    <div>
                      <div style={{ fontSize: 11, color: '#888' }}>Paciente</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{c.paciente?.nome}</div>
                    </div>
                  </div>

                  {/* Observações */}
                  {c.observacoes && (
                    <div style={{ fontSize: 11, color: '#666', background: '#f7fdfd', borderRadius: 6, padding: '6px 10px', marginBottom: 14 }}>
                      💬 {c.observacoes}
                    </div>
                  )}

                  {/* Botão deletar */}
                  <button
                    onClick={() => handleDeletar(c.id)}
                    style={{ width: '100%', padding: '8px 0', background: 'transparent', color: '#c62828', border: '1px solid #c62828', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#c62828'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c62828' }}
                  >
                    DELETAR
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Modal Nova Consulta */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px', width: '100%', maxWidth: 420, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#008080', margin: '0 0 20px' }}>+ Nova Consulta</h2>

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>Médico</label>
            <select value={medicoId} onChange={e => setMedicoId(e.target.value)} style={selectStyle}
              onFocus={e => e.target.style.borderColor = '#008080'} onBlur={e => e.target.style.borderColor = '#cce8e8'}>
              <option value="">Selecione um médico</option>
              {medicos.map(m => <option key={m.id} value={m.id}>Dr. {m.nome} - {m.especialidade}</option>)}
            </select>

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>Paciente</label>
            <select value={pacienteId} onChange={e => setPacienteId(e.target.value)} style={selectStyle}
              onFocus={e => e.target.style.borderColor = '#008080'} onBlur={e => e.target.style.borderColor = '#cce8e8'}>
              <option value="">Selecione um paciente</option>
              {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>Data e Hora</label>
            <input type="datetime-local" value={data} onChange={e => setData(e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#008080'} onBlur={e => e.target.style.borderColor = '#cce8e8'} />

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>Observações</label>
            <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Observações da consulta..." rows={3}
              style={{ ...inputStyle, resize: 'vertical' as const }}
              onFocus={e => e.target.style.borderColor = '#008080'} onBlur={e => e.target.style.borderColor = '#cce8e8'} />

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button onClick={() => setOpen(false)} style={{ flex: 1, padding: '10px', background: 'transparent', color: '#666', border: '1px solid #ddd', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={handleCriar} style={{ flex: 1, padding: '10px', background: '#008080', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#006666'}
                onMouseLeave={e => e.currentTarget.style.background = '#008080'}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
