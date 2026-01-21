
import React, { useState } from 'react';
import { ICONS, MOCK_PATIENT } from '../constants';
import { Medication } from '../types';

const MedicationList: React.FC = () => {
  const [meds, setMeds] = useState<Medication[]>(MOCK_PATIENT.medications);
  const [isAdding, setIsAdding] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '' });

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name) return;
    const medication: Medication = {
      id: Date.now().toString(),
      name: newMed.name,
      dosage: newMed.dosage,
      frequency: newMed.frequency
    };
    setMeds([...meds, medication]);
    setNewMed({ name: '', dosage: '', frequency: '' });
    setIsAdding(false);
  };

  const removeMed = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Meus Medicamentos</h2>
          <p className="text-slate-500">Registre suas prescrições e horários de uso.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50">
          {ICONS.Requests} Baixar Receita Digital
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meds.map(med => (
          <div key={med.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
            <button 
              onClick={() => removeMed(med.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              Excluir
            </button>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  {ICONS.Medications}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{med.name}</h3>
                  <p className="text-sm text-slate-500">{med.dosage}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">EM DIA</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Frequência</p>
                <p className="text-sm font-semibold text-slate-700">{med.frequency}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Próxima Dose</p>
                <p className="text-sm font-semibold text-slate-700">Às 18:00</p>
              </div>
            </div>

            <button className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
              Marcar como Tomado
            </button>
          </div>
        ))}
        
        {!isAdding ? (
          <div 
            onClick={() => setIsAdding(true)}
            className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group h-full"
          >
            <div className="p-4 bg-slate-100 text-slate-400 rounded-full mb-4 group-hover:scale-110 transition-transform">
              {ICONS.Add}
            </div>
            <h3 className="font-bold text-slate-600">Adicionar Medicamento</h3>
            <p className="text-xs text-slate-400 mt-1">Registre novos itens da sua prescrição.</p>
          </div>
        ) : (
          <form onSubmit={handleAddMed} className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-4 animate-in zoom-in-95 duration-200">
            <div>
              <label className="block text-xs font-bold text-blue-700 mb-1">Nome do Medicamento</label>
              <input 
                autoFocus
                type="text" 
                value={newMed.name}
                onChange={e => setNewMed({...newMed, name: e.target.value})}
                placeholder="Ex: Tylenol" 
                className="w-full bg-white border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-blue-700 mb-1">Dosagem</label>
                <input 
                  type="text" 
                  value={newMed.dosage}
                  onChange={e => setNewMed({...newMed, dosage: e.target.value})}
                  placeholder="Ex: 500mg" 
                  className="w-full bg-white border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-blue-700 mb-1">Frequência</label>
                <input 
                  type="text" 
                  value={newMed.frequency}
                  onChange={e => setNewMed({...newMed, frequency: e.target.value})}
                  placeholder="Ex: 8/8h" 
                  className="w-full bg-white border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 text-blue-600 font-bold text-xs"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-2 bg-blue-600 text-white py-3 px-6 rounded-xl font-bold text-xs shadow-lg shadow-blue-100"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MedicationList;
