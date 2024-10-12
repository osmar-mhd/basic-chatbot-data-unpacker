import React, { useState } from 'react';
import '../../assets/css/section.css';

function DataUnpacker() {
  const [inputData, setInputData] = useState('');
  const [unpackedData, setUnpackedData] = useState([]);
  const [encryptedWords, setEncryptedWords] = useState({}); // Para guardar las palabras cifradas

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/unpack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData.split(' ') }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setUnpackedData(Object.entries(result.unpacked)); // Guardar los datos desempaquetados como un arreglo de entradas
    } catch (error) {
      console.error('Error fetching data:', error);
      setUnpackedData([]); // Limpiar los datos en caso de error
    }
  };

  const handleEncrypt = async (word) => {
    try {
      const response = await fetch('/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }), // Enviar la palabra seleccionada
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setEncryptedWords((prev) => ({ ...prev, [word]: result.encrypted })); // Guardar la palabra cifrada
    } catch (error) {
      console.error('Error encrypting word:', error);
    }
  };

  return (
    <section>
      <h1>Unpack Data</h1>
      <form onSubmit={handleSubmit}>
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
          <table>
            <thead>
              <tr>
                <th>Palabra</th>
                <th>Acciones</th>
                <th>Palabra Cifrada</th>
              </tr>
            </thead>
            <tbody>
              {unpackedData.map(([key, value], index) => (
                <tr key={index}>
                  <td>{value}</td>
                  <td>
                    <button onClick={() => handleEncrypt(value)}>
                      Cifrar
                    </button>
                  </td>
                  <td>
                    {encryptedWords[value] && (
                      <span>
                        {encryptedWords[value]}
                      </span>
                    )}
                  </td>
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