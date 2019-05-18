// from data.js
var tableData = data;

// YOUR CODE HERE!
// get table by using D3 selector
var tbody = d3.select("tbody");

// get table and column name from td.
function outputTable(data){
  tbody.html("");
data.forEach((UFOReport) => {
    var row = tbody.append("tr");
    Object.entries(UFOReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

// uptate table with a new dataset
var submit = d3.selectAll("#filter-btn");

function filterData(){
d3.event.preventDefault();

var inputText = d3.select("#datetime").property("value");
var expectData = tableData.filter(row=>row.datetime ===inputText);

outputTable(expectData);
console.log(expectData);
}
// updateTable(data); 
submit.on("click", filterData);
submit.on("change", filterData);

// function myListChange(){
//   category = d3.select("#myList")
// }
 

