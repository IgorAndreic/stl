import React, { useState } from 'react';
import ModelSTL from './ModelSTL';
import TextToSTLForm from './TextToSTLForm';
import './css/ModelView.css';

const ModelView = () => {
    const [url, setUrl] = useState(null);
    const normalMapUrl = "textura.png"; // Normal map texture URL

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUrl(url);
        }
    };

    return (
        <div className="container">
            <div className="text-to-stl-form">
                <h1>STL Creator</h1>
                <TextToSTLForm setUrl={setUrl} />
            </div>
            <div className="model-view">
                <h1>STL Viewer</h1>
                <div className="file-upload">
                    <label htmlFor="file-input">
                        <img src="downloading.svg" alt="Upload Icon" className="upload-icon" />
                    </label>
                    <input id="file-input" type="file" accept=".stl" onChange={handleFileChange} />
                </div>
                {url && <ModelSTL url={url} normalMapUrl={normalMapUrl} />}
            </div>
        </div>
    );
};

export default ModelView;