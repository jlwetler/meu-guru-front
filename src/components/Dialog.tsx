import React from "react";

interface DialogProps {
  open: boolean;
  onClose?: () => void | undefined,
  children: React.ReactNode
}

const Dialog = ({open, onClose, children}: DialogProps) => {
  return (<div style={{
    zIndex: 9999,
    position: "fixed",
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    display: open ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    background: "gray",
    opacity: "96%"
  }}>
    <div style={{
      border: "1px solid #000",
      width: "400px",
      height: "500px",
      display: open ? "block" : "none",
      background: "white",
      padding: "20px",
      borderRadius: "40px"
    }}>
      <div style={{
        fontSize: "20px",
        cursor: "pointer",
        float: "right",
      }}
      onClick={onClose}> X </div>
      {children}
    </div>
  </div>);
}

export default Dialog;