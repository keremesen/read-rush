import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ReadRush",
    short_name: "ReadRush",
    description: "Read at the speed of focus with a one-word-at-a-time RSVP reader.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fc",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
