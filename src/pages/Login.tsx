import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email === 'admin@clinica.com' && senha === '123456') {
      navigate('/home')
    } else {
      setErro('Email ou senha incorretos!')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e0f2f1',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Círculos decorativos de fundo */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 340, height: 340, top: -100, left: -80, borderRadius: '50%', border: '1.5px solid rgba(0,128,128,0.13)' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, top: -30, left: -30, borderRadius: '50%', border: '1.5px solid rgba(0,128,128,0.13)' }} />
        <div style={{ position: 'absolute', width: 260, height: 260, bottom: -80, right: -60, borderRadius: '50%', border: '1.5px solid rgba(0,128,128,0.13)' }} />
        <div style={{ position: 'absolute', width: 140, height: 140, bottom: -20, right: -10, borderRadius: '50%', border: '1.5px solid rgba(0,128,128,0.13)' }} />
        <div style={{ position: 'absolute', top: 60, right: 60, width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: '70px solid rgba(0,128,128,0.07)' }} />
        <div style={{ position: 'absolute', bottom: 80, left: 50, width: 0, height: 0, borderLeft: '25px solid transparent', borderRight: '25px solid transparent', borderBottom: '44px solid rgba(0,128,128,0.07)' }} />
      </div>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 28px',
        background: '#008080',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 17, fontWeight: 600 }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.18)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>✚</div>
          Clínica API
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {['Home', 'Médicos', 'Pacientes', 'Consultas'].map((item, i) => (
            <span key={item} style={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,0.75)', fontSize: 12, padding: '5px 11px', borderRadius: 6, background: i === 0 ? 'rgba(255,255,255,0.2)' : 'transparent', fontWeight: i === 0 ? 500 : 400 }}>
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Corpo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', position: 'relative', zIndex: 2 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '30px 28px 26px', width: '100%', maxWidth: 350, boxShadow: '0 6px 28px rgba(0,128,128,0.12)', border: '0.5px solid rgba(0,128,128,0.12)' }}>

          {/* Header do card */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 3 }}>
              <div style={{ width: 30, height: 30, background: '#e0f2f1', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#008080', fontSize: 16 }}>✚</div>
              <span style={{ fontSize: 19, fontWeight: 600, color: '#008080' }}>Clínica API</span>
            </div>
            <div style={{ fontSize: 11, color: '#999', letterSpacing: '0.04em' }}>Sistema de Gestão</div>
          </div>

          <div style={{ height: 1.5, background: '#e0f2f1', marginBottom: 16, borderRadius: 2 }} />

          {/* Campo Email */}
          <div style={{ marginBottom: 13 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#555', marginBottom: 5 }}>E-mail</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#b0c4c4', fontSize: 13 }}>@</span>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '9px 10px 9px 32px', border: '1px solid #cce8e8', borderRadius: 8, fontSize: 13, color: '#333', background: '#f7fdfd', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                onFocus={e => { e.target.style.borderColor = '#008080'; e.target.style.background = '#fff' }}
                onBlur={e => { e.target.style.borderColor = '#cce8e8'; e.target.style.background = '#f7fdfd' }}
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div style={{ marginBottom: 6 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#555', marginBottom: 5 }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#b0c4c4', fontSize: 13 }}>🔒</span>
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', padding: '9px 36px 9px 32px', border: '1px solid #cce8e8', borderRadius: 8, fontSize: 13, color: '#333', background: '#f7fdfd', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                onFocus={e => { e.target.style.borderColor = '#008080'; e.target.style.background = '#fff' }}
                onBlur={e => { e.target.style.borderColor = '#cce8e8'; e.target.style.background = '#f7fdfd' }}
              />
              <span onClick={() => setMostrarSenha(!mostrarSenha)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#b0c4c4', cursor: 'pointer', fontSize: 13 }}>
                {mostrarSenha ? '🙈' : '👁'}
              </span>
            </div>
          </div>

          {/* Erro */}
          {erro && <div style={{ fontSize: 11, color: '#c62828', marginBottom: 8, marginTop: 4 }}>⚠ {erro}</div>}

          {/* Esqueci senha */}
          <div style={{ textAlign: 'right', marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: '#008080', cursor: 'pointer' }}>Esqueci a Senha?</span>
          </div>

          {/* Botão */}
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: 11, background: '#008080', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#006666')}
            onMouseLeave={e => (e.currentTarget.style.background = '#008080')}
          >
            ENTRAR →
          </button>

          <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: 10 }}>
            Sistema de Gestão Clínica · v1.0
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: 12, fontSize: 11, color: '#008080', fontWeight: 600, position: 'relative', zIndex: 2 }}>
        Seguimos evoluindo 🚀
      </div>
    </div>
  )
}