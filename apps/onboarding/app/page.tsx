import { isFeatureEnabled } from '@repo/feature-flags';

export default function Home() {
  const newOnboardingEnabled = isFeatureEnabled('newOnboarding');

  return (
    <main className="container">
      <h1>Client Onboarding</h1>
      <p>Welcome to the onboarding process</p>
      <div className="info-box">
        <p>
          <strong>New Onboarding Flow:</strong>{' '}
          {newOnboardingEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
      <div className="onboarding-form">
        <h2>Onboard New Client</h2>
        <form>
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input type="text" id="clientName" name="clientName" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <button type="submit">Start Onboarding</button>
        </form>
      </div>
    </main>
  );
}
