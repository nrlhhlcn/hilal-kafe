import React from 'react';
import { ChefHat, ArrowLeft, Home, Users, Plus, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  currentView: 'customers' | 'categories' | 'items';
  customerName?: string;
  categoryName?: string;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onAddNew?: () => void;
  showAddButton?: boolean;
  addButtonText?: string;
  onToggleCart?: () => void;
  cartItemCount?: number;
  showCartButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  customerName,
  categoryName,
  onNavigateBack,
  onNavigateHome,
  onAddNew,
  showAddButton = false,
  addButtonText = "Ekle",
  onToggleCart,
  cartItemCount = 0,
  showCartButton = false
}) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-cyan-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {currentView !== 'customers' && (
              <button 
                onClick={onNavigateBack}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            <div className="flex items-center space-x-3">
              <ChefHat className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Hilal Kafe</h1>
                {customerName && (
                  <p className="text-blue-100 text-sm">
                    {categoryName ? `${customerName} - ${categoryName}` : customerName}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {showAddButton && onAddNew && (
              <button 
                onClick={onAddNew}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{addButtonText}</span>
              </button>
            )}
            
            {showCartButton && onToggleCart && (
              <button 
                onClick={onToggleCart}
                className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Sepet"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
            
            <button 
              onClick={onNavigateHome}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};