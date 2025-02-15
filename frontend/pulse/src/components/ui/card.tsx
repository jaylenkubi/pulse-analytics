import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
<<<<<<< HEAD
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"rounded-lg border bg-card text-card-foreground shadow-sm",
			className
		)}
		{...props}
	/>
=======
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[calc(var(--radius))] border-border border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
>>>>>>> d913826 (frontend added and event entity changes)
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
<<<<<<< HEAD
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
=======
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
>>>>>>> d913826 (frontend added and event entity changes)
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
<<<<<<< HEAD
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"text-2xl font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	/>
=======
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
>>>>>>> d913826 (frontend added and event entity changes)
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
<<<<<<< HEAD
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
=======
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
>>>>>>> d913826 (frontend added and event entity changes)
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
<<<<<<< HEAD
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
=======
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
>>>>>>> d913826 (frontend added and event entity changes)
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
<<<<<<< HEAD
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
=======
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
>>>>>>> d913826 (frontend added and event entity changes)
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
