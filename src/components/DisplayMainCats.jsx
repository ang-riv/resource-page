import { mainIcons } from "../assets/imgs/icons";
import { btnStyles } from "../utils/groupStyles";
const DisplayMainCats = ({
  mainCats,
  setSelectedMain,
  setSectionSize,
  setShowRes,
}) => {
  return (
    <>
      <h2 className="text-[2.5em]">Categories</h2>
      <div className="flex flex-col min-w-[250px] min-h-[150px] justify-between mt-5.5">
        {mainCats.length != 0 &&
          mainCats.map((cat, index) => (
            <button
              key={cat}
              className={`font-bold h-fit py-2 flex justify-base items-center 
                                  active:text-white  hover:text-white text-lg hover:cursor-pointer ${btnStyles(
                                    index
                                  )}`}
              onClick={() => {
                setSelectedMain(cat);
                setSectionSize(true);
                setShowRes(false);
              }}
            >
              <div className="pl-1.5">{mainIcons[index]}</div>
              <p className="grow-1">{cat}</p>
            </button>
          ))}
      </div>
    </>
  );
};

export default DisplayMainCats;
