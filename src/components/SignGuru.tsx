"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@/components/DialogContainer";
import Loading from "@/components/Loading";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void 
}

export default function SignUser({open, onClose}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  function sendData() {
    if (password !== confirmPassword) {
      alert("As senhas não conferem, tente novamente.");
      setPassword("");
      setConfirmPassword("");
      return;
    } else if (name.length < 3) {
      alert("O nome deve conter no mínimo três caracteres.");
      return;
    }
    setLoading(false);
    const body = { name, email, password, cpf, phone };

    axios
      .post("http://localhost:4000/users", body)
      .then(() => {
        setLoading(false);
        alert('Guru cadastrado com sucesso');
        onClose();
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message === "email already in use") alert("Email já cadastrado, insira um e-mail diferente");
        if (message === "password is not strong enough") alert("A senha deve conter, no mínimo, 8 letras, uma letra maiúscula, um número e um símbolo");
        if (message === "cpf must be a cpf") alert("CPF inválido");
        if (message === "phone must be a phone number") alert("Número de celular inválido inválido");
        
        setLoading(false);
      });
  }

  useEffect(resetData,[open]);

  function resetData() {
    if (!open) {
      setName('');
      setEmail('');
      setPassword('');
      setCpf('');
      setPhone("");
    }
  }
  
  return (
    <>
      <Container>
        <Image 
          src='/images/logo-white.Jpg' 
          width={250}
          height={80}
          alt='logo'
        />
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button onClick={sendData}>
          {!loading ? "Cadastrar" : <Loading />}
        </button>
      </Container>
    </>
  );
}