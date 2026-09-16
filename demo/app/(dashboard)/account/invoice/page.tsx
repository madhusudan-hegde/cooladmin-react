import { Footer, PageHeader, cn } from '@madhusudan-hegde/cooladmin-react'
import {
  invoiceBillTo,
  invoiceFrom,
  invoiceLines,
  invoiceMeta,
  invoiceTotals,
} from '@/lib/invoice-data'
import type { InvoiceParty } from '@/lib/invoice-data'
import { InvoiceActions } from '@/components/invoice-actions'

export const metadata = { title: 'Invoice' }

function Party({ party, className }: { party: InvoiceParty; className?: string }) {
  return (
    <div className={cn('invoice-doc__party', className)}>
      <h6>{party.heading}</h6>
      <p>
        <strong>{party.name}</strong>
        {party.lines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    </div>
  )
}

/** CoolAdmin invoice.html — printable invoice document. */
export default function InvoicePage() {
  return (
    <>
      <PageHeader
        className="invoice-actions"
        title={`Invoice ${invoiceMeta.number}`}
        subtitle={`Billing period · ${invoiceMeta.billingPeriod}`}
        actions={<InvoiceActions />}
      />

      <article className="invoice-doc" aria-label={`Invoice ${invoiceMeta.number}`}>
        <header className="invoice-doc__head">
          <div className="invoice-doc__brand">
            <span className="logo-mark" aria-hidden="true">
              C
            </span>
            <span className="logo-text">CoolAdmin</span>
          </div>
          <div className="invoice-doc__title-wrap">
            <h2>INVOICE</h2>
            <p>
              #{invoiceMeta.number} · Issued {invoiceMeta.issued}
            </p>
          </div>
        </header>

        <div className="invoice-doc__parties">
          <Party party={invoiceFrom} />
          <Party party={invoiceBillTo} />
          <div className="invoice-doc__party invoice-doc__party--right">
            <h6>Invoice details</h6>
            <p>
              <strong>Due {invoiceMeta.due}</strong>
              Issued {invoiceMeta.issued}
              <br />
              {invoiceMeta.terms}
              <br />
              ID: {invoiceMeta.number}
            </p>
          </div>
        </div>

        <table className="invoice-doc__lines">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col" className="num invoice-doc__col-qty">
                Qty
              </th>
              <th scope="col" className="num invoice-doc__col-rate">
                Rate
              </th>
              <th scope="col" className="num invoice-doc__col-amount">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceLines.map(line => (
              <tr key={line.id}>
                <td>
                  <strong className="invoice-doc__line-title">{line.title}</strong>
                  <br />
                  <span className="invoice-doc__line-meta">{line.meta}</span>
                </td>
                <td className="num">{line.qty}</td>
                <td className="num">{line.rate}</td>
                <td className="num">{line.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="invoice-doc__totals">
          <tbody>
            {invoiceTotals.map(total => (
              <tr key={total.label} className={cn(total.grand && 'invoice-doc__grand')}>
                <td>{total.label}</td>
                <td>{total.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-doc__notes">
          <p className="invoice-doc__notes-title">Payment instructions</p>
          <p>
            Bank transfer to <strong>CoolAdmin Inc.</strong> · Wells Fargo · Account 0123 4567 8901
            · Routing 121 000 248 · SWIFT WFBIUS6S. Reference {invoiceMeta.number} in your transfer.
          </p>
          <p>
            Thank you for your business. Questions? Reply to this email or contact{' '}
            <a href="mailto:billing@cooladmin.com">billing@cooladmin.com</a>.
          </p>
        </div>
      </article>

      <Footer />
    </>
  )
}
