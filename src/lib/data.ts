import type { Employee, Announcement, Payroll } from './types';

export const employees: Employee[] = [
  // Management
  { id: '1', name: 'Alice Johnson', email: 'alice.j@appintel.com', department: 'Management', title: 'CEO', avatar: 'avatar1' },
  { id: '2', name: 'Bob Williams', email: 'bob.w@appintel.com', department: 'Management', title: 'CTO', avatar: 'avatar2' },

  // Development (5)
  { id: '3', name: 'Charlie Brown', email: 'charlie.b@appintel.com', department: 'Development', title: 'Senior Developer', avatar: 'avatar3' },
  { id: '4', name: 'Diana Miller', email: 'diana.m@appintel.com', department: 'Development', title: 'Frontend Developer', avatar: 'avatar4' },
  { id: '5', name: 'Ethan Davis', email: 'ethan.d@appintel.com', department: 'Development', title: 'Backend Developer', avatar: 'avatar5' },
  { id: '6', name: 'Fiona Garcia', email: 'fiona.g@appintel.com', department: 'Development', title: 'UI/UX Designer', avatar: 'avatar6' },
  { id: '7', name: 'George Rodriguez', email: 'george.r@appintel.com', department: 'Development', title: 'Junior Developer', avatar: 'avatar7' },

  // Call Center (8)
  { id: '8', name: 'Hannah Smith', email: 'hannah.s@appintel.com', department: 'Call Center', title: 'Support Lead', avatar: 'avatar8' },
  { id: '9', name: 'Ian Taylor', email: 'ian.t@appintel.com', department: 'Call Center', title: 'Support Specialist', avatar: 'avatar9' },
  { id: '10', name: 'Jane Anderson', email: 'jane.a@appintel.com', department: 'Call Center', title: 'Support Specialist', avatar: 'avatar10' },
  { id: '11', name: 'Kevin Thomas', email: 'kevin.t@appintel.com', department: 'Call Center', title: 'Support Specialist', avatar: 'avatar11' },
  { id: '12', name: 'Laura Hernandez', email: 'laura.h@appintel.com', department: 'Call Center', title: 'Support Specialist', avatar: 'avatar12' },
  { id: '13', name: 'Mike Moore', email: 'mike.m@appintel.com', department: 'Call Center', title: 'Support Specialist', avatar: 'avatar13' },
  { id: '14', name: 'Nora Martin', email: 'nora.m@appintel.com', department: 'Call Center', title: 'Support Specialist', avatar: 'avatar14' },
  { id: '15', name: 'Oscar Lee', email: 'oscar.l@appintel.com', department: 'Call Center', title: 'Support Specialist', avatar: 'avatar15' },
];

export const announcements: Announcement[] = [
  { id: '1', title: 'Q3 Town Hall Meeting', content: 'Join us for the Q3 town hall this Friday at 3 PM in the main conference room. We will discuss our quarterly performance and future goals.', date: '2023-09-15', imageId: 'announcement1' },
  { id: '2', title: 'New Office Health & Safety Guidelines', content: 'Please review the updated health and safety guidelines available on the intranet. Your cooperation is essential to maintaining a safe workplace.', date: '2023-09-10', imageId: 'announcement2' },
  { id: '3', title: 'Annual Company Picnic', content: 'Get ready for some fun in the sun! The annual company picnic will be held on October 7th at Green Park. More details to follow.', date: '2023-09-05', imageId: 'announcement3' },
];

export const payrolls: Payroll[] = [
  { id: '1', period: '2023-08-15 - 2023-08-31', gross: 2500, deductions: 400, net: 2100, status: 'Paid' },
  { id: '2', period: '2023-08-01 - 2023-08-15', gross: 2500, deductions: 400, net: 2100, status: 'Paid' },
  { id: '3', period: '2023-07-15 - 2023-07-31', gross: 2450, deductions: 390, net: 2060, status: 'Paid' },
  { id: '4', period: '2023-09-01 - 2023-09-15', gross: 2500, deductions: 400, net: 2100, status: 'Pending' },
];

export const performanceData = {
    "Development": "Metrics: 15 projects completed, 95% on-time delivery, 3 major features launched, team morale at 8/10. Challenges: Unexpected scope creep in Project Phoenix. Successes: Successful launch of the new mobile app, which received positive user feedback.",
    "Call Center": "Metrics: 92% customer satisfaction rate, average response time of 45 seconds, 5% decrease in call volume due to better documentation. Challenges: High volume of calls during the new feature launch. Successes: Implemented a new ticketing system that improved efficiency by 15%."
}
