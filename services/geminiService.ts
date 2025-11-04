
import { GoogleGenAI } from "@google/genai";
import type { Product, Sale } from '../types';

export async function getSalesRecommendations(products: Product[], sales: Sale[]): Promise<string> {
  if (!process.env.API_KEY) {
    return "خطأ: مفتاح API غير مهيأ. يرجى تعيين متغير البيئة API_KEY.";
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    أنت محلل أعمال خبير لمتجر بيع بالتجزئة.
    حلل بيانات المخزون والمبيعات التالية وقدم توصيات قابلة للتنفيذ.

    المخزون الحالي:
    ${JSON.stringify(products, null, 2)}

    المبيعات الأخيرة (آخر 20 عملية بيع):
    ${JSON.stringify(sales.slice(-20), null, 2)}

    بناءً على هذه البيانات، قدم ما يلي:
    1.  **المنتجات الأكثر مبيعًا:** حدد المنتجات التي تحقق أعلى مبيعات.
    2.  **تنبيه انخفاض المخزون:** ضع قائمة بالمنتجات التي أوشك مخزونها على النفاد (على سبيل المثال، أقل من 10 وحدات) وتحتاج إلى إعادة طلب.
    3.  **نصيحة استراتيجية:** قدم توصية استراتيجية موجزة. قد يكون ذلك حول تجميع المنتجات، أو تقديم خصم على المنتجات بطيئة الحركة، أو اقتراح تسويقي.

    نسق ردك بتنسيق ماركداون واضح وموجز. استخدم اللغة العربية في الرد.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "حدث خطأ أثناء جلب توصيات الذكاء الاصطناعي. يرجى التحقق من وحدة التحكم للحصول على التفاصيل.";
  }
}
