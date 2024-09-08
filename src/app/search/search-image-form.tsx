'use client'

import React from 'react';
import {CountryTag, Tag} from "../../constants/tags"

export default function SearchImageForm({ searchParams }) {

    const [countryTags, setCountryTags] = React.useState<String []>(searchParams.countries ? searchParams.countries.split(',') : []);
    const [tags, setTags] = React.useState<String []>(searchParams.tags ? searchParams.tags.split(",") : []);

    const countryTagList = Object.values(CountryTag);
    const tagList = Object.values(Tag);

    function generateUrl() {
        var url = "search";
        var params = [];
        var filteredCountryTags = countryTags.filter(t => t != "Null");
        var filteredTags = tags.filter(t => t != "Null");
        if (filteredCountryTags.length != 0) {
            params.push(`countries=${filteredCountryTags.join(",")}`);
        }
        if (filteredTags.length != 0) {
            params.push(`tags=${filteredTags.join(",")}`);
        }
        if (params != []) {
            url += `?${params.join("&")}`;
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
                    { countryTags.filter(t => t != "Null").map((value, i) =>
                        <span className="badge bg-dark ml-3" key={i}>{value}</span>
                    )}
                    { tags.filter(t => t != "Null").map((value, i) =>
                        <span className="badge bg-dark ml-3" key={i}>{value}</span>
                    )}
                </h3>
            </div>
            <div className="mb-3 row">
                <select className="form-select" multiple={true} size={10} onChange={e => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map(option => option.value);
                    if (values.includes("Null")) {
                        setCountryTags([]);
                    }
                    if (values.toString() != countryTags.toString()) {
                        setCountryTags(values);
                    }
                }}>
                    { countryTagList.map(value =>
                        <option value={value} key={value} selected={countryTags.includes(value) ? true : undefined}>{value}</option>
                    )}
                </select>
            </div>
            <div className="mb-3 row">
                <select className="form-select" multiple={true} size={10} onChange={e => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map(option => option.value);
                    if (values.includes("Null")) {
                        setTags([]);
                    }
                    if (values.toString() != tags.toString()) {
                        setTags(values);
                    }
                }}>
                    { tagList.map(value =>
                        <option value={value} key={value} selected={tags.includes(value) ? true : undefined}>{value}</option>
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