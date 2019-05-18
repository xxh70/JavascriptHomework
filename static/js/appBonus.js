// from data.js
var tableData = data;

var tbody = d3.select("tbody");

function table(data) {
  tbody.html(""); // make table body empty
  data.forEach((dataRow) => {
    var row = tbody.append("tr");
    Object.values(dataRow).forEach((val) => {
      var ufoInfo = row.append("td");
        ufoInfo.text(val);
      });
  });
}

function buttonClick() {
	// prevent to browser fresh everytime click button.
	d3.event.preventDefault();
	// select table column names from html file with d3 select function
	// make variable with it.
	var date = d3.select("#myValueList").property("value");
	var category = d3.select("#myList").property("value");
	// filter table with category
	var filteredData = tableData;
	if (date) {
		//filteredData = filteredData.filter(row => row.datetime === date);
		filteredData = filteredData.filter(row => row[category] === date);
	}
	table(filteredData);
}

//update table with a new dataset
d3.selectAll("#filter-btn").on("click", buttonClick);
table(tableData);

function myListChanged(){
	
	category = d3.select("#myList").property("value");

	//try to group each data filtered by a catagory. for example, country will be two results in the group.
	// group in d3, use d3.nest(), group by each row of the category. 'd' means row. 
	prepared_list_by_category=d3.nest().key(function(d){return d[category]}).entries(tableData);
	
	//make myvalueList empty in HTML file,  before change to another catagory.
	d3.select('#myValueList').html('');
	
	prepared_list_by_category.forEach(row => { //row means the list in the each item.
		d3.select('#myValueList') 
			.append("option")     //add option in html file. can check in the inspect html file. 
			.attr('value',row.key)  //it means attribute in the option ，can check in the inspect html file too. value is the name in the attribute, key of the item.
			.text(row.key); //This value is same in the client site. 
	});
}

d3.select('#myList').on("change",myListChanged);

d3.select('#myValueList').on("change",buttonClick); //don't need to click button. it will change by select new input.

