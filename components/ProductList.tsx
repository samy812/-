import React from 'react';
import type { Product } from '../types';
import { ExclamationIcon } from './Icons';

interface ProductListProps {
  products: Product[];
  onRecordSale: (product: Product) => void;
  onRecordReturn: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onRecordSale, onRecordReturn }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">قائمة المنتجات</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-right text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">المنتج</th>
              <th scope="col" className="px-6 py-3">السعر</th>
              <th scope="col" className="px-6 py-3">المخزون</th>
              <th scope="col" className="px-6 py-3">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map(product => (
              <tr 
                key={product.id} 
                className={`border-b transition-colors ${
                  product.stock === 0
                    ? 'bg-red-50 hover:bg-red-100'
                    : product.stock <= 10
                    ? 'bg-yellow-50 hover:bg-yellow-100'
                    : 'bg-white hover:bg-slate-50'
                }`}
              >
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.price.toLocaleString('ar-EG')} ر.س</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock.toLocaleString('ar-EG')}
                    </span>
                    {product.stock > 0 && product.stock <= 10 && (
                        <ExclamationIcon className="w-5 h-5 text-yellow-500" />
                    )}
                   </div>
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <button
                    onClick={() => onRecordSale(product)}
                    className="font-medium text-indigo-600 hover:text-indigo-800 disabled:text-slate-300 disabled:cursor-not-allowed"
                    disabled={product.stock === 0}
                  >
                    تسجيل بيع
                  </button>
                  <button
                    onClick={() => onRecordReturn(product)}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    تسجيل مرتجع
                  </button>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={4} className="text-center py-10 text-slate-500">
                        لم تتم إضافة أي منتجات بعد.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;