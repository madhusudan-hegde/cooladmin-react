'use client'

import { useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Input, MButton, Modal, Select, StatCard, Textarea, useToast } from '@cooladmin/react'
import {
  inviteRoles,
  legacyLaunchers,
  modernLaunchers,
  reportStats,
  scrollingLines,
  termsSections,
  zebraText,
} from '@/lib/ui-modals-data'
import type { LegacyModalId, ModernModalId } from '@/lib/ui-modals-data'

type OpenModal = ModernModalId | LegacyModalId | null

const launcherRow: CSSProperties = { display: 'flex', gap: 8, flexWrap: 'wrap' }
const confirmBody: CSSProperties = { textAlign: 'center', padding: '12px 4px' }
const confirmIcon: CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: 'var(--m-danger-soft)',
  color: 'var(--m-danger)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 22,
  marginBottom: 14,
}
const confirmTitle: CSSProperties = {
  margin: '0 0 6px',
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--m-text)',
}
const confirmText: CSSProperties = {
  margin: '0 0 20px',
  fontSize: 13.5,
  color: 'var(--m-text-muted)',
}
const fill: CSSProperties = { flex: 1, justifyContent: 'center' }
const imageBody: CSSProperties = {
  margin: -20,
  textAlign: 'center',
  background: 'var(--m-code-bg)',
  borderRadius: 'var(--m-radius-lg) var(--m-radius-lg) 0 0',
}
const imageFooter: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  width: '100%',
}

/**
 * Launcher rows + every dialog from CoolAdmin's modal.html (modern patterns) and
 * modal.post.html (legacy size/backdrop dialogs), driven by React state instead
 * of Bootstrap's modal JS. Exactly one dialog is open at a time.
 */
