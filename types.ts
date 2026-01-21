
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  zipCode: string;
  insurance: string;
  insurancePlan: string;
  insuranceCardNumber: string;
  cpf: string;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  mothersName: string;
  nextSession?: string;
  treatments: Treatment[];
  medications: Medication[];
  history: ClinicalRecord[];
}

export interface Treatment {
  id: string;
  type: 'Physiotherapy' | 'Orthopedics' | 'Post-Op';
  title: string;
  progress: number;
  startDate: string;
  sessions: Session[];
}

export interface Session {
  id: string;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Missed';
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  lastTaken?: string;
}

export interface ClinicalRecord {
  id: string;
  date: string;
  description: string;
  doctor: string;
}

export interface Requisition {
  id: string;
  type: 'Exam' | 'Certificate' | 'Imaging' | 'InsuranceValidation' | 'AppointmentRequest';
  // Fix: Added 'Rejected' to status options to support admin declining requests in PatientManagement
  status: 'Pending' | 'Approved' | 'Sent' | 'Rejected';
  date: string;
  description: string;
  fileName?: string;
  professionalType?: 'Fisioterapeuta' | 'Fisiatra';
  preferredPeriod?: 'Manhã' | 'Tarde' | 'Noite';
}

export interface CheckIn {
  id: string;
  patientId: string;
  patientName: string;
  insurance: string;
  painLevel: number;
  comments: string;
  token?: string;
  timestamp: string;
  treatmentTitle: string;
  status: 'Pending' | 'Confirmed';
}

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  date: string;
  type: 'Avaliação' | 'Sessão' | 'Retorno';
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
  notificationSent?: boolean;
}

export enum UserRole {
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN'
}
