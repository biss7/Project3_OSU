// Pull json data from Flask API
let all_data_url = "http://127.0.0.1:5000/chicago";
let comm_by_crime_url = "http://127.0.0.1:5000/community_by_crime";
let crime_by_comm_url = "http://127.0.0.1:5000/crime_by_community";
let crime_by_time_url = "http://127.0.0.1:5000/crime_by_time";


// Map all chicago data
d3.json(all_data_url).then(function(all_data){
    
    // Initializing a map object
    let all_data_map = L.map("chart-content").setView([41.8781, -87.6298], 10);

    // Adding a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(all_data_map);

    // Adding markers for each datapoint
    for (let i=0; i<all_data.length; i++){
        let lat = all_data[i]["latitude"];
        let lon = all_data[i]["longitude"];
        let comm = all_data[i]["community_area"];
        let arrest = all_data[i]["arrest"];
        let time = all_data[i]["occurance_time"];
        let type = all_data[i]["primary_type"];
        let desc = all_data[i]["description"];
        let location = all_data[i]["location_description"];
        L.marker([lat,lon])
        .bindPopup(`<p><strong>Community:</strong> ${comm}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Crime Type:</strong> ${type}</p>
                    <p><strong>Description:</strong> ${desc}</p>
                    <p><strong>Arrest:</strong> ${arrest}</p>`)
        .addTo(all_data_map);
    };

 });



 d3.json(comm_by_crime_url).then(function(comm_by_crime_data){

    // Assign HTML elements to variables
    const commSelector = document.getElementById("communitySelector");
    const commCanvas = document.getElementById("communityChart").getContext("2d");

    // Create a list of dictionaries to hold the data for reference in the Chart.js code
    const commOptions = [];
    for (c=0; c<comm_by_crime_data.length; c++){
        let comm = comm_by_crime_data[c]["_id"];
        let commdata = [];
        let commlabels = [];

        for (d=0; d<comm_by_crime_data[c]["crime"].length; d++){
            commdata.push(comm_by_crime_data[c]["crime"][d]["count"]);
            commlabels.push(comm_by_crime_data[c]["crime"][d]["type"]);
        };

        commOptions.push({label: comm, data: commdata, labels: commlabels});
    };

    // Populate dropdown values
    commOptions.forEach(function(option, index){
        const optionElement = document.createElement("option");
        optionElement.text = option.label;
        optionElement.value = index.toString();
        commSelector.appendChild(optionElement);
    });

    // Create Chart.js bar chart
    let commChart = new Chart(commCanvas,{
        type: "bar",
        data: {
            labels: commOptions[0].labels,
            datasets: [
                {
                    label: "Number of Crimes in Community " + commOptions[0].label,
                    data: commOptions[0].data,
                    backgroundColor: "rgba(74, 189, 219, 0.55)",
                    borderColor: "rgba(74, 189, 219, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                },
            },
        },
    });

    // Watch for changes in the dropdown and repopulate the chart
    commSelector.addEventListener("change", function(){
        const selectedIndex = parseInt(commSelector.value);
        const selectedData = commOptions[selectedIndex];

        commChart.data.datasets[0].label = "Number of Crimes in Community " + selectedData.label;
        commChart.data.datasets[0].data = selectedData.data;
        commChart.data.labels = selectedData.labels;

        commChart.update();
    });
 });



 d3.json(crime_by_comm_url).then(function(crime_by_comm_data){

    // Assign HTML elements to variables
    const crime1Selector = document.getElementById("crime1Selector");
    const crime1Canvas = document.getElementById("crime1Chart").getContext("2d");

    // Create a list of dictionaries to hold the data for reference in the Chart.js code
    const crime1Options = [];
    for (c=0; c<crime_by_comm_data.length; c++){
        let crime1 = crime_by_comm_data[c]["_id"];
        let crime1data = [];
        let crime1labels = [];

        for (d=0; d<crime_by_comm_data[c]["communities"].length; d++){
            crime1data.push(crime_by_comm_data[c]["communities"][d]["count"]);
            crime1labels.push(crime_by_comm_data[c]["communities"][d]["community"]);
        };

        crime1Options.push({label: crime1, data: crime1data, labels: crime1labels});
    };

    // Populate dropdown values
    crime1Options.forEach(function(option, index){
        const optionElement = document.createElement("option");
        optionElement.text = option.label;
        optionElement.value = index.toString();
        crime1Selector.appendChild(optionElement);
    });

    // Create Chart.js bar chart
    let crime1Chart = new Chart(crime1Canvas,{
        type: "bar",
        data: {
            labels: crime1Options[0].labels,
            datasets: [
                {
                    label: "Number of " + crime1Options[0].label + " Occurrences per Community",
                    data: crime1Options[0].data,
                    backgroundColor: "rgba(236, 152, 159, 0.55)",
                    borderColor: "rgba(236, 152, 159, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                },
            },
        },
    });

    // Watch for changes in the dropdown and repopulate the chart
    crime1Selector.addEventListener("change", function(){
        const selectedIndex = parseInt(crime1Selector.value);
        const selectedData = crime1Options[selectedIndex];

        crime1Chart.data.datasets[0].label = "Number of " + selectedData.label + " Occurrences per Community";
        crime1Chart.data.datasets[0].data = selectedData.data;
        crime1Chart.data.labels = selectedData.labels;

        crime1Chart.update();
    });
 });



 d3.json(crime_by_time_url).then(function(crime_by_time_data){

    // Assign HTML elements to variables
    const crime2Selector = document.getElementById("crime2Selector");
    const crime2Canvas = document.getElementById("crime2Chart").getContext("2d");

    // Create a list of dictionaries to hold the data for reference in the Chart.js code
    const crime2Options = [];
    for (c=0; c<crime_by_time_data.length; c++){
        let crime2 = crime_by_time_data[c]["_id"];
        let crime2data = [];
        let crime2labels = [];

        for (d=0; d<crime_by_time_data[c]["times"].length; d++){
            crime2data.push(crime_by_time_data[c]["times"][d]["count"]);
            crime2labels.push(crime_by_time_data[c]["times"][d]["time"]);
        };

        crime2Options.push({label: crime2, data: crime2data, labels: crime2labels});
    };

    // Populate dropdown values
    crime2Options.forEach(function(option, index){
        const optionElement = document.createElement("option");
        optionElement.text = option.label;
        optionElement.value = index.toString();
        crime2Selector.appendChild(optionElement);
    });

    // Create Chart.js bar chart
    let crime2Chart = new Chart(crime2Canvas,{
        type: "bar",
        data: {
            labels: crime2Options[0].labels,
            datasets: [
                {
                    label: "Number of " + crime2Options[0].label + " Occurrences per Time Slot",
                    data: crime2Options[0].data,
                    backgroundColor: "rgba(208, 169, 116, 0.55)",
                    borderColor: "rgba(208, 169, 116, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                },
            },
        },
    });

    // Watch for changes in the dropdown and repopulate the chart
    crime2Selector.addEventListener("change", function(){
        const selectedIndex = parseInt(crime2Selector.value);
        const selectedData = crime2Options[selectedIndex];

        crime2Chart.data.datasets[0].label = "Number of " + selectedData.label + " Occurrences per Time Slot";
        crime2Chart.data.datasets[0].data = selectedData.data;
        crime2Chart.data.labels = selectedData.labels;

        crime2Chart.update();
    });

 });
