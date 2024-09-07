'use client'

import React from 'react';
import {CountryTag, Tag} from "../../constants/tags"

export default function SearchImageForm() {

    const [countryTags, setCountryTags] = React.useState([]);
    const [tags, setTags] = React.useState([]);

    const countryTagList = Object.values(CountryTag);
    const tagList = Object.values(Tag);

    function generateUrl() {
        var url = "search";
        var params = [];
        if (countryTags.length != 0) {
            params.push(`countries=${countryTags.join(",")}`);
        }
        if (tags.length != 0) {
            params.push(`tags=${tags.join(",")}`);
        }
        if (params != []) {
            url += `?${params.join("%")}`;
        }
        return url.toString();
    }

    return (
        <div>
            <div className="mb-3 mt-3 row">
                <label className="form-label">Search Images</label>
            </div>
            <div className="mb-3 row">
                <h3>
                    { countryTags.map((value, i) =>
                        <span className="badge bg-secondary ml-3" key={i}>{value}</span>
                    )}
                    { tags.map((value, i) =>
                        <span className="badge bg-secondary ml-3" key={i}>{value}</span>
                    )}
                </h3>
            </div>
            <div className="mb-3 row">
                <select className="form-select" multiple={true} onChange={e => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map(option => option.value);
                    setCountryTags(values);
                }}>
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
                <a href={generateUrl()}>
                    <button type="submit" className="btn btn-primary">Search image</button>
                </a>
            </div>
        </div>
    );
}