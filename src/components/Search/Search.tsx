import { memo } from "react"
import { SearchIcon } from "@/components/Icons"
import styled from "@emotion/styled"

const S = {
  Container: styled.div`
    position: relative;
    width: 100%;
    padding: 0.5rem;
  `,
  Input: styled.input`
    width: 100%;
    height: 100%;
    border: none;
    padding: 1rem 1rem 1rem 2.5rem;
    border-radius: 0.25rem;
  `,
  Icon: styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    width: 2.5rem;
    height: 100%;
  `,
}

const Component = () => {
  return (
    <S.Container>
      <S.Icon>
        <SearchIcon />
      </S.Icon>
      <S.Input type="text" />
    </S.Container>
  )
}

const Search = memo(Component)

export default Search
