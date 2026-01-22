import { isFeatureEnabled } from '@repo/feature-flags';
import { getOnboardingClients } from '@repo/onboarding-shared';

export default function Home() {
  const approvalWorkflowEnabled = isFeatureEnabled('approvalWorkflow');
  const clients = getOnboardingClients();

  return (
    <main className="container">
      <h1>Approvals</h1>
      <p>Manage approvals for onboarded clients!!!!</p>
      <div className="info-box">
        <p>
          <strong>Approval Workflow:</strong>{' '}
          {approvalWorkflowEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
      <div className="approvals-list">
        <h2>Pending Approvals</h2>
        {clients
          .filter((client) => client.status === 'completed')
          .map((client) => (
            <div key={client.id} className="approval-card">
              <h3>{client.name}</h3>
              <p>{client.email}</p>
              <div className="actions">
                <button className="approve">Approve</button>
                <button className="reject">Reject</button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
