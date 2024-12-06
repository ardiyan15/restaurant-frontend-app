import React, { useEffect, useRef, useState } from "react";
import Card from "../Elements/Card";
import fetchRestaurant from "../../services/fetchRestaurant";
import { ListItem } from "../../interfaces/interface";

const List: React.FC = () => {
  const [listData, setListData] = useState<ListItem[]>([]);
  const pageRef = useRef<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    openingTime: "",
    closingTime: "",
    day: ""
  });

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetchRestaurant({
        page: pageRef.current
      });

      const fetchedData: ListItem[] = response.data.data.data;

      if (pageRef.current <= response.data.data.last_page) {
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

  const handleFilter = async () => {
    const response = await fetchRestaurant({
        page: 1,
        name: filters.name,
        date: filters.date,
        openingTime: filters.openingTime,
        closingTime: filters.closingTime,
        day: filters.day
      });

      const fetchedData: ListItem[] = response.data.data.data;
      setListData(fetchedData);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
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
        <div className="col-3 mb-3">
          <label htmlFor="">Name</label>
          <input type="text" name="restaurantName" className="form-control" value={filters.name} onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}/>
        </div>
        <div className="col-3 mb-3">
          <label htmlFor="">Date</label>
          <input type="date" name="createdAt" className="form-control" value={filters.date} onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}/>
        </div>
        <div className="col-3 mb-3">
          <label htmlFor="">Opening Time</label>
          <input type="time" name="restaurant_name" className="form-control" value={filters.openingTime} onChange={(e) => setFilters((prev) => ({ ...prev, openingTime: e.target.value }))}/>
        </div>
        <div className="col-3 mb-3">
          <label htmlFor="">Closing Time</label>
          <input type="time" name="restaurant_name" className="form-control" value={filters.closingTime} onChange={(e) => setFilters((prev) => ({ ...prev, closingTime: e.target.value }))}/>
        </div>
        <div className="col-3 mb-3">
          <label htmlFor="">Open Day</label>
          <select name="day" id="" className="form-control" onChange={(e) => setFilters((prev) => ({ ...prev, day: e.target.value }))}>
            <option value="">-- Select Day --</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="col-12 mb-3">
        <button className="btn btn-primary btn-sm rounded" onClick={handleFilter}>Seach</button>
        </div>
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
