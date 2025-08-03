'use client'
import { useState } from 'react'

interface TreeNode {
  id: number
  title: string
  children?: TreeNode[]
}

const initialTree: TreeNode[] = [
  {
    id: 1,
    title: 'پوشه اصلی',
    children: [
      {
        id: 2,
        title: 'زیرپوشه ۱',
        children: [
          { id: 4, title: 'فایل ۱' },
          { id: 5, title: 'فایل ۲' },
        ],
      },
      {
        id: 3,
        title: 'زیرپوشه ۲',
        children: [],
      },
    ],
  },
]

let uniqueId = 6

export default function Tree() {
  const [tree, setTree] = useState<TreeNode[]>(initialTree)

  const updateTree = (newTree: TreeNode[]) => setTree([...newTree])

  const addNode = (nodes: TreeNode[], parentId: number) => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        const newNode = { id: uniqueId++, title: 'جدید', children: [] }
        return {
          ...node,
          children: node.children ? [...node.children, newNode] : [newNode],
        }
      }
      if (node.children) {
        return { ...node, children: addNode(node.children, parentId) }
      }
      return node
    })
  }

  const editNode = (nodes: TreeNode[], nodeId: number, newTitle: string) => {
    return nodes.map((node) => {
      if (node.id === nodeId) return { ...node, title: newTitle }
      if (node.children) {
        return { ...node, children: editNode(node.children, nodeId, newTitle) }
      }
      return node
    })
  }

  const deleteNode = (nodes: TreeNode[], nodeId: number): TreeNode[] => {
    return nodes
      .map((node) => {
        if (node.children) {
          node.children = deleteNode(node.children, nodeId)
        }
        return node
      })
      .filter((node) => node.id !== nodeId)
  }

  return (
    <div dir='rtl' className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-xl font-bold mb-4'>نمایش درختی</h1>
      <div className='space-y-2'>
        {tree.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            level={0}
            onAdd={(id) => updateTree(addNode(tree, id))}
            onEdit={(id, title) => updateTree(editNode(tree, id, title))}
            onDelete={(id) => updateTree(deleteNode(tree, id))}
          />
        ))}
      </div>
    </div>
  )
}

function TreeNodeItem({
  node,
  level,
  onAdd,
  onEdit,
  onDelete,
}: {
  node: TreeNode
  level: number
  onAdd: (id: number) => void
  onEdit: (id: number, title: string) => void
  onDelete: (id: number) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(node.title)

  const colors = [
    'bg-green-100',
    'bg-yellow-100',
    'bg-blue-100',
    'bg-pink-100',
    'bg-purple-100',
  ]
  const color = colors[level % colors.length]

  return (
    <div
      className={`relative pl-4 border-r-2 border-dashed border-gray-300 ml-4`}
    >
      <div
        className={`p-2 rounded-md flex items-center justify-between ${color} hover:bg-opacity-70 transition`}
      >
        {isEditing ? (
          <input
            type='text'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className='px-2 py-1 border rounded-md'
          />
        ) : (
          <span className='font-medium'>{node.title}</span>
        )}

        <div className='flex space-x-1 space-x-reverse text-sm mr-2'>
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false)
                  onEdit(node.id, newTitle)
                }}
                className='text-green-700 hover:underline'
              >
                ذخیره
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className='text-gray-500 hover:underline'
              >
                لغو
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onAdd(node.id)}
                className='text-blue-600 hover:underline'
              >
                ➕
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className='text-yellow-600 hover:underline'
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(node.id)}
                className='text-red-600 hover:underline'
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className='ml-4 mt-2 space-y-2'>
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
