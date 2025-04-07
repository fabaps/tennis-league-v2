import { usePathname } from "next/navigation";

import ROUTES from "@/routes";

const useIsPrivateRoute = () => {
  const pathname = usePathname();
  const isPrivateRoute = !Boolean(
    Object.values(ROUTES).find((route) =>
      new RegExp(route.pathRgx).test(pathname)
    )?.public
  );

  return isPrivateRoute;
};

export default useIsPrivateRoute;
