export interface TreeChartInterface {
  id: number
  chpid: number
  chtitle: string
  chstatus: number
  chlevel: number
  lev1_count: number
  chlabel?: string | null
}

export const levelol: string[][] = [
  [
    '',
    'bg-blue-50   ',
    'bg-indigo-50  ',
    'bg-blue-50  ',
    '',
  ],
  [
    'bg-white  border-y-2 border-blue-100 hover:bg-blue-100 transition-all duration-300 shadow  ',
    'bg-blue-50 mx-5 my-2 border-l-4 border-blue-400 hover:bg-blue-200 transition-all duration-300 shadow-md  ',
    'bg-indigo-100 mx-16 my-3 border-l-4 border-indigo-400 hover:bg-indigo-300 transition-all duration-300 shadow-md ',
    'bg-purple-100 my-3 mx-32 border-l-4 border-purple-300 hover:bg-purple-200 transition-all duration-300 shadow-md ',
  ],
  [
    'bg-blue-100 text-blue-800 border-2 rounded-lg',
    'bg-blue-200 text-blue-800',
    'bg-indigo-300 text-indigo-900',
    'bg-purple-200 text-purple-900',
  ],
  ['text-blue-800', 'text-blue-900', 'text-indigo-700', 'text-blue-100'],
  ['', '', '', ''],
]
