"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; 

export default function CTAButton({ children, className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-block bg-[#e4a400] text-white px-6 py-3 rounded-lg",
        "text-lg font-semibold transition-all duration-200",
        "hover:shadow-lg focus:outline-none focus:ring-2",
        "focus:ring-[#e4a400] focus:ring-opacity-50",
        className
      )}
    >
      {children}
    </motion.button>
  );
}