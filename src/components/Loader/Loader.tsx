import styled from "@emotion/styled"
import { LoadingIcon } from "../Icons"

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
