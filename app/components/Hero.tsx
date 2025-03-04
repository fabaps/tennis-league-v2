import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">Join the Premium Tennis League</h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto">
          Compete against skilled players, get an automatic skill score, and participate in exclusive tournaments.
        </p>
        <div className="mt-10">
          <Button size="lg" variant="secondary">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}

