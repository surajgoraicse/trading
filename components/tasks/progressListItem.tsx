"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";

export interface TaskListItemProps {
  icon: string;
  title: string;
  description: string;
  maxValue: number;
  isCurrency: boolean;
  currentValue: number;
  color?: string; // base accent (used in light mode)
}

export default function TaskListItem({
  icon,
  title,
  description,
  currentValue,
  isCurrency,
  maxValue,
  color = "#4f46e5", // Indigo accent default
}: TaskListItemProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const progress = Math.round(((currentValue / maxValue) * 100) * 100) / 100;

  // Adjusted gradients for better visibility in dark mode
  const gradient = isDark
    ? `linear-gradient(90deg, ${color}66, ${color}AA)` // stronger opacity for dark
    : `linear-gradient(90deg, ${color}44, ${color}88)`; // soft for light mode

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "w-full relative flex items-center justify-between rounded-2xl p-4 overflow-hidden transition-all duration-300",
        // Base surfaces
        "bg-card/80 backdrop-blur-sm border border-border shadow-sm",
        // Hover styling
        "hover:shadow-md"
      )}
    >
      {/* Animated gradient fill */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-0 mix-blend-overlay"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          background: gradient,
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 flex items-center gap-4 w-full">
        {/* Icon / Logo */}
        <div className="shrink-0">
          <div
            className={cn(
              "w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border",
              "bg-muted border-border"
            )}
          >
            <Image
              src={icon}
              alt={title}
              width={48}
              height={48}
              className="object-contain w-8 h-8 opacity-90 "
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-sm md:text-base text-card-foreground">
            {title}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-end">
          {isCurrency ?
            <span className="text-sm font-bold">$ {currentValue} / $ {maxValue}</span>
            : <span className="text-sm font-bold">{currentValue} /{maxValue} </span>
          }
          <span
            className={cn(
              "font-semibold text-xs",
              progress >= 70
                ? isDark
                  ? "text-green-400"
                  : "text-green-600"
                : "text-card-foreground/80"
            )}
          >
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
