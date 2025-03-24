import { useEffect } from "react";

interface SearchScrollProps {
  searchWalletIndex?: number;
}
export const useSearchScroll = ({ searchWalletIndex }: SearchScrollProps) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 70 * (searchWalletIndex || 0),
        behavior: "smooth",
      });
    }, 300);
  }, [searchWalletIndex]);
};
