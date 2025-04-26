import { Skeleton } from "@/components/ui/skeleton"

export default function ItemDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      <Skeleton className="h-[40vh] w-full" />
      <div className="p-6 flex-1 flex flex-col">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
