import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='py-4'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-x-3 gap-y-1 text-center text-sm text-muted-foreground sm:flex-row'>
        <p>Next Clerk &copy;{new Date().getFullYear()}. All rights reserved.</p>
        <p className='text-xs'>
          Developed by{' '}
          <Link
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary transition-colors hover:text-accent-foreground'
            href='https://portfolio.sumona.tech/'
          >
            Studio H
          </Link>
        </p>
      </div>
    </footer>
  )
}