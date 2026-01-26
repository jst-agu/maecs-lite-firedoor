"use client";

import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { Camera, X, ImageIcon, Loader2 } from 'lucide-react';
import { compressImage } from '@/utils/imageHelper';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (newImages: string[]) => void;
}

export default function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsCompressing(true);
    
    try {
      // Calculate remaining slots to respect the 3-image limit
      const remainingSlots = 3 - images.length;
      if (remainingSlots <= 0) {
        alert("Maximum of 3 images allowed.");
        return;
      }

      const filesToProcess = files.slice(0, remainingSlots);

      // Process and compress all images in parallel
      const compressedBase64Strings = await Promise.all(
        filesToProcess.map(file => compressImage(file))
      );

      // Update the parent state
      onImagesChange([...images, ...compressedBase64Strings]);
    } catch (error) {
      console.error("Error compressing images:", error);
      alert("Failed to process images. Please try again.");
    } finally {
      setIsCompressing(false);
      // Reset input so the same file can be re-uploaded if deleted
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const filtered = images.filter((_, i) => i !== index);
    onImagesChange(filtered);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase text-gray-500 flex items-center gap-2">
          <Camera size={14} /> Door Images (Max 3)
        </label>
        <span className="text-[10px] text-gray-400 font-mono">{images.length}/3</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Render Existing Images using Next.js Image */}
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group shadow-sm"
          >
            <Image 
              src={img} 
              alt={`Door proof ${idx + 1}`} 
              fill
              sizes="(max-width: 768px) 33vw, 120px"
              className="object-cover"
              unoptimized // Required for Base64 Data URLs
            />
            
            {/* Remove Button */}
            <button 
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-600/90 text-white rounded-full p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md"
              title="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {/* Upload Button Placeholder */}
        {images.length < 3 && (
          <label className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all duration-200 ${
            isCompressing 
              ? 'bg-gray-50 border-blue-200 animate-pulse' 
              : 'border-gray-300 cursor-pointer hover:bg-gray-50 hover:border-blue-400 active:scale-95'
          }`}>
            {isCompressing ? (
              <>
                <Loader2 className="text-blue-500 animate-spin mb-1" size={20} />
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-tighter text-center px-1">
                  Optimizing...
                </span>
              </>
            ) : (
              <>
                <ImageIcon className="text-gray-400 mb-1" size={20} />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Add Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                  disabled={isCompressing}
                  capture="environment" // Forces back camera on mobile
                />
              </>
            )}
          </label>
        )}
      </div>
    </div>
  );
}