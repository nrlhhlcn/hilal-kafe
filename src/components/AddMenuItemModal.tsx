import React, { useState, useRef } from 'react';
import { Category, MenuItem } from '../types';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (categoryId: string, newItem: Omit<MenuItem, 'id'>) => void;
  categories: Category[];
  selectedCategoryId?: string;
}

export const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  categories,
  selectedCategoryId
}) => {
  console.log('AddMenuItemModal - selectedCategoryId:', selectedCategoryId);
  console.log('AddMenuItemModal - categories:', categories.map(c => ({ id: c.id, name: c.name })));
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(selectedCategoryId || '');
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // selectedCategoryId değiştiğinde categoryId'yi güncelle
  React.useEffect(() => {
    if (selectedCategoryId) {
      setCategoryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId) return;

    const newItem: Omit<MenuItem, 'id'> = {
      name,
      price: parseFloat(price),
      category: categories.find(c => c.id === categoryId)?.name || '',
      image: image || 'https://images.pexels.com/photos/4253319/pexels-photo-4253319.jpeg?auto=compress&cs=tinysrgb&w=400'
    };

    onAdd(categoryId, newItem);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setPrice('');
    setCategoryId(selectedCategoryId || '');
    setImage('');
    setImageFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="modern-modal max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Yeni Ürün Ekle</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ürün Adı
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="modern-input w-full"
                placeholder="Ürün adını girin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fiyat (₺)
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="modern-input w-full"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <div className="modern-input w-full bg-gray-100 cursor-not-allowed">
                {categories.find(c => c.id === categoryId)?.name || 'Kategori seçin'}
              </div>
              <input
                type="hidden"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ürün Resmi
              </label>
              <div className="space-y-3">
                {image ? (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage('');
                        setImageFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Resim yüklemek için tıklayın</p>
                    <p className="text-sm text-gray-500">veya telefonunuzdan seçin</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 modern-button-secondary"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex-1 modern-button"
              >
                Ürün Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};