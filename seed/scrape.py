import requests
import json
import random

results = []
prices = [10000, 20000, 30000, 40000, 50000]
url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODU2NDM3OTJlNTlhYjU1ZTEyMzM5ODM2YWRjOWEzMyIsIm5iZiI6MTcyNDE3MDg4OS43NTAyOTksInN1YiI6IjY2YzRjMDczNjkyMGU3NDc1YzI0ZGEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1RjvA7xVnv-Rg8OPXk1LSTWummkPrqT8t24KuQfCPm4"
}

response = requests.get(url, headers=headers)
data = response.json()

for movie in data['results']:
    movie_url = f"https://api.themoviedb.org/3/movie/{movie['id']}?language=en-US"
    credit_url = f"https://api.themoviedb.org/3/movie/{movie['id']}/credits?language=en-US"
    
    try:
        movie_response = requests.get(movie_url, headers=headers)
        credit_response = requests.get(credit_url, headers=headers)
        
        movie_details = movie_response.json()
        credit_details = credit_response.json()
        
        director = ""
        for crew in credit_details['crew']:
            if crew["job"] == "Director":
                director = crew["name"]
                break
        
        results.append({
            "title": movie_details.get("title", ""),
            "description": movie_details.get("overview", ""),
            "director": director,
            "release_year": movie_details.get("release_date", "").split("-")[0],
            "genre": [genre['name'] for genre in movie_details.get('genres', [])],
            "price": random.choice(prices),
            "duration": movie_details.get("runtime", ""),
            "cover_image_url": f"https://image.tmdb.org/t/p/w500{movie_details.get('poster_path', '')}",
            "video_url": "https://res.cloudinary.com/dxhqzio5h/video/upload/v1724099493/xjtdoe5fh5b4sp2jo6ys.mp4"
        })
    except requests.RequestException as e:
        print(f"Request failed: {e}")

# Write the dictionary to a JSON file
with open("result.json", "w") as json_file:
    json.dump(results, json_file, indent=4)

print("Response saved to result.json")
