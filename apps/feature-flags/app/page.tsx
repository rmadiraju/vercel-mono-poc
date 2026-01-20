import { getAllFeatureFlags } from '@repo/feature-flags';

export default function Home() {
  const flags = getAllFeatureFlags();

  return (
    <main className="container">
      <h1>Feature Flags</h1>
      <p>Manage and view all feature flags</p>
      <div className="flags-grid">
        {flags.map((flag) => (
          <div key={flag.name} className="flag-card">
            <h2>{flag.name}</h2>
            <p className={flag.enabled ? 'enabled' : 'disabled'}>
              {flag.enabled ? 'Enabled' : 'Disabled'}
            </p>
            {flag.description && <p>{flag.description}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
