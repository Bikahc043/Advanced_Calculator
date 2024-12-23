from flask import Flask, request, jsonify
from flask_cors import CORS
from sympy import symbols, sin, cos, tan, pi, simplify, latex

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Advanced Calculator API!"

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    operation = data.get('operation')
    a = data.get('a')  # First input
    b = data.get('b')  # Second input (if applicable)

    try:
        # Basic Arithmetic Operations
        if operation == "add":
            result = a + b
        elif operation == "subtract":
            result = a - b
        elif operation == "multiply":
            result = a * b
        elif operation == "divide":
            result = a / b if b != 0 else "Infinity"

        # Trigonometric Operations
        elif operation == "sin":
            angle = (a * pi) / 180  # Convert degrees to radians
            result = latex(simplify(sin(angle)))  # Simplify and return as LaTeX
        elif operation == "cos":
            angle = (a * pi) / 180
            result = latex(simplify(cos(angle)))
        elif operation == "tan":
            angle = (a * pi) / 180
            result = latex(simplify(tan(angle)))

        # Unsupported operation
        else:
            return jsonify({"error": "Unsupported operation"}), 400
        
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
