export interface IPhone {
  number: string
}

export interface IContact {
  last_name: string
  id: number
  first_name: string
  created_at: string
  phones: IPhone[]
}
