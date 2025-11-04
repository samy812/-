import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { XIcon, PlusIcon, MinusIcon } from './Icons';

interface RecordSaleModalProps {
  product: Product;
  onClose: () => void;
  onRecordSale: (productId: string, quantity: number) => void;
}

const RecordSaleModal: React.FC<RecordSaleModalProps> = ({ product, onClose, onRecordSale }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saleQuantity = quantity;
    if (saleQuantity <= 0 || saleQuantity > product.stock) {
      alert('الرجاء إدخال كمية صالحة.');
      return;
    }
    onRecordSale(product.id, saleQuantity);
    onClose();
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
        const newValue = prev + amount;
        if (newValue >= 1 && newValue <= product.stock) {
            return newValue;
        }
        return prev;
    });
  };

  const totalPrice = useMemo(() => {
    return (quantity * product.price).toLocaleString('ar-EG');
  }, [quantity, product.price]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md" dir="rtl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">تسجيل بيع: {product.name}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-sm">
            <p><span className="font-semibold">السعر:</span> {product.price.toLocaleString('ar-EG')} ر.س</p>
            <p><span className="font-semibold">المخزون الحالي:</span> {product.stock.toLocaleString('ar-EG')}</p>
          </div>
          <div>
            <label htmlFor="sale-quantity" className="block text-sm font-medium text-slate-700 mb-1 text-center">الكمية المباعة</label>
            <div className="flex items-center justify-center gap-4 mt-2">
                <button type="button" onClick={() => handleQuantityChange(1)} className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 disabled:opacity-50" disabled={quantity >= product.stock}>
                    <PlusIcon className="w-5 h-5" />
                </button>
                <input
                    type="number"
                    id="sale-quantity"
                    value={quantity}
                    onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= 1 && val <= product.stock) setQuantity(val);
                        else if (e.target.value === '') setQuantity(1);
                    }}
                    min="1"
                    max={product.stock}
                    className="w-20 text-center text-lg font-bold border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    autoFocus
                />
                <button type="button" onClick={() => handleQuantityChange(-1)} className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 disabled:opacity-50" disabled={quantity <= 1}>
                    <MinusIcon className="w-5 h-5" />
                </button>
            </div>
          </div>
          <div className="text-lg font-bold text-slate-800">
            الإجمالي: {totalPrice} ر.س
          </div>
          <div className="pt-4 flex justify-end space-x-2 space-x-reverse">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              تأكيد البيع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordSaleModal;
