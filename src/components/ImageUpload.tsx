import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onChange: (urls: string[]) => void;
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onChange, label }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileRef = ref(storage, `test-images/${uuidv4()}-${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        newUrls.push(url);
      }

      onChange([...images, ...newUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
          <ImagePlus className="w-8 h-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">
            {uploading ? 'Uploading...' : 'Click to upload images'}
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;