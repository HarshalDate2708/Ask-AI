"use client";

import React, { useState, useRef, useEffect } from "react";
import { PulseLoader } from 'react-spinners';
import Typewriter from "typewriter-effect";
import { sendIcon } from "@/public";
import Image from "next/image";
import { sampleData } from "@/constant";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! 😊 How can I help you? ", sender: "bot"  }
  ]);
  const notResponseMsg:string = "I'm sorry 😔, I didn't quite understand your question. Could you please rephrase it or provide proper question so I can assist you better!"
  const sampleQuestion:Array<string> = ["Tell me about RemoteHire?","What is the company's mission?","What are services provided by remotehire?"]
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSampleQue, setShowChatbot] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 0);
    return () => clearTimeout(timer);
  }, [messages]);

  function getBestMatch(query: string): string | null {
    let bestMatch = null;
    let maxMatchCount = 0;
 
    for (const qa of sampleData) {
        const questionWords = qa.question.toLowerCase().split(" ");
        const queryWords = query.toLowerCase().split(" ");
        let matchCount = 0;
 
        for (const word of queryWords) {
            if (questionWords.includes(word)) {
                matchCount++;
            }
        }
 
        if (matchCount > maxMatchCount) {
            maxMatchCount = matchCount;
            bestMatch = qa;
        }
    }
 
    return bestMatch ? bestMatch.answer : null;
   }

   const handleSampleQuestion = (e:any,question:string) => {
    const userMessage = { text: question, sender: "user" };
    setMessages((message) => [...message, userMessage]);
    setInput("");
    setShowChatbot(false)
    setTyping(true);

    let answer :any= getBestMatch(question);
    setTimeout(() => {
      setMessages((message) => [...message, { text: answer, sender: "bot"  }]);
      setTyping(false);
    }, 1000);

   }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((message) => [...message, userMessage]);
    setInput("");
    setShowChatbot(false)
    setTyping(true);

    const greetings : Array<string> = ["hii","hello","hii there!","hi","hey"]

    if(greetings.includes(input.toLowerCase())){
      setTimeout(() => {
        setMessages((message) => [...message, { text: "Hello!👋 How can I help you?", sender: "bot" }]);
        setTyping(false);
      }, 1000);
      return
    }


    let answer :any= getBestMatch(input) || notResponseMsg;
    setTimeout(() => {
      setMessages((message) => [...message, { text: answer, sender: "bot" }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg md:max-w-sm sm:max-w-sm h-3/5 md:h-4/5 bg-white rounded-lg shadow-lg overflow-hidden m-6">
        <header className="sticky top-0 bg-gray-800 text-white py-4 w-full text-center">
          Ask AI
        </header>
        <div className="flex flex-col justify-end" style={{height: "calc(100% - 4rem)"}}>
          <div className="flex-grow-1 flex-shrink-0 p-4 overflow-y-auto" style={{ maxHeight: "80%" }}>
           <div className=" m-2 h-[50px] w-[50px] "><iframe src="https://giphy.com/embed/S60CrN9iMxFlyp7uM8" width="100%" height="100%"  className="giphy-embed rounded-full pointer-events-none" allowFullScreen></iframe></div>
            {messages.map((msg, index) => (
              <div key={index} 
              className={`py-2 ${msg.sender === "user" ? "flex flex-row justify-end" : ""}`}>
                <div 
                className={`max-w-[250px] p-2 rounded-lg inline-block ${msg.sender === "bot" ? "bg-gray-100 " : "bg-indigo-100 "}`}>
                   {
                    msg.sender === "user" ? 
                    <p>{msg.text}</p>
                    : 
                    <Typewriter
                      onInit={(typewriter) => {
                      typewriter.typeString(msg.text)
                        .stop()
                        .start();
                      }}
                      options={{cursor:"",delay:30}}
                      
                    />
                   }
                   
                    
                </div>
                {
                   msg.text=="Hello! How can I help you?"?
                  <div>
                      {
                        sampleQuestion.map((que)=>(
                          <div className="sampleQue" onClick={(e)=>handleSampleQuestion(e,que)}>
                            <p >{que}</p>
                          </div>
                        ))
                      }
                </div>
                 : "" 
                }
                
                  
              </div>
            ))}
            {typing && <PulseLoader color="grey" />}
            <div ref={messagesEndRef} />
          </div>

          <div>
          <form onSubmit={handleSubmit} className="w-full  p-4 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-w-sm flex-1 p-2 mr-2 rounded-lg border-2 border-gray-300 focus:outline-none"
              placeholder="Type your message..."
            />
            <button type="submit" className=" text-white p-2 rounded-full bg-gray-100 border-2 border-black cursor-pointer ">
              {/* <img src={sendIcon} height={10} width={10} /> */}
              <Image  src={sendIcon} alt="send"  height={20} width={20}/>
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;