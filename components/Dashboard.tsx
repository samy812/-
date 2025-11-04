import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUturnLeftIcon, ExclamationIcon } from './Icons';
import type { Product } from '../types';

interface DashboardStats {
  totalSalesValue: number;
  totalProductsSold: number;
  productTypes: number;
  totalInventoryValue: number;
  totalReturnValue: number;
}

interface SalesData {
    name: string;
    'المبيعات': number;
}

interface DashboardProps {
  stats: DashboardStats;
  salesData: SalesData[];
  products: Product[];
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4 space-x-reverse">
    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ stats, salesData, products }) => {
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">لوحة التحكم</h2>

      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-md shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-bold text-yellow-800">
                تنبيه انخفاض المخزون
              </p>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  المنتجات التالية مخزونها منخفض وتحتاج إلى إعادة طلب:
                </p>
                <ul className="list-disc pr-5 mt-2 space-y-1">
                  {lowStockProducts.map(p => (
                    <li key={p.id}>
                      <strong>{p.name}:</strong> متبقي {p.stock.toLocaleString('ar-EG')} قطعة
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المبيعات" value={`${stats.totalSalesValue.toLocaleString('ar-EG')} ر.س`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
        <StatCard title="قيمة المرتجعات" value={`${stats.totalReturnValue.toLocaleString('ar-EG')} ر.س`} icon={<ArrowUturnLeftIcon className="h-6 w-6" />} />
        <StatCard title="المنتجات المباعة" value={stats.totalProductsSold.toLocaleString('ar-EG')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
        <StatCard title="أنواع المنتجات" value={stats.productTypes.toLocaleString('ar-EG')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>} />
        <StatCard title="قيمة المخزون" value={`${stats.totalInventoryValue.toLocaleString('ar-EG')} ر.س`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">أداء المبيعات (آخر 7 أيام)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value.toLocaleString('ar-EG')} ر.س`} />
              <Legend />
              <Line type="monotone" dataKey="المبيعات" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;