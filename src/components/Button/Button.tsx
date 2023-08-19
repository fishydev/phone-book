import React from "react"
import styled from "@emotion/styled"

const S = {
  Button: styled.button`
    height: fit-content;
    width: 100%;
    display: block;
    padding: 0.5rem 0;
    border-radius: 0.5rem;
    cursor: pointer;
  `,
}
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: IButtonProps) => {
  return <S.Button {...props}>{props.children}</S.Button>
}

export default Button
