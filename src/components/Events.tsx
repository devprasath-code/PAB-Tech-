import React, { useState } from 'react';

const FEATURES = [
  {
    icon: '🎤',
    title: 'Live Keynotes',
    desc: 'Industry-leading speakers from embedded systems, edge AI, and hardware innovation.',
  },
  {
    icon: '🔬',
    title: 'Hands-on Labs',
    desc: 'Bring your laptop. Flash real boards. Route real PCBs. No slides-only sessions.',
  },
  {
    icon: '🏆',
    title: 'Hackathons',
    desc: 'Competitive sprints with premium hardware prizes and direct placement opportunities.',
  },
  {
    icon: '🌐',
    title: 'Hybrid Access',
    desc: 'Attend in-person at PAB hubs or stream live with interactive Q&A from anywhere.',
  },
];

export default function Events() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      id="events"
      style={{
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Ambient blobs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-8%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '10px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#a855f7',
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: '999px',
            padding: '4px 14px',
            marginBottom: '28px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', animation: 'pulse 2s infinite' }} />
          LIVE ENGAGEMENT &amp; CONFERENCES
        </span>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '16px',
          }}
        >
          Interactive Events &amp;{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Silicon Showcases
          </span>
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'rgba(163,163,163,0.8)',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}
        >
          Our full events portal — live registrations, speaker lineups, hackathon sprints, and
          workshop cohorts — is being engineered. Stay tuned for the launch.
        </p>

        {/* Under Progress Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(251,191,36,0.08)',
            border: '1px solid rgba(251,191,36,0.2)',
            borderRadius: '12px',
            padding: '10px 20px',
            marginBottom: '48px',
          }}
        >
          <span style={{ fontSize: '18px' }}>🚧</span>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#fbbf24',
            }}
          >
            Portal Under Active Development
          </span>
          <span style={{ fontSize: '18px' }}>🚧</span>
        </div>



        {/* Feature Preview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '56px',
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '20px 16px',
                textAlign: 'center',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(168,85,247,0.25)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.icon}</div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '6px',
                }}
              >
                {f.title}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'rgba(163,163,163,0.7)',
                  lineHeight: 1.55,
                  fontWeight: 300,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Notify form */}
        <div
          style={{
            background: 'rgba(168,85,247,0.05)',
            border: '1px solid rgba(168,85,247,0.15)',
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div
                style={{
                  fontSize: '40px',
                  marginBottom: '12px',
                  animation: 'bounceIn 0.5s ease',
                }}
              >
                🎉
              </div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                You're on the launch list!
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(163,163,163,0.7)', fontWeight: 300 }}>
                We'll notify you the moment the Events Portal goes live.
              </p>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '6px',
                }}
              >
                Get notified at launch
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'rgba(163,163,163,0.65)',
                  marginBottom: '20px',
                  fontWeight: 300,
                }}
              >
                Drop your email and we'll send you early-access to event registration before public release.
              </p>
              <form
                onSubmit={handleNotify}
                style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
              >
                <input
                  id="events-notify-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    background: 'rgba(10,10,10,0.8)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    color: '#e5e5e5',
                    outline: 'none',
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor = 'rgba(168,85,247,0.5)')
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')
                  }
                />
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = '0.85')}
                  onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = '1')}
                >
                  Notify Me →
                </button>
              </form>
            </>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: '48px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '10px',
              fontFamily: 'monospace',
              color: 'rgba(163,163,163,0.5)',
            }}
          >
            <span>DEVELOPMENT PROGRESS</span>
            <span style={{ color: '#a855f7' }}>68%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '68%',
                height: '100%',
                background: 'linear-gradient(90deg, #a855f7, #06b6d4)',
                borderRadius: '999px',
                boxShadow: '0 0 8px rgba(168,85,247,0.5)',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              marginTop: '16px',
              textAlign: 'left',
            }}
          >
            {[
              { label: 'Backend API', done: true },
              { label: 'Event Engine', done: true },
              { label: 'RSVP System', done: false },
              { label: 'Live Streaming', done: false },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '10px' }}>{item.done ? '✅' : '⏳'}</span>
                <span
                  style={{
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    color: item.done ? 'rgba(52,211,153,0.8)' : 'rgba(163,163,163,0.5)',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
