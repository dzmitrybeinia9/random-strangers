import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PhotosData {
  'classic-2023': string[];
  'music-2023': string[];
  'classic-2024': string[];
  'music-2024': string[];
  'current-season-classic': string[];
  'current-season-music': string[];
}

function PhotosPage() {
  const [photos, setPhotos] = useState<PhotosData>({
    'classic-2023': [],
    'music-2023': [],
    'classic-2024': [],
    'music-2024': [],
    'current-season-classic': [],
    'current-season-music': [],
  })
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  useEffect(() => {
    const importPhotos = async () => {
      const classicPhotos2023 = import.meta.glob('/src/assets/classic-2023/*.{png,jpg,jpeg}')
      const musicPhotos2023 = import.meta.glob('/src/assets/music-2023/*.{png,jpg,jpeg}')
      const classicPhotos2024 = import.meta.glob('/src/assets/classic-2024/*.{png,jpg,jpeg}')
      const musicPhotos2024 = import.meta.glob('/src/assets/music-2024/*.{png,jpg,jpeg}')
      const currentClassicPhotos = import.meta.glob('/src/assets/current-season-classic/*.{png,jpg,jpeg}')
      const currentMusicPhotos = import.meta.glob('/src/assets/current-season-music/*.{png,jpg,jpeg}')

      const [
        classic2023Urls,
        music2023Urls,
        classic2024Urls,
        music2024Urls,
        currentClassicUrls,
        currentMusicUrls
      ] = await Promise.all([
        Promise.all(Object.values(classicPhotos2023).map(loader => loader() as Promise<{ default: string }>)),
        Promise.all(Object.values(musicPhotos2023).map(loader => loader() as Promise<{ default: string }>)),
        Promise.all(Object.values(classicPhotos2024).map(loader => loader() as Promise<{ default: string }>)),
        Promise.all(Object.values(musicPhotos2024).map(loader => loader() as Promise<{ default: string }>)),
        Promise.all(Object.values(currentClassicPhotos).map(loader => loader() as Promise<{ default: string }>)),
        Promise.all(Object.values(currentMusicPhotos).map(loader => loader() as Promise<{ default: string }>))
      ])

      setPhotos({
        'classic-2023': classic2023Urls.map(module => module.default),
        'music-2023': music2023Urls.map(module => module.default),
        'classic-2024': classic2024Urls.map(module => module.default),
        'music-2024': music2024Urls.map(module => module.default),
        'current-season-classic': currentClassicUrls.map(module => module.default),
        'current-season-music': currentMusicUrls.map(module => module.default)
      })
    }

    importPhotos()
  }, [])

  const renderPhotoSection = (title: string, photos: string[], color: string) => {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6" style={{ color }}>
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo} 
                alt={`Photo ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded-full">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <motion.h1 
          className="text-3xl font-bold mb-12 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Photo Gallery
        </motion.h1>

        <div className="space-y-16">
          {/* Current Season */}
          <div className="space-y-12">
            <h2 className="text-2xl font-bold text-gray-700">Current Season</h2>
            {renderPhotoSection('Classic', photos['current-season-classic'], '#773DD9')}
            {renderPhotoSection('Music', photos['current-season-music'], '#DB39C9')}
          </div>

          {/* 2024 */}
          <div className="space-y-12">
            <h2 className="text-2xl font-bold text-gray-700">2024</h2>
            {renderPhotoSection('Classic', photos['classic-2024'], '#773DD9')}
            {renderPhotoSection('Music', photos['music-2024'], '#DB39C9')}
          </div>

          {/* 2023 */}
          <div className="space-y-12">
            <h2 className="text-2xl font-bold text-gray-700">2023</h2>
            {renderPhotoSection('Classic', photos['classic-2023'], '#773DD9')}
            {renderPhotoSection('Music', photos['music-2023'], '#DB39C9')}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full aspect-auto"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto} 
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PhotosPage 