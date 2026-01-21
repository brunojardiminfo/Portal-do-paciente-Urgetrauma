
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ICONS, MOCK_REQUISITIONS, MOCK_PATIENT } from '../constants';
import { Requisition } from '../types';

const RequestCenter: React.FC = () => {
  const location = useLocation();
  const [requests, setRequests] = useState<Requisition[]>(MOCK_REQUISITIONS);
  const [isAdding, setIsAdding] = useState(false);
  const [newRequest, setNewRequest] = useState<Partial<Requisition>>({ 
    description: '', 
    type: 'Certificate',
    fileName: '',
    professionalType: 'Fisioterapeuta',
    preferredPeriod: 'Manhã'
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('type') === 'AppointmentRequest') {
      setIsAdding(true);
      setNewRequest(prev => ({ ...prev, type: 'AppointmentRequest' }));
    }
  }, [location]);

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.description && newRequest.type !== 'AppointmentRequest') return;
    
    const description = newRequest.type === 'AppointmentRequest' 
      ? `Solicitação de agendamento: ${newRequest.professionalType} (${newRequest.preferredPeriod})`
      : newRequest.description || '';

    const req: Requisition = {
      id: Date.now().toString(),
      description,
      type: newRequest.type as Requisition['type'],
      status: 'Pending',
      date: new Date().toLocaleDateString('pt-BR'),
      fileName: newRequest.fileName,
      professionalType: newRequest.professionalType,
      preferredPeriod: newRequest.preferredPeriod
    };
    setRequests([req, ...requests]);
    setNewRequest({ 
      description: '', 
      type: 'Certificate', 
      fileName: '',
      professionalType: 'Fisioterapeuta',
      preferredPeriod: 'Manhã'
    });
    setIsAdding(false);
  };

  const getTypeLabel = (type: Requisition['type']) => {
    switch(type) {
      case 'Certificate': return 'Atestado';
      case 'Imaging': return 'Imagem';
      case 'Exam': return 'Laudo';
      case 'InsuranceValidation': return 'Validação de Convênio';
      case 'AppointmentRequest': return 'Agendamento';
      default: return type;
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Requisições e Agendamentos</h2>
          <p className="text-slate-500">Solicite consultas, documentos ou valide sessões com o convênio.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          {ICONS.Add} Nova Solicitação
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border border-blue-200 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-bold text-slate-800 mb-6">O que você precisa enviar ou solicitar?</h3>
          <form onSubmit={handleAddRequest} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { type: 'AppointmentRequest', label: 'Agendar', sub: 'Nova Consulta' },
                { type: 'InsuranceValidation', label: 'Validação', sub: 'Enviar para convênio' },
                { type: 'Certificate', label: 'Atestado', sub: 'Solicitar via app' },
                { type: 'Imaging', label: 'Imagem', sub: 'Enviar exame' },
                { type: 'Exam', label: 'Laudo', sub: 'Solicitar laudo' }
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setNewRequest({...newRequest, type: item.type as Requisition['type']})}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${newRequest.type === item.type ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <p className="font-bold text-slate-800">{item.label}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">{item.sub}</p>
                </button>
              ))}
            </div>

            {newRequest.type === 'AppointmentRequest' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-4">Escolha o Profissional</label>
                  <div className="flex gap-4">
                    {['Fisioterapeuta', 'Fisiatra'].map(prof => (
                      <button
                        key={prof}
                        type="button"
                        onClick={() => setNewRequest({...newRequest, professionalType: prof as any})}
                        className={`flex-1 p-3 rounded-xl border-2 font-bold transition-all ${newRequest.professionalType === prof ? 'border-blue-600 bg-blue-600 text-white shadow-md' : 'border-slate-200 bg-white text-slate-600'}`}
                      >
                        {prof}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-4">Período de Preferência</label>
                  <div className="flex gap-4">
                    {['Manhã', 'Tarde', 'Noite'].map(period => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setNewRequest({...newRequest, preferredPeriod: period as any})}
                        className={`flex-1 p-3 rounded-xl border-2 font-bold transition-all ${newRequest.preferredPeriod === period ? 'border-blue-600 bg-blue-600 text-white shadow-md' : 'border-slate-200 bg-white text-slate-600'}`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-blue-600 font-medium flex items-center gap-2">
                    {/* Fixed: Property 'Info' now exists on ICONS after updating constants.tsx */}
                    {ICONS.Info || <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                    Esta é uma solicitação. Nossa recepção verificará a disponibilidade e entrará em contato.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Descrição / Motivo</label>
                  <textarea 
                    rows={3}
                    value={newRequest.description}
                    onChange={e => setNewRequest({...newRequest, description: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder={newRequest.type === 'InsuranceValidation' ? "Ex: Validação para sessões de Maio - Guia nº 12345" : "Descreva sua necessidade..."}
                  />
                </div>
                
                <div className="flex flex-col justify-center">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Anexar Documento (Opcional)</label>
                  <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      onChange={e => setNewRequest({...newRequest, fileName: e.target.files?.[0]?.name || ''})}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="text-blue-600 mb-2">{ICONS.Upload}</div>
                    <p className="text-sm font-bold text-slate-600">
                      {newRequest.fileName || 'Clique para selecionar arquivo'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">PDF, JPG ou PNG (Máx 5MB)</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-2 bg-blue-600 text-white py-4 px-12 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                {ICONS.Send} {newRequest.type === 'AppointmentRequest' ? 'Solicitar Horário' : 'Enviar para o Atendente'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Seu Histórico de Solicitações</h3>
          {requests.map(req => (
            <div key={req.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${
                  req.type === 'AppointmentRequest' ? 'bg-blue-50 text-blue-600' :
                  req.type === 'InsuranceValidation' ? 'bg-indigo-50 text-indigo-600' : 
                  req.type === 'Imaging' ? 'bg-purple-50 text-purple-600' : 
                  'bg-orange-50 text-orange-600'
                }`}>
                  {req.type === 'AppointmentRequest' ? ICONS.Calendar : req.type === 'InsuranceValidation' ? ICONS.Insurance : req.type === 'Imaging' ? ICONS.Exam : ICONS.Requests}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{req.description}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-bold">{getTypeLabel(req.type)}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-xs text-slate-400">{req.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                  {req.status === 'Approved' ? (req.type === 'AppointmentRequest' ? 'Agendado' : 'Disponível') : 'Em Análise'}
                </span>
                {req.status === 'Approved' && (
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Informações Úteis</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm">
              <div className="mt-1 text-blue-600">{ICONS.Calendar}</div>
              <p className="text-slate-600">As solicitações de agendamento são processadas pela recepção em horário comercial.</p>
            </li>
            <li className="flex gap-3 text-sm">
              <div className="mt-1 text-indigo-600">{ICONS.Insurance}</div>
              <p className="text-slate-600">As validações nos portais dos convênios são feitas pelos nossos atendentes em até 48h.</p>
            </li>
            <li className="flex gap-3 text-sm">
              <div className="mt-1 text-amber-600">{ICONS.Alert}</div>
              <p className="text-slate-600">Pendências de validação podem bloquear o agendamento de novas sessões.</p>
            </li>
          </ul>
          <div className="mt-8 pt-6 border-t">
             <p className="text-xs text-slate-400 font-bold uppercase mb-2">Seu Plano</p>
             <p className="font-bold text-slate-800">{MOCK_PATIENT.insurance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCenter;
