"use client";
import { useState } from "react";
//import { useRouter } from 'next/router';
import axios from "axios";
import Container from "@/components/Container";
import Loading from "@/components/Loading";

export default function SignUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  //const router = useRouter();

  function sendData() {
    
    if (password !== confirmPassword) {
      alert("As senhas não conferem, tente novamente.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    setLoading(false);
    const body = { name, email, password, cpf, phone };

    axios
      .post("http://localhost:4000/users", body)
      .then(() => {
        setLoading(false);
        //router.push("/");
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

  return (
    <>
      <Container>
        <img
          src="https://meuguru.net/_next/static/media/logo.3a6dee38.svg"
          alt="logo"
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
