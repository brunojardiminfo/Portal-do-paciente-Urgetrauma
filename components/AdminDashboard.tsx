
import React, { useState, useEffect, useMemo } from 'react';
import { ICONS, CLINIC_STATS, MOCK_CHECKINS, MOCK_SCHEDULE_FISIATRA, MOCK_SCHEDULE_FISIOTERAPEUTA } from '../constants';
import { getClinicalSummary } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckIn, Appointment } from '../types';
import { Bell, X } from 'lucide-react';

// Extended type for local state to handle the new sub-statuses
interface ExtendedCheckIn extends CheckIn {
  workflowStatus?: 'Agenda' | 'Requisition';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'request' | 'document';
}

const chartData = [
  { name: 'Seg', pacientes: 40, traumas: 24 },
  { name: 'Ter', pacientes: 30, traumas: 13 },
  { name: 'Qua', pacientes: 20, traumas: 98 },
  { name: 'Qui', pacientes: 27, traumas: 39 },
  { name: 'Sex', pacientes: 18, traumas: 48 },
  { name: 'Sab', pacientes: 23, traumas: 38 },
  { name: 'Dom', pacientes: 34, traumas: 43 },
];

const AdminDashboard: React.FC = () => {
  const [summary, setSummary] = useState('Gerando insights inteligentes...');
  const [checkins, setCheckins] = useState<ExtendedCheckIn[]>(MOCK_CHECKINS.map(c => ({ ...c, workflowStatus: 'Agenda' })));
  const [isScheduleView, setIsScheduleView] = useState(false);
  const [activeSchedule, setActiveSchedule] = useState<'Fisiatra' | 'Fisioterapeuta'>('Fisiatra');
  
  // New state for notifications
  const [notification, setNotification] = useState<Notification | null>(null);
  
  // New state for date filtering
  const [selectedDate, setSelectedDate] = useState('2024-05-20');
  
  const [fisiatraAppointments, setFisiatraAppointments] = useState<Appointment[]>(MOCK_SCHEDULE_FISIATRA);
  const [fisioAppointments, setFisioAppointments] = useState<Appointment[]>(MOCK_SCHEDULE_FISIOTERAPEUTA);
  const [notifyingId, setNotifyingId] = useState<string | null>(null);

  // Discrete notification sound using Web Audio API
  const playPing = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Audio context failed to start", e);
    }
  };

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await getClinicalSummary(CLINIC_STATS);
      setSummary(result);
    };
    fetchSummary();

    // Simulation: New request arriving after 8 seconds
    const timer = setTimeout(() => {
      setNotification({
        id: 'NOTIF-1',
        title: 'Nova Solicitação',
        message: 'Eduardo Oliveira solicitou um novo agendamento de Fisio.',
        type: 'request'
      });
      playPing();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Filtered schedule based on selected date
  const filteredSchedule = useMemo(() => {
    const source = activeSchedule === 'Fisiatra' ? fisiatraAppointments : fisioAppointments;
    return source.filter(app => app.date === selectedDate);
  }, [activeSchedule, selectedDate, fisiatraAppointments, fisioAppointments]);

  const handleStartSession = (id: string) => {
    setCheckins(checkins.map(c => c.id === id ? { ...c, status: 'Confirmed', workflowStatus: 'Agenda' } : c));
  };

  const handleUpdateWorkflow = (id: string, status: 'Agenda' | 'Requisition') => {
    setCheckins(checkins.map(c => c.id === id ? { ...c, workflowStatus: status } : c));
  };

  const handleMessagePatient = (name: string) => {
    alert(`Abrindo canal de comunicação com ${name}...`);
  };

  const handleSendConfirmation = (id: string) => {
    setNotifyingId(id);
    setTimeout(() => {
      if (activeSchedule === 'Fisiatra') {
        setFisiatraAppointments(prev => prev.map(a => a.id === id ? { ...a, notificationSent: true } : a));
      } else {
        setFisioAppointments(prev => prev.map(a => a.id === id ? { ...a, notificationSent: true } : a));
      }
      setNotifyingId(null);
    }, 1500);
  };

  const getPainColor = (level: number) => {
    if (level >= 8) return 'bg-red-500 text-white';
    if (level >= 5) return 'bg-amber-500 text-white';
    return 'bg-green-500 text-white';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] w-full max-w-sm animate-in slide-in-from-right-10 duration-500">
          <div className="bg-white border-l-4 border-blue-600 rounded-3xl shadow-2xl p-5 flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-2xl text-blue-600">
              <Bell size={20} className="animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 text-sm">{notification.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notification.message}</p>
              <div className="mt-3 flex gap-2">
                <button 
                  onClick={() => {
                    setNotification(null);
                    window.location.hash = '/admin/patients';
                  }}
                  className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline"
                >
                  Ver Solicitação
                </button>
              </div>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-300 hover:text-slate-500">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {isScheduleView ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <button onClick={() => setIsScheduleView(false)} className="hover:underline text-xs font-bold flex items-center gap-1">
                  {ICONS.ChevronLeft} Voltar para Dashboard
                </button>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Gerenciamento de Agenda</h2>
              <p className="text-slate-500">Controle de sessões e disparos automáticos.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm w-full sm:w-auto">
                <div className="pl-2 text-slate-400">
                  {ICONS.Calendar}
                </div>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 outline-none pr-4 w-full cursor-pointer"
                />
              </div>

              <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full sm:w-auto">
                <button 
                  onClick={() => setActiveSchedule('Fisiatra')}
                  className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSchedule === 'Fisiatra' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Fisiatra
                </button>
                <button 
                  onClick={() => setActiveSchedule('Fisioterapeuta')}
                  className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSchedule === 'Fisioterapeuta' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Fisio
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
            <div className="p-8 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/30 gap-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  {ICONS.Clock}
                </span>
                Pacientes do dia {new Date(selectedDate + 'T12:00:00Z').toLocaleDateString('pt-BR')}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setDate(d.getDate() - 1);
                    setSelectedDate(d.toISOString().split('T')[0]);
                  }}
                  className="p-2.5 border bg-white rounded-xl hover:bg-slate-50 shadow-sm transition-colors text-slate-400 hover:text-blue-600"
                >
                  {ICONS.ChevronLeft}
                </button>
                <button 
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setDate(d.getDate() + 1);
                    setSelectedDate(d.toISOString().split('T')[0]);
                  }}
                  className="p-2.5 border bg-white rounded-xl hover:bg-slate-50 shadow-sm transition-colors text-slate-400 hover:text-blue-600"
                >
                  {ICONS.ChevronRight}
                </button>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSchedule.map(app => (
                <div key={app.id} className="p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group shadow-sm flex flex-col animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 p-2.5 rounded-2xl shadow-sm text-blue-600">
                      {ICONS.Clock}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${app.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {app.status}
                      </span>
                      {app.notificationSent && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase">
                          {ICONS.Check} Notificado
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{app.patientName}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-6">{app.time} - {app.type}</p>
                  
                  <div className="mt-auto space-y-2">
                    {!app.notificationSent ? (
                      <button 
                        onClick={() => handleSendConfirmation(app.id)}
                        disabled={notifyingId === app.id}
                        className="w-full bg-blue-50 text-blue-600 py-3 rounded-2xl text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-2 border border-blue-100 disabled:opacity-50 shadow-sm"
                      >
                        {notifyingId === app.id ? (
                          <>Enviando...</>
                        ) : (
                          <>
                            {ICONS.AI} Disparar Confirmação
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-full bg-green-50 text-green-700 py-3 rounded-2xl text-[10px] font-bold text-center uppercase tracking-widest border border-green-100 flex items-center justify-center gap-2">
                        {ICONS.Check} Mensagem Enviada
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-slate-50 border text-[10px] font-bold py-2.5 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-widest text-slate-600">Detalhes</button>
                      <button className="flex-1 bg-white border text-[10px] font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-widest text-slate-400">Pausar</button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredSchedule.length > 0 && (
                <button className="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[220px] group">
                  <div className="p-3 bg-slate-50 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    {ICONS.Add}
                  </div>
                  <span className="text-[10px] font-bold uppercase">Encaixar Paciente</span>
                </button>
              )}
            </div>

            {filteredSchedule.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 px-6 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 scale-125">
                  {ICONS.Calendar}
                </div>
                <h4 className="text-xl font-bold text-slate-400">Nenhum agendamento encontrado</h4>
                <p className="text-sm text-slate-300 mt-2 max-w-xs mx-auto">Não há sessões de {activeSchedule} marcadas para este dia no sistema.</p>
                <button 
                  onClick={() => setSelectedDate('2024-05-20')}
                  className="mt-8 text-blue-600 text-sm font-bold hover:underline"
                >
                  Ver agendamentos em 20/05/2024
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Painel de Gestão Urgetrauma</h2>
              <p className="text-slate-500">Visão consolidada da operação e atendimentos do dia.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                {ICONS.Exam} Relatórios
              </button>
              <button 
                onClick={() => setIsScheduleView(true)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors"
              >
                Gerenciar Agenda
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Usuários Ativos (Hoje)', value: CLINIC_STATS.activeUsersToday, trend: '+14%', color: 'text-green-600' },
              { label: 'Taxa de Conversão', value: CLINIC_STATS.conversionRate, trend: '🟡 Estável', color: 'text-amber-500' },
              { label: 'Custo de API (Mês)', value: CLINIC_STATS.apiCostMonth, trend: 'Dentro do Orçamento', color: 'text-blue-600' },
              { label: 'NPS (Satisfação)', value: CLINIC_STATS.npsScore, trend: '🟢 72 (Ótimo)', color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                  <span className={`text-[10px] font-bold ${stat.color} px-2 py-0.5 bg-slate-50 rounded-lg`}>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                {ICONS.Stats} Fluxo de Atendimento Digital
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#f8fafc' }}
                    />
                    <Bar dataKey="pacientes" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 bg-blue-500/10 rounded-full -mr-8 -mt-8 blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                    {ICONS.AI}
                  </div>
                  <h3 className="text-xl font-bold">Sumário Estratégico AI</h3>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[220px] pr-2 scrollbar-hide">
                  <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
                    {summary}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors">
                    Análise de Fluxo
                  </button>
                  <button className="px-4 py-2 bg-blue-600 rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors">
                    Otimizar Horários
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">{ICONS.Calendar}</span>
                  Pacientes Confirmados (Check-in Realizado)
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Lista de pacientes que já validaram a presença para hoje.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Confirmados: {checkins.length}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paciente</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tratamento</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Convênio / Token</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Clínico</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Horário</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status de Fluxo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {checkins.map((c) => (
                    <tr key={c.id} className={`group hover:bg-slate-50 transition-all ${c.status === 'Confirmed' ? 'opacity-90' : ''}`}>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-sm font-bold text-blue-600 shadow-sm">
                            {c.patientName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block text-sm">{c.patientName}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">{c.patientId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="max-w-[200px]">
                          <span className="text-xs font-bold text-slate-700 block mb-1">{c.treatmentTitle}</span>
                          <p className="text-[10px] text-slate-500 italic line-clamp-1">"{c.comments}"</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-slate-600 font-medium">{c.insurance}</span>
                          {c.token && (
                            <div className="flex items-center gap-2">
                               <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold shadow-md">
                                 {ICONS.Key} {c.token}
                               </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col items-center">
                           <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${getPainColor(c.painLevel)} shadow-sm mb-1`}>
                             {c.painLevel}
                           </div>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Nível de Dor</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className="text-sm text-slate-800 font-bold">{c.timestamp}</span>
                        <span className="text-[9px] text-slate-400 block font-bold mt-0.5">CHECK-IN</span>
                      </td>
                      <td className="px-8 py-5">
                        {c.status === 'Pending' ? (
                          <button 
                            onClick={() => handleStartSession(c.id)}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 ml-auto"
                          >
                            {ICONS.Physio} Iniciar Sessão
                          </button>
                        ) : (
                          <div className="flex items-center justify-end gap-3">
                            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                              <button 
                                onClick={() => handleUpdateWorkflow(c.id, 'Agenda')}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${c.workflowStatus === 'Agenda' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                              >
                                Agenda
                              </button>
                              <button 
                                onClick={() => handleUpdateWorkflow(c.id, 'Requisition')}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${c.workflowStatus === 'Requisition' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                              >
                                Requisição
                              </button>
                            </div>
                            <button 
                              onClick={() => handleMessagePatient(c.patientName)}
                              className="p-2.5 bg-white border border-slate-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                              title="Enviar Mensagem"
                            >
                              {ICONS.Send}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {checkins.length === 0 && (
              <div className="p-20 text-center">
                <div className="text-slate-200 mb-4 flex justify-center scale-150">{ICONS.Calendar}</div>
                <h4 className="text-lg font-bold text-slate-400">Nenhum check-in confirmado hoje</h4>
                <p className="text-sm text-slate-300 mt-1">Os pacientes aparecerão aqui assim que concluírem o pré-check-in no app.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
