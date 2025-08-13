import { useState, useEffect } from "react";
// cat = categories, res = resources
import logo from "../src/assets/imgs/logo.png";
const apiKey = import.meta.env.VITE_API_KEY;
const sheetID = import.meta.env.VITE_SHEET_ID;
function App() {
  // google sheets api info

  const catRange = "Categories!A:C";
  const resRange = "Resources!A:G";

  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [resources, setResources] = useState([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [showSubs, setShowSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [openRes, setOpenRes] = useState("");

  useEffect(() => {
    // fetch cats + sub cats
    const fetchCats = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${catRange}?key=${apiKey}`
        );
        const result = await response.json();
        const rows = result.values || [];
        // just the headers
        setMainCats(result.values[1]);

        // group by column
        const excludeTitle = rows.slice(1);
        const colCount = Math.max(...excludeTitle.map((row) => row.length));
        const transposed = Array.from({ length: colCount }, (_, colIndex) =>
          excludeTitle.map((row) => row[colIndex] || "")
        );

        // filter out all empty spots
        const filterTransposed = transposed.map((outerArr) =>
          outerArr.filter((innerArr) => innerArr != "")
        );

        setSubCats(filterTransposed);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    const fetchRes = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${resRange}?key=${apiKey}`
        );
        const result = await response.json();

        // remove headers
        const excludeHeaders = result.values.slice(2);
        const resObj = excludeHeaders.map(
          ([mainCat, subCat, thumbnail, title, video, pdf, link]) => ({
            mainCat,
            subCat,
            thumbnail,
            title,
            video,
            pdf,
            link,
          })
        );
        setResources(resObj || {});
      } catch (error) {
        console.error("Error fetching resources: ", error);
      }
    };
    // fetch all res
    fetchCats();
    fetchRes();

    if (selectedMain != "") {
      const subCatIndex = subCats.findIndex(
        (subCat) => subCat[0] === selectedMain
      );
      setShowSubs(subCats[subCatIndex]);
    }
  }, [selectedMain]);

  // styles
  const containerStyles =
    "min-w-[300px] bg-white h-fit p-2 [&:not(header)]:mt-5";
  const dashContainerStyles =
    "dash-border w=full h-full flex flex-col justify-center items-center py-5";
  const mainBtnColors = [
    "bg-accent-red/30",
    "bg-accent-orange/30",
    "bg-accent-green/30",
  ];

  // fcns
  const displaySubs = () => {
    const subBtns = showSubs.slice(1).map((subCat) => (
      <button
        key={subCat}
        className="h-22 bg-accent-red/30 font-semibold text-xl w-22 leading-6"
        onClick={() => setSelectedSub(subCat)}
      >
        {subCat}
      </button>
    ));
    return subBtns;
  };
  const showResources = () => {
    const selectedRes = resources.filter((res) => res.subCat === selectedSub);
    const showRes = selectedRes.map((res) => {
      // making the thumbnail
      let imgSrc;
      const thumbnail = res.thumbnail;
      const fileID = thumbnail.match(/\/d\/([^/]+)/)?.[1];
      imgSrc = `https://drive.google.com/thumbnail?id=${fileID}`;
      return (
        <div className="min-w-[300px] bg-white h-[350px] mt-5">
          <h3 className="bg-accent-yellow w-fit pl-3 pr-2 text-2xl absolute mt-4">
            {res.title}
          </h3>
          <img
            src={imgSrc}
            className="w-full h-full p-2 object-contain"
            onClick={() => setOpenRes(res.title)}
            alt=""
          />
        </div>
      );
    });
    return showRes;
  };
  return (
    <div className="min-h-screen bg-beige">
      {openRes != "" && (
        <>
          <div className="fixed bg-black h-full w-full opacity-50 z-10"></div>
          <button
            className="h-10 w-10 rounded-full fixed bg-accent-green z-20 font-bold text-white"
            onClick={() => setOpenRes("")}
          >
            X
          </button>
        </>
      )}
      <div className="w-full min-h-screen bg-primary-green flex justify-start flex-col p-2">
        <header className={containerStyles}>
          <div className={dashContainerStyles}>
            <img src={logo} alt="" className="w-[160px] h-[160px]" />
            <h1 className="text-[2.7rem] text-center leading-10 text-shadow-lg/25 text-shadow-gray-500 mt-7">
              Ms. Shane's <br /> Resource Page
            </h1>
          </div>
        </header>
        <main className="w-full h-fit">
          {/* reminder */}
          <div className={containerStyles}>
            <div className={dashContainerStyles}>
              <h2 className="text-2xl">Friendly Remainder: </h2>
              <p className="font-semibold mt-2">try before you cry for help.</p>
            </div>
          </div>
          {/* main cat buttons */}
          <div className={containerStyles}>
            <div className={`${dashContainerStyles} py-9`}>
              <h2 className="text-[2.5em] text-shadow-lg/25 text-shadow-gray-500">
                Categories
              </h2>
              <div className="flex flex-col min-w-[250px] min-h-[150px] justify-between mt-5.5">
                {mainCats.length != 0 &&
                  mainCats.map((cat, index) => (
                    <button
                      key={cat}
                      className={`${mainBtnColors[index]} font-semibold h-fit py-2`}
                      onClick={() => setSelectedMain(cat)}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          {/* main cat + sub cats */}
          <div className={containerStyles}>
            <div className={dashContainerStyles}>
              {selectedMain != "" ? (
                <>
                  <h2 className="text-[2.5em]">{selectedMain}</h2>
                  <div className="w-[250px] mt-5 gap-3 flex justify-center flex-wrap">
                    {displaySubs()}
                  </div>
                </>
              ) : (
                <p className="font-semibold">Select a category.</p>
              )}
            </div>
          </div>
          {/* resources */}
          <div>{showResources()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
