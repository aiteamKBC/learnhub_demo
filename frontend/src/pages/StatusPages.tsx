import { Compass } from 'lucide-react'

import { Backdrop } from '@/components/art/backdrops'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/misc'
import { Link } from '@/lib/router'

export function NotFoundPage() {
  return (
    <div className="relative isolate">
      <Backdrop variant="orbit" height={520} />
    <div className="relative mx-auto max-w-lg px-4 py-20">
      <EmptyState icon={<Compass />} title="Page not found" body="The page you are looking for doesn't exist or has moved." action={<Button asChild><Link to="/">Go home</Link></Button>} />
    </div>
    </div>
  )
}
