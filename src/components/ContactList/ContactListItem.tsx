import { memo } from "react"
import styled from "@emotion/styled"
import { faker } from "@faker-js/faker"
import { IContact } from "@/types"
import {
  EditIcon,
  FavoriteIcon,
  FavoriteOutlineIcon,
  RemoveIcon,
} from "../Icons"
import { dummyFavorites } from "@/utils/dummy"

interface IContactListItemProps {
  contact: IContact
}

const S = {
  Item: styled.div`
    display: grid;
    grid-template-columns: 3rem 1fr 2rem 2rem 2rem;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.25rem;
    align-items: center;
  `,
  Avatar: styled.img`
    grid-area: 1 / 1 / 3 / 2;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    margin: auto;
  `,
  Name: styled.span`
    grid-area: 1 / 2 / 2 / 3;
    font-weight: 600;
    white-space: nowrap;
    overflow-x: scroll; /* Prevent actual overflow */
    position: relative; /* Required for pseudo-element */
    max-width: 100%; /* Ensure the text doesn't overflow the container */
  `,
  Number: styled.span`
    grid-area: 2 / 2 / 3 / 3;
    font-weight: 600;
    color: gray;
  `,
  FavoriteButton: styled.button`
    grid-area: 1 / 5 / 3 / 6;
    border: none;
    background: #fff8c8;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 2rem;
  `,
  EditButton: styled.button`
    grid-area: 1 / 4 / 3 / 5;
    border: none;
    background: #cbc8ff;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 2rem;
  `,
  RemoveButton: styled.button`
    grid-area: 1 / 3 / 3 / 4;
    border: none;
    background: #ffc8c8;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 2rem;
  `,
}

const Component = (props: IContactListItemProps) => {
  const { contact } = props
  return (
    <S.Item>
      <S.Avatar src={faker.image.avatar()} />
      <S.Name>{`${contact.first_name} ${contact.last_name}`}</S.Name>
      <S.Number>{contact.phones[0].number}</S.Number>
      <S.RemoveButton>
        <RemoveIcon color="#f6363f" />
      </S.RemoveButton>
      <S.EditButton>
        <EditIcon color="#2c2fff" />
      </S.EditButton>
      <S.FavoriteButton>
        {dummyFavorites.find((favorite) => favorite.id === contact.id) ? (
          <FavoriteIcon color="#ffdd00" />
        ) : (
          <FavoriteOutlineIcon color="#ffdd00" />
        )}
      </S.FavoriteButton>
    </S.Item>
  )
}

const ContactListItem = memo(Component)

export default ContactListItem
