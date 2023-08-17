import { IContact } from "@/types"
import styled from "@emotion/styled"
import { faker } from "@faker-js/faker"
import { RemoveIcon } from "../Icons"

interface IFavoriteListItemProps {
  contact: IContact
}

const S = {
  AvatarContainer: styled.div`
    position: relative;
  `,
  Avatar: styled.img`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 100%;
  `,
  Item: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 3rem;
    text-align: center;
  `,
  Name: styled.span`
    font-weight: 600;
  `,
  RemoveButton: styled.button`
    border-radius: 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid white;
    background: #ff6d6d;
  `,
}

const FavoriteListItem = (props: IFavoriteListItemProps) => {
  return (
    <div className="FavoriteListItem">
      <S.Item>
        <S.AvatarContainer>
          <S.Avatar src={faker.image.avatar()} />
          <S.RemoveButton>
            <RemoveIcon color="#c90000" />
          </S.RemoveButton>
        </S.AvatarContainer>
        <S.Name>{`${props.contact.first_name}`}</S.Name>
      </S.Item>
    </div>
  )
}

export default FavoriteListItem
