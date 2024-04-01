import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import axios from "axios";

export const useBooks = create(
  devtools(
    persist(
      (set, get) => ({
        books: [],
        loading: false,
        error: null,
        searchBooks: (topic, searchKey, maxResults = 5, startIndex = 1) => {
          set({ loading: true });

          axios
            .get(
              `https://www.googleapis.com/books/v1/volumes?q=${searchKey}+subject:${topic}&maxResults=${maxResults}&startIndex=${startIndex}`
            )
            .then((res) => {
              if (startIndex >= res.data.totalItems || startIndex < 1) {
                set({
                  error: `max reults must be between 1 and ${res.data.totalItems}`,
                });
              } else {
                if (res.data.items.length > 0) {
                  set({ books: res.data.items, error: null });

                  set({ loading: false });
                }
              }
            })
            .catch((err) => {
              set({ error: err.response });
              set({ loading: false });
            });
        },
      }),
      {
        name: "book-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useVideos = create(
  devtools(
    persist(
      (set, get) => ({
        videos: [],
        loading: false,
        error: null,
        searchVideos: (topic, searchKey, maxResults = 5, startIndex = 1) => {
          set({ loading: true });
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${searchKey}+subject:${topic}&maxResults=${maxResults}&startIndex=${startIndex}`
            )
            .then((res) => {
              if (startIndex >= res.data.totalItems || startIndex < 1) {
                set({
                  error: `max reults must be between 1 and ${res.data.totalItems}`,
                });
              } else {
                if (res.data.items.length > 0) {
                  set({ videos: res.data.items, error: null });

                  set({ loading: false });
                }
              }
            })
            .catch((err) => {
              set({ error: err.response });
              set({ loading: false });
            });
        },
      }),
      {
        name: "video-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
