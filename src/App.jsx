import { useState, useEffect } from "react";
// cat = categories, res = resources
function App() {
  // google sheets api info
  const apiKey = import.meta.env.VITE_API_KEY;
  const sheetID = import.meta.env.VITE_SHEET_ID;
  const catRange = "Categories!A:C";
  const resRange = "Resources!A:G";

  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [resources, setResources] = useState([]);
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
        const colCount = Math.max(...rows.map((row) => row.length));
        const transposed = Array.from({ length: colCount }, (_, colIndex) =>
          rows.map((row) => row[colIndex] || "")
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
          ([mainCat, subCat, thumbnail, pdf, video, link]) => ({
            mainCat,
            subCat,
            thumbnail,
            pdf,
            video,
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
  }, []);
  console.log(resources);
  return (
    <div className="min-h-screen bg-beige">
      <div className="w-full min-h-screen bg-primary-green">
        <h1>Testing</h1>
        {resources.length != 0 &&
          resources.map((cat) => <h2 className="text-4xl">{cat.mainCat}</h2>)}
      </div>
    </div>
  );
}

export default App;
