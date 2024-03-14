import { AnimatePresence, motion } from "framer-motion";
import React from 'react'

type props={
    open:boolean,
    children:React.ReactNode
}

function WrappedAnimation({open=true,children}:props) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          variants={{
            collapsed: {
              height: 0,
              marginTop: 0,
              marginBottom: 0,
              opacity: 0,
            },
            expanded: {
              height: "auto",
              marginTop: "1rem",
              marginBottom: "3rem",
              opacity: 1,
            },
          }}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          transition={{ duration: 0.15 }}
          className="relative col-span-full"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default WrappedAnimation