import { create } from 'zustand';

export const useInstitutionList = create((set) => ({
  institutions: [],
  setInstitutions: (data) => set((state) => ({ ...state, institutions: data })),
}));
