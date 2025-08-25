import { motion } from "motion/react";
import { subIcons } from "./Icons";
const Loading = () => {
  let dashes = [];
  for (let i = 0; i <= 10; i++) {
    dashes.push(
      <p key={i} className="text-3xl mr-1.5 text-primary-green">
        -
      </p>
    );
  }
  let xPositions = [];
  for (let i = -40; i <= 160; i += 20) {
    xPositions.push(i);
  }
  return (
    <>
      <h4 className="text-4xl mb-3">Loading</h4>
      <div className="w-3/5 flex items-center">
        <motion.div
          className="w-52 h-10 bg-white absolute"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{
            duration: 5,
            ease: "linear",
            delay: 0.5,
            repeat: Infinity,

            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute"
          initial={{ x: -40 }}
          animate={{ x: xPositions }}
          transition={{
            duration: 5,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {subIcons.sewing}
        </motion.div>
        {dashes.length != 0 && dashes.map((dash) => dash)}
      </div>
    </>
  );
};

export default Loading;
