import styled from "@emotion/styled"
import { LoadingIcon } from "../Icons"
interface ILoaderProps extends React.ReactHTMLElement<HTMLElement> {}

const S = {
  Loader: styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  `,
}

const Loader = () => {
  return (
    <S.Loader>
      <LoadingIcon color="#1251ff" />
    </S.Loader>
  )
}

export default Loader
