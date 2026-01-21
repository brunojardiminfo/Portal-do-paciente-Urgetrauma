
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { ShieldCheck, Lock, Smartphone, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

// Movido para o topo para evitar ReferenceError no runtime
const UserCircleIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

interface LoginProps {
  onLogin: (role: 'PATIENT' | 'ADMIN') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const role = identifier.toLowerCase().includes('admin') ? 'ADMIN' : 'PATIENT';
      onLogin(role);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden font-['Inter']">
      {/* Lado Esquerdo - Conteúdo Institucional (Apenas Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8">
            <Activity size={16} className="text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Portal Urgetrauma v2.0</span>
          </div>
          
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Sua saúde em <span className="text-blue-500">movimento</span>, onde você estiver.
          </h1>
          
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            Acesse seus exames, agende consultas e acompanhe sua evolução fisioterapêutica com a tecnologia da Urgetrauma.
          </p>

          <div className="space-y-6">
            {[
              { icon: <CheckCircle2 size={20} className="text-blue-500" />, title: 'Agendamento Inteligente', desc: 'Marque sessões em poucos cliques.' },
              { icon: <ShieldCheck size={20} className="text-blue-500" />, title: 'Dados Protegidos', desc: 'Segurança total sob as normas da LGPD.' },
              { icon: <Smartphone size={20} className="text-blue-500" />, title: 'Acompanhamento Digital', desc: 'Histórico completo na palma da mão.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário de Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          <div className="mb-12 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="text-3xl font-black text-slate-900 tracking-tighter">
                URGE<span className="text-blue-600">TRAUMA</span>
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Bem-vindo ao Portal</h2>
            <p className="text-slate-500 font-medium">Insira seus dados para acessar sua área exclusiva.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail ou CPF</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <UserCircleIcon size={20} />
                </div>
                <input 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Seu e-mail ou 000.000.000-00"
                  className="w-full bg-slate-50 lg:bg-white border-2 border-slate-100 lg:border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Senha</label>
                <button type="button" className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest">Esqueceu?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 lg:bg-white border-2 border-slate-100 lg:border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? ICONS.EyeOff : ICONS.Eye}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:shadow-blue-200 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100 mt-8"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar no Sistema
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-6">Ainda não tem cadastro?</p>
            <button className="w-full py-4 border-2 border-slate-200 rounded-2xl text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-all">
              Criar Conta de Paciente
            </button>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 py-8 border-t border-slate-100">
             <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Conexão Segura SSL</span>
             </div>
             <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest leading-relaxed">
               © 2024 Urgetrauma Digital • Porto Alegre/RS<br/>
               Saúde e Movimento
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
