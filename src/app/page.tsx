"use client";
import Dialog from "@/components/Dialog";
import SignUser from "@/components/SignGuru";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Top>
        <Image 
          src='/images/logo-purple.Jpg' 
          width={150}
          height={50}
          alt='logo'/>
      </Top> 
      <div style={{marginTop: "100px"}}>
          <Button>
            <Link href='/users'>Visualizar usuários</Link>
          </Button>
          <Button onClick={()=> setOpen(true)}>Cadastrar usuário</Button>
          <Dialog open={open} onClose={()=> setOpen(false)}>
            <SignUser/>
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
  }
`

const Top = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: #2A004F;
`;
