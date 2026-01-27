import { SectionItem } from "@/interfaces";

export const whoWeServeSections: SectionItem[] = [
  {
    key: "delivery-companies",
    image: "/images/شركات-التوصيل.jpg",
    flip: false,
    bulletKeys: ["smart-boxes", "tracking", "refrigerated"],
  },
  {
    key: "logistics-fleets",
    image: "/images/شركات-اللوجيستك.jpg",
    flip: true,
    bulletKeys: ["performance", "maintenance", "charging"],
  },
  {
    key: "individuals-couriers",
    image: "/images/المناديب-والافراد.jpg",
    flip: false,
    bulletKeys: ["economic", "zero-emissions", "gig-workers"],
  },
  {
    key: "municipalities-urban",
    image: "/images/البلديات.jpg",
    flip: true,
    bulletKeys: ["infrastructure", "sustainability", "campus"],
  },
  {
    key: "restaurants-stores",
    image: "/images/المطاهم-والمتاجر.jpg",
    flip: false,
    bulletKeys: ["economic", "brand", "navigation"],
  },
];
export const stats: string[] = ["founded", "electric", "hq"];