export function UiModalsDemo({ section }: { section: 'modern' | 'legacy' }) {
  const [open, setOpen] = useState<OpenModal>(null)
  const toast = useToast()
  const close = () => setOpen(null)

  const confirmDelete = () => {
    close()
    toast.success('Item deleted')
  }
  const sendInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    close()
    toast.success('Invitation sent')
  }
  const confirmLegacy = () => {
    close()
    toast.success('Confirmed')
  }

  const legacyFooter = (
    <>
      <button type="button" className="btn btn-secondary" onClick={close}>
        Cancel
      </button>
      <button type="button" className="btn btn-primary" onClick={confirmLegacy}>
        Confirm
      </button>
    </>
  )

  if (section === 'legacy') {
    return (
      <>
        <div style={launcherRow}>
          {legacyLaunchers.map(l => (
            <MButton key={l.id} variant={l.variant} onClick={() => setOpen(l.id)}>
              {l.label}
            </MButton>
          ))}
        </div>

        <Modal
          id="smallmodal"
          open={open === 'small'}
          onClose={close}
          title="Small Modal"
          size="sm"
          footer={legacyFooter}
        >
          <p>{zebraText}</p>
        </Modal>

        <Modal
          id="mediumModal"
          open={open === 'medium'}
          onClose={close}
          title="Medium Modal"
          footer={legacyFooter}
        >
          <p>{zebraText}</p>
        </Modal>

        <Modal
          id="largeModal"
          open={open === 'large'}
          onClose={close}
          title="Large Modal"
          size="lg"
          footer={legacyFooter}
        >
          <p>{zebraText}</p>
        </Modal>

        <Modal
          id="scrollmodal"
          open={open === 'scroll'}
          onClose={close}
          title="Scrolling Long Content Modal"
          size="lg"
          footer={legacyFooter}
        >
          <p>
            {scrollingLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </Modal>

        <Modal
          id="staticModal"
          open={open === 'static'}
          onClose={close}
          title="Static Modal"
          size="sm"
          staticBackdrop
          footer={legacyFooter}
        >
          <p>This is a static modal, backdrop click will not close it.</p>
        </Modal>
      </>
    )
  }

  return (
    <>
      <div style={launcherRow}>
        {modernLaunchers.map(l => (
          <MButton key={l.id} variant={l.variant} onClick={() => setOpen(l.id)}>
            {l.label}
          </MButton>
        ))}
      </div>

      <Modal
        id="modal-basic"
        open={open === 'basic'}
        onClose={close}
        title="Welcome to CoolAdmin"
        centered
        footer={
          <>
            <MButton variant="ghost" onClick={close}>
              Close
            </MButton>
            <MButton variant="primary" onClick={close}>
              Got it
            </MButton>
          </>
        }
      >
        <p style={{ margin: 0 }}>
          A clean, modern admin dashboard template built with Bootstrap 5, Inter, and a brand-blue
          accent palette.
        </p>
      </Modal>

      <Modal id="modal-confirm" open={open === 'confirm'} onClose={close} centered size="sm">
        <div style={confirmBody}>
          <div style={confirmIcon}>
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          </div>
          <h5 style={confirmTitle}>Delete this item?</h5>
          <p style={confirmText}>This action can’t be undone.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <MButton variant="ghost" style={fill} onClick={close}>
              Cancel
            </MButton>
            <MButton variant="danger" style={fill} onClick={confirmDelete}>
              Delete
            </MButton>
          </div>
        </div>
      </Modal>

      <Modal
        id="modal-form"
        open={open === 'form'}
        onClose={close}
        title="Invite teammate"
        centered
        footer={
          <>
            <MButton variant="ghost" onClick={close}>
              Cancel
            </MButton>
            <MButton variant="primary" type="submit" form="modal-form-invite">
              Send invite
            </MButton>
          </>
        }
      >
        <form id="modal-form-invite" onSubmit={sendInvite}>
          <Input
            variant="bootstrap"
            type="email"
            label="Email address"
            placeholder="teammate@example.com"
            required
          />
          <Select label="Role" defaultValue="Member">
            {inviteRoles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
          <Textarea
            label="Message (optional)"
            placeholder="Welcome! Looking forward to working with you."
            wrapperClassName="mb-0"
          />
        </form>
      </Modal>

      <Modal
        id="modal-large"
        open={open === 'large'}
        onClose={close}
        title="Detailed report"
        centered
        size="lg"
        footer={
          <MButton variant="ghost" onClick={close}>
            Close
          </MButton>
        }
      >
        <p>
          Larger modal for richer content. Useful for previews, detailed forms, side-by-side info,
          etc.
        </p>
        <div className="row row-tight">
          {reportStats.map(stat => (
            <div className="col-md-4" key={stat.id}>
              <StatCard
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                className="mb-0"
              />
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        id="modal-scroll"
        open={open === 'scroll'}
        onClose={close}
        title="Terms & conditions"
        centered
        scrollable
        footer={
          <>
            <MButton variant="ghost" onClick={close}>
              Decline
            </MButton>
            <MButton variant="primary" onClick={close}>
              Accept
            </MButton>
          </>
        }
      >
        {termsSections.map(section => (
          <p key={section.slice(0, 11)}>{section}</p>
        ))}
      </Modal>

      <Modal
        id="modal-image"
        open={open === 'image'}
        onClose={close}
        centered
        size="lg"
        footer={
          <div style={imageFooter}>
            <span style={{ color: 'var(--m-text-muted)', fontSize: 13 }}>
              Brand image · 1920×1080
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <MButton
                variant="ghost"
                icon="fa-solid fa-download"
                onClick={() => toast.success('Downloaded')}
              >
                Download
              </MButton>
              <MButton variant="primary" onClick={close}>
                Close
              </MButton>
            </div>
          </div>
        }
      >
        <div style={imageBody}>
          <img
            src="/assets/img/bg-title-01.jpg"
            alt="Brand image preview"
            style={{ maxWidth: '100%', borderRadius: '14px 14px 0 0', display: 'block' }}
          />
        </div>
      </Modal>
    </>
  )
}
