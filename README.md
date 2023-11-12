# Project3_OSU

## Data Retrieval
Using Python, crime data is retrieved from the City of Chicago's Data Portal API. The data is housed in a MongoDB database using PyMongo.

## Data Cleaning
Crime data that is missing community areas, latitudes, or longitudes are removed. Date and time values are split into key-value pairs. Crimes are filtered for crimes that occurred in the last full day of reporting. Community area numbers are reformatted.

## Data Grouping and Sorting
Additional key-value pairs are created for categorizing times into time slots. Data is then grouped, sub-grouped, and sorted by:
* Community area > Crime
* Crime > Community area
* Crime > Time slot
Each grouping was saved as a new collection in the database.

## API Creation
Using Python, the new collections created in the database are accessed. A function is defined to change the format of a collection to JSON format. A Flask API was created with routes for each collection.

## Dashboard
The d3.js library is used to access the JSON data from the Flask API. The Leaflet.js library is used to create a map with markers and popups. The Charts.js library is used to create bar charts with dropdown options. 
Users can interact with the map by zooming in and out, grabbing and moving the map center, and clicking markers for more information on the data. Users can interact with the bar charts by selecting options from the dropdowns and hovering over the bars for more data information.
