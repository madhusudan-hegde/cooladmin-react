import type { CSSProperties } from 'react'
import { Footer, MCard, PageHeader, SectionEyebrow } from '@cooladmin/react'

export const metadata = { title: 'Typography' }

const specimen: CSSProperties = { margin: '4px 0 0', color: 'var(--m-text-faint)', fontSize: 12 }
const inlineCode: CSSProperties = {
  background: 'var(--m-surface-2)',
  padding: '1px 6px',
  borderRadius: 4,
  fontSize: 12,
  border: '1px solid var(--m-border)',
}
const kbd: CSSProperties = {
  background: 'var(--m-surface-2)',
  border: '1px solid var(--m-border)',
  borderRadius: 4,
  padding: '1px 6px',
  fontSize: 11.5,
}
const listHeading: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--m-text-muted)',
  margin: '0 0 12px',
}
const list: CSSProperties = {
  margin: 0,
  paddingLeft: 20,
  color: 'var(--m-text)',
  fontSize: 14,
  lineHeight: 1.7,
}

const headingScale: {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  label: string
  spec: string
  style: CSSProperties
}[] = [
  {
    tag: 'h1',
    label: 'Display heading',
    spec: '32px / weight 700 / tracking -0.02em',
    style: { fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' },
  },
  {
    tag: 'h1',
    label: 'Heading 1',
    spec: '24px / weight 600',
    style: { fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' },
  },
  {
    tag: 'h2',
    label: 'Heading 2',
    spec: '20px / weight 600',
    style: { fontSize: 20, fontWeight: 600, letterSpacing: '-0.005em' },
  },
  {
    tag: 'h3',
    label: 'Heading 3',
    spec: '18px / weight 600',
    style: { fontSize: 18, fontWeight: 600 },
  },
  {
    tag: 'h4',
    label: 'Heading 4',
    spec: '16px / weight 600',
    style: { fontSize: 16, fontWeight: 600 },
  },
  {
    tag: 'h5',
    label: 'Heading 5',
    spec: '14px / weight 600',
    style: { fontSize: 14, fontWeight: 600 },
  },
  {
    tag: 'h6',
    label: 'Heading 6 (eyebrow)',
    spec: '13px / weight 600 / uppercase / tracking 0.05em',
    style: { fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  },
]

/** CoolAdmin typo.html — Inter type scale, body text, lists, blockquote and code block. */
export default function TypographyPage() {
  return (
    <>
      <PageHeader
        title="Typography"
        subtitle="Typography hierarchy, headings, body text, and utility classes."
      />

      <SectionEyebrow className="mb-2">HEADING SCALE</SectionEyebrow>
      <MCard
        title="Inter, weight 600, tracking -0.01em"
        subtitle="Sentence-case throughout. Avoid all-caps headings."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {headingScale.map(({ tag: Tag, label, spec, style }) => (
            <div key={label}>
              <Tag style={{ margin: 0, color: 'var(--m-text)', ...style }}>{label}</Tag>
              <p style={specimen}>{spec}</p>
            </div>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">BODY TEXT</SectionEyebrow>
      <MCard title="Paragraphs and inline elements">
        <p style={{ fontSize: 16, color: 'var(--m-text)', lineHeight: 1.6, margin: '0 0 14px' }}>
          <strong style={{ color: 'var(--m-text)' }}>Lead paragraph.</strong> Slightly larger than
          body text — used for the first paragraph of an article or to set context. Inter at 16px /
          line-height 1.6 reads comfortably on most screens.
        </p>
        <p style={{ margin: '0 0 14px', color: 'var(--m-text)', fontSize: 14, lineHeight: 1.6 }}>
          Default body text at 14px. Inline elements: <strong>bold</strong>, <em>italic</em>,{' '}
          <a href="#" style={{ color: 'var(--m-accent)' }}>
            links
          </a>
          , <code style={inlineCode}>inline code</code>, and <kbd style={kbd}>⌘K</kbd> keyboard
          shortcuts.
        </p>
        <p style={{ margin: 0, color: 'var(--m-text-muted)', fontSize: 13, lineHeight: 1.5 }}>
          Muted text at 13px / muted color — for secondary information, captions, or supporting
          content.
        </p>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">LISTS</SectionEyebrow>
      <div className="row row-tight">
        <div className="col-md-6">
          <MCard>
            <h3 style={listHeading}>Unordered</h3>
            <ul style={list}>
              <li>First item with some explanatory text</li>
              <li>Second item also with descriptive copy</li>
              <li>
                Third item, slightly different
                <ul style={{ margin: '4px 0 0', paddingLeft: 20 }}>
                  <li>Nested item one</li>
                  <li>Nested item two</li>
                </ul>
              </li>
              <li>Fourth item</li>
            </ul>
          </MCard>
        </div>
        <div className="col-md-6">
          <MCard>
            <h3 style={listHeading}>Ordered</h3>
            <ol style={list}>
              <li>Step one — the first action</li>
              <li>Step two — followed by the next</li>
              <li>Step three — and finally</li>
              <li>Step four with a closing note</li>
            </ol>
          </MCard>
        </div>
      </div>

      <SectionEyebrow className="mt-4 mb-2">BLOCKQUOTE</SectionEyebrow>
      <MCard>
        <blockquote
          style={{
            borderLeft: '3px solid var(--m-accent)',
            background: 'var(--m-accent-soft)',
            padding: '14px 18px',
            margin: 0,
            borderRadius: '0 8px 8px 0',
          }}
        >
          <p style={{ margin: '0 0 8px', fontSize: 14, color: 'var(--m-text)', lineHeight: 1.6 }}>
            “Design isn’t how it looks — it’s how it works. And then how it looks.”
          </p>
          <footer style={{ fontSize: 12.5, color: 'var(--m-text-muted)' }}>
            — Michelle Moreno, <cite style={{ fontStyle: 'normal' }}>Product designer</cite>
          </footer>
        </blockquote>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">CODE BLOCK</SectionEyebrow>
      <MCard>
        <pre
          style={{
            background: 'var(--m-tooltip-bg)',
            color: 'var(--m-tooltip-text)',
            padding: '16px 20px',
            borderRadius: 10,
            overflowX: 'auto',
            margin: 0,
            fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
            fontSize: 12.5,
            lineHeight: 1.6,
          }}
        >
          <code>{`// Toast API — built into the template
toast.success('Saved successfully');
toast.warning('Storage at 82%');
toast.error('Failed to fetch');

// Command palette — open programmatically
window.cmdk.open();`}</code>
        </pre>
      </MCard>

      <Footer />
    </>
  )
}
