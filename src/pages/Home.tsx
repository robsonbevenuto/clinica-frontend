import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Paper, Grid } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

export default function Home() {
  const navigate = useNavigate()

  return (
    <Box className="min-h-screen bg-blue-50 p-8">
      <Typography variant="h4" className="text-blue-700 mb-2">
        🏥 Clínica API
      </Typography>
      <Typography variant="subtitle1" className="text-gray-600 mb-8">
        Sistema de Gestão Médica
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            className="p-6 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate('/medicos')}
          >
            <MedicalServicesIcon sx={{ fontSize: 48, color: '#1976d2' }} />
            <Typography variant="h6" className="mt-2">Médicos</Typography>
            <Typography variant="body2" className="text-gray-500">
              Gerenciar médicos da clínica
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            className="p-6 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate('/pacientes')}
          >
            <PeopleIcon sx={{ fontSize: 48, color: '#2e7d32' }} />
            <Typography variant="h6" className="mt-2">Pacientes</Typography>
            <Typography variant="body2" className="text-gray-500">
              Gerenciar pacientes da clínica
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            className="p-6 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate('/consultas')}
          >
            <CalendarMonthIcon sx={{ fontSize: 48, color: '#ed6c02' }} />
            <Typography variant="h6" className="mt-2">Consultas</Typography>
            <Typography variant="body2" className="text-gray-500">
              Gerenciar consultas da clínica
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 4 }}
        onClick={() => navigate('/')}
      >
        Sair
      </Button>
    </Box>
  )
} 
