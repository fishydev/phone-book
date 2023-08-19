import React from "react"
import { IContactContext } from "./types"
import { IContact } from "@/types"
import { dummyContacts } from "@/utils/dummy"
import { faker } from "@faker-js/faker"
import { useMutation, useQuery } from "@apollo/client"
import {
  ADD_CONTACT_WITH_PHONES,
  ADD_NUMBER_TO_CONTACT,
  DELETE_CONTACT_PHONE,
  EDIT_CONTACT,
  EDIT_PHONE_NUMBER,
  GET_CONTACT_DETAIL,
  GET_CONTACT_LIST,
  GET_PHONE_LIST,
} from "@/api"

export const ContactContext = React.createContext<IContactContext>({
  contacts: [],
  favorites: [],
  selectedContact: undefined,
  selectedContactId: undefined,
  showForm: false,

  addContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},

  addFavorite: () => {},
  deleteFavorite: () => {},

  selectContact: () => {},
  updateSelectedContactId: () => {},

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

  const {
    loading: getContactListLoading,
    error: getContactListError,
    data: contactList,
  } = useQuery(GET_CONTACT_LIST)

  const {
    loading: getContactDetailLoading,
    error: getContactDetailError,
    data: contactDetail,
  } = useQuery(GET_CONTACT_DETAIL, {
    variables: 
  })

  const {
    loading: getPhoneListLoading,
    error: getPhoneListError,
    data: phoneList,
  } = useQuery(GET_PHONE_LIST)

  const [
    addContactMutation,
    { loading: addContactLoading, error: addContactError },
  ] = useMutation(ADD_CONTACT_WITH_PHONES)

  // const [
  //   addNumberMutation,
  //   { loading: addNumberLoading, error: addNumberError },
  // ] = useMutation(ADD_NUMBER_TO_CONTACT)

  // const [
  //   editContactMutation,
  //   { loading: editContactLoading, error: editContactError },
  // ] = useMutation(EDIT_CONTACT)

  // const [
  //   editNumberMutation,
  //   { loading: editNumberLoading, error: editNumberError },
  // ] = useMutation(EDIT_PHONE_NUMBER)

  // const [
  //   deleteContactMutation,
  //   { loading: deleteContactLoading, error: deleteContactError },
  // ] = useMutation(DELETE_CONTACT_PHONE)

  React.useEffect(() => {
    try {
      const storedString = localStorage.getItem("favorites")
      if (storedString) {
        const storedFavorites = JSON.parse(storedString) as IContact[]
        setFavorites(storedFavorites)
      }
    } catch (err) {
      //
    }
  }, [])

  React.useEffect(() => {
    if (contactList && contactList.contact) {
      setContacts(contactList.contact)
    }
  }, [contactList])

  const addContact = (contact: Omit<IContact, "id">) => {
    // setContacts((prev) => {
    //   return [
    //     ...prev,
    //     {
    //       id: faker.number.int(),
    //       ...contact,
    //     },
    //   ]
    // })
    addContactMutation({
      variables: {
        ...contact
      }
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
      const curr = [...prev, contacts.find((item) => item.id === id)!]
      localStorage.setItem("favorites", JSON.stringify(curr))
      return curr
    })
  }

  const deleteFavorite = (id: number) => {
    setFavorites((prev) => {
      const curr = prev.filter((item) => item.id !== id)
      localStorage.setItem("favorites", JSON.stringify(curr))
      return curr
    })
  }

  const selectContact = (id?: number) => {
    contactDetail
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
