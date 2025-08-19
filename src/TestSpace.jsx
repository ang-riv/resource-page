import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TestSpace = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-pink-300">
      <motion.div
        initial={{ height: 0 }}
        animate={show ? { height: "auto" } : { height: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="min-h-20 w-96 bg-accent-green border-5 border-accent-green"
        style={{ overflow: "hidden" }}
      >
        <motion.div className="w-full" layout="preserve-aspect"></motion.div>
        <div className="min-w-96 h-10 bg-accent-orange"></div>
        <AnimatePresence mode="wait">
          {show && (
            <div>
              <motion.div
                key="content2"
                initial={{ opacity: 0, height: "1px" }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: { delay: 0.8, duration: 0.3, ease: "easeInOut" },
                }}
                exit={{ opacity: 0, height: "1px" }}
                className="min-h-96 w-16 bg-purple-600"
              ></motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
      <button
        className="bg-yellow-700 py-2 px-3 rounded-full"
        onClick={() => setShow(!show)}
      >
        Resize
      </button>
    </div>
  );
};

export default TestSpace;
