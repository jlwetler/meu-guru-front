import { styled } from "styled-components";
import Image from "next/image";

export default function Header() {

  return (
      <Top>
        <Image 
          src='/images/logo-purple.Jpg' 
          width={150}
          height={50}
          alt='logo'/>
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