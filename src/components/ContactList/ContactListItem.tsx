import { memo, useContext } from "react"
import styled from "@emotion/styled"
import { IContact } from "@/types"
import { FavoriteIcon, FavoriteOutlineIcon, RemoveIcon } from "../Icons"
import { ContactContext } from "@/context/contactContext"

interface IContactListItemProps {
  contact: IContact
}

const S = {
  Item: styled.div`
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.25rem;
    align-items: center;
    position: relative;
  `,
  // Avatar: styled.img`
  //   grid-area: 1 / 1 / 3 / 2;
  //   width: 2.5rem;
  //   height: 2.5rem;
  //   border-radius: 100%;
  //   margin: auto;
  // `,
  Name: styled.span`
    grid-area: 1 / 1 / 2 / 2;
    font-weight: 600;
    white-space: nowrap;
    overflow-x: hidden;
    position: relative;
    max-width: 100%;
  `,
  Number: styled.span`
    grid-area: 2 / 1 / 3 / 2;
    font-weight: 600;
    color: gray;
    overflow-x: hidden;
  `,
  ButtonGroup: styled.div`
    grid-area: 1/2/3/3;
    display: flex;
    gap: 0.5rem;
  `,
  FavoriteButton: styled.button`
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

  const {
    deleteContact,
    favorites,
    addFavorite,
    deleteFavorite,
    updateSelectedContactId,
    loading,
  } = useContext(ContactContext)

  const isFavorited = (id: number) => {
    return favorites.find((favorite) => favorite.id === id) ? true : false
  }

  const handleClickEdit = (id: number) => {
    updateSelectedContactId(id)
  }

  return (
    <S.Item>
      {/* <S.Avatar src={faker.image.avatarGitHub()} /> */}
      <S.Name>{`${contact.first_name} ${contact.last_name}`}</S.Name>
      <S.Number>{contact.phones[0] && contact.phones[0].number}</S.Number>
      <S.ButtonGroup>
        <S.RemoveButton
          onClick={() => deleteContact(contact.id)}
          disabled={loading.deleteContact}
        >
          <RemoveIcon color="#f6363f" />
        </S.RemoveButton>
        {/* <S.EditButton onClick={() => handleClickEdit(contact.id)}>
        <EditIcon color="#2c2fff" />
      </S.EditButton> */}
        <S.FavoriteButton
          onClick={() =>
            isFavorited(contact.id)
              ? deleteFavorite(contact.id)
              : addFavorite(contact.id)
          }
        >
          {isFavorited(contact.id) ? (
            <FavoriteIcon color="#ffdd00" />
          ) : (
            <FavoriteOutlineIcon color="#ffdd00" />
          )}
        </S.FavoriteButton>
      </S.ButtonGroup>
    </S.Item>
  )
}

const ContactListItem = memo(Component)

export default ContactListItem
