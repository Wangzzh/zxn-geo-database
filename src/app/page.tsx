import GoogleMapClient from "../client/google-map-client"

export default function Home() {
  return (
  <div className="container text-center">
    <button type="button" className="btn btn-primary">{GoogleMapClient.getKey()}</button>
  </div>
  );
}
