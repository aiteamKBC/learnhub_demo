import { useQueries } from '@tanstack/react-query'
import { ArrowRight, Award, BookOpen, Building2, CalendarClock, CheckCircle2, Download, PlayCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CourseThumb } from '@/components/ui/course-thumb'
import { EmptyState, ErrorState } from '@/components/ui/misc'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { api, unwrap } from '@/api/client'
import { CountUp } from '@/components/ui/count-up'
import { useMe } from '@/features/identity/auth'
import { certificatePdfUrl, useMyCertificates, useMyCourses } from '@/features/learning/api'
import { relativeDate, shortDate } from '@/lib/format'
import { Link } from '@/lib/router'

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

function PanelHead({ icon, title, to, label }: { icon: ReactNode; title: string; to: string; label: string }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
      <h2 className="inline-flex items-center gap-2 text-[15px] font-semibold [&_svg]:size-4 [&_svg]:text-primary">
        {icon} {title}
      </h2>
      <Link to={to} aria-label={label} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        View all <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}

/** Company deadlines that are still open, soonest first (from every company the learner is in). */
function UpcomingDeadlines() {
  const { data: me } = useMe()
  const orgs = me?.memberships ?? []
  const results = useQueries({
    queries: orgs.map((m) => ({
      queryKey: ['my-requirements', m.org_id],
      queryFn: () => unwrap(api.GET('/api/v1/compliance/my', { headers: { 'X-Org-Id': m.org_id } })),
    })),
  })
  if (!orgs.length) return null
  const loading = results.some((r) => r.isLoading)
  const due = results
    .flatMap((r) => r.data ?? [])
    .filter((r) => r.due_at && !['compliant', 'exempt'].includes(r.status))
    .sort((a, b) => a.due_at!.localeCompare(b.due_at!))
    .slice(0, 3)
  return (
    <Card className="overflow-hidden">
      <PanelHead icon={<CalendarClock />} title="Upcoming deadlines" to="/learn/required" label="View all required training" />
      {loading ? (
        <div className="grid gap-2 p-4">
          <Skeleton className="h-12 rounded-md" />
          <Skeleton className="h-12 rounded-md" />
        </div>
      ) : !due.length ? (
        <p className="flex animate-reveal items-center gap-2 px-4 py-5 text-sm text-muted">
          <CheckCircle2 className="size-4 text-success" /> Nothing due. You're up to date.
        </p>
      ) : (
        <ul className="stagger divide-y divide-border">
          {due.map((r) => {
            const late = new Date(r.due_at!) < new Date()
            return (
              <li key={r.status_id} className="flex items-start gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.requirement}</p>
                  <p className="truncate text-xs text-muted">{r.course_title}</p>
                </div>
                <Badge tone={late ? 'danger' : 'warning'} title={shortDate(r.due_at!)}>
                  {late ? 'Overdue' : `Due ${relativeDate(r.due_at!)}`}
                </Badge>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}

function RecentCertificates() {
  const { data, isLoading } = useMyCertificates()
  const certs = (data ?? []).slice(0, 2)
  return (
    <Card className="overflow-hidden">
      <PanelHead icon={<Award />} title="My certificates" to="/learn/certificates" label="View all certificates" />
      {isLoading ? (
        <div className="p-4">
          <Skeleton className="h-12 rounded-md" />
        </div>
      ) : !certs.length ? (
        <p className="animate-reveal px-4 py-5 text-sm text-muted">Finish a course to earn your first certificate.</p>
      ) : (
        <ul className="stagger divide-y divide-border">
          {certs.map((c) => (
            <li key={c.id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{c.course_title}</p>
                <p className="text-xs text-muted">Issued {shortDate(c.issued_at)}</p>
              </div>
              <Button size="sm" variant="secondary" asChild>
                <a href={certificatePdfUrl(c.id)} download aria-label={`Download the certificate for ${c.course_title}`}>
                  <Download /> Download
                </a>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function Stats({ enrolled, completed }: { enrolled: number; completed: number }) {
  const { data: certs } = useMyCertificates()
  const stats: [string, number][] = [
    ['Courses', enrolled],
    ['Completed', completed],
    ['Certificates', certs?.length ?? 0],
  ]
  return (
    <Card className="grid grid-cols-3 divide-x divide-border py-4 text-center">
      {stats.map(([label, n]) => (
        <div key={label} className="px-2">
          <p className="text-2xl font-semibold tracking-tight tabular">
            <CountUp value={n} />
          </p>
          <p className="mt-0.5 text-xs text-muted">{label}</p>
        </div>
      ))}
    </Card>
  )
}

export function MyLearningPage() {
  const { data: me } = useMe()
  const { data, isLoading, error, refetch } = useMyCourses()
  const items = data?.items ?? []
  const current = items.find((i) => i.progress_pct > 0 && i.progress_pct < 100) ?? items[0]

  return (
    <>
      <p className="text-sm text-muted">
        {greeting()}, {me?.full_name?.split(' ')[0] || 'there'}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-[26px]">Continue your learning</h1>

      {error ? (
        <ErrorState message={(error as Error).message} onRetry={() => void refetch()} />
      ) : isLoading ? (
        <div className="mt-6 grid gap-4">
          <Skeleton className="h-40 rounded-lg" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      ) : !items.length ? (
        <Card className="mt-6">
          <EmptyState icon={<BookOpen />} title="No courses yet" body="Courses you buy, and training your company assigns, appear here." action={<Button asChild><Link to="/courses">Browse courses</Link></Button>} />
        </Card>
      ) : (
        <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
          {current ? (
            <Card className="flex animate-reveal flex-col gap-5 p-4 sm:flex-row sm:items-center sm:p-5">
              <CourseThumb src={current.thumbnail_url} title={current.title} className="sm:w-56" />
              <div className="min-w-0 flex-1">
                <Badge tone="primary">{current.progress_pct > 0 ? 'In progress' : 'Up next'}</Badge>
                <h2 className="mt-2 text-lg font-semibold tracking-tight">{current.title}</h2>
                <p className="text-sm text-muted">{current.instructors.join(', ')}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Progress value={current.progress_pct} label="Progress" />
                  <span className="text-xs text-muted tabular">{Math.round(current.progress_pct)}%</span>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link to={`/learn/${current.slug}`}>
                  <PlayCircle /> {current.progress_pct > 0 ? 'Continue' : 'Start'}
                </Link>
              </Button>
            </Card>
          ) : null}
          <h2 className="mt-10 mb-4 text-lg font-semibold tracking-tight">My courses</h2>
          <div className="stagger grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {items.map((c) => (
              <Link key={c.enrollment_id} to={`/learn/${c.slug}`} className="group rounded-lg border border-border bg-surface p-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow">
                <CourseThumb src={c.thumbnail_url} title={c.title} />
                <div className="px-1 pt-3 pb-1">
                  <h3 className="line-clamp-2 text-[15px] font-semibold group-hover:text-primary">{c.title}</h3>
                  {c.org_name ? (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                      <Building2 className="size-3.5" /> Assigned by {c.org_name}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-muted">{c.instructors.join(', ')}</p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    <Progress value={c.progress_pct} tone={c.progress_pct >= 100 ? 'success' : 'primary'} label="Progress" />
                    <span className="text-xs text-muted tabular">{Math.round(c.progress_pct)}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
          <aside className="grid content-start gap-4" aria-label="Your progress">
            <Stats enrolled={items.length} completed={items.filter((i) => i.progress_pct >= 100).length} />
            <UpcomingDeadlines />
            <RecentCertificates />
          </aside>
        </div>
      )}
    </>
  )
}
