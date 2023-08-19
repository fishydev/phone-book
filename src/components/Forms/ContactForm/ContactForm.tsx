import { useContext, useState } from "react"
import { ContactIcon, PhoneIcon } from "@/components/Icons"
import { Input } from "@/components/Input"
import styled from "@emotion/styled"
import { ContactContext } from "@/context/contactContext"
import { Button } from "@/components/Button"

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    background-color: white;
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    height: 100%;
  `,
  InputGroupContainer: styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 0.5rem;
    border: 1px solid gainsboro;
    border-radius: 0.5rem;
    padding: 0.5rem;
  `,
  NameInputGroup: styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem;
  `,
  PhoneInputGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  InputGroupIcon: styled.div`
    padding: 0.25rem 0 0 0.5rem;
  `,
  FormAction: styled.div`
    display: flex;
    gap: 0.5rem;
    flex-grow: 1;
    align-items: end;
  `,
  SubmitButton: styled(Button)`
    border: 1px solid #2c2fff;
    background-color: #2c2fff;
    color: white;
  `,
  AddPhoneButton: styled(Button)`
    border: 1px solid #2c2fff;
    background-color: #2c2fff;
    color: white;
  `,
  CancelButton: styled(Button)`
    border: 1px solid #d0d0d0;
    background-color: #d0d0d0;
    color: black;
  `,
}

const ContactForm = () => {
  const {
    selectedContact,
    selectContact,
    updateContact,
    addContact,
    updateShowForm,
    showForm,
  } = useContext(ContactContext)

  const [firstName, setFirstName] = useState(
    selectedContact ? selectedContact.first_name : ""
  )
  const [lastName, setLastName] = useState(
    selectedContact ? selectedContact.last_name : ""
  )
  const [phones, setPhones] = useState(
    selectedContact ? selectedContact.phones : [{ number: "" }]
  )

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (selectedContact) {
      updateContact({
        id: selectedContact?.id,
        first_name: firstName,
        last_name: lastName,
        phones: phones,
        created_at: selectedContact?.created_at,
      })
    } else {
      addContact({
        first_name: firstName,
        last_name: lastName,
        phones: phones,
        created_at: new Date().toISOString(),
      })
    }
    updateShowForm(false)
    selectContact()
    // console.log("submitted")
  }

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    selectContact()
    updateShowForm(false)
    // console.log("cancelled")
  }

  const handleAddNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPhones((prev) => {
      return [
        ...prev,
        {
          number: "",
        },
      ]
    })
  }

  const onChangeFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value)
  }
  const onChangeLastName = (e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value)
  }

  const onChangeNumber = (index: number, newNumber: string) => {
    const updatedPhones = [...phones]
    updatedPhones[index] = {
      number: newNumber,
    }

    setPhones(updatedPhones)
  }

  return (
    <S.Container>
      <S.Form>
        <S.InputGroupContainer>
          <S.InputGroupIcon>
            <ContactIcon />
          </S.InputGroupIcon>
          <S.NameInputGroup>
            <Input
              label="First Name"
              value={firstName}
              onChange={onChangeFirstName}
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={onChangeLastName}
            />
          </S.NameInputGroup>
        </S.InputGroupContainer>
        <S.InputGroupContainer>
          <S.InputGroupIcon>
            <PhoneIcon />
          </S.InputGroupIcon>
          <S.PhoneInputGroup>
            {phones.map((phone, index) => (
              <Input
                key={phone.number}
                value={phone.number}
                onChange={(e) => onChangeNumber(index, e.target.value)}
              />
            ))}
          </S.PhoneInputGroup>
        </S.InputGroupContainer>
        <S.AddPhoneButton onClick={(e) => handleAddNumber(e)}>
          Add Phone Number
        </S.AddPhoneButton>
        <S.FormAction>
          <S.SubmitButton type="submit" onClick={handleSubmit}>
            Submit
          </S.SubmitButton>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
        </S.FormAction>
      </S.Form>
    </S.Container>
  )
}

export default ContactForm
