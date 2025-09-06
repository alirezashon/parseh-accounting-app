'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface StatesContextProps {
  submitting: boolean | undefined
  setSubmitting: (value: boolean | undefined) => void
  modalContent: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  } | null
  showModal: (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  }) => void
  closeModal: () => void
}

const StatesContext = createContext<StatesContextProps | undefined>(undefined)

export const StatesProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<{
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  } | null>(null)

  const [submitting, setSubmitting] = useState<boolean>()
  const showModal = (content: {
    main: ReactNode
    title: string
    type?: 'success' | 'error' | 'info'
    autoClose?: number
    hideButton?: boolean
  }) => setModalContent(content)
  const closeModal = () => setModalContent(null)
  const [permissions, setPermissions] = useState<
    [string[], string[], number[]]
  >([[''], [''], [0]])
  return (
    <StatesContext.Provider
      value={{
        modalContent,
        showModal,
        closeModal,
        submitting,
        setSubmitting,
      }}
    >
      {children}
    </StatesContext.Provider>
  )
}
export const useStates = () => {
  const context = useContext(StatesContext)
  if (!context) {
    throw new Error('productStates Provider')
  }
  return context
}
