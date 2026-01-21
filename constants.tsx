
import React from 'react';
import { 
  Activity, 
  Calendar, 
  Clipboard, 
  FileText, 
  LayoutDashboard, 
  Pill, 
  Settings, 
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  Stethoscope,
  TrendingUp,
  MessageSquare,
  FileSearch,
  ArrowRight,
  Send,
  UserCircle,
  ShieldCheck,
  Upload,
  Info,
  Lock,
  ExternalLink,
  Search,
  Key,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Mail,
  Fingerprint,
  Video,
  Dumbbell
} from 'lucide-react';
import { Patient, Requisition, UserRole, CheckIn, Appointment } from './types';

// Centralized icon management for consistent UI/UX
export const ICONS = {
  Dashboard: <LayoutDashboard size={20} />,
  Calendar: <Calendar size={20} />,
  Medications: <Pill size={20} />,
  Treatments: <Activity size={20} />,
  Requests: <FileText size={20} />,
  Admin: <Users size={20} />,
  Settings: <Settings size={20} />,
  Check: <CheckCircle2 size={18} />,
  Clock: <Clock size={18} />,
  Alert: <AlertCircle size={18} />,
  Add: <PlusCircle size={20} />,
  History: <Clipboard size={20} />,
  Physio: <Stethoscope size={20} />,
  Stats: <TrendingUp size={20} />,
  AI: <MessageSquare size={20} />,
  Exam: <FileSearch size={20} />,
  Arrow: <ArrowRight size={18} />,
  Send: <Send size={18} />,
  Profile: <UserCircle size={20} />,
  UserCircle: <UserCircle size={20} />,
  Insurance: <ShieldCheck size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Upload: <Upload size={18} />,
  Info: <Info size={18} />,
  Lock: <Lock size={18} />,
  ExternalLink: <ExternalLink size={16} />,
  Search: <Search size={18} />,
  Key: <Key size={18} />,
  ChevronRight: <ChevronRight size={20} />,
  ChevronLeft: <ChevronLeft size={20} />,
  Eye: <Eye size={18} />,
  EyeOff: <EyeOff size={18} />,
  Mail: <Mail size={18} />,
  Fingerprint: <Fingerprint size={24} />,
  // Added Video and Exercise icons to fix errors in ExerciseLibrary.tsx
  Video: <Video size={20} />,
  Exercise: <Dumbbell size={20} />
};

export const INSURANCE_LIST = [
  'Unimed Porto Alegre', 'Unimed (Outras)', 'Particular', 'Bradesco Saúde', 
  'Bradesco Operadora', 'Verte Saúde', 'Doctor Clin', 'Saúde Pas', 
  'Postal Saúde', 'SulAmérica', 'Petrobras', 'Cassi'
];

export const MOCK_PATIENT: Patient = {
  id: 'P1024',
  firstName: 'Eduardo',
  lastName: 'Oliveira',
  email: 'eduardo@email.com',
  phone: '(11) 98765-4321',
  birthDate: '1988-05-15',
  zipCode: '01234-567',
  insurance: 'Unimed Porto Alegre',
  insurancePlan: 'Unifácil Regional',
  insuranceCardNumber: '0012 3456 7890 1234',
  cpf: '123.456.789-00',
  gender: 'Masculino',
  mothersName: 'Maria das Dores Oliveira',
  nextSession: '2024-05-20T14:30:00Z',
  treatments: [
    {
      id: 'T1',
      type: 'Physiotherapy',
      title: 'Recuperação de LCA - Joelho Esquerdo',
      progress: 65,
      startDate: '2024-03-10',
      sessions: [
        { id: 'S1', date: '2024-05-15', status: 'Completed' },
        { id: 'S2', date: '2024-05-20', status: 'Scheduled' },
        { id: 'S3', date: '2024-05-22', status: 'Scheduled' }
      ]
    }
  ],
  medications: [
    { id: 'M1', name: 'Ibuprofeno 600mg', dosage: '1 comprimido', frequency: 'A cada 8 horas' },
    { id: 'M2', name: 'Dipirona 1g', dosage: '1 comprimido', frequency: 'Se houver dor' }
  ],
  history: [
    { id: 'H1', date: '2024-03-05', description: 'Cirurgia de reconstrução ligamentar', doctor: 'Fis. Marcos Santos' },
    { id: 'H2', date: '2024-04-10', description: 'Avaliação pós-operatória 30 dias', doctor: 'Fis. Marcos Santos' }
  ]
};

