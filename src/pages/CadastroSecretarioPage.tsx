import { useState } from "react";
import { TextInput, Button, Alert, Title, Container, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function CadastroSecretarioPage() {
  const navigate = useNavigate();
  
  // Estados do formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estados de erro
  const [erroNome, setErroNome] = useState("");
  const [erroCpf, setErroCpf] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErroGeral(""); 
    setSucesso("");
    
    // 1. Limpar erros antigos
    setErroNome(""); setErroCpf(""); setErroTelefone(""); setErroEmail(""); setErroSenha("");

    let temErro = false;

    // 2. Validações na mão
    if (nome.trim().length < 3) {
      setErroNome("O nome deve ter pelo menos 3 letras.");
      temErro = true;
    }
    if (cpf.trim().length < 11) {
      setErroCpf("O CPF deve ter 11 dígitos.");
      temErro = true;
    }
    if (telefone.trim().length < 10) {
      setErroTelefone("Telefone inválido.");
      temErro = true;
    }
    if (!email.includes("@")) {
      setErroEmail("Digite um e-mail válido.");
      temErro = true;
    }
    if (senha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres.");
      temErro = true;
    }

    // Se tiver algum erro, para aqui e não chama a API
    if (temErro) return; 

    // 3. Se passou em tudo, chama a API usando fetch
    try {
      const res = await fetch("http://127.0.0.1:3000/secretarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cpf, telefone, email, senha }),
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar secretário.");
      }

      setSucesso("Secretário cadastrado com sucesso!");
      setTimeout(() => navigate("/home"), 2000); 
    } catch (error) {
      // CORREÇÃO AQUI: Removemos o ': any' e tratamos o erro com segurança
      setErroGeral(error instanceof Error ? error.message : "Erro ao cadastrar secretário.");
    }
  }

  return (
    <Container size="xs" mt="xl">
      <Title order={2} mb="lg">Cadastrar Secretário</Title>
      
      {erroGeral && <Alert color="red" mb="md">{erroGeral}</Alert>}
      {sucesso && <Alert color="green" mb="md">{sucesso}</Alert>}

      <form onSubmit={cadastrar}>
        <Stack>
          <TextInput 
            label="Nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            error={erroNome} 
          />
          <TextInput 
            label="CPF" 
            value={cpf} 
            onChange={(e) => setCpf(e.target.value)} 
            error={erroCpf} 
          />
          <TextInput 
            label="Telefone" 
            value={telefone} 
            onChange={(e) => setTelefone(e.target.value)} 
            error={erroTelefone} 
          />
          <TextInput 
            label="E-mail" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={erroEmail} 
          />
          <TextInput 
            label="Senha" 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            error={erroSenha} 
          />
          <Button type="submit" fullWidth>Cadastrar</Button>
        </Stack>
      </form>
    </Container>
  );
}