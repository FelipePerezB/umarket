import React from 'react'

export default function PostBtn({ children }: { children?: React.ReactNode }) {
  return (
    <button
      className="flex gap-2 px-1.5 py-0.5 items-center border rounded-lg bg-white hover:bg-gray-100 hover:scale-95 cursor-pointer transition-all duration-75"
    >
      {children}
    </button>
  )
}
