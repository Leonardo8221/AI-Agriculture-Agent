import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

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
              `https://www.googleapis.com/books/v1/volumes?q=${searchKey}:${topic}&maxResults=${maxResults}&startIndex=${startIndex}`
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
        name: "books-storage",
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
              `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=${process.env.REACT_APP_GOOGLE_YOUTUBE_V3_API_KEY}&q=${searchKey}:${topic}&maxResults=${maxResults}&startIndex=${startIndex}`
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
);

export const useText = create(
  devtools(
    persist(
      (set, get) => ({
        text: "",
        loading: false,
        error: null,
        searchText: async (topic, searchKey) => {
          set({ loading: true });
          try {
            const stream = await openai.chat.completions.create({
              model: "gpt-4-turbo-preview",
              messages: [
                {
                  role: "user",
                  content: `You are an AI Agriculture Assistant. Make 15mins guide for this field : ${topic}. Describe about "${searchKey}" in more detail. It will have 6 sections and each section have over 30 sentences. Make it as much as contentful.`,
                },
              ],
              stream: true,
            });
            let newText = "";
            for await (const chunk of stream) {
              if (chunk.choices[0]?.delta?.content === "undefined") return;
              newText += chunk.choices[0]?.delta?.content; // Concatenate the content of the chunk
              set({ text: newText });
            }
            set({ loading: false });
          } catch (error) {
            set({ error: error });
            set({ loading: false });
          }
        },
      }),
      {
        name: "text-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
