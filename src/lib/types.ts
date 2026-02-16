
export type Department = 'HR' | 'Accounting' | 'Call Center' | 'IT' | 'Corporate';
export type Role = 'Administrator' | 'Department Head' | 'Department Employee';

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: Department;
  roles: Role[];
  title: string;
  avatar: string; // Corresponds to ID in placeholder-images.json
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  imageId: string;
};

export type Payroll = {
  id: string;
  period: string;
  gross: number;
  deductions: number;
  net: number;
  status: 'Paid' | 'Pending';
};

export type StoredFile = {
  name: string;
  path: string;
  downloadUrl: string;
  size: number;
  uploadedAt: string;
};

export type PolicyDocument = {
  id: string;
  title: string;
  description: string;
  imageId: string; // Corresponds to ID in placeholder-images.json
  pdfUrl: string; // URL to the PDF in Firebase Storage
};

export type AcknowledgedPolicy = {
  id: string;
  policyId: string;
  policyTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  acknowledgedAt: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrlId: string;
  projectUrl: string;
};
