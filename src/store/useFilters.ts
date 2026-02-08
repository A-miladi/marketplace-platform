import { IFilters } from "@/types/general";
import { create } from "zustand";

const initialFilters: IFilters = {
  date_from: null,
  date_to: null,
  price_max: null,
  price_min: null,
};

interface IFiltersStore {
  filters: IFilters;
  setFilters: (v: Partial<IFilters>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<IFiltersStore>((set) => ({
  filters: initialFilters,
  setFilters: (v) => set((state) => ({ filters: { ...state.filters, ...v } })),
  resetFilters: () => set({ filters: initialFilters }),
}));
