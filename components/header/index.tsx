import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";

interface HeaderProps {
  title?: string;
  className?: string;
  searchQuery?: string;
  isSearching?: boolean;
  showSearch?: boolean;
  onSearchToggle?: () => void;
  setSearchQuery?: (query: string) => void;
}

const Header = ({ title, isSearching, className, showSearch, searchQuery, setSearchQuery, onSearchToggle }: HeaderProps) => {
  return (
    <header
      style={{ boxShadow: "0px 5px 5px -1px rgba(0,0,0,0.1)" }}
      className={`fixed top-0 left-0 right-0 z-10 bg-background ${className}`}
    >
      <div
        data-id="container"
        className="px-5 h-14 flex items-center justify-between"
      >
        
        <div
          data-id="logo-container"
          className="flex flex-row items-center  animate-jump"
        >
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="GTL Logo"
              width={30}
              height={30}
            />
             
            {!isSearching && (
              <div className="flex flex-row space-x-1 items-center">
                <h1 className="text-xl font-semibold text-white leading-none">
                  {title || "GTL"}
                </h1>
              </div>
            )}
          </Link>
          
        </div>
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

      </div>
    </header>
  );
};

export default Header;
