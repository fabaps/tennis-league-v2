import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Bell } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearchToggle?: () => void;
  isSearching?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  className?: string;
  isHomePage?: boolean;
}

export default function Header({
  title,
  showSearch = false,
  onSearchToggle,
  isSearching,
  searchQuery,
  setSearchQuery,
  className = "bg-[#245A4C]",
  isHomePage = false,
}: HeaderProps) {
  const { getCurrentUser, logout } = useAuthStore();
  const user = getCurrentUser();

  return (
    <header
      className={`shadow-sm fixed top-0 left-0 right-0 z-10 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1cf5f92e-5e26-41b6-815e-3493a942424c_removalai_preview_edited-ffpgDzMtzo9lF0IyY4cT18mb3gCTjj.png"
              alt="GTL Logo"
              width={40}
              height={40}
              className="mr-3"
            />
            {!isSearching && (
              <h1 className="text-xl font-bold text-white">
                {title || "Bienvenido a GTL"}
              </h1>
            )}
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {showSearch && (
            <>
              <Input
                type="text"
                placeholder="Buscar jugador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                className={`transition-all duration-300 bg-[#1e4a3f]/50 border-[#1e4a3f] text-white placeholder:text-gray-300 focus:border-[#1e4a3f] focus:ring-1 focus:ring-[#1e4a3f] ${
                  isSearching ? "w-full md:w-96" : "w-0 p-0 border-0"
                }`}
              />
              <Button
                onClick={onSearchToggle}
                variant="outline"
                size="icon"
                className="bg-[#1e4a3f] border-[#1e4a3f] text-white hover:bg-[#183b32] hover:text-white hover:border-[#183b32] transition-colors"
              >
                {isSearching ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </>
          )}

          {isHomePage && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#1e4a3f] hover:text-white"
            >
              {/* <Bell className="h-5 w-5" /> */}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
