"use client";
import Dialog from "@/components/Dialog";
import SignUser from "@/components/SignGuru";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header />
      <Options>
        <Link href="/users">
          <Button>Visualizar usuários</Button>
        </Link>
        <Button onClick={() => setOpen(true)}>Cadastrar usuário</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <SignUser open={open} onClose={() => setOpen(false)} />
        </Dialog>
      </Options>
    </>
  );
}

const Options = styled.div`
  margin-top: 100px;
  a {
    text-decoration: none;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 20px;
  margin: 20px auto;
  cursor: pointer;
  color: #000;
  &:hover {
    background: #2a004f;
    color: #fff;
  }
`;
