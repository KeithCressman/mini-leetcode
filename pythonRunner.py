from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/execute', methods=['POST'])
def execute_code():
    starterCode = 'locations = [(1, \"Under the utensils in the kitchen\"),  (4, \"Nowhere\"), (5, \"Top left shelf of the dental cabinet\"), (99, \"Underneath the globe\"), (7, \"At the neighbor\'s house\"), (2, \"Under your old bed\"), (3, \"in the box of curiousities\"), (4, \"In the microwave\")]\n'
    userCode = request.json.get('code', '')
    if "print" in userCode:
        raise Exception("You are not allowed to print anything from within your method")
    lastLines = '\noutput = find_highest_location(locations)\nprint(output)'
    code = starterCode + userCode 
    code += '\noutput = find_highest_location(locations)'
    code += '\nif (output == locations[3][1]):\n\tprint(\"Correct! Your gift is at this location: \" + locations[3][1])\nelse:\n\tprint(\"Incorrect. Try again\")'
    print(code)

    try:
        result = subprocess.check_output(['python', '-c', code], text=True, stderr=subprocess.STDOUT)
        return jsonify({'output': result})
    except subprocess.CalledProcessError as e:
        return jsonify({'output': f'Error: {e.output}'})

if __name__ == '__main__':
    app.run(debug=True)
