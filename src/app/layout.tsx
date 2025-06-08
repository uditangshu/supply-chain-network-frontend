import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Supply Chain Management - Hyperledger Fabric',
  description: 'A blockchain-based supply chain management system using Hyperledger Fabric',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Supply Chain Management</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm bg-blue-500 px-3 py-1 rounded">
                  Hyperledger Fabric
                </span>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Supply Chain Management System. Powered by Hyperledger Fabric.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 