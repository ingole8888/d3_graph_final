const express = require("express");

const dataModel = require("../model/samplemodel");

const dataController = express.Router();

dataController.get("/getdata", async (req, res) => {

    const { end_year, sector, topic, region, country, pestle, source,
        intensity, insight, url, start_year, impact, added, 
        published, relevance, title, likelihood } = req.body;

    try {
        const filter = {}

        if (end_year) {
            filter.end_year = end_year
        }
        if (region) {
            filter.region = region
        }
        if (topic) {
            filter.topic = topic
        }
        if (sector) {
            filter.sector = sector
        }
        if (pestle) {
            filter.pestle = pestle
        }
        if (source) {
            filter.pestle = pestle
        } 
        if (country) {
            filter.pestle = pestle
        } 
        //city && SWOT
        const data = await dataModel.find(filter);
        res.send(data);

    } catch (error) {
        res.send(error.message)
    }
});


dataController.put("/update/:id", async (req, res) => {
  const id = req.params.id
  try {
    const rag = await dataModel.findByIdAndUpdate(id,
      {
        $set: req.body,
      },
      { new: true })
    res.status(200).send(rag)
  } catch (error) {
    res.send(error)
  }
})


dataController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  try {
    const data = await dataModel.findByIdAndRemove(id)
  res.send(data)
  } catch (error) {
    res.send(error)
  }
})

module.exports = dataController;
