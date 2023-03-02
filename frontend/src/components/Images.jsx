import axios from "axios";
import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

const Images = () => {
  const [imageData, setImageData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfinite);

    return () => {
      window.removeEventListener("scroll", handleInfinite);
    };
  }, []);

  const handleInfinite = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  const fetchData = async () => {
    try {
      let { data } = await axios.get(
        `https://picsum.photos/v2/list?limit=5&page=${page}`
      );
      //   console.log("data:", data);

      setImageData((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <div>
      <UserDetails />

      {loading ? "Loading..." : ""}

      <div className="AllImages">
        {imageData.map((v, i) => {
          const { author, width, height, url, download_url } = v;

          return (
            <div>
              <img src={download_url} alt="" />
              <h3>{author}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Images;
