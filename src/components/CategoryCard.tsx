import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="modern-card cursor-pointer transform hover:scale-105 overflow-hidden touch-manipulation"
    >
      <div className="h-32 sm:h-40 md:h-48 relative overflow-hidden bg-gray-200 flex items-center justify-center">
        {category.image && category.image.trim() !== '' ? (
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-3xl sm:text-4xl mb-2">📂</div>
            <div className="text-xs sm:text-sm">Resim Yok</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white p-2 sm:p-4 w-full text-center capitalize line-clamp-2">{category.name}</h3>
        </div>
      </div>
      <div className="p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <p className="text-gray-700 text-xs sm:text-sm text-center font-medium">{category.items.length} ürün</p>
      </div>
    </div>
  );
};