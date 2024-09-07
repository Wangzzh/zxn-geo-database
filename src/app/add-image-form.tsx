'use client'

import React from 'react';
import {CountryTag, Tag} from "../constants/tags"

export default function AddImageForm() {

    const [url, setUrl] = React.useState();
    const [countryTag, setCountryTag] = React.useState(CountryTag.NULL);
    const [tags, setTags] = React.useState([]);

    async function addImage() {
        console.log("URL: " + url.toString());
        const requestBody = {
            url,
            countryTag,
            tags
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        fetch("http://localhost:3000/api/images/add", options)
            .then(response => response.json())
            .then(data => alert(JSON.stringify(data)));

        setUrl("");
        setCountryTag(CountryTag.NULL);
        setTags([]);
    }

    const countryTagList = Object.values(CountryTag);
    const tagList = Object.values(Tag);

    return (
        <div>
            <div className="mb-3 mt-3 row">
                <label className="form-label">Google Map Full URL</label>
                <input type="text" className="form-control" id="mapUrlInput" onInput={e => setUrl(e.target.value)}/>
            </div>
            <div className="mb-3 row">
                <label className="form-label">Labels</label>
            </div>
            <div className="mb-3 row">
                <h3>
                    <span className="badge bg-secondary" key="country">{countryTag}</span>
                    { tags.map((value, i) =>
                        <span className="badge bg-secondary ml-3" key={i}>{value}</span>
                    )}
                </h3>
            </div>
            <div className="mb-3 row">
                <select className="form-select" onChange={e => setCountryTag(e.target.value)}>
                    { countryTagList.map(value =>
                        <option value={value} key={value}>{value}</option>
                    )}
                </select>
            </div>
            <div className="mb-3 row">
                <select className="form-select" multiple={true} onChange={e => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map(option => option.value);
                    setTags(values);
                }}>
                    { tagList.map(value =>
                        <option value={value} key={value}>{value}</option>
                    )}
                </select>
            </div>
            <div className="mb-3 mt-5 row">
                <button type="submit" className="btn btn-primary" onClick={addImage}>Submit image</button>
            </div>
        </div>
    );
}