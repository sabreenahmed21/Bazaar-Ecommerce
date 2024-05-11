
export const availableSizes = ["Small", "Medium", "Large", "Extra Large"];
export const availableBrands = [
  "Nike",
  "Adidas",
  "Puma",
  "Gucci",
  "Versace",
  "Azeez",
  "Ricci",
  "Defacto",
  "Active",
];
export const discountOptions = [
  {
    label: "50",
    value: "gte50",
    queryParam: "discountPercentage[gte]=50",
  },
  {
    label:"40",
    value: "gte40",
    queryParam: "discountPercentage[gte]=40&discountPercentage[lt]=50",
  },
  {
    label: "30",
    value: "gte30",
    queryParam: "discountPercentage[gte]=30&discountPercentage[lt]=40",
  },
  {
    label: "20",
    value: "gte20",
    queryParam: "discountPercentage[gte]=20&discountPercentage[lt]=30",
  },
  {
    label: "10",
    value: "gte10",
    queryParam: "discountPercentage[gte]=10&discountPercentage[lt]=20",
  },
  {
    label: "L10",
    value: "lt10",
    queryParam: "discountPercentage[lte]=10",
  },
];
export const ratingOptions = [
  {
    label: "4.5",
    value: "gte4.5",
    queryParam: "rating[gte]=4.5",
  },
  {
    label: "4",
    value: "gte4",
    queryParam: "rating[gte]=4",
  },
  {
    label: "3.5",
    value: "gte3.5",
    queryParam: "rating[gte]=3.5",
  },
];