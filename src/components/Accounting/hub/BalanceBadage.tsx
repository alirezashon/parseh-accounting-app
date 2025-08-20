export function BalanceBadge({ isBalanced }: { isBalanced: boolean }) {
  return (
    <span
      className={`${
        isBalanced ? 'text-emerald-600' : 'text-rose-600'
      } font-medium`}
    >
      {isBalanced ? 'تراز: متعادل' : 'تراز: نامتعادل'}
    </span>
  )
}
