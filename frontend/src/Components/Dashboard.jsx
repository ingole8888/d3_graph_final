import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Text } from '@chakra-ui/react'
import SectorChart from './AllCharts/SectorChart'
import CountryChart from './AllCharts/CountryChart'
import TopicChart from './AllCharts/TopicChart'
import EndYearChart from './AllCharts/EndYearChart'
import RegionChart from './AllCharts/RegionChart'
import SourceChart from './AllCharts/SourceChart'
import PestleChart from './AllCharts/PestleChart'

const Dashboard = () => {
  const url = 'https://graphs.onrender.com/data/getdata'

  const [allData, setAllData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [topicData, setTopicDATA] = useState([]);
  const [end_yearData, setEnd_yearDATA] = useState([]);
  const [regionData, setRegionDATA] = useState([]);
  const [pestleData, setPestleDATA] = useState([]);
  const [sourceData, setSourceDATA] = useState([]);

  const getCountries = () => {
    axios.get(`${url}`).then((response) => {
      const allCountries = response.data;
      setAllData(allCountries)
    })
  }
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      // Calculate total intensity across all countries
      const totalIntensity = allData.reduce((sum, country) => sum + country.intensity, 0);

      // Calculate sector lengths and intensities
      const sectorInfo = allData.reduce((accumulator, data) => {
        const sector = data.sector;
        accumulator.lengths[sector] = (accumulator.lengths[sector] || 0) + 1;
        accumulator.intensities[sector] = (accumulator.intensities[sector] || 0) + data.intensity;
        return accumulator;
      }, { lengths: {}, intensities: {} });

      // Calculate and log the percentage for each sector
      const sectorPercentages = {};
      for (const sector in sectorInfo.lengths) {
        sectorPercentages[sector] = (sectorInfo.intensities[sector] / totalIntensity) * 100;
      }
      setSectorData(sectorPercentages)

      // Calculate total intensity across all countries
      const countryInfo = allData.reduce((accumulator, data) => {
        const country = data.country;
        accumulator.lengths[country] = (accumulator.lengths[country] || 0) + 1;
        accumulator.intensities[country] = (accumulator.intensities[country] || 0) + data.intensity;
        return accumulator;
      }, { lengths: {}, intensities: {} });
      // Calculate and log the percentage for each country
      const countryPercentages = {};
      for (const country in countryInfo.lengths) {
        countryPercentages[country] = (countryInfo.intensities[country] / totalIntensity) * 100;
      }
      setCountryData(countryPercentages)

      // Calculate total intensity across all topic
      const topicInfo = allData.reduce((accumulator, data) => {
        const topic = data.topic;
        accumulator.lengths[topic] = (accumulator.lengths[topic] || 0) + 1;
        accumulator.intensities[topic] = (accumulator.intensities[topic] || 0) + data.intensity;
        return accumulator;
      }, { lengths: {}, intensities: {} });
      // Calculate and log the percentage for each topic
      const topicPercentages = {};
      for (const topic in topicInfo.lengths) {
        topicPercentages[topic] = (topicInfo.intensities[topic] / totalIntensity) * 100;
      }
      setTopicDATA(topicPercentages)

      // Calculate total intensity across all end_year
      const end_yearInfo = allData.reduce((accumulator, data) => {
        const end_year = data.end_year;
        accumulator.lengths[end_year] = (accumulator.lengths[end_year] || 0) + 1;
        accumulator.intensities[end_year] = (accumulator.intensities[end_year] || 0) + data.intensity;
        return accumulator;
      }, { lengths: {}, intensities: {} });
      // Calculate and log the percentage for each topic
      const end_yearPercentages = {};
      for (const end_year in end_yearInfo.lengths) {
        end_yearPercentages[end_year] = (end_yearInfo.intensities[end_year] / totalIntensity) * 100;
      }
      setEnd_yearDATA(end_yearPercentages)

      // Calculate total intensity across all region
      const regionInfo = allData.reduce((accumulator, data) => {
        const region = data.region;
        accumulator.lengths[region] = (accumulator.lengths[region] || 0) + 1;
        accumulator.intensities[region] = (accumulator.intensities[region] || 0) + data.intensity;
        return accumulator;
      }, { lengths: {}, intensities: {} });
      // Calculate and log the percentage for each region
      const regionPercentages = {};
      for (const region in regionInfo.lengths) {
        regionPercentages[region] = (regionInfo.intensities[region] / totalIntensity) * 100;
      }
      setRegionDATA(regionPercentages)

      // Calculate total intensity across all pestle
      const pestleInfo = allData.reduce((accumulator, data) => {
        const pestle = data.pestle;
        accumulator.lengths[pestle] = (accumulator.lengths[pestle] || 0) + 1;
        accumulator.intensities[pestle] = (accumulator.intensities[pestle] || 0) + data.intensity;
        return accumulator;
      }, { lengths: {}, intensities: {} });
      // Calculate and log the percentage for each pestle
      const pestlePercentages = {};
      for (const pestle in pestleInfo.lengths) {
        pestlePercentages[pestle] = (pestleInfo.intensities[pestle] / totalIntensity) * 100;
      }
      setPestleDATA(pestlePercentages)

            // Calculate total intensity across all source
            const sourceInfo = allData.reduce((accumulator, data) => {
              const source = data.source;
              accumulator.lengths[source] = (accumulator.lengths[source] || 0) + 1;
              accumulator.intensities[source] = (accumulator.intensities[source] || 0) + data.intensity;
              return accumulator;
            }, { lengths: {}, intensities: {} });
            // Calculate and log the percentage for each pestle
            const sourcePercentages = {};
            for (const source in sourceInfo.lengths) {
              sourcePercentages[source] = (sourceInfo.intensities[source] / totalIntensity) * 100;
            }
            setSourceDATA(sourcePercentages)

    }
  }, [allData]);
  return (
    <Box>
      <Text style={{fontWeight:"bold", fontSize:"2rem", padding:"1rem"}}>Data Filter according to Sector Data</Text>
      <SectorChart sectorData={sectorData}/>
      <Text style={{fontWeight:"bold", fontSize:"2rem", padding:"1rem"}}>Data Filter according to Country Data</Text>
      <CountryChart countryData={countryData} />
      <Text style={{fontWeight:"bold", fontSize:"2rem", padding:"1rem"}}>Data Filter according to Topic Data</Text>
      <TopicChart topicData={topicData}/>
      <Text style={{fontWeight:"bold", fontSize:"2rem", padding:"1rem"}}>Data Filter according to End-Yaer Data</Text>
      <EndYearChart end_yearData={end_yearData}/>
      <Text style={{fontWeight:"bold", fontSize:"2rem", padding:"1rem"}}>Data Filter according to Region Data</Text>
      <RegionChart regionData={regionData}/>
      <Text style={{fontWeight:"bold", fontSize:"2rem", padding:"1rem"}}>Data Filter according to Pestle Data</Text>
      <PestleChart pestleData={pestleData}/>
      <Text style={{fontWeight:"bold", fontSize:"2rem", padding:"1rem"}}>Data Filter according to Source Data</Text>
      <SourceChart sourceData={sourceData}/>
    </Box>
  )
}

export default Dashboard