import Input from '@/components/hub/Forms/Input'

type OthersProps = {
  others: {
    birthDate: string
    marriageDate: string
    membershipDate: string
  }
  setOthers: (data: Partial<OthersProps['others']>) => void
}

const othersLabels: Record<keyof OthersProps['others'], string> = {
  birthDate: 'تاریخ تولد',
  marriageDate: 'تاریخ ازدواج',
  membershipDate: 'تاریخ عضویت',
}

const Others = ({ others, setOthers }: OthersProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {Object.keys(others).map((key) => (
        <Input
          key={key}
          onChange={(value) => setOthers({ ...others, [key]: value })}
          value={others[key as keyof typeof others]}
          label={othersLabels[key as keyof typeof others]}
        />
      ))}
    </div>
  )
}

export default Others
