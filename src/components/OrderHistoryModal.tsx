import React from 'react';
import { Customer, OrderItem } from '../types';
import { X, Calendar, Package, DollarSign } from 'lucide-react';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose, customer }) => {
  if (!isOpen || !customer) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="modern-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
            <p className="text-gray-600">Sipariş Geçmişi</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {customer.dailyOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Henüz sipariş geçmişi bulunmuyor</p>
            </div>
          ) : (
            <div className="space-y-6">
              {customer.dailyOrders
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((order, index) => (
                <div key={index} className="modern-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{formatDate(order.date)}</h3>
                        <p className="text-sm text-gray-600">{formatTime(order.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">₺{order.total}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">Adet: {item.quantity}</p>
                          <p className="text-xs text-orange-600 font-semibold">₺{item.price} × {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Toplam {customer.dailyOrders.length} sipariş
            </div>
            <div className="text-lg font-bold text-gray-800">
              Haftalık Toplam: ₺{customer.weeklyTotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
