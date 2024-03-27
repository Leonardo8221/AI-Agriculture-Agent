import "./App.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Select from "react-select";

function App() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const options = [
        { value: true, label: "Semantic Search" },
        { value: false, label: "Text2SQL Search" },
    ];
    const [selectedOption, setSelectedOption] = useState(options[0]); // Initial state set to null

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    function handleClear() {
        setMessages([]);
    }

    function handleChange(event) {
        setText(event.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    async function handleSubmit(e) {
        try {
            setText("");
            setError("");
            setIsTyping(true);
            console.log(messages);

            const lastFive = messages.slice(-5);
            const stringifiedLastFive = lastFive.map((obj) =>
                JSON.stringify(obj)
            );
            const result =
                stringifiedLastFive.join(",") +
                JSON.stringify({ role: "user", content: text });
            console.log(result);

            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "user", content: text },
            ]);

            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/query`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: text,
                        search_type: selectedOption.value
                            ? "Semantic Search"
                            : "Text2SQL Search",
                    }),
                }
            );

            if (!response.ok) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        role: "assistant",
                        content:
                            "Failed to get response from server, please try with more detailed question.",
                    },
                ]);
                return;
            }

            const data = await response.json();
            console.log(messages);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: data.message },
            ]);
            setText("");
        } catch (error) {
            setError(error.message);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: "assistant",
                    content:
                        "Failed to get response from server, please try with more detailed question.",
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    // const override = {
    //     display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",
    // };

    return (
        <div>
            <main className="relative mx-auto max-w-3xl px-4">
                <h1 className="my-8 text-center text-4xl">Mployer chatbot</h1>
                <div className="flex w-full items-end space-x-2 items-center justify-center mb-2 ">
                    <div
                        className={`text-blue-400 ${
                            selectedOption && selectedOption.value
                                ? "Semantic Search"
                                : "Text2SQL Search"
                        }`}
                    >
                        Select search type :
                    </div>
                    <Select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        options={options}
                    />
                </div>
                <div
                    style={{
                        marginBottom: `${
                            textareaRef.current
                                ? textareaRef.current.scrollHeight + 100
                                : 0
                        }px`,
                    }}
                >
                    {messages.length > 0 && (
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className="flex space-x-2">
                                    <div>
                                        {message.role === "user" ? "👤" : "🤖"}
                                    </div>

                                    <div
                                        className={
                                            message.role === "user"
                                                ? "text-blue-400"
                                                : ""
                                        }
                                    >
                                        {message.content
                                            .split("\n")
                                            .map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex space-x-2 ">
                                    <div>🤖</div>
                                    <div>
                                        <ClipLoader
                                            className="ml-2"
                                            color="#888888"
                                            loading={isTyping}
                                            size={20}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-3xl justify-center px-4 pb-8 pt-4">
                    <div className="flex w-full items-end space-x-2">
                        <button
                            onClick={handleClear}
                            className="rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-500"
                            disabled={isTyping}
                        >
                            Clear
                        </button>
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={text}
                            onChange={handleChange}
                            className="w-full resize-none overflow-hidden rounded px-2 py-1 text-gray-900 focus:outline-0 border border-gray-500 border-opacity-50"
                            onKeyDown={handleKeyDown}
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={isTyping}
                            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
