import { create } from 'zustand';

export const useCertificateList = create((set) => ({
  certificates: [],
  setCertificates: (data) => set((state) => ({ ...state, certificates: data })),
}));
