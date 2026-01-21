
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS, MOCK_PATIENT } from '../constants';
import { getRecoveryAdvice } from '../services/geminiService';
import { X, MessageCircle, Star, ThumbsUp } from 'lucide-react';

const UNIMED_CHECKIN_URL = "https://biofacial.unimedpoa.com.br/ords/r/bio/execute/home?id_prestador=644941";

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // NPS States
  const [showNPS, setShowNPS] = useState(false);
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [npsComment, setNpsComment] = useState('');
  const [npsSubmitted, setNpsSubmitted] = useState(false);

  useEffect(() => {
    // Simulando o disparo do modal após 3 segundos do carregamento
    const timer = setTimeout(() => {
      const hasAnswered = localStorage.getItem('nps_answered_v1');
      if (!hasAnswered) {
        setShowNPS(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAiAsk = async () => {
    if (!aiQuery) return;
    setIsAiLoading(true);
    const response = await getRecoveryAdvice(MOCK_PATIENT, aiQuery);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  const handleNpsSubmit = () => {
    if (npsScore === null) return;
    setNpsSubmitted(true);
    localStorage.setItem('nps_answered_v1', 'true');
    setTimeout(() => {
      setShowNPS(false);
    }, 3000);
  };

  const isUnimedPOA = MOCK_PATIENT.insurance === 'Unimed Porto Alegre';

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      
      {/* NPS Modal */}
      {showNPS && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNPS(false)} />
          
          <div className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setShowNPS(false)}
              className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-50 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            {!npsSubmitted ? (
              <div className="p-8 lg:p-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center rotate-3">
                    <Star size={40} fill="currentColor" className="opacity-80" />
                  </div>
                </div>
                
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Sua evolução é nossa prioridade</h3>
                  <p className="text-slate-500">De 0 a 10, qual a probabilidade de você recomendar a Urgetrauma a um amigo ou familiar?</p>
                </div>

                <div className="flex flex-wrap justify-between gap-2 mb-8">
                  {[...Array(11)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNpsScore(i)}
                      className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl font-black text-sm transition-all border-2 flex items-center justify-center ${
                        npsScore === i 
                          ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-200' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-8">
                  <span className="text-red-400">Pouco Provável</span>
                  <span className="text-green-500">Muito Provável</span>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Algum comentário adicional? (Opcional)</label>
                  <textarea 
                    rows={3}
                    value={npsComment}
                    onChange={(e) => setNpsComment(e.target.value)}
                    placeholder="Conte-nos como foi seu atendimento ou sugira melhorias..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all outline-none"
                  />
                </div>

                <button 
                  onClick={handleNpsSubmit}
                  disabled={npsScore === null}
                  className="w-full mt-10 bg-blue-600 text-white py-5 rounded-[20px] font-bold shadow-xl shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  Enviar Avaliação
                </button>
              </div>
            ) : (
              <div className="p-12 lg:p-20 text-center animate-in zoom-in duration-500">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <ThumbsUp size={48} />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-4">Obrigado pelo feedback!</h3>
                <p className="text-slate-500 leading-relaxed">
                  Sua opinião ajuda o Dr. Marcos e toda a equipe da Urgetrauma a oferecer um atendimento cada vez melhor.
                </p>
                <div className="mt-10 inline-flex items-center gap-2 bg-slate-50 px-6 py-3 rounded-2xl text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {ICONS.Check} Registrado com Sucesso
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">Olá, {MOCK_PATIENT.firstName} 👋</h2>
          <p className="text-sm lg:text-base text-slate-500">Sua recuperação na Urgetrauma.</p>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/patient/requests?type=AppointmentRequest')}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95 text-xs lg:text-sm"
          >
            {ICONS.Calendar}
            <span className="whitespace-nowrap">Agendar</span>
          </button>
          <button 
            onClick={() => navigate('/patient/profile')}
            className="bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm text-xs lg:text-sm"
          >
            {ICONS.Profile}
          </button>
          <button className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white px-4 lg:px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-100 transition-all active:scale-95 text-xs lg:text-sm">
            {ICONS.Alert}
            <span className="whitespace-nowrap">SOS</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-100 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/20 rounded-2xl">
              {ICONS.Calendar}
            </div>
            <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Próxima</span>
          </div>
          <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Consulta Agendada</p>
          <h3 className="text-xl lg:text-2xl font-bold mb-4">Segunda, 20 de Maio</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs bg-white/10 p-3 rounded-2xl mb-4">
            <div className="flex items-center gap-1">
              {ICONS.Clock} 14:30
            </div>
            <div className="flex items-center gap-1 border-l border-white/20 pl-3">
              {ICONS.Physio} Fis. Marcos
            </div>
          </div>

          {isUnimedPOA && (
            <div className="mt-auto pt-2 animate-in slide-in-from-bottom-2">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  {ICONS.Check} Biometria Unimed POA
                </p>
                <a 
                  href={UNIMED_CHECKIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-blue-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  {ICONS.ExternalLink} Realizar Validação
                </a>
                <p className="text-[9px] text-blue-100 mt-2 text-center opacity-80 leading-tight">
                  Valide agora e vá direto para a sessão ao chegar na clínica.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              {ICONS.Treatments}
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plano</p>
                <p className="text-xs font-bold text-slate-800">{MOCK_PATIENT.insurance}</p>
            </div>
          </div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Progresso</p>
          <div className="mt-auto">
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl lg:text-3xl font-bold text-slate-800">65%</span>
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Evoluindo</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full w-[65%] shadow-sm shadow-green-200" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm md:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start mb-4 lg:mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              {ICONS.Medications}
            </div>
          </div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Medicação</p>
          <div className="space-y-2 lg:space-y-3">
            {MOCK_PATIENT.medications.slice(0, 2).map(med => (
              <div key={med.id} className="flex items-center justify-between p-2 lg:p-3 bg-slate-50 rounded-2xl">
                <div className="min-w-0">
                  <p className="text-xs lg:text-sm font-bold text-slate-800 truncate">{med.name}</p>
                  <p className="text-[10px] text-slate-500">{med.frequency}</p>
                </div>
                <div className="text-slate-400">{ICONS.Clock}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 bg-blue-500/10 rounded-full -mr-8 -mt-8 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                {ICONS.AI}
              </div>
              <h3 className="text-lg lg:text-xl font-bold">Assistente Urgetrauma AI</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Tire dúvidas sobre seu tratamento ou prepare sua próxima consulta.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Dúvidas sobre sua dor?"
                  className="w-full bg-slate-800 border-none rounded-2xl py-3.5 pl-5 pr-12 text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button 
                  onClick={handleAiAsk}
                  disabled={isAiLoading}
                  className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 px-3 lg:px-4 rounded-xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {isAiLoading ? '...' : ICONS.Arrow}
                </button>
              </div>

              {aiResponse && (
                <div className="bg-slate-800/50 p-4 lg:p-6 rounded-2xl text-xs lg:text-sm leading-relaxed border border-slate-700 animate-in slide-in-from-bottom-2">
                  <p className="font-semibold text-blue-400 mb-2">Resposta Urgetrauma:</p>
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h3 className="text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-2">
              {ICONS.History} Histórico
            </h3>
            <button className="text-blue-600 text-xs font-bold hover:underline">Ver tudo</button>
          </div>
          <div className="space-y-5 lg:space-y-6">
            {MOCK_PATIENT.history.map((record, idx) => (
              <div key={record.id} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-blue-500 ring-4 ring-blue-50' : 'bg-slate-200'}`} />
                  {idx < MOCK_PATIENT.history.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-[10px] text-slate-400 font-bold mb-0.5">{record.date}</p>
                  <p className="text-xs lg:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">{record.description}</p>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    {ICONS.Physio} {record.doctor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
