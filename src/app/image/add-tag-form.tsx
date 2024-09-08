'use client'

import React from 'react';
import {CountryTag, Tag} from "../../constants/tags"

export default function AddTagForm({props}) {

    const [countryTag, setCountryTag] = React.useState<CountryTag>(props.currentCountryTag ? props.currentCountryTag as CountryTag : CountryTag.NULL);
    const [tags, setTags] = React.useState<Tag[]>(props.currentTags && props.currentTags.length != 0 ? props.currentTags.map(t => t as Tag) : []);

    async function addTags() {
        const requestBody = {
            id: props.id,
            countryTag,
            tags
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        fetch("http://localhost:3000/api/images/tag", options)
            .then(response => response.json())
            .then(data => {
                alert(JSON.stringify(data));
                window.location.reload();
            });

        setCountryTag(CountryTag.NULL);
        setTags([]);
    }

    const countryTagList = Object.values(CountryTag);
    const tagList = Object.values(Tag);

    return (
        <div>
            <div className="mb-3 row">
                <h3><label className="form-label">Change tags</label></h3>
            </div>
            <div className="mb-3 row">
                <h3>
                    <span className="badge bg-dark" key="country">{countryTag}</span>
                    { tags.map((value, i) =>
                        <span className="badge bg-dark ml-3" key={i}>{value}</span>
                    )}
                </h3>
            </div>
            <div className="mb-3 row">
                <select className="form-select" onChange={e => setCountryTag(e.target.value as CountryTag)}>
                    { countryTagList.map(value =>
                        <option value={value} key={value} selected={countryTag == value ? true : undefined}>{value}</option>
                    )}
                </select>
            </div>
            <div className="mb-3 row">
                <select className="form-select" multiple={true} size={10} onChange={e => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map(option => option.value);
                    setTags(values);
                }}>
                    { tagList.map(value =>
                        <option value={value} key={value} selected={tags.includes(value) ? true : undefined}>{value}</option>
                    )}
                </select>
            </div>
            <div className="mb-3 mt-5 row">
                <button type="submit" className="btn btn-primary" onClick={addTags}>Submit Tags</button>
            </div>
        </div>
    );
}