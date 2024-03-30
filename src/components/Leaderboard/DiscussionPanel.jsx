import  { useState, useRef, useEffect } from "react";

const DiscussionPanel = () => {
  const [newMessage, setNewMessage] = useState("");
  const [discussionData, setDiscussionData] = useState([
    { user: "Student 1", message: "This quiz was challenging!" },
    { user: "Student 2", message: "I found question 3 very confusing." },
    { user: "Student 3", message: "Great job everyone!" },
    { user: "Student 4", message: "I agree, it was tough." },
    { user: "Student 5", message: "I struggled with the time limit." },
    { user: "Student 6", message: "Can someone explain question 2?" },
    { user: "Student 7", message: "I think question 5 was incorrect." },
    { user: "Student 8", message: "I liked the bonus question!" },
    { user: "Student 9", message: "How did everyone find question 6?" },
    { user: "Student 10", message: "I wish there were more questions." },
    // Add more discussion messages as needed
  ]);

  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedDiscussionData = [...discussionData, { user: "You", message: newMessage }];
      setDiscussionData(updatedDiscussionData);
      setNewMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default Enter key behavior (e.g., adding a new line)
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever discussion data changes
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [discussionData]);

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-3xl font-bold mb-6 text-center py-6 bg-gray-200">Discussion Panel</h2>
        <div ref={chatContainerRef} className="overflow-y-auto max-h-96">
          {discussionData.map((message, index) => (
            <div key={index} className={`flex flex-row mb-4 px-4 py-2 ${message.user === "You" ? "justify-end" : ""}`}>
              <div
                className={`w-10 h-10 bg-${
                  message.user === "You" ? "green" : "blue"
                }-500 rounded-full text-white flex items-center justify-center font-bold`}
              >
                {message.user.charAt(0)}
              </div>
              <div className={`ml-4 ${message.user === "You" ? "text-right" : ""}`}>
                <div className="font-semibold text-gray-700">{message.user}</div>
                <div className={`bg-${message.user === "You" ? "green" : "gray"}-200 rounded-lg p-3 text-gray-800`}>
                  {message.message}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-green-200 px-4 py-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Add keydown event listener
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-full px-4 py-2 mr-4 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPanel;
