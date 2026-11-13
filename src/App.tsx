import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core' // <-- ADICIONE ESTA LINHA
import '@mantine/core/styles.css' // <-- ADICIONE ESTA LINHA

import Login from './pages/Login'
import Home from './pages/Home'
import Medicos from './pages/Medicos'
import Pacientes from './pages/Pacientes'
import Consultas from './pages/Consultas'
import { CadastroSecretarioPage } from './pages/CadastroSecretarioPage'

function App() {
  return (
    <MantineProvider> {/* <-- ENVOLVA O BROWSERROUTER COM ISSO */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/cadastro" element={<CadastroSecretarioPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App