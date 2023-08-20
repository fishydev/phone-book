import { useContext } from "react"
import FavoriteListItem from "./FavoriteListItem"
import styled from "@emotion/styled"
import { ContactContext } from "@/context/contactContext"

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
  `,
  Label: styled.span`
    font-weight: 600;
    font-size: large;
  `,
  ItemList: styled.div`
    display: flex;
    gap: 0.5rem;
    max-width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  `,
}

const FavoriteList = () => {
  const { favorites } = useContext(ContactContext)
  return (
    <S.Container>
      <S.Label>Favorites</S.Label>
      <S.ItemList>
        {favorites.map((favorite) => (
          <FavoriteListItem key={favorite.id} contact={favorite} />
        ))}
      </S.ItemList>
    </S.Container>
  )
}

export default FavoriteList
