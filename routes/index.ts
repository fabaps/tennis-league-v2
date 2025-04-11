const ROUTES = {
  AUTH: {
    path: "/auth",
    pathRgx: "^/auth",
    public: true,
  },
  EDITAR_PERFIL: {
    path: "/perfil/editar",
    pathRgx: "^/perfil/editar",
  },
  HOME: {
    path: "/",
    pathRgx: "^/$",
  },
  PERFIL: {
    path: "/perfil",
    pathRgx: "^/perfil",
  },
} as Record<
  string,
  {
    path: string;
    pathRgx: string;
    public?: boolean;
  }
>;

export default ROUTES;
