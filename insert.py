from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['certificates_db']
collection = db['certificates']

# Sample document
certificate_data = {
    "certificate_id": "zidio/00001",
    "name": "John Doe",
    "position": "Software Engineer",
    "start_date": "2024-07-01",
    "end_date": "2024-10-01",
    "issue_date": "2024-06-30"
}

# Insert document
collection.insert_one(certificate_data)
print("Sample document inserted.")
