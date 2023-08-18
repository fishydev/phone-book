import styled from "@emotion/styled"

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Input: styled.input`
    width: 100%;
    height: 100%;
    border: none;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: gainsboro;
  `,
  Label: styled.span`
    font-weight: 400;
    font-size: small;
  `,
}

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = (props: IInputProps) => {
  return (
    <S.Container>
      {props.label ? <S.Label>{props.label}</S.Label> : null}
      <S.Input {...props} />
    </S.Container>
  )
}

export default Input
