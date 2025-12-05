import { GoogleGenAI } from "@google/genai";
import { ChannelRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findSimilarChannels = async (videoUrl: string): Promise<ChannelRecommendation[]> => {
  try {
    const prompt = `
      Saya memiliki link video YouTube ini: "${videoUrl}".
      
      Tugas kamu:
      1. Analisis konten, topik, gaya penyampaian, dan niche dari video/channel tersebut menggunakan Google Search.
      2. Temukan 5-8 Channel YouTube LAIN yang memiliki konsep, materi, dan target audiens yang SANGAT MIRIP.
         PENTING: Cakupan pencarian harus luas. Sertakan channel berbahasa Indonesia DAN channel berbahasa Inggris (Internasional) yang relevan. Jangan batasi hanya pada satu bahasa.
      3. Berikan output HANYA dalam format array JSON (raw JSON array). Jangan gunakan Markdown formatting.
      
      Struktur JSON untuk setiap item:
      {
        "name": "Nama Channel",
        "description": "Deskripsi singkat channel (Gunakan Bahasa Indonesia)",
        "similarityReason": "Alasan spesifik mengapa channel ini mirip dengan link yang diberikan (Gunakan Bahasa Indonesia)",
        "url": "Link ke channel tersebut (atau link pencarian youtube jika tidak pasti)",
        "tags": ["Tag1", "Tag2", "Tag3"]
      }

      Pastikan datanya akurat dan relevan. Gunakan Bahasa Indonesia untuk description dan similarityReason, meskipun channelnya berbahasa Inggris.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType: 'application/json' is NOT compatible with googleSearch tool currently,
        // so we rely on the prompt to enforce JSON structure and parse it manually.
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Tidak ada respon dari AI.");
    }

    // Clean up potential markdown code blocks (```json ... ```)
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Parse JSON
    let recommendations: any[] = [];
    try {
      recommendations = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse JSON", cleanedText);
      throw new Error("Gagal memproses data rekomendasi. Coba lagi.");
    }

    // Validate and map structure
    return recommendations.map((item: any, index: number) => ({
      id: `channel-${index}-${Date.now()}`,
      name: item.name || "Unknown Channel",
      description: item.description || "Tidak ada deskripsi.",
      similarityReason: item.similarityReason || "Konsep serupa.",
      url: item.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(item.name)}`,
      tags: Array.isArray(item.tags) ? item.tags : []
    }));

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Terjadi kesalahan saat mencari channel.");
  }
};