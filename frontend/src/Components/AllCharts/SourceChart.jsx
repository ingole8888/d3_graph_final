import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@chakra-ui/react';

const RegionChart = ({ sourceData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (sourceData && Object.keys(sourceData).length > 0) {
      const svg = d3.select(chartRef.current);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 1300 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(Object.keys(sourceData))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(Object.values(sourceData))])
        .nice()
        .range([height, 0]);

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Color scale for regions

      const area = d3.area()
        .x(d => x(d[0]) + x.bandwidth() / 2)
        .y0(height)
        .y1(d => y(d[1]));

      svg.selectAll('.area')
        .data([Object.entries(sourceData)])
        .enter().append('path')
        .attr('class', 'area')
        .attr('fill', (d, i) => colorScale(i)) // Assign different colors to each region
        .attr('d', area);

      const xAxis = svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      const yAxis = svg.append('g')
        .call(d3.axisLeft(y));

      svg.selectAll('.tick line').remove(); // Remove tick lines for a cleaner appearance
    }
  }, [sourceData]);

  return (
    <Box style={{ margin: 'auto' }}>
      <svg ref={chartRef} style={{ width: '100%', height: '28rem' }}></svg>
    </Box>
  );
};

export default RegionChart;
