import { useContext } from "react"
import { dummyFavorites } from "@/utils/dummy"
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
    overflow-x: scroll;
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
