import { motion } from "motion/react";
import { ResourceContext } from "../ResourceContext";
import { useContext } from "react";
const ShowResources = ({ selectedSub }) => {
  const { setOpenRes, resources } = useContext(ResourceContext);
  const selectedRes = resources.filter((res) => res.subCat === selectedSub);
  const showRes = selectedRes.map((res, index) => {
    // making the thumbnail
    let imgSrc;
    const thumbnail = res.thumbnail;
    const fileID = thumbnail.match(/\/d\/([^/]+)/)?.[1];
    imgSrc = `https://drive.google.com/thumbnail?id=${fileID}&sz=w600`;
    return (
      <motion.div
        key={index}
        whileHover={{ scale: 0.97 }}
        className="bg-white h-[350px] mt-5 shadow-[rgba(0,0,0,0.25)_3px_3px_6px,rgba(0,0,0,0.18)_6px_6px_12px] hover:cursor-pointer hover:outline-3 hover:outline-accent-yellow"
      >
        <h3 className="bg-accent-yellow w-fit pl-3 pr-2 text-2xl absolute mt-4 shadow-sm shadow-gray-600">
          {res.title}
        </h3>
        <img
          src={imgSrc}
          className="w-full h-full p-2 object-cover"
          onClick={() => setOpenRes(res.title)}
          loading="lazy"
          alt=""
        />
      </motion.div>
    );
  });
  return showRes;
};

export default ShowResources;
