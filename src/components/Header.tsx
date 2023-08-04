import { styled } from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Header() {

  return (
      <Top>
        <Link href='/'>
        <Image 
          src='/images/logo-purple.Jpg' 
          width={150}
          height={50}
          alt='logo'/>
        </Link>
      </Top> 
  )
}

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