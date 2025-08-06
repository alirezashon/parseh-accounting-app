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
    'bg-blue-200  py-4',
    'bg-blue-300 mt-5 py-4 rounded-xl',
    'bg-indigo-400 mt-5 py-4 rounded-xl',
    'bg-purple-500 mt-5 py-4 rounded-xl',
    '',
  ],
  [
    'bg-white my-3 border-y-8 border-blue-300 hover:bg-blue-100 transition-all duration-300 shadow rounded-xl',
    'bg-blue-50 my-2 border-l-4 border-blue-400 hover:bg-blue-200 transition-all duration-300 shadow-md rounded-xl',
    'bg-indigo-100 my-3 border-l-4 border-indigo-400 hover:bg-indigo-300 transition-all duration-300 shadow-md rounded-xl',
    'bg-purple-100 my-3 border-l-4 border-purple-300 hover:bg-purple-200 transition-all duration-300 shadow-md rounded-xl',
  ],
  [
    'bg-blue-100 text-blue-800 border-2 rounded-lg',
    'bg-blue-200 text-blue-800',
    'bg-indigo-300 text-indigo-900',
    'bg-purple-200 text-purple-900',
  ],
  ['text-blue-800', 'text-blue-900', 'text-indigo-700', 'text-purple-800'],
  ['', '', '', ''],
]
