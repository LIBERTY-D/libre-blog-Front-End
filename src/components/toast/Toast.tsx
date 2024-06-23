import React from "react";
import "./toast.css"

type ToastType = {
    message:string,
    show:boolean,
    onClose:(e:React.MouseEvent<HTMLButtonElement>)=>void
}

export const Toast:React.FC<ToastType> = ({ message, show, onClose }) => {
    return (
      <div className={`toast ${show ? 'show' : ''}`}>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={onClose}>X</button>
      </div>
    );
  };
