
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserRole } from './types';
import { ICONS, MOCK_PATIENT } from './constants';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import AdminDashboard from './components/AdminDashboard';
import PatientManagement from './components/PatientManagement';
import PreCheckIn from './components/PreCheckIn';
import MedicationList from './components/MedicationList';
import TreatmentPlan from './components/TreatmentPlan';
import RequestCenter from './components/RequestCenter';
import PatientProfile from './components/PatientProfile';
import { Menu, X, ArrowLeft, AlertCircle } from 'lucide-react';

// Logotipo com Fallback Inteligente
const BrandLogo = ({ className = "h-12" }: { className?: string }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className="text-2xl font-black text-slate-900 tracking-tighter">
        URGE<span className="text-blue-600">TRAUMA</span>
      </div>
    );
  }

  return (
    <img 
      src="logo-clinica.png" 
      alt="Urgetrauma" 
      className={`${className} w-auto object-contain cursor-pointer`}
      onClick={() => window.location.hash = '/'}
      onError={() => setError(true)}
    />
  );
};

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-500">
    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
      <AlertCircle size={48} />
    </div>
    <h1 className="text-4xl font-black text-slate-800 mb-2">404</h1>
    <p className="text-slate-500 mb-8 max-w-xs">Ops! Parece que o movimento nos levou para uma página que não existe.</p>
    <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
      <ArrowLeft size={18} />
      Voltar ao Início
    </Link>
  </div>
);

const Sidebar = ({ role, isOpen, toggle, onLogout }: { role: UserRole, isOpen: boolean, toggle: () => void, onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const links = role === UserRole.PATIENT ? [
    { path: '/patient', label: 'Dashboard', icon: ICONS.Dashboard },
    { path: '/patient/treatments', label: 'Tratamentos', icon: ICONS.Treatments },
    { path: '/patient/medications', label: 'Medicações', icon: ICONS.Medications },
    { path: '/patient/requests', label: 'Requisições', icon: ICONS.Requests },
    { path: '/patient/check-in', label: 'Pré-Checkin', icon: ICONS.Check },
    { path: '/patient/profile', label: 'Meu Perfil', icon: ICONS.Profile },
  ] : [
    { path: '/admin', label: 'Painel Gestão', icon: ICONS.Dashboard },
    { path: '/admin/patients', label: 'Pacientes', icon: ICONS.Admin, hasBadge: true },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
    lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl lg:shadow-none flex flex-col
  `;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm" onClick={toggle} />
      )}
      
      <div className={sidebarClasses}>
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center justify-center w-full">
            <BrandLogo />
          </div>
          <button onClick={toggle} className="lg:hidden text-slate-400 p-1 hover:bg-slate-50 rounded-lg absolute right-4">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto mt-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => { if (window.innerWidth < 1024) toggle(); }}
              className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200 group relative ${
                isActive(link.path) 
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <span className={isActive(link.path) ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 transition-colors'}>
                {link.icon}
              </span>
              <span className="text-sm">{link.label}</span>
              {link.hasBadge && (
                <span className="absolute right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-4 ring-red-50" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t mt-auto space-y-2">
          <button className="flex items-center gap-3 p-3 text-slate-500 w-full rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
            {ICONS.Settings}
            <span>Ajustes</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 p-3 text-red-500 w-full rounded-xl hover:bg-red-50 transition-colors text-sm font-bold"
          >
            {ICONS.Alert}
            <span>Sair do Portal</span>
          </button>
        </div>
      </div>
    </>
  );
};

const Header = ({ role, toggleSidebar }: { role: UserRole, toggleSidebar: () => void }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-sm hidden sm:inline">
            {role === UserRole.PATIENT ? 'Painel do Paciente' : 'Área de Gestão'}
          </span>
          <div className="lg:hidden scale-75 origin-left">
            <BrandLogo className="h-8" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-800 leading-none">
            {role === UserRole.PATIENT ? `${MOCK_PATIENT.firstName} ${MOCK_PATIENT.lastName}` : 'Fis. Marcos Santos'}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            {role === UserRole.PATIENT ? `ID: ${MOCK_PATIENT.id}` : 'Fisioterapeuta Sênior'}
          </p>
        </div>
        <div className="relative">
          <img 
            src={role === UserRole.PATIENT ? `https://picsum.photos/seed/${MOCK_PATIENT.firstName}/100/100` : 'https://picsum.photos/seed/physio/100/100'} 
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-2xl border-2 border-white shadow-sm object-cover bg-slate-100"
            alt="User avatar"
          />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (selectedRole: 'PATIENT' | 'ADMIN') => {
    setRole(selectedRole === 'ADMIN' ? UserRole.ADMIN : UserRole.PATIENT);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50 overflow-hidden">
        <Sidebar role={role} isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen relative">
          <Header role={role} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="p-4 lg:p-8 max-w-7xl mx-auto w-full flex-1">
            <Routes>
              {/* Rotas de Paciente */}
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/patient/medications" element={<MedicationList />} />
              <Route path="/patient/treatments" element={<TreatmentPlan />} />
              <Route path="/patient/requests" element={<RequestCenter />} />
              <Route path="/patient/check-in" element={<PreCheckIn />} />
              <Route path="/patient/profile" element={<PatientProfile />} />
              
              {/* Rotas de Admin */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/patients" element={<PatientManagement />} />
              
              {/* Redirecionamentos e 404 */}
              <Route path="/" element={<Navigate to={role === UserRole.PATIENT ? "/patient" : "/admin"} replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <footer className="mt-auto p-6 text-center border-t border-slate-100 bg-white/50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              © 2024 Urgetrauma Digital • Porto Alegre/RS • Desenvolvido por Bruno Jardim
            </p>
          </footer>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
