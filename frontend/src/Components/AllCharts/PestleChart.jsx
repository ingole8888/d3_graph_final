import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@chakra-ui/react';

const PestleChart = ({ pestleData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (pestleData && Object.keys(pestleData).length > 0) {
      const svg = d3.select(chartRef.current);

      const width = 1000;
      const height = 800;
      const radius = Math.min(width, height) / 2;

      const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const color = d3.scaleOrdinal()
        .domain(Object.keys(pestleData))
        .range(d3.schemeCategory10);

      const data = Object.entries(pestleData).map(([key, value]) => ({ key, value }));

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const arcs = g.selectAll('.arc')
        .data(pie(data))
        .enter().append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', arc)
        .style('fill', d => color(d.data.key));

      // Add text labels with percentages
      arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '.35em')
        .style('text-anchor', 'middle')
        .text(d => `${d.data.value.toFixed(2)}%`);

      // Add legend
      const legend = svg.selectAll('.legend')
        .data(Object.keys(pestleData))
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`);

      legend.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', d => color(d));

      legend.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .text(d => d);
    }
  }, [pestleData]);

  return (
   <Box style={{margin:"auto"}}>
     <svg ref={chartRef} style={{width:"100%", height:"50rem"}}></svg>
   </Box>
  );
};

export default PestleChart;
