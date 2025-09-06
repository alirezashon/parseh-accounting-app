import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import Calendar from '@/components/hub/Calendar'
import Selectree from './Selectree/Tree'
import { FieldConfig, Selectreetwo } from './data'
import { TreeChartInterface } from '../../hub/AcctypesLevels/lib/data'
export function buildForm<TKeys extends string>({
  state,
  setState,
  treeData,
  selectreeData,
  singleSelectListData,
}: {
  state: Record<TKeys, string | number>
  setState: React.Dispatch<React.SetStateAction<Record<TKeys, string | number>>>
  treeData?: TreeChartInterface[]
  selectreeData?: Selectreetwo[]
  singleSelectListData?: { id: string | number; label: string }[]
}) {
  return function elementCreator(cfg: FieldConfig, hideLabel?: boolean) {
    const { key, label = '', type, options = [], placeholder } = cfg
    const value = state?.[key as TKeys] ?? ''
    const update = (val: string | number) => {
      setState((prev) => {
        const updated = {
          ...prev,
          [key]: val,
        }
        console.log(val)
        return updated
      })
    }
    let control: React.ReactNode = null
    switch (type) {
      case 'text':
      case 'date':
        control = (
          <Input
            label={hideLabel ? '' : label}
            value={String(value)}
            onChange={update}
            placeholder={placeholder}
            className="w-full"
          />
        )
        break
      case 'textarea':
        control = (
          <TextArea
            label={hideLabel ? '' : label}
            value={String(value)}
            onChange={update}
            placeholder={placeholder}
          />
        )
        break
      case 'number':
        control = (
          <InputNumber
            label={hideLabel ? '' : label}
            value={Number(value)}
            onChange={update}
            placeholder={placeholder}
          />
        )
        break
      case 'calendar':
        control = (
          <Calendar
            label={hideLabel ? '' : label}
            placeholder={
              placeholder || (value as string) || 'یک مورد انتخاب کنید'
            }
            setDate={(iso: string) => update(iso)}
          />
        )
        break

      case 'select':
        control = (
          <SingleSelectList
            label={hideLabel ? '' : label}
            defaultValue={value}
            items={singleSelectListData || []}
            setSelectedItems={(id) => update(options[id as number])}
          />
        )
        break

      case 'multiselecttrees':
        control = (
          <MultiSelectTrees
            trees={selectreeData || []}
            placeholder={placeholder || label}
            label={hideLabel ? '' : label}
            onSelect={(ids) => update(ids.join(','))}
          />
        )
        break

      case 'selectree':
        control = (
          <Selectree
            label={hideLabel ? '' : label}
            data={treeData}
            onSelect={(node: any) => update(node.fullPath)} // ← استفاده از fullPath
            onUnselect={() => update('')}
            placeholder={
              typeof value === 'string' && value.length > 1 ? value : undefined
            }
          />
        )
        break

      default:
        control = null
    }

    return <div className="hamghzis w-full">{control}</div>
  }
}
