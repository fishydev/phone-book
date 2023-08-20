import { useEffect, useState, createContext, ReactNode, FC } from "react"
import { IContactContext, IErrorState } from "./types"
import { IContact } from "@/types"
import { useMutation, useQuery } from "@apollo/client"
import {
  ADD_CONTACT_WITH_PHONES,
  DELETE_CONTACT_PHONE,
  EDIT_CONTACT,
  GET_CONTACT_DETAIL,
  GET_CONTACT_LIST,
} from "@/api"

export const ContactContext = createContext<IContactContext>({
  contacts: [],
  favorites: [],
  query: "",
  selectedContact: undefined,
  selectedContactId: undefined,
  showForm: false,
  page: 1,
  loading: {
    addContact: false,
    getContact: false,
    getContactDetail: false,
    editContact: false,
    deleteContact: false,
    addPhone: false,
  },
  error: {
    addContact: undefined,
    getContact: undefined,
    getContactDetail: undefined,
    editContact: undefined,
    deleteContact: undefined,
    addPhone: undefined,
  },

  addContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},
  updateQuery: () => {},

  updatePage: () => {},

  addFavorite: () => {},
  deleteFavorite: () => {},

  selectContact: () => {},
  updateSelectedContactId: () => {},

  updateShowForm: () => {},
})

interface ContactProviderProps {
  children: ReactNode
}

const ContactProvider: FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [favorites, setFavorites] = useState<IContact[]>([])
  const [selectedContact, setSelectedContact] = useState<IContact>()
  const [selectedContactId, setSelectedContactId] = useState<number>()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState({
    addContact: false,
    getContact: false,
    getContactDetail: false,
    editContact: false,
    deleteContact: false,
    addPhone: false,
  })

  const [page, setPage] = useState(1)
  const [error, setError] = useState<IErrorState>({
    addContact: undefined,
    getContact: undefined,
    getContactDetail: undefined,
    editContact: undefined,
    deleteContact: undefined,
    addPhone: undefined,
  })

  // BEGIN getContactList block

  const {
    loading: getContactListLoading,
    error: getContactListError,
    data: contactList,
    refetch: refetchContactList,
  } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: page > 1 ? (page - 1) * 10 : 0,
      where: {
        first_name: { _ilike: `%${query}%` },
      },
    },
  })

  useEffect(() => {
    setError((prev) => {
      return {
        ...prev,
        getContact: getContactListError,
      }
    })
  }, [getContactListError])

  useEffect(() => {
    setLoading((prev) => {
      return {
        ...prev,
        getContact: getContactListLoading,
      }
    })
  }, [getContactListLoading])

  useEffect(() => {
    refetchContactList()
  }, [page])

  // END getContactList block

  // if (getContactListLoading) {
  //   setLoading((prev) => {
  //     return {
  //       ...prev,
  //       getContact: true,
  //     }
  //   })
  // }

  // BEGIN getContactDetail block

  const {
    loading: getContactDetailLoading,
    error: getContactDetailError,
    data: contactDetail,
  } = useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: selectedContactId,
    },
    skip: !selectedContactId,
  })

  useEffect(() => {
    if (contactDetail && contactDetail.contact_by_pk) {
      console.log("fetched contact detail", contactDetail.contact_by_pk)
      setSelectedContact(contactDetail.contact_by_pk)
      updateShowForm(true)
    }
  }, [contactDetail])

  useEffect(() => {
    setError((prev) => {
      return {
        ...prev,
        getContact: getContactDetailError,
      }
    })
  }, [getContactDetailError])

  useEffect(() => {
    setLoading((prev) => {
      return {
        ...prev,
        getContact: getContactDetailLoading,
      }
    })
  }, [getContactDetailLoading])

  // END getContactDetail block

  // const {
  //   loading: getPhoneListLoading,
  //   error: getPhoneListError,
  //   data: phoneList,
  // } = useQuery(GET_PHONE_LIST, {
  //   variables: {

  //   }
  // })

  // BEGIN addContact block

  const [
    addContactMutation,
    { loading: addContactLoading, error: addContactError },
  ] = useMutation(ADD_CONTACT_WITH_PHONES)

  useEffect(() => {
    setError((prev) => {
      return {
        ...prev,
        getContact: addContactError,
      }
    })
  }, [addContactError])

  useEffect(() => {
    setLoading((prev) => {
      return {
        ...prev,
        getContact: addContactLoading,
      }
    })
  }, [addContactLoading])

  // END addContact block

  // const [
  //   addNumberMutation,
  //   { loading: addNumberLoading, error: addNumberError },
  // ] = useMutation(ADD_NUMBER_TO_CONTACT)

  // BEGIN editContact block

  const [
    editContactMutation,
    { loading: editContactLoading, error: editContactError },
  ] = useMutation(EDIT_CONTACT)

  useEffect(() => {
    setError((prev) => {
      return {
        ...prev,
        getContact: editContactError,
      }
    })
  }, [editContactError])

  useEffect(() => {
    setLoading((prev) => {
      return {
        ...prev,
        getContact: editContactLoading,
      }
    })
  }, [editContactLoading])

  // END editContact block

  // const [
  //   editNumberMutation,
  //   { loading: editNumberLoading, error: editNumberError },
  // ] = useMutation(EDIT_PHONE_NUMBER)

  // BEGIN deleteContact block

  const [
    deleteContactMutation,
    { loading: deleteContactLoading, error: deleteContactError },
  ] = useMutation(DELETE_CONTACT_PHONE)

  useEffect(() => {
    setError((prev) => {
      return {
        ...prev,
        getContact: deleteContactError,
      }
    })
  }, [deleteContactError])

  useEffect(() => {
    setLoading((prev) => {
      return {
        ...prev,
        getContact: deleteContactLoading,
      }
    })
  }, [deleteContactLoading])

  // END deleteContact block

  useEffect(() => {
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

  useEffect(() => {
    if (contactList && contactList.contact) {
      setContacts(contactList.contact)
    }
  }, [contactList])

  const addContact = async (contact: Omit<IContact, "id">) => {
    await addContactMutation({
      variables: {
        ...contact,
      },
    })
    await refetchContactList()
  }

  const updateContact = async (contact: IContact) => {
    await editContactMutation({
      variables: {
        id: contact.id,
        _set: {
          first_name: contact.first_name,
          last_name: contact.last_name,
          phones: contact.phones,
        },
      },
    })
    setContacts((prev) => {
      return prev.map((item) => (item.id === contact.id ? contact : item))
    })
  }

  const deleteContact = async (id: number) => {
    await deleteContactMutation({
      variables: {
        id: id,
      },
    })
    await refetchContactList()
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
    setSelectedContact(
      id ? contacts.find((contact) => contact.id === id) : undefined
    )
    console.log("selected contact")
  }

  const updateShowForm = (show: boolean) => {
    setShowForm(show)
  }

  const updatePage = (page: number) => {
    setPage(page)
  }

  const updateSelectedContactId = (id?: number) => {
    setSelectedContactId(id ? id : undefined)
  }

  const updateQuery = (query: string) => {
    setQuery(query)
  }

  return (
    <ContactContext.Provider
      value={{
        contacts,
        favorites,
        showForm,
        loading,
        query,
        error,
        selectedContact,
        selectedContactId,
        page,
        updateQuery,
        updatePage,
        addContact,
        updateContact,
        deleteContact,
        addFavorite,
        deleteFavorite,
        selectContact,
        updateShowForm,
        updateSelectedContactId,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export default ContactProvider
