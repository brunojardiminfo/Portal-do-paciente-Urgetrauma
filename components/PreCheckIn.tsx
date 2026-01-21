
import React, { useState } from 'react';
import { ICONS, MOCK_PATIENT, INSURANCE_LIST } from '../constants';

const UNIMED_CHECKIN_URL = "https://biofacial.unimedpoa.com.br/ords/r/bio/execute/home?id_prestador=644941";

const PreCheckIn: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Insurance selection, 1: Pain level, 2: Comments & Token
  const [insurance, setInsurance] = useState(MOCK_PATIENT.insurance);
  const [painLevel, setPainLevel] = useState(5);
  const [comments, setComments] = useState('');
  const [token, setToken] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isUnimedPOA = insurance === 'Unimed Porto Alegre';

  const handleSubmit = () => {
    if (isUnimedPOA && !token) {
      alert('Por favor, insira o token gerado pela Unimed para finalizar o check-in.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-12 lg:py-20 text-center animate-in zoom-in duration-300 px-4">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          {ICONS.Check}
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">Check-in Concluído!</h2>
        <p className="text-sm lg:text-base text-slate-500 mb-4">
          Suas informações foram enviadas com sucesso ao seu fisioterapeuta.
        </p>
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-8">
          <p className="text-xs lg:text-sm text-amber-800 font-medium">
            <strong>Aviso de Pontualidade:</strong> Por favor, chegue com 15 minutos de antecedência para garantir o início pontual da sua sessão.
          </p>
        </div>
        <button 
          onClick={() => {
            setSubmitted(false);
            setStep(0);
            setToken('');
          }}
          className="w-full lg:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100"
        >
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500 px-2 lg:px-0">
      <div className="mb-6 lg:mb-8 text-center md:text-left">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">Check-in Pré-Consulta</h2>
        <p className="text-sm lg:text-base text-slate-500">Agilize seu atendimento e evite filas na recepção.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm">
        <div className="mb-6 lg:mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step >= 0 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-1 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* Banner de Antecedência para passos 1 e 2 */}
        {step > 0 && (
          <div className="mb-8 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-2xl animate-in slide-in-from-top-2">
            <div className="flex gap-3">
              <div className="text-amber-500 mt-0.5">{ICONS.Alert}</div>
              <div>
                <h4 className="text-xs lg:text-sm font-bold text-amber-900">Atenção ao Horário</h4>
                <p className="text-[10px] lg:text-xs text-amber-800 mt-1">
                  Solicitamos a chegada com pelo menos <strong>15 minutos de antecedência</strong> para garantir a melhor experiência no seu atendimento.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 0 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4 text-center md:text-left">Confirme seu Convênio</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {INSURANCE_LIST.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setInsurance(opt)}
                    className={`p-3 rounded-xl border-2 font-bold transition-all text-left text-xs ${insurance === opt ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {insurance === 'Unimed Porto Alegre' && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-600 text-white rounded-lg">
                    {ICONS.Insurance}
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900">Biometria Facial Unimed POA</h4>
                    <p className="text-xs text-indigo-700 mt-1">
                      Para beneficiários da Unimed Porto Alegre: Realize a biometria antes de chegar. Isso libera sua sessão automaticamente no nosso sistema.
                    </p>
                  </div>
                </div>
                <a 
                  href={UNIMED_CHECKIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white border-2 border-indigo-200 text-indigo-700 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-colors shadow-sm"
                >
                  {ICONS.ExternalLink} Abrir Biometria Facial
                </a>
                <p className="text-[10px] text-indigo-600 font-medium text-center">
                  Após realizar a biometria no link acima, continue o check-in aqui para inserir seu token.
                </p>
              </div>
            )}

            <button 
              onClick={() => setStep(1)}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all"
            >
              Confirmar e Continuar
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 lg:space-y-8 animate-in slide-in-from-right-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4 text-center md:text-left">Nível de Dor Atual (0 a 10)</label>
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-6">
                {[...Array(11)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPainLevel(i)}
                    className={`w-9 h-9 md:w-12 md:h-12 rounded-xl font-bold transition-all text-xs lg:text-sm ${painLevel === i ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 uppercase tracking-tighter">
                <span className="text-green-500">Nenhuma</span>
                <span className="text-amber-500">Moderada</span>
                <span className="text-red-500">Insuportável</span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button 
                onClick={() => setStep(0)}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold"
              >
                Voltar
              </button>
              <button 
                onClick={() => setStep(2)}
                className="flex-2 bg-blue-600 text-white py-4 px-6 rounded-2xl font-bold shadow-lg"
              >
                Próximo Passo
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            {isUnimedPOA && (
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <label className="block text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                  {ICONS.Key} Token de Biometria Unimed
                </label>
                <input 
                  type="text" 
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  className="w-full bg-white border-none rounded-2xl p-4 text-center text-2xl font-mono tracking-[0.5em] focus:ring-2 focus:ring-blue-500 uppercase"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-[10px] text-blue-600 font-bold mt-3 text-center uppercase">
                  Insira o código de 6 dígitos gerado após sua biometria facial
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Sintomas ou observações para o Fisio?</label>
              <textarea 
                rows={isUnimedPOA ? 3 : 5}
                value={comments}
                onChange={e => setComments(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Senti um estalo ao fazer o exercício X..."
              />
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold"
              >
                Voltar
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-2 bg-blue-600 text-white py-4 px-6 lg:px-12 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                {ICONS.Check} Finalizar Check-in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreCheckIn;
