import { Footer, PageHeader } from '@madhusudan-hegde/cooladmin-react'

export const metadata = { title: 'Grid system' }

/** One `.row` of demo cells; each entry is the column class (also the cell's label). */
type GridRow = { cols: string[]; labels?: string[] }

const fixedRows: GridRow[] = [
  { cols: Array(3).fill('col') },
  { cols: Array(6).fill('col') },
  { cols: Array(12).fill('col') },
]

const desktopRows: GridRow[] = [
  { cols: ['col col-lg-12'], labels: ['col-lg-12'] },
  { cols: Array(2).fill('col-lg-6') },
  { cols: Array(3).fill('col-lg-4') },
  { cols: Array(4).fill('col-lg-3') },
  { cols: Array(6).fill('col-lg-2') },
]

const responsiveRows: GridRow[] = [
  { cols: ['col-2', 'col-2', 'col-lg-8'] },
  { cols: ['col-sm-3', 'col-sm-3', 'col-lg-6'] },
  { cols: ['col-md-4', 'col-md-4', 'col-lg-4'] },
  { cols: ['col-sm-6', 'col-sm-6'] },
]

const offsetRows: GridRow[] = [
  { cols: ['col-md-6 offset-md-6 col-sm-6 ms-auto'], labels: ['col-md-6 offset-md-6 col-sm-6 '] },
  { cols: ['col-md-6 offset-md-3 me-auto ms-auto'], labels: ['.col-md-6 .offset-md-3'] },
  { cols: ['col-md-4', 'col-md-4 ms-auto'], labels: [' .col-md-4 ', '.col-md-4 .ms-auto'] },
]

function GridRows({ rows }: { rows: GridRow[] }) {
  return rows.map((row, r) => (
    <div className="row" key={r}>
      {row.cols.map((col, c) => (
        <div className={col} key={c}>
          <section className="card">
            <div className="card-body text-secondary">
              {row.labels?.[c] ?? (col === 'col' ? '.col' : col)}
            </div>
          </section>
        </div>
      ))}
    </div>
  ))
}

/** CoolAdmin grid.html — Bootstrap 5's 12-column responsive grid. */
export default function GridSystemPage() {
  return (
    <>
      <PageHeader
        title="Grid system"
        subtitle="Bootstrap 5 12-column responsive grid system demonstration."
      />

      <h2 className="heading-title">Fixed grid</h2>
      <GridRows rows={fixedRows} />

      <h2 className="heading-title">Desktop Grid</h2>
      <GridRows rows={desktopRows} />

      <h2 className="heading-title">Mobile, Tablet, and Desktop</h2>
      <GridRows rows={responsiveRows} />

      <h2 className="heading-title">Offset Grid</h2>
      <GridRows rows={offsetRows} />

      <Footer />
    </>
  )
}
