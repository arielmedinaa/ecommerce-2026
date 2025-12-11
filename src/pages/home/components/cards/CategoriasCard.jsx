import React from 'react'
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const CategoriasCard = ({ categories }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-20"
            >
                <div className="flex items-center justify-between mb-6 font-poppins">
                    <div>
                        <h3 className="text-2xl font-bold">Categorias destacadas</h3>
                    </div>
                    <motion.button
                        whileHover={{ x: 5 }}
                        className="text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1"
                    >
                        View more <FiChevronDown className="-rotate-90" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 font-poppins text-white">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-2xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all overflow-hidden h-full min-h-[200px] bg-linear-to-br from-orange-300 to-orange-700"
                        >
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto bg-white/20 rounded-xl flex items-center justify-center p-2 backdrop-blur-sm">
                                            <img
                                                src={category.img}
                                                alt={category.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <h4 className="font-medium mt-2 text-white text-lg">{category.name}</h4>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center bg-black/30 rounded-full px-3 py-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className="text-yellow-300 text-sm">★</span>
                                        ))}
                                    </div>
                                    <button
                                        className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-full hover:bg-orange-700 transition-colors"
                                        onClick={() => console.log(`Ver ${category.name}`)}
                                    >
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default CategoriasCard