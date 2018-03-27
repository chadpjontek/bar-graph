import * as d3 from "d3"
// response status
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
// json response
const json = response => {
  return response.json()
}
// make SVG responsive
const makeResponsive = (svg) => {
  const container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width"), 10),
    height = parseInt(svg.style("height"), 10),
    aspect = width / height,
    resize = () => {
    const targetWidth = parseInt(container.style("width"), 10)
    svg.attr("width", targetWidth)
    svg.attr("height", Math.round(targetWidth / aspect))
  }
  svg.attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize)
  d3.select(window).on("resize." + container.attr("id"), resize)
}
export { status, json, makeResponsive }