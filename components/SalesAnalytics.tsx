
import React, { useState } from 'react';
import type { Product, Sale } from '../types';
import { getSalesRecommendations } from '../services/geminiService';
import { SparklesIcon } from './Icons';

interface SalesAnalyticsProps {
  products: Product[];
  sales: Sale[];
}

const SalesAnalytics: React.FC<SalesAnalyticsProps> = ({ products, sales }) => {
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    const result = await getSalesRecommendations(products, sales);
    setRecommendations(result);
    setIsLoading(false);
  };

  const formatMarkdown = (text: string) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">تحليلات المبيعات</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h3 className="text-xl font-semibold">توصيات ذكية</h3>
                <p className="text-slate-500 mt-1">احصل على رؤى وتحليلات مدعومة بالذكاء الاصطناعي لتحسين مبيعاتك.</p>
            </div>
            <button
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-wait transition-colors w-full sm:w-auto"
            >
            <SparklesIcon className="w-5 h-5" />
            {isLoading ? 'جاري التحليل...' : 'الحصول على توصيات'}
            </button>
        </div>

        {isLoading && (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">يقوم الذكاء الاصطناعي بتحليل بياناتك...</p>
            </div>
        )}

        {recommendations && !isLoading && (
          <div className="mt-6 border-t pt-6">
            <h4 className="text-lg font-semibold mb-2">نتائج التحليل:</h4>
            <div
                className="prose prose-sm max-w-none text-slate-700 space-y-2"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(recommendations) }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesAnalytics;
