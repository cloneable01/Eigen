import { useEffect, useState } from "react";
import "./App.css";
import { getTopHeadlines } from "./helper/_helper";
import NewsTable from "./component/Table";
import Navbar from "./component/Navbar";
import { Button, Alert, Empty } from "antd";
import { SmileTwoTone, FrownTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Article } from "./model";

function App() {
  const [data, setData] = useState<Article[]>([]);
  const [refetch, setRefetch] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("general");
  const [alertData, setAlertData] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("us");

  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);
    setRefetch((prev) => prev + 1);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    setRefetch((prev) => prev + 1);
  };

  const handleSearch = () => {
    setRefetch((prev) => prev + 1);
  };

  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      setLoading(true);
      setData([]);
      try {
        const headlines = await getTopHeadlines(
          selectedCountry,
          category,
          search
        );
        setData(headlines);
        setAlertData({
          type: "success",
          message: "Successfully updated data",
        });
      } catch (error) {
        setAlertData({ type: "error", message: "Server Error" });
      } finally {
        setLoading(false);
      }
      setTimeout(() => {
        setAlertData(null);
      }, 5000);
    };

    fetchTopHeadlines();
  }, [refetch, selectedCountry, category]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className=" relative">
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar
          search={search}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          onCountryChange={handleCountryChange}
          onCategoryChange={handleCategoryChange}
          onSearchKeyPress={handleSearchKeyPress}
        />
      </div>
      <div className="pt-20">
        {data.length > 0 ? (
          <>
            {!loading && (
              <h1 className="text-black text-left mb-4">Top Headlines</h1>
            )}
            <NewsTable data={data} loading={loading} />
          </>
        ) : (
          <>
            <div className="flex mb-12">
              <h1 className="mr-4 text-black">
                No news related to your search
              </h1>
              <FrownTwoTone className="text-3xl my-auto" />
            </div>
            <Empty />
          </>
        )}
      </div>

      <Button className="fixed top-20 left-2 z-[100]" onClick={handleSearch}>
        {!loading ? (
          <>
            Refetch Data!
            <SmileTwoTone className="ml-2" />
          </>
        ) : (
          <>
            Loading...
            <LoadingOutlined className="ml-2" />
          </>
        )}
      </Button>
      {alertData && (
        <Alert
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData(null)}
          closable
          className="fixed top-32 left-2 z-[100]"
        />
      )}
    </div>
  );
}

export default App;
