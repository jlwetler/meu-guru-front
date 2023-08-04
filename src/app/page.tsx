"use client";
import Dialog from "@/components/Dialog";
import SignUser from "@/components/SignGuru";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header";

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Header /> 
      <div style={{marginTop: "100px"}}>
          <Button>
            <Link href='/users'>Visualizar usuários</Link>
          </Button>
          <Button onClick={()=> setOpen(true)}>Cadastrar usuário</Button>
          <Dialog open={open} onClose={()=> setOpen(false)}>
            <SignUser open={open} onClose={()=> setOpen(false)}/>
          </Dialog>
      </div>
    </>
  )
}

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
  a {
    text-decoration: none;
    color: #000;
    &:hover {
      color: #fff;
    }
  }  
  &:hover {
    background: purple;
    color: #fff;
  }
`