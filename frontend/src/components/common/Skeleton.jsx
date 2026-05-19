import { cn } from '../../utils/cn'

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-border/30 rounded',
        className
      )}
    />
  )
}
