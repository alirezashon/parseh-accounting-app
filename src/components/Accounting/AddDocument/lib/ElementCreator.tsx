import Input from '@/components/hub/Forms/Input'
import SingleSelectList from '@/components/hub/Forms/SingleSelectList'
import TextArea from '@/components/hub/Forms/TextArea'
import MultiSelectTrees from '@/components/hub/MultiSelectTrees'
import InputNumber from '@/components/hub/Forms/types/Inputs/Numerics'
import Calendar from '@/components/hub/Calendar'
import Selectree from './Selectree/Tree'
import { FieldConfig, treeData } from './data'

export function buildForm<TKeys extends string>(
  state: Record<TKeys, string | number>,
  setState: React.Dispatch<
    React.SetStateAction<Record<TKeys, string | number>>
  >,
  onChange?: (values: Record<TKeys, string>) => void
) {
  return function elementCreator(cfg: FieldConfig, hideLabel?: boolean) {
    const { key, label = '', type, options = [], placeholder } = cfg
    const value = state[key as TKeys] ?? ''

    const update = (val: string | number) => {
      setState((prev) => {
        const updated = {
          ...prev,
          [key]: val,
        }
        console.log(val)
        if (onChange) {
          const mapped: Record<TKeys, string> = {} as any
          for (const k in updated) {
            mapped[k as TKeys] = String(updated[k])
          }
          onChange(mapped)
        }

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

      case 'select':
      case 'singleselect':
        control = (
          <SingleSelectList
            label={hideLabel ? '' : label}
            items={options.map((o, i) => ({ id: i, label: o }))}
            setSelectedItems={(id) => update(options[id as number])}
          />
        )
        break

      case 'multiselecttrees':
        control = (
          <MultiSelectTrees
            trees={treeData}
            placeholder={placeholder || label}
            label={hideLabel ? '' : label}
            onSelect={(ids) => update(ids.join(','))}
          />
        )
        break

      case 'selectree':
        control = (
          <Selectree
            treeData={treeData}
            label={hideLabel ? '' : label}
            // TODO: implement `onSelect` if needed
          />
        )
        break

      default:
        control = null
    }

    return <div className="hamghzis w-full">{control}</div>
  }
}
