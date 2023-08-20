import { dummyContacts } from "@/utils/dummy"
import { memo, useContext } from "react"
import styled from "@emotion/styled"
import ContactListItem from "./ContactListItem"
import { ContactContext } from "@/context/contactContext"
import { Pagination } from "../Pagination"
import { Loader } from "../Loader"

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    height: 100%;
    max-height: 100vh;
    overflow-y: scroll;
  `,
}

const Component = () => {
  const { contacts, loading } = useContext(ContactContext)
  return (
    <S.Container>
      {loading.getContact && <Loader />}
      {!loading.getContact &&
        contacts.map((contact) => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      <Pagination />
    </S.Container>
  )
}

const ContactList = memo(Component)

export default ContactList
