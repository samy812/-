import { useState, useEffect, useMemo } from 'react';
import type { Product, Sale, Return } from '../types';

const initialProducts: Product[] = [
  { id: '1', name: 'لابتوب', price: 4500, stock: 15, itemsPerPackage: 1, createdAt: new Date().toISOString() },
  { id: '2', name: 'ماوس لاسلكي', price: 120, stock: 50, itemsPerPackage: 1, createdAt: new Date().toISOString() },
  { id: '3', name: 'شاشة 27 بوصة', price: 1800, stock: 25, itemsPerPackage: 1, createdAt: new Date().toISOString() },
  { id: '4', name: 'لوحة مفاتيح ميكانيكية', price: 350, stock: 30, itemsPerPackage: 1, createdAt: new Date().toISOString() },
];

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('inventory_products');
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    try {
      const savedSales = localStorage.getItem('inventory_sales');
      return savedSales ? JSON.parse(savedSales) : [];
    } catch {
      return [];
    }
  });

  const [returns, setReturns] = useState<Return[]>(() => {
    try {
      const savedReturns = localStorage.getItem('inventory_returns');
      return savedReturns ? JSON.parse(savedReturns) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('inventory_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('inventory_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('inventory_returns', JSON.stringify(returns));
  }, [returns]);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const recordSale = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) {
      alert('الكمية المطلوبة غير متوفرة في المخزون.');
      return;
    }

    const newSale: Sale = {
      id: new Date().getTime().toString(),
      productId,
      productName: product.name,
      quantity,
      totalPrice: product.price * quantity,
      date: new Date().toISOString(),
    };

    setSales(prev => [...prev, newSale]);
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, stock: p.stock - quantity } : p
      )
    );
  };
  
  const recordReturn = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('المنتج غير موجود.');
        return;
    }

    const newReturn: Return = {
        id: new Date().getTime().toString(),
        productId,
        productName: product.name,
        quantity,
        totalPrice: product.price * quantity,
        date: new Date().toISOString(),
    };

    setReturns(prev => [...prev, newReturn]);
    setProducts(prev =>
        prev.map(p =>
            p.id === productId ? { ...p, stock: p.stock + quantity } : p
        )
    );
  };

  const stats = useMemo(() => {
    const totalSalesValue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const totalProductsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const totalReturnValue = returns.reduce((sum, ret) => sum + ret.totalPrice, 0);
    return {
      totalSalesValue,
      totalProductsSold,
      productTypes: products.length,
      totalInventoryValue,
      totalReturnValue,
    };
  }, [sales, products, returns]);

  const salesDataForChart = useMemo(() => {
    const salesByDay: { [key: string]: number } = {};
    sales.forEach(sale => {
      const day = new Date(sale.date).toLocaleDateString('ar-EG', { weekday: 'short' });
      if (!salesByDay[day]) {
        salesByDay[day] = 0;
      }
      salesByDay[day] += sale.totalPrice;
    });

    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dayName = date.toLocaleDateString('ar-EG', { weekday: 'short' });
        return {
            name: dayName,
            'المبيعات': salesByDay[dayName] || 0,
        };
    }).reverse();
  }, [sales]);

  return { products, sales, addProduct, recordSale, recordReturn, stats, salesDataForChart };
};
