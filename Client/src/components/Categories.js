import {
  GiTravelDress,
  GiSleevelessJacket,
  GiSkirt,
  GiPirateCoat,
  GiMonclerJacket,
  GiLabCoat,
  GiClothes,
} from "react-icons/gi";
import { PiPantsBold, PiHoodieBold, PiHoodieFill } from "react-icons/pi";
import { TbJacket, TbShirtSport } from "react-icons/tb";
import { LiaTshirtSolid } from "react-icons/lia";

const Categories = [
  {
    title: "menFashion",
    items: [
      {
        title: "shirts",
        id: 5,
        icon: <LiaTshirtSolid />,
        category: "men",
        subcategory: "Shirts",
      },
      {
        title: "tshirts&polos",
        id: 7,
        icon: <TbShirtSport />,
        category: "men",
        subcategory: "TshirtsPolos",
      },
      {
        title: "pants",
        id: 8,
        icon: <PiPantsBold />,
        category: "men",
        subcategory: "JeansPants",
      },
      {
        title: "suits",
        id: 2,
        icon: <TbJacket />,
        category: "men",
        subcategory: "Suits",
      },
      {
        title: "jackets&coats",
        id: 3,
        icon: <GiSleevelessJacket />,
        category: "men",
        subcategory: "JacketsCoats",
      },
      {
        title: "pullover",
        id: 7,
        icon: <PiHoodieBold />,
        category: "men",
        subcategory: "Pullover",
      },
      {
        title: "hoodies",
        id: 7,
        icon: <PiHoodieFill />,
        category: "men",
        subcategory: "Hoodies",
      },
      {
        title: "sports",
        id: 7,
        icon: <TbShirtSport />,
        category: "men",
        subcategory: "sportswear",
      },
      {
        title: "homewear",
        id: 7,
        icon: <GiClothes />,
        category: "men",
        subcategory: "Homewear",
      },
    ],
  },
  {
    title: "womenFashion",
    items: [
      {
        title: "dressess",
        id: 1,
        icon: <GiTravelDress />,
        category: "women",
        subcategory: "Dresses",
      },
      {
        title: "skirts",
        id: 9,
        icon: <GiSkirt />,
        category: "women",
        subcategory: "Skirts",
      },
      {
        title: "top&blouses",
        id: 6,
        icon: <GiMonclerJacket />,
        category: "women",
        subcategory: "TopsBlouses",
      },
      {
        title: "Cardigans",
        id: 9,
        icon: <GiLabCoat />,
        category: "women",
        subcategory: "Cardigans",
      },
      {
        title: "pants",
        id: 9,
        icon: <PiPantsBold />,
        category: "women",
        subcategory: "JeansPants",
      },
      {
        title: "jackets&coats",
        id: 4,
        icon: <GiPirateCoat />,
        category: "women",
        subcategory: "JacketsCoats",
      },
      {
        title: "suits",
        id: 9,
        icon: <TbJacket />,
        category: "women",
        subcategory: "Suits",
      },
      {
        title: "hoodies",
        id: 9,
        icon: <PiHoodieFill />,
        category: "women",
        subcategory: "Hoodies",
      },
      {
        title: "pullover",
        id: 9,
        icon: <PiHoodieBold />,
        category: "women",
        subcategory: "Pullover",
      },
      {
        title: "sports",
        id: 9,
        icon: <TbShirtSport />,
        category: "women",
        subcategory: "Sportswear",
      },
      {
        title: "homewear",
        id: 9,
        icon: <GiClothes />,
        category: "women",
        subcategory: "Homewear",
      },
    ],
  },
];

export default Categories;