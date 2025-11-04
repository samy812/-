import React, { useState } from 'react';
import { useInventory } from './hooks/useInventory';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import SalesAnalytics from './components/SalesAnalytics';
import AddProductModal from './components/AddProductModal';
import RecordSaleModal from './components/RecordSaleModal';
import RecordReturnModal from './components/RecordReturnModal';
import type { Product } from './types';
import { PlusIcon } from './components/Icons';

export type View = 'dashboard' | 'products' | 'analytics';

const App: React.FC = () => {
  const {
    products,
    sales,
    addProduct,
    recordSale,
    recordReturn,
    stats,
    salesDataForChart,
  } = useInventory();
  
  const [view, setView] = useState<View>('dashboard');
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isRecordSaleModalOpen, setRecordSaleModalOpen] = useState(false);
  const [productToSell, setProductToSell] = useState<Product | null>(null);
  const [isRecordReturnModalOpen, setRecordReturnModalOpen] = useState(false);
  const [productToReturn, setProductToReturn] = useState<Product | null>(null);

  const handleRecordSaleClick = (product: Product) => {
    setProductToSell(product);
    setRecordSaleModalOpen(true);
  };

  const handleRecordReturnClick = (product: Product) => {
    setProductToReturn(product);
    setRecordReturnModalOpen(true);
  };

  const renderView = () => {
    switch (view) {
      case 'products':
        return <ProductList products={products} onRecordSale={handleRecordSaleClick} onRecordReturn={handleRecordReturnClick} />;
      case 'analytics':
        return <SalesAnalytics products={products} sales={sales} />;
      case 'dashboard':
      default:
        return <Dashboard stats={stats} salesData={salesDataForChart} products={products} />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800" dir="rtl">
      <Header currentView={view} setView={setView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>

      {view === 'products' && (
        <button
          onClick={() => setAddProductModalOpen(true)}
          className="fixed bottom-6 left-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-110"
          aria-label="إضافة منتج جديد"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      )}

      {isAddProductModalOpen && (
        <AddProductModal
          onClose={() => setAddProductModalOpen(false)}
          onAddProduct={addProduct}
        />
      )}

      {isRecordSaleModalOpen && productToSell && (
        <RecordSaleModal
          product={productToSell}
          onClose={() => setRecordSaleModalOpen(false)}
          onRecordSale={recordSale}
        />
      )}

      {isRecordReturnModalOpen && productToReturn && (
        <RecordReturnModal
          product={productToReturn}
          onClose={() => setRecordReturnModalOpen(false)}
          onRecordReturn={recordReturn}
        />
      )}
    </div>
  );
};

export default App;