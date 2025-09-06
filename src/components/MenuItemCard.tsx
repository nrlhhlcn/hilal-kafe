import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onDelete?: (itemId: string) => void;
  showDeleteButton?: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, onDelete, showDeleteButton }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <div className="modern-card overflow-hidden group">
      <div className="h-32 md:h-48 overflow-hidden relative bg-gray-200 flex items-center justify-center">
        {item.image && item.image.trim() !== '' ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-4xl mb-2">🍽️</div>
            <div className="text-sm">Resim Yok</div>
          </div>
        )}
        {showDeleteButton && onDelete && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            title="Ürünü Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 capitalize">{item.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg md:text-2xl font-bold text-blue-600">₺{item.price}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:bg-white rounded-full transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="font-bold min-w-[2rem] text-center text-gray-800">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:bg-white rounded-full transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="modern-button flex items-center space-x-1 md:space-x-2 text-xs md:text-sm"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
            <span className="font-semibold">Ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
};