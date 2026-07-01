"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-accent text-accent-foreground border border-transparent hover:bg-accent/95 shadow-sm shadow-accent/10 hover:shadow active:translate-y-[1px]",
      secondary: "bg-muted text-foreground border border-transparent hover:bg-muted/80 active:translate-y-[1px]",
      outline: "border border-border bg-transparent hover:border-muted-foreground/50 hover:bg-muted/30 text-foreground active:translate-y-[1px]",
      ghost: "bg-transparent hover:bg-muted/50 text-foreground hover:text-accent",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-lg",
      md: "h-11 px-6 text-base rounded-lg",
      lg: "h-13 px-8 text-lg rounded-lg",
      icon: "h-10 w-10 flex items-center justify-center p-2 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
