import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPacientes, createPaciente, deletePaciente } from '../services/api'
import { Paciente } from '../types'

export default function Pacientes() {
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  useEffect(() => { carregarPacientes() }, [])

  const carregarPacientes = async () => {
    const data = await getPacientes()
    setPacientes(data)
  }

  const handleCriar = async () => {
    await createPaciente({ nome, cpf, email, telefone })
    setOpen(false)
    setNome(''); setCpf(''); setEmail(''); setTelefone('')
    carregarPacientes()
  }

  const handleDeletar = async (id: number) => {
    if (confirm('Deseja deletar este paciente?')) {
      await deletePaciente(id)
      carregarPacientes()
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
            <span key={item.label} onClick={() => navigate(item.path)} style={{ color: item.path === '/pacientes' ? '#fff' : 'rgba(255,255,255,0.75)', fontSize: 12, padding: '5px 11px', borderRadius: 6, background: item.path === '/pacientes' ? 'rgba(255,255,255,0.2)' : 'transparent', fontWeight: item.path === '/pacientes' ? 500 : 400, cursor: 'pointer' }}>
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
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#008080', margin: 0 }}>👥 Pacientes</h1>
            <p style={{ fontSize: 12, color: '#666', margin: '4px 0 0' }}>Gerenciar pacientes da clínica</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            style={{ background: '#008080', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em' }}
            onMouseEnter={e => e.currentTarget.style.background = '#006666'}
            onMouseLeave={e => e.currentTarget.style.background = '#008080'}
          >
            + Novo Paciente
          </button>
        </div>

        {/* Cards dos pacientes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {pacientes.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: '#999', fontSize: 13 }}>
              Nenhum paciente cadastrado ainda.
            </div>
          ) : (
            pacientes.map((p) => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 14, padding: '20px', border: '0.5px solid rgba(0,128,128,0.15)', boxShadow: '0 4px 16px rgba(0,128,128,0.08)' }}>
                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e0f2f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🧑‍💼</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{p.nome}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>CPF: {p.cpf}</div>
                  </div>
                </div>
                {/* Info */}
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>📧 {p.email}</div>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 14 }}>📞 {p.telefone}</div>
                {/* Botão deletar */}
                <button
                  onClick={() => handleDeletar(p.id)}
                  style={{ width: '100%', padding: '8px 0', background: 'transparent', color: '#c62828', border: '1px solid #c62828', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#c62828'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c62828' }}
                >
                  DELETAR
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Novo Paciente */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px', width: '100%', maxWidth: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#008080', margin: '0 0 20px' }}>+ Novo Paciente</h2>

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>Nome</label>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#008080'} onBlur={e => e.target.style.borderColor = '#cce8e8'} />

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>CPF</label>
            <input value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#008080'} onBlur={e => e.target.style.borderColor = '#cce8e8'} />

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@exemplo.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#008080'} onBlur={e => e.target.style.borderColor = '#cce8e8'} />

            <label style={{ fontSize: 11, fontWeight: 500, color: '#555' }}>Telefone</label>
            <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(83) 99999-9999" style={inputStyle}
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