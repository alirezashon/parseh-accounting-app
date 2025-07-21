'use client'

import React, { useEffect, useState, useRef } from 'react'

type TableRow = {
  id: number
  person: string
  currency: string
  currencyAmount: string
  amountIRR: string
}

type DetailedBankTableProps = {
  rows: TableRow[]
  onRowClick: (row: TableRow) => void
  color?: string
}

const EditableBankTable: React.FC<DetailedBankTableProps> = ({
  rows,
  onRowClick,
  color = '#2F27CE',
}) => {
  const [data, setData] = useState<TableRow[]>([])
  const [columnWidths, setColumnWidths] = useState<number[]>([
    150, 150, 150, 150, 100, 100,
  ])

  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    setData(rows)
  }, [rows])

  const handleInputChange = (
    id: number,
    field: keyof TableRow,
    value: string
  ) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((row) => row.id !== id))
  }

  const handleResize = (index: number, startX: number, startWidth: number) => {
    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + e.clientX - startX
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths]
        newWidths[index] = Math.max(50, newWidth)
        return newWidths
      })
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      className='bg-white rounded-2xl shadow-md overflow-x-auto border'
      style={{ borderColor: color }}
    >
      <table
        ref={tableRef}
        className='min-w-full text-sm table-fixed'
        style={{ borderCollapse: 'collapse' }}
      >
        <thead>
          <tr style={{ backgroundColor: color }} className='text-white'>
            {[
              'شخص',
              'واحد پول',
              'مبلغ ارزی',
              'مبلغ (IRR)',
              'واحد',
              'عملیات',
            ].map((title, i) => (
              <th
                key={i}
                className='py-3 px-4 text-center font-semibold relative whitespace-nowrap'
                style={{ width: columnWidths[i] }}
              >
                {title}
                <div
                  onMouseDown={(e) =>
                    handleResize(i, e.clientX, columnWidths[i])
                  }
                  className='absolute top-0 right-0 w-1 h-full cursor-col-resize'
                  style={{ zIndex: 10 }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className='transition hover:bg-gray-50 cursor-pointer'
              onClick={() => onRowClick(row)}
            >
              {[
                row.person,
                row.currency,
                row.currencyAmount,
                row.amountIRR,
                'ریال',
                '',
              ].map((cell, i) => (
                <td
                  key={i}
                  className='py-2 px-4 text-center'
                  style={{ width: columnWidths[i] }}
                >
                  {i < 4 ? (
                    <input
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          ['person', 'currency', 'currencyAmount', 'amountIRR'][
                            i
                          ] as keyof TableRow,
                          e.target.value
                        )
                      }
                      className='w-full text-center outline-none bg-transparent'
                    />
                  ) : i === 4 ? (
                    'ریال'
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(row.id)
                      }}
                      className='text-red-500 hover:text-red-700 text-lg transition'
                    >
                      🗑️
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditableBankTable
