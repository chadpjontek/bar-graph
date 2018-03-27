import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3"
import { status, json, makeResponsive } from './helpers.js'

class App extends Component {
  componentDidMount() {
    fetch("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
      .then(status)
      .then(json)
      .then(data => {
        const jsonData = data.data,
          w = 1280,
          h = 600,
          padding = 60,
          formatTime = d3.timeFormat("%B %Y"),
          mindate = new Date(jsonData[0][0]),
          maxdate = new Date(jsonData[jsonData.length - 1][0])
        const xScale = d3.scaleTime()
          .domain([mindate, maxdate])
          .range([padding, w - padding])
        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(jsonData, d => d[1])])
          .range([h - padding, padding])
        const yAxis = d3.axisLeft(yScale),
          xAxis = d3.axisBottom(xScale)
        const svg = d3
          .select(".svg-container")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .call(makeResponsive)
        svg
          .selectAll("rect")
          .data(jsonData)
          .enter()
          .append("rect")
          .attr("x", d => xScale(new Date(d[0])))
          .attr("y", d => yScale(d[1]))
          .attr("height", (d) => h - padding - yScale(d[1]))
          .attr("width", (d) => Math.ceil(w / jsonData.length))
          .attr("class", "bar")
          .append('title')
          .text((d) => `$${d[1]} billion
${formatTime(new Date(d[0]))}`)
        svg
          .append("g")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis)
        svg
          .append("g")
          .attr("transform", `translate(${padding}, 0)`)
          .call(yAxis)
      })
  }
  render() {
    return (
      <div className="App">
        <h1>US Gross Domestic Product</h1>
        <div className="svg-container"></div>
      </div>
    )
  }
}

export default App
