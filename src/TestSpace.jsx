import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { subIcons } from "./assets/imgs/icons";
import Loading from "./Loading";
const TestSpace = () => {
  const [show, setShow] = useState(false);
  const [resize, setResize] = useState(0);
  const [stop, setStop] = useState(false);
  // keep track of the resize, and when it happens, fire animate
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      const divSize = divRef.current.getBoundingClientRect();
      setResize(divSize.height);
    }
  }, [divRef]);
  console.log(resize);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-pink-300">
      <motion.div className="h-fit bg-accent-red">
        <motion.div className="w-1/2 h-10 bg-accent-orange"></motion.div>
        <motion.div
          style={{ overflow: "hidden" }}
          className="w-96 h-52 bg-accent-green border-5 border-accent-green flex justify-center items-center"
          animate={
            show
              ? [{ scaleY: 0, opacity: 0 }, { height: "0px" }]
              : { scaleY: 1 }
          }
        >
          <Loading />
        </motion.div>
      </motion.div>
      <button
        className="bg-yellow-700 py-2 px-3 rounded-full"
        onClick={() => setShow(!show)}
      >
        Resize
      </button>
      <button
        className="bg-yellow-700 py-2 px-3 rounded-full"
        onClick={() => setStop(!stop)}
      >
        Stop
      </button>
    </div>
  );
};

export default TestSpace;
