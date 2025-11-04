import React, { useState } from 'react';
import type { Product } from '../types';
import { XIcon } from './Icons';

interface AddProductModalProps {
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [packages, setPackages] = useState('');
  const [itemsPerPackage, setItemsPerPackage] = useState('1');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !packages || !itemsPerPackage) {
      alert('الرجاء تعبئة جميع الحقول.');
      return;
    }
    const stock = parseInt(packages, 10) * parseInt(itemsPerPackage, 10);
    onAddProduct({
      name,
      price: parseFloat(price),
      stock,
      itemsPerPackage: parseInt(itemsPerPackage, 10),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md" dir="rtl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">إضافة منتج جديد</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="product-name" className="block text-sm font-medium text-slate-700 mb-1">اسم المنتج</label>
            <input
              type="text"
              id="product-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="product-price" className="block text-sm font-medium text-slate-700 mb-1">السعر (ر.س)</label>
            <input
              type="number"
              id="product-price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0"
              step="0.01"
              className="w-full border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="product-packages" className="block text-sm font-medium text-slate-700 mb-1">عدد العبوات</label>
                <input
                type="number"
                id="product-packages"
                value={packages}
                onChange={e => setPackages(e.target.value)}
                min="0"
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
                />
            </div>
            <div>
                <label htmlFor="product-items-per-package" className="block text-sm font-medium text-slate-700 mb-1">القطع بكل عبوة</label>
                <input
                type="number"
                id="product-items-per-package"
                value={itemsPerPackage}
                onChange={e => setItemsPerPackage(e.target.value)}
                min="1"
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
                />
            </div>
          </div>
          <div className="pt-4 flex justify-end space-x-2 space-x-reverse">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              إضافة المنتج
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
