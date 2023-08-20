import { useContext, useEffect, useState } from "react"
import { SearchIcon } from "@/components/Icons"
import styled from "@emotion/styled"
import { ContactContext } from "@/context/contactContext"
import { useDebounce } from "@uidotdev/usehooks"

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
    background-color: gainsboro;
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

const Search = () => {
  const { updateQuery } = useContext(ContactContext)
  const [query, setQuery] = useState("")

  const debouncedQuery = useDebounce(query, 1000)

  useEffect(() => {
    updateQuery(debouncedQuery)
  }, [debouncedQuery])

  return (
    <S.Container>
      <S.Icon>
        <SearchIcon />
      </S.Icon>
      <S.Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
    </S.Container>
  )
}

export default Search
