import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material'
import { getMedicos, createMedico, deleteMedico } from '../services/api'
import { Medico } from '../types/index'

export default function Medicos() {
  const navigate = useNavigate()
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState('')
  const [especialidade, setEspecialidade] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  useEffect(() => {
    carregarMedicos()
  }, [])

  const carregarMedicos = async () => {
    const data = await getMedicos()
    setMedicos(data)
  }

  const handleCriar = async () => {
    await createMedico({ nome, especialidade, email, telefone })
    setOpen(false)
    setNome('')
    setEspecialidade('')
    setEmail('')
    setTelefone('')
    carregarMedicos()
  }

  const handleDeletar = async (id: number) => {
    if (confirm('Deseja deletar este médico?')) {
      await deleteMedico(id)
      carregarMedicos()
    }
  }

  return (
    <Box className="min-h-screen bg-blue-50 p-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="text-blue-700">
          🩺 Médicos
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            + Novo Médico
          </Button>
          <Button variant="outlined" onClick={() => navigate('/home')}>
            Voltar
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Nome</TableCell>
              <TableCell sx={{ color: 'white' }}>Especialidade</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Telefone</TableCell>
              <TableCell sx={{ color: 'white' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicos.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.nome}</TableCell>
                <TableCell>{m.especialidade}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.telefone}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleDeletar(m.id)}
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
        <DialogTitle>Novo Médico</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth margin="normal" value={nome} onChange={(e) => setNome(e.target.value)} />
          <TextField label="Especialidade" fullWidth margin="normal" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Telefone" fullWidth margin="normal" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCriar}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
} 
