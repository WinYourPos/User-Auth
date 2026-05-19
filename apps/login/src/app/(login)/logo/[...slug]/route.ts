import fs from "fs/promises";
import path from "path";

export async function GET(_req: Request, context: { params: Promise<{ slug: string[] }> }) {
  try {
    const paramsObj = await context.params;
    const slugParts = paramsObj?.slug || [];
    if (!slugParts.length) return new Response("Not found", { status: 404 });

    const slugKey = slugParts.join("/");
    const slugNoExt = slugKey.replace(/\.svg$/i, "");

    let fileName = slugKey;
    // if no extension, assume .svg
    if (!path.extname(fileName)) {
      fileName = `${fileName}.svg`;
    }

    if (slugNoExt === "company-logo") {
      fileName = "company-logo.svg";
    }

    const filePath = path.join(process.cwd(), "public", "logo", fileName);
    const data = await fs.readFile(filePath, { encoding: "utf8" });

    return new Response(data, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response("Not found", { status: 404 });
  }
}
