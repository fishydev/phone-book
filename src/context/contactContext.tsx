import React from "react"
import { IContactContext } from "./types"
import { IContact } from "@/types"
import { dummyContacts } from "@/utils/dummy"
import { faker } from "@faker-js/faker"

export const ContactContext = React.createContext<IContactContext>({
  contacts: [],
  favorites: [],
  selectedContact: undefined,
  showForm: false,

  addContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},

  addFavorite: () => {},
  deleteFavorite: () => {},
  selectContact: () => {},

  updateShowForm: () => {},
})

interface ContactProviderProps {
  children: React.ReactNode // Define the children prop
}

const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = React.useState<IContact[]>(dummyContacts)
  const [favorites, setFavorites] = React.useState<IContact[]>([])
  const [selectedContact, setSelectedContact] = React.useState<IContact>()
  const [showForm, setShowForm] = React.useState<boolean>(false)

  const addContact = (contact: Omit<IContact, "id">) => {
    setContacts((prev) => {
      return [
        ...prev,
        {
          id: faker.number.int(),
          ...contact,
        },
      ]
    })
  }

  const updateContact = (contact: IContact) => {
    setContacts((prev) => {
      return prev.map((item) => (item.id === contact.id ? contact : item))
    })
  }

  const deleteContact = (id: number) => {
    setContacts((prev) => {
      return prev.filter((item) => item.id !== id)
    })
    setFavorites((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  const addFavorite = (id: number) => {
    setFavorites((prev) => {
      return [...prev, contacts.find((item) => item.id === id)!]
    })
  }

  const deleteFavorite = (id: number) => {
    setFavorites((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  const selectContact = (id?: number) => {
    setSelectedContact(
      id ? contacts.find((contact) => contact.id === id) : undefined
    )
    console.log("selected contact")
  }

  const updateShowForm = (show: boolean) => {
    setShowForm(show)
    console.log("show form update")
    console.log(showForm)
  }

  return (
    <ContactContext.Provider
      value={{
        contacts,
        favorites,
        showForm,
        selectedContact,
        addContact,
        updateContact,
        deleteContact,
        addFavorite,
        deleteFavorite,
        selectContact,
        updateShowForm,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export default ContactProvider
