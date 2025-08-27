import { RowItem } from './lib'

const Accountable: React.FC<{
  title: string
  rows: RowItem[]
  color: string
  onRowClick: (rowName: string, color: string) => void
}> = ({ title, rows, color, onRowClick }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full overflow-hidden border border-gray-100'>
      <h3
        style={{ backgroundColor: color }}
        className='text-white text-base font-semibold py-3 text-center'
      >
        {title}
      </h3>
      <table className='w-full divide-y divide-gray-100'>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className='group cursor-pointer transition hover:bg-gray-50'
              onClick={() => onRowClick(row.name, color)}
            >
              <td className='px-4 py-2 text-right text-gray-700 group-hover:text-black text-sm'>
                {row.name}
              </td>
              <td className='px-4 py-2 text-left text-gray-600 group-hover:text-black text-sm'>
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Accountable
