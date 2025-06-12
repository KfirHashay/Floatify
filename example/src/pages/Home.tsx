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
  Sparkles,
  Star,
  GitFork,
  Download,
  Users,
  CheckCircle
} from 'lucide-react'
import { motion } from 'motion/react'
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
          {/* GitHub-style stats bar */}
          <motion.div 
            className='hero-stats'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className='stat-item'>
              <Star size={16} />
              <span>2.1k</span>
            </div>
            <div className='stat-item'>
              <GitFork size={16} />
              <span>156</span>
            </div>
            <div className='stat-item'>
              <Download size={16} />
              <span>12k/week</span>
            </div>
            <div className='stat-item'>
              <Users size={16} />
              <span>450+ devs</span>
            </div>
          </motion.div>

          <motion.div 
            className='hero-badge'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles size={16} aria-hidden />
            <span>Production Ready</span>
            <div className='badge-pulse' />
          </motion.div>

          <motion.h1 
            className='hero-title'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Modern overlay system for
            <span className='hero-gradient'> React applications</span>
          </motion.h1>

          <motion.p 
            className='hero-description'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Build beautiful, accessible notifications and overlays with TypeScript support, 
            motion animations, and Dynamic Island-inspired design patterns.
          </motion.p>

          {/* Key features highlight */}
          <motion.div 
            className='hero-features'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className='feature-pill'>
              <CheckCircle size={14} />
              <span>TypeScript</span>
            </div>
            <div className='feature-pill'>
              <CheckCircle size={14} />
              <span>Motion Ready</span>
            </div>
            <div className='feature-pill'>
              <CheckCircle size={14} />
              <span>Accessible</span>
            </div>
            <div className='feature-pill'>
              <CheckCircle size={14} />
              <span>5KB Gzipped</span>
            </div>
          </motion.div>

          <motion.div 
            className='hero-actions'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              as={Link}
              to='/examples'
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              enhanced
            >
              Get Started
            </Button>

            <Button
              variant="secondary"
              size="lg"
              leftIcon={<ClipboardCopy size={18} />}
              onClick={handleCopy}
              enhanced
            >
              npm install floatify
            </Button>
          </motion.div>

          <motion.div 
            className='hero-code'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <CodeBlock
              code={quickStartCode}
              language="typescript"
              title="Quick Start"
              showLineNumbers={true}
              enableCopy={true}
              maxHeight="300px"
              showLanguage={true}
              className="hero-code-block"
            />
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── Features ─────────────────────── */}
      <section className='features'>
        <header className='features-header'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Floatify?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Modern patterns, stellar DX, zero runtime cruft.
          </motion.p>
        </header>

        <div className='features-grid'>
          {[
            {
              icon: <Smartphone size={24} aria-hidden />,
              title: 'Mobile-First',
              copy: 'Gesture-friendly and fully responsive—fits every viewport.'
            },
            {
              icon: <Shield size={24} aria-hidden />,
              title: 'Accessibility Built-In',
              copy: 'WCAG-aligned ARIA roles, full keyboard support, screen-reader ready.'
            },
            {
              icon: <Code size={24} aria-hidden />,
              title: 'TypeScript Native',
              copy: '100% typed API—IntelliSense out of the box, compile-time safety.'
            },
            {
              icon: <Palette size={24} aria-hidden />,
              title: 'Themeable',
              copy: 'Dark/light via CSS variables; drop-in theming for any design system.'
            },
            {
              icon: <Zap size={24} aria-hidden />,
              title: 'Lean & Mean',
              copy: '≈ 5 kB gzipped, tree-shakeable. GPU-accelerated animations.'
            },
            {
              icon: <Globe size={24} aria-hidden />,
              title: 'Framework Agnostic',
              copy: 'Core patterns portable beyond React—clean separation of concerns.'
            }
          ].map(({ icon, title, copy }, index) => (
            <motion.article 
              key={title} 
              className='feature-card'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className='feature-icon'>{icon}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ────────────────────── Quick Start ────────────────────── */}
      <section className='quick-start'>
        <div className='quick-start-content'>
          <motion.div 
            className='quick-start-text'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>

          <motion.div 
            className='quick-start-code'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CodeBlock
              code={quickStartCode}
              language="typescript"
              title="Quick Start Example"
              showLineNumbers={true}
              enableCopy={true}
              maxHeight="300px"
              showLanguage={true}
            />
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── Stats ───────────────────────── */}
      <section className='stats'>
        <div className='stats-grid'>
          {[
            { value: '≈ 5 kB', label: 'Gzipped size' },
            { value: '100%', label: 'TypeScript coverage' },
            { value: '0', label: 'Runtime deps' },
            { value: 'A11Y', label: 'WCAG compliant' }
          ].map(({ value, label }, index) => (
            <motion.div 
              key={label} 
              className='stat'
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='stat-number'>{value}</div>
              <div className='stat-label'>{label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home