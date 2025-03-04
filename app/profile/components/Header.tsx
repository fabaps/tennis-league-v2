import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-center">
        <Link href="/" className="font-semibold text-xl text-green-700">
          Liga de Tenis GT
        </Link>
      </div>
    </header>
  )
}

