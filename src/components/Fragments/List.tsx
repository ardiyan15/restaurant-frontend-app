import React, { useEffect, useRef, useState } from "react";
import Card from "../Elements/Card";
import fetchRestaurant from "../../services/fetchRestaurant";
import { ListItem } from "../../interfaces/interface";

const List: React.FC = () => {
  const [listData, setListData] = useState<ListItem[]>([]);
  //   const [page, setPage] = useState<number>(1);
  const pageRef = useRef<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetchRestaurant(pageRef.current);
      const fetchedData: ListItem[] = response.data.data.data;

      if (pageRef.current <= response.data.data.last_page) {
        //   setListData(fetchedData)
        setListData((prev) => [...prev, ...fetchedData]);
        pageRef.current++;
      } else {
        setHasMore(response.data.current_page < response.data.last_page);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50 // Load more when near bottom
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <>
      <div className="row">
        {listData.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            operating_hours={item.operating_hours}
          />
        ))}
        {isLoading && (
        <div className="w-100 text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
        )}
        {!hasMore && <p className="text-center">No more data to load.</p>}
      </div>
    </>
  );
};

export default List;
