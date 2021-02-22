const express = require("express")
const ejs = require("ejs")
const path = require("path")
const puppeteer = require("puppeteer")
const app = express()

app.get("/:link", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  let link = req.params.link

  link = "https://" + link

  await page.goto(link, {
    waitUntil: "networkidle0",
  })

  const pdf = await page.pdf({
    printBackground: true,
    format: "Letter",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px",
    },
  })

  await browser.close()

  res.contentType("application/pdf")

  return res.send(pdf)
})

app.listen(3003)
