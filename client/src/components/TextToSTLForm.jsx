import React, { useState, useEffect } from 'react';
import { createText3DModel, generateSTL, fetchFonts } from '../api/text3dmodels';
import './css/TextToSTLForm.css';

const TextToSTLForm = ({ setUrl }) => {
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(100);
    const [fonts, setFonts] = useState([]);
    const [selectedFont, setSelectedFont] = useState('');

    useEffect(() => {
        const loadFonts = async () => {
            try {
                const response = await fetchFonts();
                setFonts(response.data);
                if (response.data.length > 0) {
                    setSelectedFont(response.data[0].id);
                }
            } catch (error) {
                console.error('Error fetching fonts:', error);
            }
        };
        loadFonts();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createText3DModel({ text, font_size: fontSize, font: selectedFont });
            const id = response.data.id;
            const generateResponse = await generateSTL(id, 'generatestl');
            const fileName = generateResponse.data.filename;
            setUrl(`${process.env.REACT_APP_BACKEND_URL}/${fileName}`);
        } catch (error) {
            console.error('Error generating STL file:', error);
        }
    };

    return (
        <form className="text-to-stl-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="text-input">Text:</label>
                <input
                    id="text-input"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="font-size-input">Font Size:</label>
                <input
                    id="font-size-input"
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="font-select">Font:</label>
                <select
                    id="font-select"
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                >
                    {fonts.map((font) => (
                        <option key={font.id} value={font.id}>
                            {font.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Create STL</button>
        </form>
    );
};

export default TextToSTLForm;