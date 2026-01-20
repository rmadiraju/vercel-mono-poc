import { isFeatureEnabled } from '@repo/feature-flags';
import { getApprovedItems } from '@repo/approvals-shared';

export default function Home() {
  const releaseAutomationEnabled = isFeatureEnabled('releaseAutomation');
  const approvedItems = getApprovedItems();

  return (
    <main className="container">
      <h1>Feature Release</h1>
      <p>Release features for approved clients</p>
      <div className="info-box">
        <p>
          <strong>Release Automation:</strong>{' '}
          {releaseAutomationEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
      <div className="releases-list">
        <h2>Ready for Release</h2>
        {approvedItems.length > 0 ? (
          approvedItems.map((approval) => (
            <div key={approval.id} className="release-card">
              <h3>{approval.clientName}</h3>
              <p>Approved on: {approval.approvedAt?.toLocaleDateString()}</p>
              <div className="actions">
                <button className="release">Release Feature</button>
                <button className="schedule">Schedule Release</button>
              </div>
            </div>
          ))
        ) : (
          <p>No approved items ready for release</p>
        )}
      </div>
    </main>
  );
}
