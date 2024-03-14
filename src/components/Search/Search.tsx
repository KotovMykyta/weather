import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "@/features/cities/citiesSlice";
import { api } from "@/weather-api.ts";
import { RootState } from "@/app/store";

const Search = () => {
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const userUid = useSelector((state: RootState) => state.user.userData?.uid);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${api.base}weather?q=${search}&units=metric&appid=${api.key}`
      );
      if (!response.ok) {
        throw new Error(`Place ${search} was not found`);
      }
      const result = await response.json();
      setSearch("");
      setErrorMsg("");
      dispatch(addCity({ cityId: result.id, userUid }));
    } catch (error: Error) {
      setErrorMsg(error.message);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && search) {
      handleSearch();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <input
          type="text"
          placeholder={`Enter a location and press "Enter"`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={inputRef}
          style={{
            width: "100%",
            borderRadius: "8px",
            border: "1px solid transparent",
            padding: "8px",
            fontSize: "16px",
          }}
        />
        {/* <button onClick={searchPressed}>Search</button> */}
      </div>
      <p>{errorMsg}</p>
    </div>
  );
};

export default Search;

// TODO
// реализовать удаление города
// реализовать подтяжку данных из Firestore
