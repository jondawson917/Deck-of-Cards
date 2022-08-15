from flask import Flask, render_template, request, jsonify
import requests, random

app = Flask(__name__)
API_BASE_URL = "http://numbersapi.com/"




@app.route("/", methods=["GET"])
def homepage():
    """Show homepage."""
        
    return render_template("index.html")

@app.route('/api/lucky-num', methods=["POST"])
def process_json():
    
    data = request.json
    print(data)
    if data['Errors']:
        print(jsonify(data['Errors']))
        return jsonify(data['Errors'], 201)
    else:
        fun_fact = {}
        name = data['name']    
        email = data['email']
        year = data['year']
        color = data['color']
    
        random_number = int(random.random()*100)
        num_fact = requests.get(f'http://numbersapi.com/{random_number}').text
        year_fact = requests.get(f'http://numbersapi.com/{year}/year').text
    
        person = {"name": name, "email": email, "year": year, "color": color}
        fun_fact = {"num": {"fact": num_fact, "num": random_number}, "year": {"fact": year_fact, "year": year}} 
        return jsonify(fun_fact, 201)
    