import { useState, useCallback } from 'react';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoApiKeys, generateBuyerRef } from '@/data/buyerData';
import type { BuyerApiKey, ApiKeyStatus } from '@/data/buyerData';

export default function BuyerApiKeys() {
  const [keys, setKeys] = useState<BuyerApiKey[]>(demoApiKeys);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState<'sandbox_demo' | 'production_demo'>('sandbox_demo');
  const [newKeyScope, setNewKeyScope] = useState('All packages');
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleCreate = useCallback(() => {
    if (!newKeyName.trim()) return;
    const masked = `dh_demo_sk_${newKeyEnv === 'production_demo' ? 'live' : 'sandbox'}_****_****_****_${Math.random().toString(36).slice(2, 8)}`;
    const fakeSecret = `dh_demo_sk_${newKeyEnv === 'production_demo' ? 'live' : 'sandbox'}_${generateBuyerRef('AK').replace('DH-DEMO-AK-', '').toLowerCase()}_${Math.random().toString(36).slice(2, 14)}`;
    const newKey: BuyerApiKey = {
      id: `ak-${Date.now()}`,
      displayName: newKeyName.trim(),
      maskedValue: masked,
      environment: newKeyEnv,
      packageScope: newKeyScope,
      permissions: ['read'],
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
      expiresAt: newKeyEnv === 'sandbox_demo' ? new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0] : null,
      status: 'active',
    };
    setKeys(prev => [...prev, newKey]);
    setRevealedKey(fakeSecret);
    setNewKeyName('');
    setShowCreate(false);
  }, [newKeyName, newKeyEnv, newKeyScope]);

  const handleRevoke = useCallback(() => {
    if (!confirmRevoke) return;
    setKeys(prev => prev.map(k => k.id === confirmRevoke ? { ...k, status: 'revoked' as ApiKeyStatus } : k));
    setConfirmRevoke(null);
  }, [confirmRevoke]);

  const handleRotate = useCallback((keyId: string) => {
    const fakeSecret = `dh_demo_sk_live_${generateBuyerRef('AK').replace('DH-DEMO-AK-', '').toLowerCase()}_${Math.random().toString(36).slice(2, 14)}`;
    setKeys(prev => prev.map(k => k.id === keyId ? { ...k, maskedValue: k.maskedValue.replace(/[a-z0-9]{6}$/, Math.random().toString(36).slice(2, 8)) } : k));
    setRevealedKey(fakeSecret);
  }, []);

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">API Keys</h1>
              <p className="text-sm text-foreground-500 mt-1">Manage demonstration API credentials for your organisation.</p>
            </div>
            <button onClick={() => setShowCreate(true)} className="px-3 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
              Create key <i className="ri-add-line ml-1"></i>
            </button>
          </div>

          {/* Security warning */}
          <div className="mb-6 p-4 rounded-lg border border-accent-200/60 bg-accent-50/50">
            <div className="flex items-start gap-2">
              <i className="ri-shield-line text-accent-600 mt-0.5"></i>
              <div>
                <p className="text-sm font-semibold text-foreground-900">Demonstration credentials only</p>
                <p className="text-xs text-foreground-600 mt-0.5">All keys shown here are fictional demonstration values. Full API secrets are never persisted in browser storage. Never share real credentials or paste actual API keys into this interface. Production API-key enforcement must be implemented server-side.</p>
              </div>
            </div>
          </div>

          {/* Revealed key banner */}
          {revealedKey && (
            <div className="mb-6 p-4 rounded-lg border border-accent-200 bg-accent-50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground-900">New demonstration secret — copy it now</p>
                <button onClick={() => setRevealedKey(null)} className="text-xs text-foreground-500 hover:text-foreground-700 cursor-pointer">Dismiss</button>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded-md bg-background-50 border border-background-200/70 text-xs font-mono text-foreground-700 break-all">{revealedKey}</code>
                <button
                  onClick={() => { navigator.clipboard.writeText(revealedKey); setCopiedId('revealed'); setTimeout(() => setCopiedId(null), 2000); }}
                  className="shrink-0 px-3 py-2 text-xs font-medium rounded-md border border-background-200/70 hover:bg-background-100 cursor-pointer whitespace-nowrap"
                >
                  {copiedId === 'revealed' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-foreground-500 mt-2">This value exists only in temporary memory and will be cleared when you dismiss this notice. It is not persisted.</p>
            </div>
          )}

          {/* Keys table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 text-left">
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Name</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Key</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Environment</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Scope</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Created</th>
                  <th className="py-3 font-medium text-foreground-500 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key) => (
                  <tr key={key.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="py-3 pr-3 text-foreground-800 font-medium whitespace-nowrap">{key.displayName}</td>
                    <td className="py-3 pr-3">
                      <code className="text-xs font-mono text-foreground-500 whitespace-nowrap">{key.maskedValue}</code>
                    </td>
                    <td className="py-3 pr-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${key.environment === 'production_demo' ? 'bg-accent-100 text-accent-800' : 'bg-secondary-100 text-secondary-800'}`}>
                        {key.environment === 'production_demo' ? 'Production' : 'Sandbox'}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-foreground-600 whitespace-nowrap max-w-[140px] truncate">{key.packageScope}</td>
                    <td className="py-3 pr-3">
                      <span className={`inline-flex items-center gap-1 text-xs ${key.status === 'active' ? 'text-accent-700' : 'text-foreground-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${key.status === 'active' ? 'bg-accent-500' : 'bg-foreground-300'}`}></span>
                        {key.status === 'active' ? 'Active' : key.status === 'revoked' ? 'Revoked' : 'Expired'}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-foreground-500 whitespace-nowrap">{key.createdAt}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        {key.status === 'active' && (
                          <>
                            <button onClick={() => handleRotate(key.id)} className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-foreground-600 hover:bg-background-200 cursor-pointer" title="Rotate key">
                              <i className="ri-refresh-line text-sm"></i>
                            </button>
                            <button onClick={() => setConfirmRevoke(key.id)} className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-red-600 hover:bg-red-50 cursor-pointer" title="Revoke key">
                              <i className="ri-close-circle-line text-sm"></i>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create dialog */}
          {showCreate && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-3">Create demonstration API key</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Key name</label>
                    <input type="text" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g. Compliance Team API" className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400" autoFocus />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Environment</label>
                    <select value={newKeyEnv} onChange={(e) => setNewKeyEnv(e.target.value as 'sandbox_demo' | 'production_demo')} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-700 cursor-pointer">
                      <option value="sandbox_demo">Sandbox (demonstration)</option>
                      <option value="production_demo">Production (demonstration)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Package scope</label>
                    <select value={newKeyScope} onChange={(e) => setNewKeyScope(e.target.value)} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-700 cursor-pointer">
                      <option>All packages</option>
                      <option>UK Business Registry Enrichment API</option>
                      <option>Regional Retail Footfall Index</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleCreate} disabled={!newKeyName.trim()} className="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap">Create key</button>
                </div>
              </div>
            </div>
          )}

          {/* Revoke confirmation */}
          {confirmRevoke && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-2">Revoke API key?</h3>
                <p className="text-sm text-foreground-500 mb-4">This will permanently revoke the key. Any integrations using this key will stop working. This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmRevoke(null)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleRevoke} className="px-4 py-2 text-sm font-medium text-background-50 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer whitespace-nowrap">Revoke key</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}