// CodeBoiler component enhanced for better boilerplate generation - Sept 2024
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodeBoiler - API Code Generator',
  description: 'Generate production-ready API integration code',
  icons: {
    icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234583d3' stroke-width='2'%3e%3cpath d='M7 8l-4 4l4 4'/%3e%3cpath d='M17 8l4 4l-4 4'/%3e%3cpath d='M14 4l-4 16'/%3e%3c/svg%3e",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
