import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast, { Toaster } from "react-hot-toast";
const Tools = () => {
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async () => {
    setLoading(true);
    const genAi = new GoogleGenerativeAI(
      "AIzaSyCKzS0CXjNlFeZO4u5kil0ySTnFiwCj-GQ"
    );

    const model = genAi.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    try {
      const r = await model.generateContent(input);
      setContent(r.response.text());
      setLoading(false);
      toast.success("Successfully");
    } catch (error) {
      //   toast.error("Connection Lost");
      toast.error("Error generating content");
      //   toast.error("Error generating content: " + error);
      setLoading(false);
    }
  };
  const renderContent = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let isTable = false;
    let tableRows = [];

    lines.forEach((line, index) => {
      if (line.startsWith("## ")) {
        elements.push(
          <h2 className="text-2xl" key={index}>
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("|")) {
        isTable = true;
        tableRows.push(line);
      } else {
        if (isTable) {
          elements.push(renderTable(tableRows, elements.length));
          tableRows = [];
          isTable = false;
        }
        const boldText = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        elements.push(
          <p key={index} dangerouslySetInnerHTML={{ __html: boldText }} />
        );
      }
    });

    if (isTable) {
      elements.push(renderTable(tableRows, elements.length));
    }

    return elements;
  };

  const renderTable = (rows, key) => {
    const headers = rows[0].split("|").filter(Boolean);
    const alignments = rows[1].split("|").filter(Boolean);
    const dataRows = rows.slice(2);

    return (
      <table
        key={key}
        className="table-auto border-collapse border border-gray-300"
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header.trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIndex) => {
            const cells = row.split("|").filter(Boolean);
            return (
              <tr key={rowIndex}>
                {cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-4 min-h-96">
      <h1 className="text-3xl font-medium mb-4 dark:text-white">
        ZFriend Ai
        {/* <span className="text-xs"> by Gemini</span> */}
      </h1>
      <div className="sksfgjkpkld flex items-center gap-3">
        <textarea
          className="w-2/3 py-3 px-5 border overflow-hidden rounded-full border-gray-300 dark:bg-gray-700 dark:border-gray-400 focus:outline-palet2"
          rows="1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ex: Buatkan tamplate surat ..."
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-palet3 to-palet2 hover:shadow-md hover:translate-y-2 rounded-full transition-all text-white px-4 py-4 flex items-center justify-center"
          onClick={handleGenerateContent}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.875 17.375C14.5417 17.375 14.225 17.3127 13.925 17.188C13.625 17.0627 13.35 16.875 13.1 16.625L8.1 11.6C7.76667 11.7333 7.42933 11.8333 7.088 11.9C6.746 11.9667 6.38333 12 6 12C4.33333 12 2.91667 11.4167 1.75 10.25C0.583333 9.08333 0 7.66667 0 6C0 5.4 0.0833333 4.829 0.25 4.287C0.416667 3.74567 0.65 3.23333 0.95 2.75L4.6 6.4L6.4 4.6L2.75 0.95C3.23333 0.65 3.74567 0.416667 4.287 0.25C4.829 0.0833333 5.4 0 6 0C7.66667 0 9.08333 0.583333 10.25 1.75C11.4167 2.91667 12 4.33333 12 6C12 6.38333 11.9667 6.74567 11.9 7.087C11.8333 7.429 11.7333 7.76667 11.6 8.1L16.65 13.1C16.9 13.35 17.0877 13.625 17.213 13.925C17.3377 14.225 17.4 14.5417 17.4 14.875C17.4 15.2083 17.3333 15.529 17.2 15.837C17.0667 16.1457 16.8833 16.4167 16.65 16.65C16.4 16.9 16.125 17.0833 15.825 17.2C15.525 17.3167 15.2083 17.375 14.875 17.375Z"
                fill="white"
              />
            </svg>
          )}
        </button>
      </div>
      <pre className="w-full mx-auto overflow-x-auto mt-11 p-3 bg-white dark:bg-gray-700 border -border--static7 rounded-lg">
        {renderContent(content)}
      </pre>
      <Toaster />
    </div>
  );
};

export default Tools;
