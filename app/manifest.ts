import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GTL",
    short_name: "GTL",
    description: "Aplicación de la liga de tenis de Guatemala",
    start_url: "/",
    display: "standalone",
    background_color: "#245A4C",
    theme_color: "#245A4C",
    icons: [
      {
        src: "images/icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "images/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
