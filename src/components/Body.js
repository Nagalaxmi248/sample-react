import RestaurantCard from "../components/RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";


// not using keys (not acceptable)  <<<<<< index as key <<<<<< unique id as key

const Body = () => {
    //local state variable - super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    console.log("Body Rendered");

   useEffect(() => {
    fetchData();
   },[]);

const fetchData = async () => {
  const data = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.470596&lng=78.553147&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
));
    // const data = await fetch(
    //     "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.470596&lng=78.553147&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );
//     const data = await fetch(
//   "http://localhost:8010/proxy/dapi/restaurants/list/v5?lat=17.470596&lng=78.553147&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
// );

      if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const json = await data.json();

    console.log(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );

   // console.log(json);

    //Optional chaining
    setListOfRestaurants(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
    setFilteredRestaurant(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);

    // setListOfRestaurants(json.data?.cards[2].data?.data?.cards);
    // setFilteredRestaurant(json.data?.cards[2]?.data?.data?.cards);

  };
  
return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
        <div className="body">
            <div className="filter">
		          <div className="search">
			          <input type="text" className="search-box" 
                value={searchText}
                onChange={(e) => { 
                  setSearchText(e.target.value);
                }}
                />
                <button onClick={() => {
            //filter the restaurant cards and update the UI
            //searchText
            // console.log(searchText);

            const searchRestaurant = listOfRestaurants.filter((res) => 
              res.info.name.toLowerCase().includes(searchText.toLowerCase()));

            setFilteredRestaurant(searchRestaurant);

          }}>Search</button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const topRated = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.2
            );
            setFilteredRestaurant(topRated);
          }}
          >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
