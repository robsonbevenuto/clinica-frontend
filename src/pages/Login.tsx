import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email === 'admin@clinica.com' && senha === '123456') {
      navigate('/home')
    } else {
      setErro('Email ou senha incorretos!')
    }
  }

  return (
    <Box className="flex items-center justify-center min-h-screen bg-blue-50">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="text-center mb-6 text-blue-700">
          🏥 Clínica API
        </Typography>
        <Typography variant="h6" className="text-center mb-6 text-gray-600">
          Sistema de Gestão
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <Typography color="error" className="mt-2">
            {erro}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          className="mt-4"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
      </Paper>
    </Box>
  )
}
