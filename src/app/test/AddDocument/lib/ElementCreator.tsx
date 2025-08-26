import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import { FieldConfig, treeData } from './data'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import Calendar from '@/components/hub/Calendar'
import Selectree from './Selectree/Tree'
 
export function buildForm<TKeys extends string>(
  state: Record<string, FieldConfig>,
  setState: React.Dispatch<React.SetStateAction<Record<string, FieldConfig>>>,
  changeData: (val: Record<string, string>) => void
) {
  return function elementCreator(cfg: FieldConfig, hideLabel?: boolean) {
    const { key, label = '', type, options = [], placeholder } = cfg
    const value = state[key]?.value ?? ''

    const update = (val: string | number) => {
      setState((prev) => {
        const updated = {
          ...prev,
          [key]: {
            ...prev[key],
            value: val,
          },
        }

        // استخراج همه مقادیر برای ارسال به changeData
        const result: Record<string, string> = {}
        for (const k in updated) {
          result[k] = String(updated[k]?.value ?? '')
        }

        changeData(result)
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
            value={(value as string) ?? ''}
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
            value={(value as string) ?? ''}
            onChange={update}
            placeholder={placeholder}
          />
        )
        break
      case 'select':
        control = (
          <SingleSelectList
            label={hideLabel ? '' : label}
            items={options.map((o, i) => ({ id: i, label: o }))}
            setSelectedItems={(id: number | string) =>
              update(options[id as number])
            }
          />
        )
        break
      case 'number':
        control = (
          <InputNumber
            label={hideLabel ? '' : label}
            value={Number(value) || 0}
            onChange={update}
            placeholder={placeholder || '0'}
          />
        )
        break
      case 'calendar':
        control = (
          <Calendar
            label={hideLabel ? '' : label}
            placeholder={placeholder}
            setDate={(iso: string) => update(iso)}
          />
        )
        break
      case 'singleselect':
        control = (
          <SingleSelectList
            label={hideLabel ? '' : label}
            items={(options || []).map((o, i) => ({ id: i, label: o }))}
            setSelectedItems={(id: number | string) =>
              update(options![id as number])
            }
          />
        )
        break
      case 'multiselecttrees':
        control = (
          <MultiSelectTrees
            trees={treeData}
            placeholder={placeholder || label}
            label={hideLabel ? '' : label}
            onSelect={(ids: string[]) => update(ids)}
          />
        )
      case 'selectree':
        control = (
          <Selectree
            treeData={treeData}
            // placeholder={placeholder || label}
            label={hideLabel ? '' : label}
            // onSelect={(ids: string[]) => update(ids)}
          />
        )
        break
      default:
        control = null
    }

    return <div className="hamghzis w-full">{control}</div>
  }
}
