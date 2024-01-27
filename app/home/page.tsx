"use client"
import React from "react";
import { Chatbot,Navbar } from "@/components";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home()  {
    const [showChatbot, setShowChatbot] = useState(false)
    
    return (
        <div>
            <div >
                <Navbar />
                <div className="fixed bottom-4 right-4">
                <Link href="/chatbot">
                    <motion.div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center" 
                      onClick={()=>setShowChatbot(!showChatbot)}
                      initial={{ opacity: 0, x: 100, scale: 0.3 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                        <img
                        className="w-10 h-10"
                        src="https://cdn-icons-png.freepik.com/512/8943/8943377.png"
                        alt="Chatbot Icon"
                        />
                    </motion.div>
                </Link>
                </div>
                <motion.div className="text-yellow-200 text-3xl text-center mt-60" data-aos="fade-in"
                    initial={{ opacity: 0, y: -100, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Welcome to Remote Hire</h1>
                </motion.div>
            </div>
        </div>
    )
}
