
import React, { useState } from 'react';
import { ICONS } from '../constants';

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
    // Simulating authentication delay
    setTimeout(() => {
      // Logic: if identifier contains "admin", log as admin, else as patient
      const role = identifier.toLowerCase().includes('admin') ? 'ADMIN' : 'PATIENT';
      onLogin(role);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-teal-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="w-full max-w-[440px] z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[40px] shadow-2xl shadow-blue-100/50 p-8 lg:p-12 overflow-hidden relative">
          
          <div className="text-center mb-10">
            <div className="flex justify-center transition-transform hover:scale-105 duration-300">
              <img 
                src="logo-clinica.png" 
                alt="Urgetrauma - Saúde e Movimento" 
                className="max-w-[220px] w-full h-auto object-contain"
                onError={(e) => {
                  // Fallback visual case the image is not found during dev
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = "text-2xl font-black text-slate-800 italic";
                    fallback.innerText = "URGETRAUMA";
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">E-mail ou CPF</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  {ICONS.UserCircle}
                </div>
                <input 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Seu e-mail ou 000.000.000-00"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-4 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Senha</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  {ICONS.Lock}
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-14 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
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

            <div className="flex items-center justify-end px-2">
              <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                Esqueceu a senha?
              </button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Acessar Portal
                  {ICONS.Arrow}
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 mb-4">Novo por aqui?</p>
            <button className="w-full py-4 border-2 border-teal-100 rounded-2xl text-teal-600 font-bold text-sm hover:bg-teal-50 hover:border-teal-200 transition-all">
              Criar Cadastro de Paciente
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-6 opacity-30 grayscale">
            <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg">{ICONS.Insurance}</div>
            <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg">{ICONS.ShieldCheck}</div>
            <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg">{ICONS.Key}</div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          © 2024 Urgetrauma Digital. Desenvolvido por Bruno Jardim
        </p>
      </div>
    </div>
  );
};

export default Login;
