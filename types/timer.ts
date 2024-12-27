import { Category } from "@/types/category";

export type Timer = {
  id: string;
  title: string;
  category: Category | null;
  seconds: number;
  sortIndex: number;
};
