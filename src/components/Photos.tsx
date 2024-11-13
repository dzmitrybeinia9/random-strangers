import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  imageUrl: string
  onClose: () => void
}

const ImageModal = ({ imageUrl, onClose }: ModalProps) => (
  <div 
    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="relative max-w-7xl w-full animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
      <img 
        src={imageUrl} 
        alt="Full size" 
        className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </div>
)

// Import all images from the assets/mzgb directory
const importImages = () => {
  const images = import.meta.glob('/src/assets/mzgb/*.{png,jpg,jpeg,gif}', {
    eager: true,
    as: 'url'
  })
  
  return Object.values(images)
}

export function Photos() {
  const [photos, setPhotos] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const imageUrls = importImages()
        setPhotos(imageUrls)
      } catch (error) {
        console.error('Error loading photos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPhotos()
  }, [])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="text-xl animate-pulse">Loading photos...</div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 animate-in slide-in-from-left duration-500">
          Photo Gallery
        </h1>
        {photos.length === 0 ? (
          <div className="text-center text-gray-600">No photos found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(photo)}
              >
                <div className="relative aspect-square cursor-pointer group">
                  <img 
                    src={photo} 
                    alt={`Gallery photo ${index + 1}`} 
                    className="absolute w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full size image modal */}
      {selectedImage && (
        <ImageModal 
          imageUrl={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  )
} 