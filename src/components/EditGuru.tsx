"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@/components/DialogContainer";
import Loading from "@/components/Loading";

interface Props {
  open: boolean;
  id: number;
  onClose: () => void;
  getUsers: () => void; 
}

export default function EditUser({open, id, onClose, getUsers}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(id);

  function sendData() {
    if (password !== confirmPassword) {
      alert("As senhas não conferem, tente novamente.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    setLoading(false);
    let body = {  };
    if (email !== "") body = {...body, email};
    if (password !== "") body = {...body, password};
    if (phone !== "") body = {...body, phone};
    
    axios
      .put(`http://localhost:4000/users/${id}`, body)
      .then(() => {
        setLoading(false);
        alert('Guru editado com sucesso');
        getUsers();
        onClose();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("Email já cadastrado, insira um e-mail diferente");
        } else {
          alert("Erro no cadastro, tente novamente");
        }
        setLoading(false);
      });
  }

  useEffect(resetData,[open]);

  function resetData() {
    if (!open) {
      setName('');
      setEmail('');
      setPassword('');
      setPhone("");
    }
  }
  
  return (
    <>
      <Container>
        <img
          src="https://meuguru.net/_next/static/media/logo.3a6dee38.svg"
          alt="logo"
        />
        <input
          type="email"
          placeholder="Novo e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Novo telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button onClick={sendData}>
          {!loading ? "Editar informações" : <Loading />}
        </button>
      </Container>
    </>
  );
}