export const MOCK_CHECKINS: CheckIn[] = [
  {
    id: 'C1',
    patientId: 'P1024',
    patientName: 'Eduardo Oliveira',
    insurance: 'Unimed Porto Alegre',
    painLevel: 4,
    comments: 'Sinto leve desconforto ao subir escadas. Joelho inchado.',
    token: '882910',
    timestamp: '14:20',
    treatmentTitle: 'Recuperação de LCA - Joelho Esquerdo',
    status: 'Pending'
  },
  {
    id: 'C2',
    patientId: 'P1025',
    patientName: 'Juliana Costa',
    insurance: 'Particular',
    painLevel: 2,
    comments: 'Apenas para revisão de mobilidade.',
    timestamp: '14:35',
    treatmentTitle: 'Mobilidade Ombro Direito',
    status: 'Pending'
  },
  {
    id: 'C3',
    patientId: 'P1026',
    patientName: 'Ricardo Almeida',
    insurance: 'Bradesco Saúde',
    painLevel: 8,
    comments: 'Muita dor na lombar após exercício ontem.',
    timestamp: '14:45',
    treatmentTitle: 'Estabilização Lombar',
    status: 'Pending'
  }
];

export const MOCK_SCHEDULE_FISIATRA: Appointment[] = [
  { id: 'A1', patientName: 'Carlos Mendonça', time: '08:30', date: '2024-05-20', type: 'Avaliação', status: 'Confirmado' },
  { id: 'A2', patientName: 'Ana Paula Silva', time: '09:15', date: '2024-05-20', type: 'Avaliação', status: 'Confirmado' },
  { id: 'A3', patientName: 'Mário Jorge', time: '10:00', date: '2024-05-20', type: 'Retorno', status: 'Pendente' },
  { id: 'A4', patientName: 'Beatriz Lemos', time: '11:30', date: '2024-05-20', type: 'Avaliação', status: 'Confirmado' },
];

export const MOCK_SCHEDULE_FISIOTERAPEUTA: Appointment[] = [
  { id: 'F1', patientName: 'Eduardo Oliveira', time: '14:30', date: '2024-05-20', type: 'Sessão', status: 'Confirmado' },
  { id: 'F2', patientName: 'Juliana Costa', time: '15:15', date: '2024-05-20', type: 'Avaliação', status: 'Confirmado' },
  { id: 'F3', patientName: 'Ricardo Almeida', time: '16:00', date: '2024-05-20', type: 'Sessão', status: 'Confirmado' },
  { id: 'F4', patientName: 'Helena Soares', time: '16:45', date: '2024-05-20', type: 'Sessão', status: 'Pendente' },
];

export const MOCK_REQUISITIONS: Requisition[] = [
  { id: 'R1', type: 'Imaging', status: 'Approved', date: '2024-05-10', description: 'Ressonância Magnética de Joelho' },
  { id: 'R2', type: 'Certificate', status: 'Pending', date: '2024-05-18', description: 'Atestado para fisioterapia domiciliar' },
  { id: 'R3', type: 'InsuranceValidation', status: 'Approved', date: '2024-05-12', description: 'Validação Bradesco - Guia 99283' }
];

export const CLINIC_STATS = {
  activeUsersToday: 142,
  conversionRate: '18.5%',
  apiCostMonth: 'R$ 42,80',
  npsScore: 72
};
