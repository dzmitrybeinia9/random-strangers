import { useState } from 'react'
import { motion } from 'framer-motion'

interface PhotoFolderProps {
  title: string;
  photos: string[];
  color: string;
}

export function PhotoFolder({ title, photos, color }: PhotoFolderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur rounded-lg p-6 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-3 mb-4">
        <svg 
          className="w-8 h-8"
          fill={color} 
          viewBox="0 0 24 24"
        >
          <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"/>
        </svg>
        <h2 className="text-xl font-semibold" style={{ color }}>{title}</h2>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
        animate={{ height: isOpen ? 'auto' : 0 }}
        style={{ overflow: 'hidden' }}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo}
            className="relative aspect-square rounded-lg overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: index * 0.1 }}
          >
            <img 
              src={photo} 
              alt={`${title} photo ${index + 1}`}
              className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <motion.button
                className="bg-white/90 text-gray-800 px-4 py-2 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
} 