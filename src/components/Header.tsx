import React from 'react';
import { ChefHat, ArrowLeft, Home, Users, Plus, ShoppingCart, LogOut } from 'lucide-react';

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
  onLogout?: () => void;
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
  showCartButton = false,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-cyan-700 text-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {currentView !== 'customers' && (
              <button 
                onClick={onNavigateBack}
                className="p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ChefHat className="w-6 h-6 sm:w-8 sm:h-8" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold">Hilal Kafe</h1>
                {customerName && (
                  <p className="text-blue-100 text-xs sm:text-sm line-clamp-1">
                    {categoryName ? `${customerName} - ${categoryName}` : customerName}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {showAddButton && onAddNew && (
              <button 
                onClick={onAddNew}
                className="flex items-center space-x-1 sm:space-x-2 bg-white/20 hover:bg-white/30 px-2 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm touch-manipulation"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{addButtonText}</span>
                <span className="sm:hidden">+</span>
              </button>
            )}
            
            {showCartButton && onToggleCart && (
              <button 
                onClick={onToggleCart}
                className="relative p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
                title="Sepet"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
            
            <button 
              onClick={onNavigateHome}
              className="p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            {onLogout && (
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
                title="Çıkış Yap"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};