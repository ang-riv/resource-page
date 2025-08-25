import { subIcons } from "./Icons";
import { btnStyles } from "../utils/groupStyles";
import { ResourceContext } from "../ResourceContext";
import { useContext } from "react";
const DisplaySubCats = () => {
  const { setShowRes, showSubs, setSelectedSub } = useContext(ResourceContext);
  const subBtns = showSubs.slice(1).map((subCat, index) => {
    const icon = subCat.replace(/\d+/g, "ten").toLowerCase();
    const iconString = icon.split(" ")[0];
    return (
      <button
        key={subCat}
        className={`h-28  ${btnStyles(
          index
        )} font-bold text-xl w-28 leading-6  active:text-white hover:text-white hover:cursor-pointer flex flex-col justify-center items-center`}
        onClick={() => {
          setSelectedSub(subCat);
          setShowRes(true);
        }}
      >
        <div className="py-1.5">{subIcons[iconString]}</div>
        <p className="w-fit">{subCat}</p>
      </button>
    );
  });
  return subBtns;
};

export default DisplaySubCats;
