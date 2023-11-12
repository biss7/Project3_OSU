# Import dependencies and libraries
from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS

# Make sure to pip install flask-cors in your terminal if you haven't already


#############################################################################
# ACCESS THE DATABASE AND COLLECTIONS CREATED VIA THE JUPYTER NOTEBOOK FILE #
#############################################################################

# Create an instance of MongoClient
mongo = MongoClient(port=27017)

# Assign the database to a variable name
db = mongo["crimes"]

# Assign the collections to variable names
chicago = db["chicago"]
comm_by_crime = db["chicago_community_by_crime"]
crime_by_comm = db["chicago_crime_by_community"]
crime_by_time = db["chicago_crime_by_time"]


#############################################################################
# FLASK SETUP AND ROUTES                                                    #
#############################################################################

app = Flask(__name__)

CORS(app)

# Define a function to convert the collection data to a readable JSON format
def json_convert(collection):
    collection_data = collection.find()
    json_data = []
    for document in collection_data:
        document["_id"] = str(document["_id"])
        json_data.append(document)
    return jsonify(json_data)


@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    date = chicago.find().distinct("occurance_date")
    return(f"AVAILABLE ROUTES FOR {date[0]} CHICAGO CRIMES:<br/>"
           f"All crime data - /chicago<br/>"
           f"Crime data grouped by community, with crime type subgroups - /community_by_crime<br/>"
           f"Crime data grouped by crime type, with community subgroups - /crime_by_community<br/>"
           f"Crime data grouped by crime type, with time of day subgroups - /crime_by_time<br/>"
           )

@app.route("/chicago")
def alldata():
    print("Server received request for all crime data...")
    return json_convert(chicago)

@app.route("/community_by_crime")
def commbycrime():
    print("Server received request for community by crime...")
    return json_convert(comm_by_crime)

@app.route("/crime_by_community")
def crimebycomm():
    print("Server received request for crime by community...")
    return json_convert(crime_by_comm)

@app.route("/crime_by_time")
def crimebytime():
    print("Server received request for crime by time...")
    return json_convert(crime_by_time)



if __name__ == "__main__":
    app.run(debug=True)
