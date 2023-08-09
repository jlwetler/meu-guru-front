import React from "react";
import styled from 'styled-components';

interface DialogProps {
  open: boolean;
  onClose?: () => void | undefined,
  children: React.ReactNode
}

const Dialog = ({open, onClose, children}: DialogProps) => {
  return (
  <Background style={{display: open ? "flex" : "none"}}>
    <DialogBox style={{ display: open ? "block" : "none"}}>
      <CloseButton onClick={onClose}> X </CloseButton>
      {children}
    </DialogBox>
  </Background>);
}

const Background = styled.div`
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: gray;
  opacity: 96%;
`;

const DialogBox = styled.div`
  border: 1px solid #000;
  width: 400px;
  height: 500px;
  background: white;
  padding: 20px;
  border-radius: 40px;
`;

const CloseButton = styled.div`
  font-size: 20px;
  cursor: pointer;
  float: right;
`;

export default Dialog;