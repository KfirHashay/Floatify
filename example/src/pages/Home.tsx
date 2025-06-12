import { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
  Code,
  Palette,
  Globe,
  ClipboardCopy,
  Sparkles
} from 'lucide-react'
import Button from '../components/Button'
import CodeBlock from '../components/CodeBlock'

const Home: FC = () => {
  const handleCopy = useCallback(() => {
    /* Best-effort clipboard write; swallow errors silently */
    navigator.clipboard.writeText('npm install floatify').catch(() => {})
  }, [])

  const quickStartCode = `import { Floatify, useAggregator } from 'floatify'

function App() {
  const { registerChannel, addCard } = useAggregator()

  useEffect(() => {
    registerChannel('notifications', 1)
    addCard('notifications', {
      id: 'welcome',
      title: 'Welcome!',
      content: 'Thanks for trying Floatify'
    })
  }, [])

  return (
    <Floatify>
      {/* app content */}
    </Floatify>
  )
}`

  return (
    <main className='home'>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className='hero'>
        <div className='hero-content'>
          <span className='hero-badge flex items-center gap-1'>
            <Sparkles size={16} aria-hidden />
            Modern React Overlay Library
          </span>

          <h1 className='hero-title'>
            Beautiful overlays for
            <span className='hero-gradient'> modern React apps</span>
          </h1>

          <p className='hero-description'>
            Floatify delivers a flexible, accessible overlay stack for toasts,
            in-app alerts, and dynamic content. Built with TypeScript, engineered
            for velocity.
          </p>

          <div className='hero-actions'>
            <Button
              as={Link}
              to='/examples'
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              enhanced
            >
              View examples
            </Button>

            <Button
              variant="secondary"
              size="lg"
              leftIcon={<ClipboardCopy size={18} />}
              onClick={handleCopy}
              enhanced
            >
              Copy install command
            </Button>
          </div>

          <CodeBlock
            code="npm install floatify"
            language="bash"
            enableCopy={true}
            showLineNumbers={false}
            showLanguage={false}
            className="hero-code-block"
          />
        </div>
      </section>

      {/* ──────────────────────── Features ─────────────────────── */}
      <section className='features'>
        <header className='features-header'>
          <h2>Why Floatify?</h2>
          <p>Modern patterns, stellar DX, zero runtime cruft.</p>
        </header>

        <div className='features-grid'>
          {[
            {
              icon: <Smartphone size={24} aria-hidden />,
              title: 'Mobile-First',
              copy:
                'Gesture-friendly and fully responsive—fits every viewport.'
            },
            {
              icon: <Shield size={24} aria-hidden />,
              title: 'Accessibility Built-In',
              copy:
                'WCAG-aligned ARIA roles, full keyboard support, screen-reader ready.'
            },
            {
              icon: <Code size={24} aria-hidden />,
              title: 'TypeScript Native',
              copy:
                '100 % typed API—IntelliSense out of the box, compile-time safety.'
            },
            {
              icon: <Palette size={24} aria-hidden />,
              title: 'Themeable',
              copy:
                'Dark/light via CSS variables; drop-in theming for any design system.'
            },
            {
              icon: <Zap size={24} aria-hidden />,
              title: 'Lean & Mean',
              copy:
                '≈ 5 kB gzipped, tree-shakeable. GPU-accelerated animations.'
            },
            {
              icon: <Globe size={24} aria-hidden />,
              title: 'Framework Agnostic',
              copy:
                'Core patterns portable beyond React—clean separation of concerns.'
            }
          ].map(({ icon, title, copy }) => (
            <article key={title} className='feature-card'>
              <div className='feature-icon'>{icon}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ────────────────────── Quick Start ────────────────────── */}
      <section className='quick-start'>
        <div className='quick-start-content'>
          <div className='quick-start-text'>
            <h2>Onboard in seconds</h2>
            <p>
              Install, register a channel, and push a card—done. No boilerplate.
            </p>

            <Button
              as={Link}
              to='/examples'
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              enhanced
            >
              Full examples
            </Button>
          </div>

          <div className='quick-start-code'>
            <CodeBlock
              code={quickStartCode}
              language="typescript"
              title="Quick Start Example"
              showLineNumbers={true}
              enableCopy={true}
              maxHeight="300px"
              showLanguage={true}
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────── Stats ───────────────────────── */}
      <section className='stats'>
        <div className='stats-grid'>
          {[
            { value: '≈ 5 kB', label: 'Gzipped size' },
            { value: '100 %', label: 'TypeScript coverage' },
            { value: '0', label: 'Runtime deps' },
            { value: 'A11Y', label: 'WCAG compliant' }
          ].map(({ value, label }) => (
            <div key={label} className='stat'>
              <div className='stat-number'>{value}</div>
              <div className='stat-label'>{label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home