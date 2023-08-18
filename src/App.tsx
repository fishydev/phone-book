import { useState, useContext } from "react"
import "./App.css"
import { FavoriteList } from "@/components/FavoriteList"
import { Search } from "@/components/Search"
import { ContactList } from "@/components/ContactList"
import styled from "@emotion/styled"
import { AddIcon } from "./components/Icons"
import ContactForm from "./components/Forms/ContactForm/ContactForm"
import ContactProvider, { ContactContext } from "./context/contactContext"

const S = {
  Container: styled.div`
    border: 1px solid black;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  AddButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    border-radius: 100%;
    background-color: #1251ff;
    border: none;
  `,
}

function App() {
  const { updateShowForm, showForm } = useContext(ContactContext)

  if (!useContext(ContactContext)) {
    throw new Error(
      "useContext(ContactContext) has to be used within <ContactProvider>"
    )
  }

  return (
    <S.Container>
      <Search />
      <FavoriteList />
      <ContactList />
      <S.AddButton onClick={() => updateShowForm(true)}>
        <AddIcon color="#ffffff" />
      </S.AddButton>
      {showForm && <ContactForm />}
    </S.Container>
  )
}

export default App
