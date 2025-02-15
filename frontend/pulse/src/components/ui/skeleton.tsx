import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
<<<<<<< HEAD
      className={cn("animate-pulse rounded-md bg-muted", className)}
=======
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
>>>>>>> d913826 (frontend added and event entity changes)
      {...props}
    />
  )
}

export { Skeleton }
