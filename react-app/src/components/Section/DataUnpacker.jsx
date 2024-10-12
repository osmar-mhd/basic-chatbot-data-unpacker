import React, { useState } from 'react';
import '../../assets/css/section.css';

function DataUnpacker() {
  const [inputData, setInputData] = useState('');
  const [unpackedData, setUnpackedData] = useState([]); // Para guardar los datos desempaquetados

  const handleUnpack = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/unpack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData.split(' ') }), // Enviar los datos como un arreglo
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      const unpackedItems = Object.entries(result.unpacked);

      // Obtener respuestas para cada palabra
      const responses = await Promise.all(unpackedItems.map(async ([key, value]) => {
        const response = await fetch('/response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }), // Enviar la palabra para obtener la respuesta
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        return { key, value, respuesta: result.response }; // Retornar la palabra y su respuesta
      }));

      setUnpackedData(responses); // Guardar los datos desempaquetados con respuestas
    } catch (error) {
      console.error('Error fetching data:', error);
      setUnpackedData([]); // Limpiar los datos en caso de error
    }
  };

  return (
    <section>
      <h1>Basic Chatbot Unpack Data</h1>
      <form onSubmit={handleUnpack}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Ingresar texto separado por espacio"
        />
        <button type="submit">Aceptar</button>
      </form>

      {unpackedData.length > 0 && (
        <div>
          <h2>Datos Desempaquetados</h2>
          <table>
            <thead>
              <tr>
                <th>Ítem</th>
                <th>Palabra</th>
                <th>Respuesta</th>
              </tr>
            </thead>
            <tbody>
              {unpackedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                  <td>{item.respuesta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default DataUnpacker;