import { motion } from "motion/react";
import { ResourceContext } from "../ResourceContext";
import { useContext } from "react";
import { FocusTrap } from "focus-trap-react";
const ResourceInfo = () => {
  const { openRes, setOpenRes, resources } = useContext(ResourceContext);
  const showResInfo = () => {
    const resIndex = resources.findIndex((res) => res.title === openRes);
    const currentRes = resources[resIndex];
    let infoCounter = 0;

    let embedPDF, embedVid;

    // pdf
    if (currentRes.pdf != undefined && currentRes.pdf != "") {
      const pdfMatch = currentRes.pdf.match(/\/d\/([^/]+)/)[1];
      embedPDF = `https://drive.google.com/file/d/${pdfMatch}/preview`;
      infoCounter++;
    }
    // video
    if (currentRes.video != undefined && currentRes.video != "") {
      // if it's a youtube vid or a google vid
      if (currentRes.video.includes("you")) {
        const vidMatch = currentRes.video.match(
          /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/
        );
        embedVid = `https://www.youtube.com/embed/${vidMatch?.[1]}`;
      } else {
        const vidMatch = currentRes.video.match(/\/d\/([^/]+)/);
        if (vidMatch) {
          const fileID = vidMatch[1];
          embedVid = `https://drive.google.com/file/d/${fileID}/preview`;
        } else {
          console.log("could not extract file ID");
        }
      }
      infoCounter++;
    }

    return (
      <div className="w-full h-full absolute bg-white py-2 flex flex-col md:px-3">
        <h4 className="w-full text-center font-bold text-3xl my-2 underline underline-offset-3">
          {currentRes.title}
        </h4>
        {currentRes.pdf != undefined && currentRes.pdf != "" && (
          <>
            <div className="ml-0.5">
              <p className="text-lg">✦ PDF Instructions</p>
              <a
                href={embedPDF}
                target="_blank"
                className="text-blue-600 underline hover:cursor-pointer"
              >
                Open in separate tab.
              </a>
            </div>
            <iframe
              src={embedPDF}
              className={`w-full ${infoCounter === 1 ? "h-10/10" : "h-5/10"}`}
              tabIndex={-1}
            ></iframe>
          </>
        )}
        {currentRes.video != undefined && currentRes.video != "" && (
          <>
            <div className="mt-2">
              <p className="text-lg">✦ Video</p>
              <a
                href={currentRes.video}
                target="_blank"
                className="text-blue-600 underline"
              >
                Open in separate tab.
              </a>
            </div>
            <iframe
              src={embedVid}
              tabIndex={-1}
              className={`w-full ${infoCounter === 1 ? "h-10/10" : "h-5/10"}`}
            ></iframe>
          </>
        )}
      </div>
    );
  };
  const variants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
    hover: { scale: 1.1 },
  };
  return (
    <FocusTrap>
      <div className="fixed h-full w-full z-10 flex justify-center items-center">
        <div className="fixed bg-black opacity-30 h-full w-full"></div>
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          transition="transition"
          className="w-11/12 h-9/10 bg-white absolute max-w-5xl"
        >
          <motion.button
            variants={variants}
            whileHover="hover"
            className="h-9 w-9 m-2 rounded-full fixed bg-black/30 z-20 font-bold hover:cursor-pointer hover:bg-accent-red hover:text-white"
            onClick={() => setOpenRes("")}
          >
            X
          </motion.button>
          {showResInfo()}
        </motion.div>
      </div>
    </FocusTrap>
  );
};

export default ResourceInfo;
