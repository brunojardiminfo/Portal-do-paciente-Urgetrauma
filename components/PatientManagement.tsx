
import React, { useState, useRef, useEffect } from 'react';
import { ICONS, MOCK_REQUISITIONS } from '../constants';
import { Requisition } from '../types';
import { X, Send, Paperclip, MoreHorizontal, CheckCheck } from 'lucide-react';

interface IncomingRequest extends Requisition {
  patientName: string;
  patientAvatar?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'admin' | 'patient';
  timestamp: string;
}

const MOCK_INCOMING: IncomingRequest[] = [
  ...MOCK_REQUISITIONS.map(r => ({ ...r, patientName: 'Eduardo Oliveira', patientAvatar: 'Eduardo' })),
  {
    id: 'REQ-101',
    type: 'AppointmentRequest',
    status: 'Pending',
    date: '2024-05-19',
    description: 'Solicitação de agendamento: Fisiatra (Manhã)',
    patientName: 'Maria Silva',
    professionalType: 'Fisiatra',
    preferredPeriod: 'Manhã'
  },
  {
    id: 'REQ-102',
    type: 'Imaging',
    status: 'Pending',
    date: '2024-05-19',
    description: 'Raio-X de Coluna Lombar',
    patientName: 'João Pereira',
    fileName: 'raiox_joao.pdf'
  }
];

// Componente de Chat Lateral
const AdminChatDrawer = ({ isOpen, onClose, patientName }: { isOpen: boolean, onClose: () => void, patientName: string }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá, gostaria de confirmar o recebimento do meu exame.', sender: 'patient', timestamp: '10:30' },
    { id: '2', text: 'Bom dia! Recebemos sim. O Dr. Marcos já está analisando.', sender: 'admin', timestamp: '10:35' },
    { id: '3', text: 'Perfeito, fico no aguardo do agendamento.', sender: 'patient', timestamp: '10:36' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'admin',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        {/* Header do Chat */}
        <div className="p-6 border-b flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {patientName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{patientName}</h3>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Paciente Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><MoreHorizontal size={18} /></button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Área de Mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
          <div className="text-center mb-4">
            <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border shadow-sm">HOJE</span>
          </div>
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
                msg.sender === 'admin' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${msg.sender === 'admin' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                  {msg.sender === 'admin' && <CheckCheck size={12} />}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer / Input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button type="button" className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-[9px] text-center text-slate-400 mt-3 uppercase font-bold tracking-widest">
            Atendimento Urgetrauma Digital
          </p>
        </div>
      </div>
    </div>
  );
};

const PatientManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Evaluations' | 'Documents'>('Evaluations');
  const [requests, setRequests] = useState(MOCK_INCOMING);
  const [chatPatient, setChatPatient] = useState<string | null>(null);

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'Evaluations') return req.type === 'AppointmentRequest';
    return req.type !== 'AppointmentRequest';
  });

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const handleMessage = (name: string) => {
    setChatPatient(name);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Componente de Chat */}
      <AdminChatDrawer 
        isOpen={!!chatPatient} 
        onClose={() => setChatPatient(null)} 
        patientName={chatPatient || ''} 
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Pacientes & Solicitações</h2>
          <p className="text-slate-500">Gerencie pedidos de agendamento e documentos recebidos pelo app.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner">
          <button 
            onClick={() => setActiveTab('Evaluations')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'Evaluations' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Avaliações Solicitadas
          </button>
          <button 
            onClick={() => setActiveTab('Documents')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'Documents' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Documentos Recebidos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl shadow-sm border border-blue-100">
                {req.patientName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-lg">{req.patientName}</h3>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${
                    req.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {req.status === 'Pending' ? 'Pendente' : req.status === 'Approved' ? 'Concluído' : 'Recusado'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    {req.type === 'AppointmentRequest' ? ICONS.Calendar : ICONS.Requests}
                    {req.description}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    {ICONS.Clock} {req.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {req.fileName && (
                <button className="flex-1 md:flex-none p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-xs font-bold border border-slate-100">
                  {ICONS.Exam} Ver Anexo
                </button>
              )}
              
              {req.status === 'Pending' ? (
                <>
                  <button 
                    onClick={() => handleAction(req.id, 'Approved')}
                    className="flex-1 md:flex-none bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                  >
                    {ICONS.Check} {activeTab === 'Evaluations' ? 'Confirmar Agenda' : 'Validar Documento'}
                  </button>
                  <button 
                    onClick={() => handleMessage(req.patientName)}
                    className="p-3 border border-slate-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-sm relative group/msg"
                    title="Enviar Mensagem"
                  >
                    {ICONS.Send}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-bounce" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-green-600 font-bold text-xs bg-green-50 px-4 py-2 rounded-xl">
                    {ICONS.Check} Processado
                  </div>
                  <button 
                    onClick={() => handleMessage(req.patientName)}
                    className="p-3 border border-slate-200 text-slate-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    {ICONS.Send}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="text-slate-200 mb-4 flex justify-center scale-150">
              {activeTab === 'Evaluations' ? ICONS.Calendar : ICONS.Requests}
            </div>
            <h4 className="text-lg font-bold text-slate-400">Nenhuma solicitação pendente</h4>
            <p className="text-sm text-slate-300 mt-1">
              {activeTab === 'Evaluations' ? 'Novos pedidos de consulta aparecerão aqui.' : 'Novos exames e laudos aparecerão aqui.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;
