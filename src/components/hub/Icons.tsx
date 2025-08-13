import { AiFillCloseSquare } from 'react-icons/ai'
import { ReactElement } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { MdEditDocument } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'

export const iconso: Record<string, ReactElement> = {
  close: (
    <AiFillCloseSquare className="text-3xl bg-red-500 text-red-300 rounded-full border-2" />
  ),
  check: (
    <GiCheckMark
      size={28}
      className="text-2xl bg-green-200 text-green-500 rounded-full border-2"
    />
  ),
  edit: (
    <MdEditDocument
      size={28}
      className="text-2xl  text-blue-500 hover:text-blue-700 "
    />
  ),
  trash: (
    <BiTrash className="text-3xl  bg-red-100 text-red-500 hover:bg-red-300 cursor-pointer" />
  ),
}
