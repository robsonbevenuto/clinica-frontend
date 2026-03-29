import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material'
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

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    const [c, m, p] = await Promise.all([
      getConsultas(),
      getMedicos(),
      getPacientes()
    ])
    setConsultas(c)
    setMedicos(m)
    setPacientes(p)
  }

  const handleCriar = async () => {
    await createConsulta({
      medicoId: Number(medicoId),
      pacienteId: Number(pacienteId),
      data: new Date(data).toISOString(),
      observacoes
    })
    setOpen(false)
    setMedicoId('')
    setPacienteId('')
    setData('')
    setObservacoes('')
    carregarDados()
  }

  const handleDeletar = async (id: number) => {
    if (confirm('Deseja deletar esta consulta?')) {
      await deleteConsulta(id)
      carregarDados()
    }
  }

  return (
    <Box className="min-h-screen bg-blue-50 p-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="text-blue-700">
          📅 Consultas
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            + Nova Consulta
          </Button>
          <Button variant="outlined" onClick={() => navigate('/home')}>
            Voltar
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ed6c02' }}>
              <TableCell sx={{ color: 'white' }}>Data</TableCell>
              <TableCell sx={{ color: 'white' }}>Médico</TableCell>
              <TableCell sx={{ color: 'white' }}>Paciente</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultas.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{new Date(c.data).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{c.medico?.nome}</TableCell>
                <TableCell>{c.paciente?.nome}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleDeletar(c.id)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Nova Consulta</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Médico</InputLabel>
            <Select value={medicoId} onChange={(e) => setMedicoId(e.target.value)} label="Médico">
              {medicos.map((m) => (
                <MenuItem key={m.id} value={m.id}>Dr. {m.nome} - {m.especialidade}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Paciente</InputLabel>
            <Select value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} label="Paciente">
              {pacientes.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Data e Hora"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={data}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Observações"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="warning" onClick={handleCriar}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
} 
