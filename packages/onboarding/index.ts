export interface OnboardingClient {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}

export const mockClients: OnboardingClient[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'contact@acme.com',
    status: 'completed',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Tech Startup Inc',
    email: 'hello@techstartup.com',
    status: 'in-progress',
    createdAt: new Date('2024-01-20'),
  },
];

export function getOnboardingClients(): OnboardingClient[] {
  return mockClients;
}

export function getClientById(id: string): OnboardingClient | undefined {
  return mockClients.find((client) => client.id === id);
}
