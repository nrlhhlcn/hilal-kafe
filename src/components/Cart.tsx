import React from 'react';
import { OrderItem } from '../types';
import { Trash2, ShoppingBag, Minus, Plus, X } from 'lucide-react';

interface CartProps {
  items: OrderItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onConfirmOrder: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem, onConfirmOrder, isOpen = false, onClose }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="modern-modal max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Sepet</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Sepetiniz boş</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 capitalize">{item.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                      <p className="text-orange-600 font-semibold">₺{item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Toplam:</span>
                <span className="text-2xl font-bold text-blue-600">₺{total}</span>
              </div>
              
              <button 
                onClick={onConfirmOrder}
                className="w-full modern-button"
              >
                Siparişi Onayla (₺{total})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};