import React, { useRef } from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

// import { promiseToFlyTo, getCurrentLocation } from 'lib/map';
import { promiseToFlyTo } from 'lib/map';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

// import gatsby_astronaut from 'assets/images/gatsby-astronaut.jpg';
import cheese_grater from '../assets/images/cheese-grater.jpeg';

const LOCATION = {
  lat: 51.5139,
  lng: -0.0823
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const ZOOM = 18;

const timeToZoom = 1000;
const timeToOpenPopupAfterZoom = 1500;
// const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;

// const popupContentHello = `<p>Hello 👋</p>`;
const popupContentGatsby = `
  <div class="popup-gatsby">
    <div class="popup-gatsby-image">
      <img class="gatsby-astronaut" src=${cheese_grater} />
    </div>
    <div class="popup-gatsby-content">
      <h1>The Leadenhall Building</h1>
      <ul>
        <li>
          <u>Height</u>
          <br />
          225 m
        </li>
        <li>
          <u>Construction started</u>
          <br />
          2010
        </li>
        <li>
          <u>Architects</u>
          <br />
          Richard Rogers, Graham Stirk
          </li>
        <li>
          <u>Floors</u>
          <br />
          52
        </li>
        <li>
          <u>Architecture firm</u>
          <br />
          Rogers Stirk Harbour + Partners
        </li>
      </ul>
    </div>
  </div>
`;

const IndexPage = () => {
  const markerRef = useRef();

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) return;

    const popup = L.popup({
      maxWidth: 800
    });

    // const location = await getCurrentLocation().catch(() => LOCATION );
    const location = await LOCATION;

    const { current = {} } = markerRef || {};
    const { leafletElement: marker } = current;
    console.log(LOCATION);
    console.log(current);
    console.log(marker);

    marker.setLatLng( location );
    popup.setLatLng( location );
    popup.setContent( popupContentGatsby );

    setTimeout( async () => {
      await promiseToFlyTo( leafletElement, {
        zoom: ZOOM,
        center: location
      });

      marker.bindPopup( popup );

      setTimeout(() => marker.openPopup(), timeToOpenPopupAfterZoom );
      // setTimeout(() => marker.setPopupContent( popupContentGatsby ), timeToUpdatePopupAfterZoom );
    }, timeToZoom );
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
        <Marker ref={markerRef} position={CENTER} />
      </Map>

      <Container type="content" className="text-center home-start">
        <h2>City Buildings</h2>
        <p>Demo architecture discovery app!</p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
