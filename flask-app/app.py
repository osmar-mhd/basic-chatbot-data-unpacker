from flask import Flask, request, jsonify
from flask_cors import CORS  # Importar CORS para permitir la comunicación entre el frontend y el backend

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir solicitudes desde tu frontend React

@app.route('/unpack', methods=['POST'])
def unpack_data():
    try:
        # Obtener los datos JSON del cuerpo de la solicitud
        data = request.json.get('data', [])
        
        # Validar que la lista no esté vacía
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Lógica para desempaquetar los datos (en este caso solo devolver los mismos datos como ejemplo)
        unpacked_data = {f"Item {i+1}": item for i, item in enumerate(data)}

        return jsonify({'unpacked': unpacked_data}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Devolver el error en caso de que algo falle

if __name__ == '__main__':
    app.run(debug=True)