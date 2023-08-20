import React from "react"
import styled from "@emotion/styled"

const S = {
  Button: styled.button`
    padding: 1rem;
    border-radius: 100%;
    cursor: pointer;
  `,
}
interface IIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = (props: IIconButtonProps) => {
  return <S.Button {...props}>{props.children}</S.Button>
}

export default IconButton
