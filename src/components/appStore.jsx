import create from "zustand";
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
  msgList: [],
  appendMessage: (message) =>
    set((state) => ({ msgList: [...state.msgList, message] })),
  questionList: [],
  appendQuestions: (questions) =>
    set((state) => ({ questionList: [...questions] })),
});
appStore = persist(appStore, { name: "my_app_store" });
export const useAppStore = create(appStore);
