import React from 'react'

const CarrouselSkeleton = () => (
  <div className="shrink-0 w-72 bg-orange-50 rounded-xl overflow-hidden flex flex-col h-[460px] animate-pulse">
    <div className='p-3'>
      <div className="relative h-48 bg-orange-200 rounded-2xl overflow-hidden"></div>
    </div>
    <div className="flex flex-col grow p-4 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="flex flex-wrap gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-10 h-8 bg-gray-200 rounded-full"></div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-10 bg-gray-200 rounded-full w-28"></div>
        </div>
      </div>
    </div>
  </div>
);

export default CarrouselSkeleton