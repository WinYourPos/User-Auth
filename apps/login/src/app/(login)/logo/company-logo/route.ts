export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" role="img" aria-label="Genius logo">
  <defs>
    <style>
      .bg{fill:#253354}
      .gold{fill:#b19e70}
      .stroke{fill:none;stroke:#263355;stroke-width:6}
      .g{font-family:Arial,Helvetica,sans-serif;font-size:100px;fill:#263355;font-weight:700}
    </style>
  </defs>
  <rect width="100%" height="100%" class="bg"/>
  <g transform="translate(150,150)">
    <g transform="rotate(45)">
      <rect x="-70" y="-70" width="140" height="140" rx="18" class="gold"/>
      <rect x="-62" y="-62" width="124" height="124" rx="14" class="stroke"/>
    </g>
    <text x="0" y="18" text-anchor="middle" class="g">G</text>
  </g>
</svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}