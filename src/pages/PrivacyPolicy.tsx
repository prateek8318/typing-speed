import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-2xl mx-auto w-full fade-in pt-8">
      <Helmet>
        <title>privacy // type.sys</title>
      </Helmet>
      
      <div className="mb-10 border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-slate-200 tracking-tight">privacy_policy</h1>
        <p className="text-sm text-slate-500 font-mono mt-1">last modified: 10/2026</p>
      </div>
      
      <div className="space-y-8 text-slate-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-sm font-mono text-primary-500 mb-3">01. data_collection</h2>
          <p>
            type.sys operates completely client-side. We do not collect, transmit, or store any of your typing data, metrics, or personal information on external servers. All telemetry remains within your local browser storage.
          </p>
        </section>
        
        <section>
          <h2 className="text-sm font-mono text-primary-500 mb-3">02. analytics</h2>
          <p>
            We use absolutely zero third-party tracking scripts or analytics engines. Your performance is your own.
          </p>
        </section>
        
        <section>
          <h2 className="text-sm font-mono text-primary-500 mb-3">03. cookies</h2>
          <p>
            We use standard local storage APIs to save your preferences (such as difficulty level) to ensure consistency across sessions. No tracking cookies are deployed.
          </p>
        </section>
      </div>
    </div>
  )
}