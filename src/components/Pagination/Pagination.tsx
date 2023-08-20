import { useContext } from "react"
import styled from "@emotion/styled"
import { IconButton } from "../Button"
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons"
import { ContactContext } from "@/context/contactContext"

const S = {
  Container: styled.div`
    display: flex;
    gap: 2rem;
    width: 100%;
    justify-content: space-evenly;
  `,
  PagingButton: styled(IconButton)`
    background-color: #1251ff;
    border: none;
  `,
}

const Pagination = () => {
  const { page, updatePage, contacts, loading } = useContext(ContactContext)
  return (
    <S.Container>
      {page !== 1 && (
        <S.PagingButton
          onClick={() => updatePage(page - 1)}
          disabled={loading.getContact}
        >
          <ChevronLeftIcon color="white" />
        </S.PagingButton>
      )}
      <S.PagingButton
        onClick={() => updatePage(page + 1)}
        disabled={loading.getContact}
      >
        <ChevronRightIcon color="white" />
      </S.PagingButton>
    </S.Container>
  )
}

export default Pagination
