
import { GoogleGenAI } from "@google/genai";

// Initialization using environment variable as required for security
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRecoveryAdvice = async (patientData: any, query: string) => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Contexto do Paciente: ${JSON.stringify(patientData)}
        Pergunta do Paciente: ${query}
      `,
      config: {
        systemInstruction: `
          Você é o assistente virtual da Urgetrauma, uma clínica de ortopedia e fisioterapia de excelência.
          Sua prioridade é a segurança do paciente e o suporte empático.
          Forneça respostas curtas e profissionais. 
          NUNCA substitua a avaliação médica presencial.
          Sempre oriente o paciente a consultar o Dr. Marcos Santos ou a recepção da Urgetrauma para mudanças em prescrições.
        `
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "O assistente está temporariamente indisponível. Por favor, contate a recepção da Urgetrauma.";
  }
};

export const getClinicalSummary = async (clinicalData: any) => {
  const ai = getAiClient();
  try {
    // Using Pro model for better analytical reasoning of clinic stats
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        Analise estrategicamente os dados operacionais da Urgetrauma:
        ${JSON.stringify(clinicalData)}
        
        Forneça 3 insights práticos para melhorar a eficiência do atendimento e a satisfação do paciente.
      `,
      config: {
        systemInstruction: "Você é um consultor sênior em gestão hospitalar especializado em clínicas de trauma e fisioterapia."
      }
    });
    return response.text;
  } catch (error) {
    return "Sumário estratégico indisponível no momento.";
  }
};