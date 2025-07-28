import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
    return (
        <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <div className="absolute w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm"></div>

                    <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 19.5V4.5C4 3.4 4.9 2.5 6 2.5H20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 2.5H20C21.1046 2.5 22 3.39543 22 4.5V19.5C22 20.6046 21.1046 21.5 20 21.5H6C4.89543 21.5 4 20.6046 4 19.5V4.5C4 3.39543 4.89543 2.5 6 2.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 7.5H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 11.5H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 15.5H14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <motion.div
                    className="absolute inset-0 rounded-xl bg-pink-500 blur-md opacity-30 z-[-1]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            <div className="ml-3 flex flex-col">
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    ResultaBac
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-[-4px]">
                    Résultats du Bac
                </div>
            </div>

        </motion.div>
    );
};

export default Logo;