export interface Approval {
  id: string;
  clientId: string;
  clientName: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: Date;
}

export const mockApprovals: Approval[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Acme Corp',
    status: 'approved',
    approvedAt: new Date('2024-01-16'),
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Tech Startup Inc',
    status: 'pending',
  },
];

export function getApprovals(): Approval[] {
  return mockApprovals;
}

export function getApprovedItems(): Approval[] {
  return mockApprovals.filter((approval) => approval.status === 'approved');
}

export function getApprovalById(id: string): Approval | undefined {
  return mockApprovals.find((approval) => approval.id === id);
}
