import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material'
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

  useEffect(() => {
    carregarPacientes()
  }, [])

  const carregarPacientes = async () => {
    const data = await getPacientes()
    setPacientes(data)
  }

  const handleCriar = async () => {
    await createPaciente({ nome, cpf, email, telefone })
    setOpen(false)
    setNome('')
    setCpf('')
    setEmail('')
    setTelefone('')
    carregarPacientes()
  }

  const handleDeletar = async (id: number) => {
    if (confirm('Deseja deletar este paciente?')) {
      await deletePaciente(id)
      carregarPacientes()
    }
  }

  return (
    <Box className="min-h-screen bg-blue-50 p-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="text-blue-700">
          👥 Pacientes
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            + Novo Paciente
          </Button>
          <Button variant="outlined" onClick={() => navigate('/home')}>
            Voltar
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2e7d32' }}>
              <TableCell sx={{ color: 'white' }}>Nome</TableCell>
              <TableCell sx={{ color: 'white' }}>CPF</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Telefone</TableCell>
              <TableCell sx={{ color: 'white' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nome}</TableCell>
                <TableCell>{p.cpf}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.telefone}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleDeletar(p.id)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Novo Paciente</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth margin="normal" value={nome} onChange={(e) => setNome(e.target.value)} />
          <TextField label="CPF" fullWidth margin="normal" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Telefone" fullWidth margin="normal" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={handleCriar}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
