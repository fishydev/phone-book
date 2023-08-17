import { dummyContacts } from "@/utils/dummy"
import { memo } from "react"
import styled from "@emotion/styled"
import ContactListItem from "./ContactListItem"

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  `,
}

const Component = () => {
  return (
    <S.Container>
      {dummyContacts.map((contact) => (
        <ContactListItem contact={contact} />
      ))}
    </S.Container>
  )
}

const ContactList = memo(Component)

export default ContactList
