import { dummyFavorites } from "@/utils/dummy"
import FavoriteListItem from "./FavoriteListItem"
import styled from "@emotion/styled"

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
  return (
    <S.Container>
      <S.Label>Favorites</S.Label>
      <S.ItemList>
        {dummyFavorites.map((favorite) => (
          <FavoriteListItem contact={favorite} />
        ))}
      </S.ItemList>
    </S.Container>
  )
}

export default FavoriteList
