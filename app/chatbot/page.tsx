'use client'
import { Chatbot } from "@/components";
import {Navbar} from "@/components";
import { motion } from "framer-motion";

const OpenChatbot = () => {

    return(
        <div>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, x: 300, y:100, scale: 0.3 }}
                animate={{ opacity: 1, x: 0, y:0, scale: 1 }}
                transition={{ duration: 0.5 }}
                
            >
                <Chatbot />
            </motion.div>
            
        </div>
    )
}

export default OpenChatbot;
