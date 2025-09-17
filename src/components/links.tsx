import { Link } from '@tanstack/react-router'
import { Dot } from 'lucide-react'
import { Fragment } from 'react'

const SDK_LINKS = [
  {
    id: 'download',
    label: 'Download SDK',
    href: 'https://www.npmjs.com/package/@avail-project/nexus-widgets',
  },
  {
    id: 'docs',
    label: 'Docs',
    href: 'https://docs.availproject.org/api-reference/avail-nexus-sdk',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/availproject/nexus-sdk',
  },
  {
    id: 'twitter',
    label: 'X',
    href: 'https://x.com/AvailProject',
  },
]

const Links = () => {
  return (
    <div className="flex items-center gap-x-4">
      {SDK_LINKS.map((link, idx) => (
        <Fragment key={link.id}>
          <Link
            to={link.href}
            target="_blank"
            className="text-xl font-semibold text-muted-foreground hover:text-foreground"
          >
            {link.label}
          </Link>
          {idx < SDK_LINKS.length - 1 && (
            <Dot className="w-6 h-6 text-muted-foreground" />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Links
