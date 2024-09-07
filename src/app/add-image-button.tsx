'use client'

import React from 'react';

export default function AddImageButton() {

    const [url, setUrl] = React.useState();

    async function addImage() {
        console.log("URL: " + url.toString());
        const requestBody = {
            url
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        fetch("http://localhost:3000/api/images/add", options)
            .then(response => response.json())
            .then(data => alert(JSON.stringify(data)));
    }

    return (
        <div>
            <div className="mb-3 row">
                <label className="form-label">Google Map Full URL</label>
                <input type="text" className="form-control" id="mapUrlInput" onInput={e => setUrl(e.target.value)}/>
            </div>
            <div className="mb-3 row">
                <button type="submit" className="btn btn-primary" onClick={addImage}>Submit image</button>
            </div>
        </div>
    );
}