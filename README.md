# Basic Chatbot Data Unpacker

This project is a simple chatbot that unpacks text data and provides predefined responses based on the user's input. It utilizes Flask for the backend and React for the frontend.

![Python 3.12.3](https://img.shields.io/badge/python-3.9-blue.svg?style=plastic)
![Flask 3.0.3](https://img.shields.io/badge/flask-2.0-blue.svg?style=plastic)
![React 18](https://img.shields.io/badge/react-18.0-blue.svg?style=plastic)
![Webpack 5.90.1](https://img.shields.io/badge/webpack-5.90.1-blue.svg?style=plastic)

![Teaser image](./basic-chatbot-data-unpacker.png)
**Picture:** *Picture: The image shows how the system unpacks text data and processes responses.*

## How it works
1. **User Input**: The user types in a query, which gets sent to the Flask backend via a POST request.
2. **Data Unpacking**: The backend splits the input text into individual words and processes them.
3. **Response Lookup**: Each word is checked against a predefined dictionary of responses, returning the appropriate message.
4. **Display**: The frontend receives the unpacked words and their corresponding responses, displaying them in a table.
