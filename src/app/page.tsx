import * as fs from 'fs'
import GoogleMapClient from "../client/google-map-client"
import AddImageForm from "./add-image-form"
import Nav from "./nav"

export default function Home() {

    return (
        <div>
            <Nav />
            <div className="container text-center">
                <AddImageForm />
            </div>
        </div>
    );
}
