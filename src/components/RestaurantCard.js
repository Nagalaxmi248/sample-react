import React from "react";
import resList from "../utils/mockData";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    name,
    isOpen,
    avgRating,
    totalRatingsString,
    sla,
    image, 
  } = resData?.info;

  // console.log("Restaurant Image:", image);

  return (
    <div className="res-card" style={{ backgroundColor: "#d5ceceff" }}>
      <img
        className="res-logo"
        alt="res-logo"
        src={image}
        style={{
          width: "100%",
          maxHeight: "700px",
          objectFit: "cover"
        }}
      />
      <h3>{name}</h3>
      <h4>{isOpen ? "Open Now" : "Closed"}</h4>
      <h4>{avgRating} ⭐ ({totalRatingsString} reviews)</h4>
      <h4>Delivery Time: {sla?.slaString}</h4>
    </div>
  );
};

export default RestaurantCard;
