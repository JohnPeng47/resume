import Link from "next/link"

export default function NavBar() {
  return (
    <nav className="bg-gray-200 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-black text-xl font-semibold">
              Thoughts Untethered
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Blog
              </Link>
              <Link href="/resume" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 