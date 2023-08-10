import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@chakra-ui/react';

const EndYearChart = ({ end_yearData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (end_yearData && Object.keys(end_yearData).length > 0) {
      const svg = d3.select(chartRef.current);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 1300 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(Object.keys(end_yearData))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(Object.values(end_yearData))])
        .nice()
        .range([height, 0]);

      const xAxis = svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      const yAxis = svg.append('g')
        .call(d3.axisLeft(y));

      const bars = svg.selectAll('.bar')
        .data(Object.entries(end_yearData))
        .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', d => `translate(${x(d[0])},0)`)
        //.style('display', d => (d[1] < 1) ? 'none' : 'block'); 

      bars.append('rect')
        .attr('y', d => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d[1]));

      bars.append('text')
        .attr('x', x.bandwidth() / 2)
        .attr('y', d => y(d[1]) - 4)
        .attr('text-anchor', 'middle')
        .text(d => `${d[1].toFixed(2)}%`)
        //.style('display', d => (d[1] < 1) ? 'none' : 'block'); // Hide percentage text for data less than 1%

      bars.append('text')
        .attr('x', x.bandwidth() / 2)
        .attr('y', height + margin.bottom - 4)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(d => d[0])
        // .style('display', d => (d[1] < 1) ? 'none' : 'block'); // Hide country name for data less than 1%
    }
  }, [end_yearData]);

  return (
    <Box style={{ margin: 'auto' }}>
      <svg ref={chartRef} style={{ width: '100%', height: '28rem' }}></svg>
    </Box>
  );
};

export default EndYearChart;
