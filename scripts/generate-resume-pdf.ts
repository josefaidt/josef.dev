import * as fs from "node:fs/promises"
import * as path from "node:path"
import puppeteer from "puppeteer"

console.info("note: you should run this after a fresh build")

const browser = await puppeteer.launch({
  args: ["--allow-file-access-from-files", "--disable-web-security"],
})
const page = await browser.newPage()

const filePath = path.join(process.cwd(), "dist", "resume", "index.html")
const fileUrl = `file://${filePath}`

await page.goto(fileUrl, { waitUntil: "networkidle0" })

const outputPath = path.join("public", "josefaidt_resume.pdf")
await page.pdf({
  format: "A4",
  path: outputPath,
  printBackground: true, // Important for preserving background colors/images
  preferCSSPageSize: true, // Use CSS page size rather than the default
})

console.info(`generated pdf: ${outputPath}`)

await browser.close()
