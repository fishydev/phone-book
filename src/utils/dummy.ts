import { IContact } from "@/types"
import { faker } from "@faker-js/faker"

const dummyContacts: IContact[] = [
  {
    id: 1,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    created_at: faker.date
      .recent({
        days: 30,
      })
      .toISOString(),
    phones: [
      {
        number: faker.phone.number("+62#########"),
      },
    ],
  },
  {
    id: 2,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    created_at: faker.date
      .recent({
        days: 30,
      })
      .toISOString(),
    phones: [
      {
        number: faker.phone.number("+62#########"),
      },
    ],
  },
  {
    id: 3,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    created_at: faker.date
      .recent({
        days: 30,
      })
      .toISOString(),
    phones: [
      {
        number: faker.phone.number("+62#########"),
      },
    ],
  },
  {
    id: 4,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    created_at: faker.date
      .recent({
        days: 30,
      })
      .toISOString(),
    phones: [
      {
        number: faker.phone.number("+62#########"),
      },
      {
        number: faker.phone.number("+62#########"),
      },
    ],
  },
]

const dummyFavorites = dummyContacts.slice(0, 2)

export { dummyContacts, dummyFavorites }
