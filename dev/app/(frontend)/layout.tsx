import { Domine, Outfit } from "next/font/google";
import { clsx } from "clsx";
import './globals.css'

const domine = Domine({
  subsets: ['latin'],
  variable: '--font-domine',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html
        className={clsx(domine.variable, outfit.variable)}
        lang="en"
        dir="ltr"
        suppressHydrationWarning
      >
        <body className="px-4">
          <nav>
            <a href="/">Home</a> | <a href="/admin">Admin</a>
          </nav>
          <hr />
          {children}
        </body>
      </html>
    )
  }
  