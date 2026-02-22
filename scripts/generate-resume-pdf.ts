import * as http from "node:http"
import * as path from "node:path"
import { readFile } from "node:fs/promises"
import puppeteer from "puppeteer"

console.info("Starting PDF generation from built site...")

// Create a simple HTTP server to serve the dist folder
// This ensures CSS, fonts, and assets load correctly
const distPath = path.join(process.cwd(), "dist")
const server = http.createServer(async (req, res) => {
  try {
    let filePath = path.join(distPath, req.url === "/" ? "index.html" : req.url!)

    // Handle /resume route
    if (req.url === "/resume" || req.url === "/resume/") {
      filePath = path.join(distPath, "resume", "index.html")
    }

    const content = await readFile(filePath)

    // Set appropriate content type
    const ext = path.extname(filePath)
    const contentTypes: Record<string, string> = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
    }

    res.writeHead(200, { "Content-Type": contentTypes[ext] || "text/plain" })
    res.end(content)
  } catch (_error) {
    res.writeHead(404)
    res.end("Not found")
  }
})

const PORT = 8765
server.listen(PORT)
console.info(`Local server started on http://localhost:${PORT}`)

try {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })

  const page = await browser.newPage()

  // Emulate print media to match browser print styles
  await page.emulateMediaType("print")

  const url = `http://localhost:${PORT}/resume`
  console.info(`Loading ${url}...`)

  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 30000
  })

  const outputPath = path.join(distPath, "josefaidt_resume.pdf")

  await page.pdf({
    format: "A4",
    path: outputPath,
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  })

  console.info(`✓ PDF generated: ${outputPath}`)

  await browser.close()
} catch (err) {
  console.error("Error generating PDF:", err)
  process.exit(1)
} finally {
  server.close()
  console.info("Server closed")
}
