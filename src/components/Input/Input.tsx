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
  Error: styled.span`
    font-weight: 400;
    font-size: small;
    color: #ff3636;
  `,
}

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = (props: IInputProps) => {
  return (
    <S.Container>
      {props.label ? <S.Label>{props.label}</S.Label> : null}
      <S.Input {...props} />
      {props.error ? <S.Error>{props.error}</S.Error> : null}
    </S.Container>
  )
}

export default Input
