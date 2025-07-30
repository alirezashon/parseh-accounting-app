'use client'
import { RiContactsBookFill } from 'react-icons/ri'
import MainHead from '../Headers/MainHead'
import { GiTakeMyMoney } from 'react-icons/gi'

const Accounting = () => {
  return (
    <div>
      <MainHead
        icons={[
          {
            icon: <RiContactsBookFill size={30} />,
            label: 'سند جدید',
            destination: '/persons',
            act: () => '',
          },
          {
            icon: <GiTakeMyMoney size={30} />,
            label: 'جدول حساب ها',
            destination: '/finance',
            act: () => '',
          },
        ]}
      />
    </div>
  )
}

export default Accounting
