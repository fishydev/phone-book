import { dummyContacts } from "@/utils/dummy"
import { memo, useContext } from "react"
import styled from "@emotion/styled"
import ContactListItem from "./ContactListItem"
import { ContactContext } from "@/context/contactContext"

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  `,
}

const Component = () => {
  const { contacts } = useContext(ContactContext)
  return (
    <S.Container>
      {contacts.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </S.Container>
  )
}

const ContactList = memo(Component)

export default ContactList
