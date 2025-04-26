import { Skeleton } from "@/components/ui/skeleton"

export default function MenuItemSkeleton() {
  return (
    <div className="flex py-4">
      <Skeleton className="w-20 h-20 rounded-lg mr-4 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/4 mt-1" />
      </div>
    </div>
  )
}
