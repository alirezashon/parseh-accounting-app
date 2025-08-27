'use client'
import { useEffect, useState, useRef } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'

type GenericRow = {
  id: number
  [key: string]: any
}

type FieldConfig = {
  key: string
  label: string
  type: 'text' | 'number'
  readonly?: boolean
}

type EditableTableProps = {
  rows: GenericRow[]
  fields: FieldConfig[]
  onRowClick: (row: GenericRow) => void
  color?: string
  className?: string
  searchMode?: boolean
}

const EditableTable: React.FC<EditableTableProps> = ({
  rows,
  fields,
  onRowClick,
  color = '#2F27CE',
  className,
  searchMode = false,
}) => {
  const [data, setData] = useState<GenericRow[]>([])
  const [filters, setFilters] = useState<{ [key: string]: string }>({})
  const [columnWidths, setColumnWidths] = useState<number[]>(
    Array(fields.length + 1).fill(300)
  )
  const [columns, setColumns] = useState<FieldConfig[]>(fields)
  const [selectedRows, setSelectedRows] = useState<FieldConfig[] | null>()
  const dragColIndex = useRef<number | null>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    setData(rows)
  }, [rows])

  const handleInputChange = (
    id: number,
    key: string,
    value: string,
    type: string
  ) => {
    if (type === 'number' && value !== '' && !/^[\d]*$/.test(value)) return
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    )
  }

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((row) => row.id !== id))
  }

  const handleResize = (index: number, startX: number, startWidth: number) => {
    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + e.clientX - startX
      setColumnWidths((prev) => {
        const newWidths = [...prev]
        newWidths[index] = Math.max(80, newWidth)
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

  const filteredData = data.filter((row) =>
    columns.every((field) => {
      const filterValue = filters[field.key]?.toLowerCase()
      if (!filterValue) return true
      return String(row[field.key] ?? '')
        .toLowerCase()
        .includes(filterValue)
    })
  )

  const handleDragStart = (index: number) => {
    dragColIndex.current = index
  }

  const handleDrop = (index: number) => {
    if (dragColIndex.current === null || dragColIndex.current === index) return
    const newColumns = [...columns]
    const [removed] = newColumns.splice(dragColIndex.current, 1)
    newColumns.splice(index, 0, removed)
    setColumns(newColumns)
    dragColIndex.current = null
  }

  return (
    <div
      className={`${className} bg-white max-h-[70vh] rounded-2xl  overflow-auto border border-[#3573e7] shadow-md shadow-[blue] `}
    >
      <div className='max-h-[6ز0vh] overflow-auto'>
        <table
          ref={tableRef}
          className='min-w-max max-md:min-w-0  text-sm select-none table-fixed'
          style={{ borderCollapse: 'collapse' }}
        >
          <thead>
            <tr
              style={{ backgroundColor: color }}
              className='text-white sticky top-0 z-20'
            >
              <th className='absolute border-l right-0 py-3 px-4 text-center font-semibold   top-0 bg-inherit z-10'>
                عملیات
              </th>
              {columns.map((field, i) => (
                <th
                  key={field.key}
                  className='py-3 px-4 text-center font-semibold relative whitespace-nowrap bg-inherit'
                  style={{ width: columnWidths[i], cursor: 'grab' }}
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(i)}
                >
                  {i !== 0 && (
                    <div
                      onMouseDown={(e) =>
                        handleResize(i, e.clientX, columnWidths[i])
                      }
                      className='w-1 hover:w-2 absolute top-0 right-0 h-full cursor-col-resize bg-[#ced9df] hover:bg-[#b0dbf7]'
                    />
                  )}
                  <div>{field.label}</div>
                </th>
              ))}
            </tr>

            {searchMode && (
              <tr className='bg-gray-50 sticky top-[42px] z-10'>
                <th className='bg-[#f9feff] flex justify-center items-center gap-1 transition-all duration-700'>
                  <input
                    type='checkbox'
                    onClick={() =>
                      selectedRows
                        ? setSelectedRows(null)
                        : setSelectedRows(fields)
                    }
                    defaultChecked={selectedRows?.length === fields.length}
                    className={`cursor-pointer accent-[${color}] w-5 hover:rotate-12`}
                  />
                  {selectedRows && selectedRows?.length > 1 && (
                    <MdDeleteForever
                      size={32}
                      onClick={(e) => {
                        e.stopPropagation()
                        // handleDelete()
                      }}
                      className={`cursor-pointer hover:-rotate-12 text-red-400 hover:bg-red-50 rounded-full hover:text-red-600 text-2xl transition`}
                    />
                  )}
                </th>

                {columns.map((field, i) => (
                  <th
                    key={field.key}
                    style={{ width: columnWidths[i] }}
                    className='bg-gray-50'
                  >
                    <input
                      value={filters[field.key] || ''}
                      onChange={(e) =>
                        setFilters({ ...filters, [field.key]: e.target.value })
                      }
                      className='w-full text-sm px-2 py-1 focus:outline-none focus:ring focus:ring-blue-100'
                      placeholder='جستجو...'
                    />
                  </th>
                ))}
                <th className='bg-gray-50'></th>
              </tr>
            )}
          </thead>

          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className='transition hover:bg-gray-50 cursor-pointer'
                onClick={() => onRowClick(row)}
              >
                <td className='py-2 flex w-20 gap-2 justify-center'>
                  <BiTrash
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(row.id)
                    }}
                    className='hover:-rotate-12 text-red-500 hover:bg-red-50 rounded-full hover:text-red-600 text-2xl transition'
                  />
                  <BiEdit
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(row.id)
                    }}
                    className='hover:-rotate-12 text-blue-600 hover:bg-red-50 rounded-full hover:text-red-600 text-2xl transition'
                  />
                </td>
                {columns.map((field, i) => (
                  <td
                    key={field.key}
                    className='py-2 px-4 text-center hover:bg-blue-200'
                    style={{ width: columnWidths[i] }}
                  >
                    <input
                      inputMode={field.type === 'number' ? 'numeric' : 'text'}
                      value={row[field.key] ?? ''}
                      readOnly={field.readonly}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          field.key,
                          e.target.value,
                          field.type
                        )
                      }
                      className='w-full text-center outline-none bg-transparent'
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EditableTable
