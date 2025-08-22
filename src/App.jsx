import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
// cat = categories, res = resources
import logo from "../src/assets/imgs/logo.png";
import { mainIcons, subIcons, BackToTopIcon } from "./assets/imgs/icons";
import Loading from "./Loading";
import DisplaySubCats from "./components/DisplaySubCats";
import ResourceInfo from "./components/ResourceInfo";
import ShowResources from "./components/ShowResources";
function App() {
  // google sheets api info
  const apiKey = import.meta.env.VITE_API_KEY;
  const sheetID = import.meta.env.VITE_SHEET_ID;
  const catRange = "Categories!A:C";
  const resRange = "Resources!A:G";

  const [loading, isLoading] = useState(true);

  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [resources, setResources] = useState([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [showSubs, setShowSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [openRes, setOpenRes] = useState("");

  // scrolling
  const [sectionSize, setSectionSize] = useState(false);
  const [showRes, setShowRes] = useState(false);

  const mainCatRef = useRef(null);
  const subCatRef = useRef(null);

  const [reminderHover, setReminderHover] = useState(false);

  const scrollToSection = (ref, section) => {
    useEffect(() => {
      if (!ref.current || !section) return;

      const observer = new ResizeObserver(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }, [ref, section]);
  };

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
        isLoading(false);
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
          ([mainCat, subCat, thumbnail, title, video, pdf, videos]) => ({
            mainCat,
            subCat,
            thumbnail,
            title,
            video,
            pdf,
            videos,
          })
        );
        setResources(resObj || {});
      } catch (error) {
        console.error("Error fetching resources: ", error);
      }
    };

    if (selectedMain != "") {
      const subCatIndex = subCats.findIndex(
        (subCat) => subCat[0] === selectedMain
      );
      setShowSubs(subCats[subCatIndex]);
    }
    if (subCatRef.current) {
      subCatRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // fetch all res
    const timer = setTimeout(() => {
      fetchCats();
      fetchRes();
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedMain, showRes]);
  // scrolling
  scrollToSection(mainCatRef, sectionSize);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // styles
  const containerStyles =
    "min-w-[300px] bg-white h-fit p-2 [&:not(header)]:mt-5 shadow-[rgba(0,0,0,0.25)_3px_3px_6px,rgba(0,0,0,0.18)_6px_6px_12px]";
  const dashContainerStyles =
    "dash-border w-full h-full flex flex-col justify-center items-center py-5";
  const mainBtnColors = [
    "bg-accent-red/30",
    "bg-accent-orange/30",
    "bg-accent-green/30",
  ];
  const mainBtnHovers = [
    "hover:bg-accent-red",
    "hover:bg-accent-orange",
    "hover:bg-accent-green",
  ];
  const mainBtnActive = [
    "active:bg-accent-red",
    "active:bg-accent-orange",
    "active:bg-accent-green",
  ];
  const mainBtnStyles = (index) => {
    return `${mainBtnColors[index]} ${mainBtnHovers[index]} ${mainBtnActive[index]}`;
  };

  // fcns

  const variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 15 },
    transition: { delay: 0.3, duration: 0.7 },
  };
  return (
    <>
      {openRes != "" && (
        <ResourceInfo
          openRes={openRes}
          setOpenRes={setOpenRes}
          resources={resources}
        />
      )}
      <div className="min-h-screen bg-beige flex items-center justify-center lg:p-5">
        {
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-0 right-0 bg-black/30 rounded-full p-1 m-1.5 hover:cursor-pointer hover:bg-accent-red hover:text-white"
            onClick={() => scrollToTop()}
          >
            <BackToTopIcon />
          </motion.button>
        }
        {/* header */}
        <motion.div className="w-full h-fit bg-primary-green flex justify-start flex-col p-2 items-center min-[600px]:border-14 min-[600px]:border-gray-400 min-[600px]:py-4 max-w-5xl md:m-3">
          {/* content wrapper */}
          <motion.div className="w-fit" key="wrapper">
            <AnimatePresence mode="sync">
              <motion.header
                key="header"
                className={`${containerStyles} max-w-[650px]`}
                {...variants}
              >
                <div className={`${dashContainerStyles} md:flex-row`}>
                  <img
                    src={logo}
                    alt=""
                    className="w-[160px] h-[160px] md:w-[80px] md:h-[80px] md:mr-3"
                  />
                  <h1 className="text-[2.7rem] text-center leading-10  mt-7">
                    Ms. Shane's <br className="md:hidden" /> Resource Page
                  </h1>
                </div>
              </motion.header>
              <motion.main key="main" className="w-full h-fit max-w-[650px]">
                {/* reminder */}
                <motion.div
                  className={containerStyles}
                  onMouseEnter={() => setReminderHover(true)}
                  onMouseLeave={() => setReminderHover(false)}
                  {...variants}
                >
                  <div
                    className={`${dashContainerStyles} md:flex-row md:items-start`}
                  >
                    <h2 className="text-3xl md:mr-2">Friendly Reminder: </h2>
                    <div className="flex items-baseline">
                      <p className="font-semibold mt-2 text-md">
                        try before you cry for help
                      </p>
                      <motion.p
                        className="ml-1"
                        animate={
                          reminderHover
                            ? { scale: 1.6, rotate: [0, 15, -15, 15, 0] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.6 }}
                      >
                        😁
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
                {/* main cat buttons */}
                {/* cat wrapper */}
                <div className="md:flex md:flex-row md:justify-center md:gap-x-5">
                  <motion.div
                    className={`${containerStyles} min-h-[371px]`}
                    {...variants}
                  >
                    <div
                      className={`${dashContainerStyles} min-h-[355px] py-9`}
                    >
                      {loading ? (
                        <Loading />
                      ) : (
                        <>
                          <h2 className="text-[2.5em]">Categories</h2>
                          <div className="flex flex-col min-w-[250px] min-h-[150px] justify-between mt-5.5">
                            {mainCats.length != 0 &&
                              mainCats.map((cat, index) => (
                                <button
                                  key={cat}
                                  className={`font-bold h-fit py-2 flex justify-base items-center 
                                  active:text-white  hover:text-white text-lg hover:cursor-pointer ${mainBtnStyles(
                                    index
                                  )}`}
                                  onClick={() => {
                                    setSelectedMain(cat);
                                    setSectionSize(true);
                                    setShowRes(false);
                                  }}
                                >
                                  <div className="pl-1.5">
                                    {mainIcons[index]}
                                  </div>
                                  <p className="grow-1">{cat}</p>
                                </button>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                  {/* sub cats */}
                  <motion.div
                    className={containerStyles}
                    ref={subCatRef}
                    {...variants}
                  >
                    <div className={dashContainerStyles} ref={mainCatRef}>
                      {selectedMain != "" ? (
                        <>
                          <h2 className="text-[2.5em]">{selectedMain}</h2>
                          <div className="w-[250px] mt-5 gap-3 flex justify-center flex-wrap">
                            <DisplaySubCats
                              showSubs={showSubs}
                              mainBtnStyles={mainBtnStyles}
                              setSelectedSub={setSelectedSub}
                              setShowRes={setShowRes}
                            />
                          </div>
                        </>
                      ) : (
                        <p className="font-semibold hover:underline">
                          Select a category.
                        </p>
                      )}
                    </div>
                  </motion.div>
                </div>
                {/* resources */}
                <motion.div
                  key="resourceSection"
                  className="md:grid md:grid-cols-2 md:gap-x-5"
                  style={{ overflow: "hidden" }}
                  animate={
                    showRes
                      ? {
                          scaleY: 1,
                          height: "auto",
                          opacity: 1,
                          transition: { opacity: { delay: 0.3 } },
                        }
                      : {
                          scaleY: 0,
                          height: "0px",
                          opacity: 0,
                          transition: {
                            scaleY: { delay: 0.3, duration: 0.6 },
                            height: { delay: 0.3, duration: 0.6 },
                          },
                        }
                  }
                  transition={{
                    duration: 0.6,
                  }}
                >
                  <ShowResources
                    selectedSub={selectedSub}
                    resources={resources}
                    setOpenRes={setOpenRes}
                  />
                </motion.div>
              </motion.main>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default App;
