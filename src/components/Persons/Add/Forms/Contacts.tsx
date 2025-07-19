import Input from '@/components/hub/Forms/Input'

type ContactsProps = {
  contacts: {
    phone: string
    mobile: string
    fax: string
  }
  setContacts: (data: Partial<ContactsProps['contacts']>) => void
}

const contactLabels: Record<keyof ContactsProps['contacts'], string> = {
  phone: 'تلفن',
  mobile: 'موبایل',
  fax: 'فکس',
}

const Contacts = ({ contacts, setContacts }: ContactsProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {Object.keys(contacts).map((key) => (
        <Input
          key={key}
          onChange={(value) => setContacts({ ...contacts, [key]: value })}
          value={contacts[key as keyof typeof contacts]}
          label={contactLabels[key as keyof typeof contacts]}
        />
      ))}
    </div>
  )
}

export default Contacts
