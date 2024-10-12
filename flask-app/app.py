from flask import Flask, request, jsonify
from flask_cors import CORS  # Importar CORS para permitir la comunicación entre el frontend y el backend

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir solicitudes desde tu frontend React

# Diccionario de respuestas
responses_dict = {
    "hola": "Hola, ¿cómo estás?",
    "ciudad": "CDMX",
    "comida": "Me gustan los tacos",
}

@app.route('/unpack', methods=['POST'])
def unpack_data():
    try:
        # Obtener los datos JSON del cuerpo de la solicitud
        data = request.json.get('data', [])
        
        # Validar que la lista no esté vacía
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Lógica para desempaquetar los datos
        unpacked_data = {f"Item {i+1}": item for i, item in enumerate(data)}

        return jsonify({'unpacked': unpacked_data}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Devolver el error en caso de que algo falle

@app.route('/response', methods=['POST'])
def get_response():
    # Obtener los datos JSON del cuerpo de la solicitud
    data = request.json
    input_text = data.get('text', '').strip().lower()  # Obtener y normalizar el texto ingresado

    # Buscar la respuesta en el diccionario
    response = responses_dict.get(input_text, "Lo siento, no entiendo la pregunta.")

    return jsonify({'response': response}), 200  # Devolver la respuesta

if __name__ == '__main__':
    app.run(debug=True)
