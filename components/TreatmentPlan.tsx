
import React from 'react';
import { ICONS, MOCK_PATIENT } from '../constants';

const TreatmentPlan: React.FC = () => {
  const treatment = MOCK_PATIENT.treatments[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Plano de Tratamento</h2>
          <p className="text-slate-500">{treatment.title}</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border rounded-2xl shadow-sm text-slate-600 hover:bg-slate-50">
            {ICONS.Calendar}
          </button>
          <button className="p-3 bg-white border rounded-2xl shadow-sm text-slate-600 hover:bg-slate-50">
            {ICONS.History}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              {ICONS.Treatments}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Iniciado em {treatment.startDate}</p>
              <h3 className="text-xl font-bold text-slate-800">Fisioterapia Pós-Operatória</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">Sessão 08 de 20</p>
            <div className="w-48 bg-slate-100 h-2 rounded-full mt-2">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            {ICONS.Clock} Próximos Agendamentos
          </h4>
          <div className="space-y-4">
            {treatment.sessions.map((session, idx) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${session.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-white text-blue-600 shadow-sm'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{new Date(session.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</p>
                    <p className="text-xs text-slate-500 capitalize">{session.status === 'Scheduled' ? 'Pendente' : 'Concluída'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {session.status === 'Scheduled' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      Confirmar Presença
                    </button>
                  )}
                  {session.status === 'Completed' ? ICONS.Check : ICONS.Arrow}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;
