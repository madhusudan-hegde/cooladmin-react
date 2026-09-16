import {
  ActivityList,
  DateChip,
  Footer,
  MButton,
  MCard,
  PageHeader,
  ProgressBar,
  StatCard,
  StatusPill,
} from '@cooladmin/react'
import {
  activeProjects,
  projectActivity,
  projectKpis,
  teamAvailability,
  upcomingDeadlines,
} from '@/lib/dashboard-data'
import { emphasize } from '@/components/emphasize'
import {
  DashboardRefreshButton,
  DashboardRefreshProvider,
  Refreshable,
} from '@/components/dashboard-refresh'
import { StatCardSkeleton } from '@/components/skeletons'

export const metadata = { title: 'Projects' }

/** Dashboard 4 — projects (CoolAdmin index4.html). */
export default function ProjectsDashboardPage() {
  return (
    <DashboardRefreshProvider>
      <PageHeader
        title="Projects"
        subtitle="Active work, upcoming deadlines, and team availability."
        actions={
          <>
            <DateChip icon="fa-solid fa-people-group" aria-label="Workspace: all teams">
              All teams
            </DateChip>
            <DashboardRefreshButton />
            <MButton variant="primary" icon="fa-solid fa-plus">
              New project
            </MButton>
          </>
        }
      />

      {/* KPI strip */}
      <div className="row row-tight dash-row">
        {projectKpis.map(kpi => (
          <div className="col-sm-6 col-lg-3" key={kpi.id}>
            <Refreshable skeleton={<StatCardSkeleton />}>
              <StatCard
                label={kpi.label}
                value={kpi.value}
                icon={kpi.icon}
                color={kpi.color}
                delta={kpi.delta}
                deltaDirection={kpi.deltaDirection}
                deltaPeriod={kpi.deltaPeriod}
              />
            </Refreshable>
          </div>
        ))}
      </div>

      {/* Active projects + upcoming deadlines */}
      <div className="row row-tight dash-row">
        <div className="col-lg-8">
          <MCard
            title="Active projects"
            subtitle="Currently in progress, by completion."
            actions={
              <MButton href="/kanban" variant="ghost" size="sm">
                View all
              </MButton>
            }
          >
            <ul className="project-list">
              {activeProjects.map(project => (
                <li key={project.id}>
                  <div>
                    <p className="project-list__title">{project.title}</p>
                    <span className="project-list__meta">
                      Due {project.due} · {project.tasks} tasks ·{' '}
                      <StatusPill status={project.status}>{project.statusLabel}</StatusPill>
                    </span>
                  </div>
                  <div className="project-list__avatars">
                    {project.members.map(src => (
                      <img key={src} src={src} alt="" />
                    ))}
                  </div>
                  <div className="project-list__progress" title={`${project.progress}% complete`}>
                    <ProgressBar
                      value={project.progress}
                      size="sm"
                      color={project.barColor}
                      hideValue
                    />
                  </div>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
        <div className="col-lg-4">
          <MCard title="Upcoming deadlines" subtitle="Next two weeks.">
            <ul className="deadline-list">
              {upcomingDeadlines.map(d => (
                <li key={d.id}>
                  <div className="deadline-list__date">
                    <strong>{d.day}</strong>
                    <span>{d.month}</span>
                  </div>
                  <div className="deadline-list__body">
                    <p className="deadline-list__title">{d.title}</p>
                    <span className="deadline-list__project">{d.project}</span>
                  </div>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>

      {/* Activity feed + team availability */}
      <div className="row row-tight dash-row">
        <div className="col-lg-8">
          <MCard
            title="Recent activity"
            subtitle="Latest team updates."
            actions={
              <MButton href="/notifications" variant="ghost" size="sm">
                View all
              </MButton>
            }
          >
            <ActivityList
              items={projectActivity.map(a => ({
                id: a.id,
                avatarSrc: a.avatarSrc,
                text: emphasize(a.text),
                time: a.time,
              }))}
            />
          </MCard>
        </div>
        <div className="col-lg-4">
          <MCard title="Team availability" subtitle="Right now.">
            <ul className="team-list">
              {teamAvailability.map(m => (
                <li key={m.id}>
                  <div className="team-list__avatar">
                    <img src={m.avatarSrc} alt="" />
                    <span
                      className={`team-list__status team-list__status--${m.status}`}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="team-list__name">
                    {m.name}
                    <span className="team-list__role">{m.role}</span>
                  </span>
                  <StatusPill status={m.status}>{m.availability}</StatusPill>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>

      <Footer />
    </DashboardRefreshProvider>
  )
}
