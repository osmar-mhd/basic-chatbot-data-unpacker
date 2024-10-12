import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Only import Route and Routes
import DataUnpacker from './Section/DataUnpacker';

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<DataUnpacker />} />
        </Routes>
    );
}

export default Main;