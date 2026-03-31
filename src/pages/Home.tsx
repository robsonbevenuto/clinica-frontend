import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e0f2f1',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 28px',
        background: '#008080',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 17, fontWeight: 600 }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.18)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>✚</div>
          Clínica API
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {[
            { label: 'Home', path: '/home' },
            { label: 'Médicos', path: '/medicos' },
            { label: 'Pacientes', path: '/pacientes' },
            { label: 'Consultas', path: '/consultas' },
          ].map((item) => (
            <span
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                color: item.path === '/home' ? '#fff' : 'rgba(255,255,255,0.75)',
                fontSize: 12,
                padding: '5px 11px',
                borderRadius: 6,
                background: item.path === '/home' ? 'rgba(255,255,255,0.2)' : 'transparent',
                fontWeight: item.path === '/home' ? 500 : 400,
                cursor: 'pointer',
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#fff',
            color: '#008080',
            border: 'none',
            borderRadius: 8,
            padding: '7px 16px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ↩ Sair
        </button>
      </nav>

      {/* Corpo */}
      <div style={{ padding: '32px 28px' }}>

        {/* Título */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: '#008080', margin: 0 }}>
            Sistema de Gestão Médica
          </h1>
          <p style={{ fontSize: 13, color: '#666', margin: '4px 0 0' }}>
            Selecione uma área para gerenciar
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 28,
        }}>

          {/* Card Médicos */}
          <div
            onClick={() => navigate('/medicos')}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '28px 24px',
              cursor: 'pointer',
              border: '0.5px solid rgba(0,128,128,0.15)',
              boxShadow: '0 4px 16px rgba(0,128,128,0.08)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,128,128,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,128,128,0.08)' }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🩺</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 4 }}>Médicos</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Gerenciar médicos da clínica</div>
            <div style={{
              background: '#008080',
              color: '#fff',
              borderRadius: 8,
              padding: '8px 0',
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}>
              ACESSAR →
            </div>
          </div>

          {/* Card Pacientes */}
          <div
            onClick={() => navigate('/pacientes')}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '28px 24px',
              cursor: 'pointer',
              border: '0.5px solid rgba(0,128,128,0.15)',
              boxShadow: '0 4px 16px rgba(0,128,128,0.08)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,128,128,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,128,128,0.08)' }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 4 }}>Pacientes</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Gerenciar pacientes da clínica</div>
            <div style={{
              background: '#008080',
              color: '#fff',
              borderRadius: 8,
              padding: '8px 0',
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}>
              ACESSAR →
            </div>
          </div>

          {/* Card Consultas */}
          <div
            onClick={() => navigate('/consultas')}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '28px 24px',
              cursor: 'pointer',
              border: '0.5px solid rgba(0,128,128,0.15)',
              boxShadow: '0 4px 16px rgba(0,128,128,0.08)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,128,128,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,128,128,0.08)' }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 4 }}>Consultas</div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>Gerenciar consultas da clínica</div>
            <div style={{
              background: '#008080',
              color: '#fff',
              borderRadius: 8,
              padding: '8px 0',
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}>
              ACESSAR →
            </div>
          </div>

        </div>

        {/* Rodapé info */}
        <div style={{ textAlign: 'center', fontSize: 11, color: '#008080', fontWeight: 600, letterSpacing: '0.05em' }}>
          Seguimos evoluindo 🚀
        </div>

      </div>
    </div>
  )
}