
import React, { useState } from 'react';
import { ICONS, MOCK_PATIENT, INSURANCE_LIST } from '../constants';

type ProfileTab = 'personal' | 'insurance' | 'security';

const UNIMED_PLANS = [
  'Unifácil Regional', 'Unimax', 'Unipart', 'Unimed Business', 'Outro'
];

const PatientProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [profile, setProfile] = useState({
    firstName: MOCK_PATIENT.firstName,
    lastName: MOCK_PATIENT.lastName,
    email: MOCK_PATIENT.email,
    birthDate: MOCK_PATIENT.birthDate,
    zipCode: MOCK_PATIENT.zipCode,
    insurance: MOCK_PATIENT.insurance,
    insurancePlan: MOCK_PATIENT.insurancePlan,
    insuranceCardNumber: MOCK_PATIENT.insuranceCardNumber,
    cpf: MOCK_PATIENT.cpf,
    gender: MOCK_PATIENT.gender,
    mothersName: MOCK_PATIENT.mothersName
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Dados salvos com sucesso!');
    }, 1000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Senha alterada com sucesso!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">Meu Perfil</h2>
          <p className="text-sm lg:text-base text-slate-500">Gerencie suas informações e convênio.</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full max-w-2xl mx-auto lg:mx-0">
        <button 
          onClick={() => setActiveTab('personal')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeTab === 'personal' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Dados Pessoais
        </button>
        <button 
          onClick={() => setActiveTab('insurance')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeTab === 'insurance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Convênios & Planos
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs lg:text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Segurança
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm min-h-[500px]">
        {activeTab === 'personal' && (
          <div className="animate-in slide-in-from-left-4 duration-300 space-y-8">
             <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative group mb-4">
                    <img 
                      src={`https://picsum.photos/seed/${profile.firstName}/120/120`} 
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl border-4 border-slate-50 shadow-md object-cover"
                      alt="Avatar"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                      {ICONS.Add}
                    </button>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Foto de Perfil</p>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 border-b pb-2">Informações Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Nome</label>
                      <input 
                        type="text" 
                        value={profile.firstName}
                        onChange={e => setProfile({...profile, firstName: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Sobrenome</label>
                      <input 
                        type="text" 
                        value={profile.lastName}
                        onChange={e => setProfile({...profile, lastName: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">CPF</label>
                      <input 
                        type="text" 
                        value={profile.cpf}
                        onChange={e => setProfile({...profile, cpf: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Data de Nascimento</label>
                      <input 
                        type="date" 
                        value={profile.birthDate}
                        onChange={e => setProfile({...profile, birthDate: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Sexo</label>
                      <select 
                        value={profile.gender}
                        onChange={e => setProfile({...profile, gender: e.target.value as any})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Nome da Mãe</label>
                      <input 
                        type="text" 
                        value={profile.mothersName}
                        onChange={e => setProfile({...profile, mothersName: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="animate-in slide-in-from-right-4 duration-300 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 border-b pb-2">Selecione seu Convênio</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {INSURANCE_LIST.map(ins => (
                  <button
                    key={ins}
                    onClick={() => setProfile({...profile, insurance: ins})}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${profile.insurance === ins ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                  >
                    <p className="font-bold text-sm">{ins}</p>
                    {profile.insurance === ins && <p className="text-[10px] font-bold mt-1 uppercase opacity-60">Selecionado</p>}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {profile.insurance.includes('Unimed') ? (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Plano Unimed</label>
                  <select 
                    value={profile.insurancePlan}
                    onChange={e => setProfile({...profile, insurancePlan: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione seu plano...</option>
                    {UNIMED_PLANS.map(plan => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                </div>
              ) : profile.insurance !== 'Particular' ? (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Nome do Plano (Opcional)</label>
                  <input 
                    type="text" 
                    value={profile.insurancePlan}
                    onChange={e => setProfile({...profile, insurancePlan: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Executivo, Especial..."
                  />
                </div>
              ) : null}

              {profile.insurance !== 'Particular' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Número da Carteirinha</label>
                  <input 
                    type="text" 
                    value={profile.insuranceCardNumber}
                    onChange={e => setProfile({...profile, insuranceCardNumber: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
              )}
            </div>

            {profile.insurance === 'Particular' && (
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4 items-start">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  {ICONS.Info}
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Atendimento Particular</h4>
                  <p className="text-xs text-blue-800 mt-1">
                    Como paciente particular, você terá acesso a tabelas diferenciadas e agendamentos prioritários. Consulte nossa recepção para pacotes de sessões.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="animate-in slide-in-from-right-4 duration-300 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 border-b pb-2">Segurança da Conta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Senha Atual</label>
                  <input 
                    type="password" 
                    value={passwordData.currentPassword}
                    onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div className="hidden md:block"></div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Nova Senha</label>
                  <input 
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    value={passwordData.confirmPassword}
                    onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="mt-8">
                <button 
                  onClick={handleChangePassword}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Atualizar Senha
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t flex justify-end gap-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isSaving ? 'Salvando...' : 'Salvar Todas as Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
