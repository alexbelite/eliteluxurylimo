"use client";
import { motion } from 'framer-motion';

export default function HeaderTitle(){

    return (
        <>
               <motion.h1
        initial={{ opacity: 0, y: 0, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
        className="text-7xl font-medium font-baskerville whitesd max-sm:text-3xl max-md:text-xl outline-1 outline-black outline-solid text-white "
      >
        Elite Luxury Limousine
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="text-3xl max-sm:text-sm max-md:text-md whitesd w-full font-medium font-baskerville text-white"
      >
        Experience isn&apos;t Expensive, it&apos;s Priceless
      </motion.h2>

        </>
        )

}