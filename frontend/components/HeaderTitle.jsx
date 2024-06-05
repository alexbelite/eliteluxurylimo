"use client";
import { motion } from "framer-motion";

export default function HeaderTitle() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 0, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="text-7xl mb-6 font-medium font-baskerville whitesd max-sm:text-3xl max-md:text-xl outline-1 outline-black outline-solid text-white "
      >
        Experience isn&apos;t Expensive, it&apos;s Priceless
      </motion.h1>
    </>
  );
}
