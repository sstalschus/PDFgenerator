const express = require("express")
const ejs = require("ejs")
const path = require("path")
const { response } = require("express")
const pdf = require("html-pdf")
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
app.get("/", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "print.ejs"),
    { passengers },
    (error, html) => {
      if (error) {
        return response.send("Erro na leitura do arquivo")
      }

      //options para o pdf
      const options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        },
      }

      pdf.create(html, options).toFile("report.pdf", (error, data) => {
        if (error) {
          return response.send("Erro ao gerar pdf")
        }
      })

      return res.send(html)
    }
  )
})

app.listen(3000)
