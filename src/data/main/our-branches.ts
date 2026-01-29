import { Branch } from "@/interfaces";

export const branchImages: string[] = [
  "/images/السعودية.jpg",
  "/images/الاردن٠.jpg",
  "/images/١البحرين.jpg",
  "/images/الكويت٣.jpg",
  "/images/الصين٣.jpg",
  "/images/الصين٣.jpg",
];
export const branches: Branch[] = [
  { key: "hq", image: branchImages[0] },
  { key: "regional-jordan", image: branchImages[1] },
  { key: "regional-bahrain", image: branchImages[2] },
  { key: "regional-kuwait", image: branchImages[3] },
  { key: "international-china", image: branchImages[4] },
  { key: "international-hongkong", image: branchImages[5] },
];
