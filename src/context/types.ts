import { IContact, IPhone } from "@/types"
import {
  ApolloError,
  OperationVariables,
  MutationResult as ApolloMutationResult,
  QueryResult as ApolloQueryResult,
} from "@apollo/client"

export interface ILoadingState {
  addContact: boolean
  getContact: boolean
  getContactDetail: boolean
  editContact: boolean
  deleteContact: boolean
  addPhone: boolean
}

export interface IErrorState {
  addContact?: ApolloError
  getContact?: ApolloError
  getContactDetail?: ApolloError
  editContact?: ApolloError
  deleteContact?: ApolloError
  addPhone?: ApolloError
}

export interface IContactContext {
  contacts: IContact[]
  favorites: IContact[]
  query: string

  loading: ILoadingState

  error: IErrorState

  page: number

  selectedContact: IContact | undefined
  selectedContactId: number | undefined
  showForm: boolean

  updateQuery: (query: string) => void

  addContact: (contact: Omit<IContact, "id">) => void
  deleteContact: (id: number) => void
  updateContact: (contact: IContact) => void

  updatePage: (page: number) => void

  addFavorite: (id: number) => void
  deleteFavorite: (id: number) => void

  selectContact: (id?: number) => void
  updateSelectedContactId: (id?: number) => void

  updateShowForm: (show: boolean) => void
}
