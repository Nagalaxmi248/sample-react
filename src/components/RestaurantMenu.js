import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "../components/Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu().catch((err) => {
    console.error("Failed to fetch menu:", err);
    // Optionally redirect or show message
  });
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/menu/${resId}`);
      if (!response.ok) {
        console.error('API response not OK:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (parseErr) {
        console.error('Failed to parse JSON:', parseErr, '\nRaw response:', text);
        throw parseErr;
      }
      if (json.data) {
        setResInfo(json.data);
      } else {
        console.warn('No .data property in response JSON, using root object:', json);
        setResInfo(json);
      }
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info || {};

  // Set this to the menu section id you want to render
  const menuSectionId = "YOUR_MENU_SECTION_ID_HERE"; // e.g., "123456"

  const itemCards =
    (
      resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        ?.find(c => c.card?.card?.id === menuSectionId && Array.isArray(c.card?.card?.itemCards))
        ?.card?.card?.itemCards || []
    ).filter(item => item?.card?.info?.name);

  return (
    <div className="menu p-4">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-600 mb-4">{cuisines?.join(", ")}</p>
      <h2 className="text-lg font-medium mb-4">Menu</h2>

      <ul className="space-y-4">
        {itemCards.map((item) => (
          <li key={item.card.info.id || item.card.info.name} className="flex flex-col gap-1 border-b pb-4">
            <span className="font-semibold">{item.card.info.name}</span>
            {item.card.info.description && (
              <span className="text-gray-500 text-sm">{item.card.info.description}</span>
            )}
            {item.card.info.price && (
              <span className="text-green-700 font-medium">₹{(item.card.info.price / 100).toFixed(2)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
