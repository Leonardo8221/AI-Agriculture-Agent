import React, { useState } from "react";
import { topics } from "../utils/var";
import { useShallow } from "zustand/react/shallow"; //fix rerender when checked/unchecked input
import { useBooks } from "../utils/store.js";

const Home = (props) => {
  const [selTopic, setSelTopic] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const { loading, searchBooks, searchVideos } = useBooks(
    useShallow((state) => ({
      loading: state.loading,
      searchBooks: state.searchBooks,
      searchVideos: state.searchVideos,
    }))
  );

  const handleClickTopic = (topic) => {
    setSelTopic(topic);
  };
  const handleSearch = () => {
    searchBooks(searchKey);
    searchVideos(searchKey);
    if (!loading) props.setShowResult(true);
  };

  return (
    <div className="w-full py-8">
      <h1 className="mt-12 text-3xl text-center font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Agriculture AI Agent
      </h1>
      <p className="text-center mt-6">
        Hello, what would you like to learn about today?
      </p>
      <div className="mt-6">
        <h2 className="h2 text-2xl px-1 pl-4 md:pl-14 prose prose-slate text-gray-600">
          Choose your topic:
        </h2>
        <div className="flex justify-center w-full flex-wrap mt-2">
          {topics.map((topic, index) => (
            <div
              className={`w-1/4 rounded-tl-lg rounded-tr-lg sm:rounded-tr-none rounded-bl-lg rounded-br-lg sm:rounded-bl-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 max-w-[400px] inline-block m-5 hover:cursor-pointer text-center border-2 hover:border-gray-600 ${
                selTopic === topic.key ? "border-gray-600" : "border-gray-200"
              }`}
              key={index}
              onClick={() => handleClickTopic(topic.key)}
            >
              <img
                className="mx-auto mb-3"
                src={topic.icon}
                alt="icon"
                width={40}
              />
              <p className="text-[18px] font-[500]">{topic.topic}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="h2 text-2xl px-1 pl-4 md:pl-14 prose prose-slate text-gray-600">
          Input more detail:
        </h2>
        <form className="max-w-[500px] justify-center mx-auto">
          <div class="mb-4">
            <input
              class="shadow appearance-none font-[500] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-2 focus:border-gray-500"
              type="text"
              placeholder="What do you want to learn about?"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-purple-500 px-12 mx-auto hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-blue-500 rounded-[20px]"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
