const express = require("express")
const ejs = require("ejs")
const path = require("path")
const puppeteer = require("puppeteer")
const { response } = require("express")
const app = express()

const passengers = [
  {
    name: "Samuel",
    flightNumber: 7859,
    time: "09:00",
  },
  {
    name: "Samara",
    flightNumber: 7859,
    time: "09:00",
  },
  {
    name: "Davi",
    flightNumber: 7859,
    time: "09:00",
  },
]

app.get("/pdf", async (req, res) => {
  //Com headless true o puppeteer não abre o navegador na tela
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto("http://localhost:3000/", {
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

app.get("/", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "print.ejs"),
    { passengers },
    (error, html) => {
      if (error) {
        return response.send("Erro na leitura do arquivo")
      }
      return res.send(html)
    }
  )
})

app.listen(3000)
