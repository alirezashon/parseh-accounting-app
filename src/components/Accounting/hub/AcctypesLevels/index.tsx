"use client";
import MainHead from "@/components/Headers/MainHead";
import MainLayout from "@/layouts/Main";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsDatabaseFillGear } from "react-icons/bs";
import {
  FaChevronLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaPlusCircle,
} from "react-icons/fa";
import { FaChartPie, FaDiagramProject } from "react-icons/fa6";

export interface TreeChartInterface {
  id: number;
  chpid: number;
  chtitle: string;
  chstatus: number;
  chlevel: number;
  lev1_count: number;
  chlabel?: string | null;
}

const generateMockTreeData = (
  maxLevel: number = 3,
  maxItemsPerLevel: number = 10
): TreeChartInterface[] => {
  let idCounter = 1;
  const data: TreeChartInterface[] = [];

  const generateChildren = (parentId: number, level: number) => {
    if (level > maxLevel) return;

    const count = Math.min(2, maxItemsPerLevel); // Max 2 per node to keep tree shape
    for (let i = 0; i < count; i++) {
      const newItem: TreeChartInterface = {
        id: idCounter,
        chpid: parentId,
        chtitle: `Level ${level} - Node ${idCounter}`,
        chstatus: 1,
        chlevel: level,
        lev1_count: 0,
      };
      data.push(newItem);
      const currentId = idCounter;
      idCounter++;
      generateChildren(currentId, level + 1);
    }
  };

  // Start with top-level nodes (level 0)
  for (let i = 0; i < maxItemsPerLevel; i++) {
    const rootItem: TreeChartInterface = {
      id: idCounter,
      chpid: 0,
      chtitle: `Level 0 - Node ${idCounter}`,
      chstatus: 1,
      chlevel: 0,
      lev1_count: 0,
    };
    data.push(rootItem);
    const rootId = idCounter;
    idCounter++;
    generateChildren(rootId, 1);
  }

  return data;
};

const mockData: TreeChartInterface[] = generateMockTreeData();

const colors = [
  "text-blue-50",
  "text-blue-100",
  "text-blue-100",
  "text-blue-800",
  "text-red-700",
];
const labels = [
  "bg-blue-900",
  "bg-blue-700",
  "bg-blue-500",
  "bg-blue-300",
  "bg-blue-100",
];

const AcctypesLevels = () => {
  const [treeData, setTreeData] = useState<TreeChartInterface[]>(mockData);
  const [openTrees, setOpenTrees] = useState<number[]>([]);
  const [editableRow, setEditableRow] = useState<TreeChartInterface | null>(
    null
  );

  const toggleNode = (id: number) => {
    setOpenTrees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!editableRow) return;
    setTreeData((prev) =>
      prev.map((item) =>
        item.id === editableRow.id ? { ...item, ...editableRow } : item
      )
    );
    setEditableRow(null);
  };

  const renderTree = (parentId: number, level = 0): React.JSX.Element => {
    const nodes = treeData.filter((node) => node.chpid === parentId);
    return (
      <ul
        className={`pl-4 ${
          nodes[parentId] && "border-r border-slate-300"
        }  border-gray-700 rounded-2xl`}
      >
        {nodes.map((node) => {
          const isEditing = editableRow?.id === node.id;
          return (
            <li
              key={node.id}
              className={`${
                node.chlevel === 3 && "m-20"
              } mb-2 mr-9 border-r-5 ${
                node.chlevel === 2 && "border-dotted"
              } rounded-2xl my-3 border-l-5 shadow-2xs hover:scale-105 bg-white border-y-2 border-blue-200  shadow-blue-100 transition-all duration-1000`}
              style={{
                borderLeft:
                  node.chlevel === 3
                    ? "22px ridge #2F27CE"
                    : node.chlevel === 2
                    ? "22px ridge #2F27CE"
                    : "",
              }}
            >
              <div
                className={`flex items-center p-2 rounded-md text-blue-800 cursor-pointer `}
                onClick={() => toggleNode(node.id)}
              >
                <FaChevronLeft
                  className={`transition-transform duration-300 ${
                    openTrees.includes(node.id) ? "-rotate-90" : ""
                  }`}
                />
                <div className="flex-1 flex items-center gap-4 ml-2">
                  {isEditing ? (
                    <input
                      className="border rounded px-2"
                      value={editableRow?.chtitle || ""}
                      onChange={(e) =>
                        setEditableRow(
                          (prev) => prev && { ...prev, chtitle: e.target.value }
                        )
                      }
                    />
                  ) : (
                    <span>{node.chtitle}</span>
                  )}

                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      colors[level % labels.length]
                    } ${labels[level % labels.length]}`}
                  >
                    {isEditing ? (
                      <input
                        className="border-none bg-transparent max-w-[80px] text-center"
                        defaultValue={node?.chlabel || ""}
                        onChange={(e) =>
                          setEditableRow(
                            (prev) =>
                              prev && { ...prev, chlabel: e.target.value }
                          )
                        }
                      />
                    ) : (
                      node.chlabel || "بدون برچسب"
                    )}
                  </span>

                  {isEditing && (
                    <>
                      <FaCheckCircle
                        className="text-green-600 cursor-pointer"
                        onClick={handleSave}
                      />
                      <FaTimesCircle
                        className="text-red-600 cursor-pointer"
                        onClick={() => setEditableRow(null)}
                      />
                    </>
                  )}

                  {!isEditing && (
                    <FaEdit
                      className="text-indigo-600 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditableRow(node);
                      }}
                    />
                  )}
                  <FaPlusCircle
                    className="text-indigo-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`افزودن زیرشاخه برای: ${node.chtitle}`);
                    }}
                  />
                </div>
              </div>
              {openTrees.includes(node.id) && (
                <div className="pl-6">{renderTree(node.id, level + 1)}</div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <MainLayout>
      <MainHead
        icons={[
          {
            icon: <FaChartPie size={30} />,
            label: "گزارش‌ها",
            destination: "/reports",
          },
          {
            icon: <BsDatabaseFillGear size={30} />,
            label: "کسب‌و‌کار",
            destination: "/bussines",
          },
          {
            icon: <FaDiagramProject size={30} />,
            label: "ارتباطات",
            destination: "/relations",
          },
          {
            icon: <AiFillSetting size={30} />,
            label: "تنظیمات",
            destination: "/setting",
          },
        ]}
      />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="text-xl font-bold mb-6 text-blue-700">
          {" "}
          جدول حساب ها
        </div>
        <div className="bg-white rounded-md p-4 shadow">{renderTree(0)}</div>
      </div>
    </MainLayout>
  );
};

export default AcctypesLevels;
