/* eslint-disable @next/next/no-img-element */
'use client'
import Icon from '@/components/ui/icons/sm';
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import React, { FormEvent, useEffect, useRef, useState } from 'react'

export default function FilesInput({defaultValue}:{defaultValue: string[]}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>(defaultValue ?? [])

  // const images = files.map((file) => file.)
  const handleImageUpload = async (event: FormEvent) => {
    event.preventDefault();
    const files = inputRef.current?.files
    if (!files?.length) return;
    const stringsImages: string[] = []

    for (let i = 0; i < files?.length; i++) {
      const img = (files.item(i))
      if (img) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === "string") {
            const imgElement = new Image();
            imgElement.src = event.target.result;

            imgElement.onload = () => {
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");

              if (context) {
                canvas.width = imgElement.width;
                canvas.height = imgElement.height;
                context.drawImage(
                  imgElement,
                  0,
                  0,
                  imgElement.width,
                  imgElement.height
                );

                const base64String = canvas.toDataURL("image/png");
                stringsImages.push(base64String)
                if ((i = files.length - 1) || files.length === 1) {
                  console.log(stringsImages)
                  setImages([...images, ...stringsImages])

                }
                console.log(base64String)
                console.log(stringsImages)

              }
            };
          }
        };
        reader.readAsDataURL(img);
      }
    }
  }



  return (
    <>
      <label>
        Imagenes
        <input onChange={handleImageUpload} ref={inputRef} accept="image/gif, image/jpeg, image/png" multiple type="file" />
      </label>
      <div className='flex gap-4 overflow-x-auto'>
        {images?.map((image, i) =>
          <div key={"image-" + i} className='relative group cursor-pointer h-16 w-28'>
            <div className='flex gap-0.5 absolute right-4 top-3'>
              <button type='button' onClick={
                () => {
                  images[i] = images[i - 1];
                  images[i - 1] = image;
                  setImages([...images]);
                }
              } className="opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white hover:bg-gray-300 hover:scale-90 transition-all duration-100 cursor-pointer border rounded-full h-5 aspect-square overflow-hidden">
                <Icon icon={faChevronLeft} />
              </button>
              <button type='button' onClick={
                () => {
                  images.splice(i, 1);
                  setImages([...images]);
                }
              } className="opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white hover:bg-gray-300 hover:scale-90 transition-all duration-100 cursor-pointer border rounded-full h-5 aspect-square overflow-hidden">
                <Icon icon={faClose} />
              </button>

            </div>
            <img className='w-full h-full object-scale-down border shadow-sm rounded-sm' src={image} alt='A' />
          </div>
        )}



      </div>
      <input type='hidden' value={images.join('-,-')} name='files'/>
    </>
  )
}
