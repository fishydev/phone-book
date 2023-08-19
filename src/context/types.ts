import { IContact } from "@/types"

export interface IContactContext {
  contacts: IContact[]
  favorites: IContact[]

  selectedContact: IContact | undefined
  selectedContactId: number | undefined
  showForm: boolean

  addContact: (contact: Omit<IContact, "id">) => void
  deleteContact: (id: number) => void
  updateContact: (contact: IContact) => void

  addFavorite: (id: number) => void
  deleteFavorite: (id: number) => void

  selectContact: (id?: number) => void
  updateSelectedContactId: (id?: number) => void

  updateShowForm: (show: boolean) => void
}
