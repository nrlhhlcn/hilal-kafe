import React from 'react';
import { Customer } from '../types';
import { User, Clock, TrendingUp, Trash2, Eye } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  onDelete?: (customerId: string) => void;
  onViewHistory?: (customer: Customer) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick, onDelete, onViewHistory }) => {
  const todayTotal = customer.dailyOrders
    .find(order => order.date === new Date().toDateString())?.total || 0;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(customer.id);
    }
  };

  const handleViewHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewHistory) {
      onViewHistory(customer);
    }
  };

  return (
    <div className="modern-card p-6 group">
      <div 
        onClick={onClick}
        className="cursor-pointer"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-full">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 capitalize">{customer.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Bugün: ₺{todayTotal}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Hafta: ₺{customer.weeklyTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        {onViewHistory && (
          <button
            onClick={handleViewHistory}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Sipariş Geçmişi"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Müşteriyi Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};