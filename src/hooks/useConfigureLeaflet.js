import L from 'leaflet';

import { isDomAvailable } from 'lib/util';
import cheese_grater from '../assets/images/cheese-grater.jpeg';

const useConfigureLeaflet = () => {
  if ( !isDomAvailable()) return;

  // To get around an issue with the default icon not being set up right between using React
  // and importing the leaflet library, we need to reset the image imports
  // See https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconSize: [30, 61.5],
    // iconRetinaUrl: require( 'leaflet/dist/images/marker-icon-2x.png' ),
    iconRetinaUrl: cheese_grater,
    // iconUrl: require( 'leaflet/dist/images/marker-icon.png' ),
    iconUrl: cheese_grater,
    shadowUrl: require( 'leaflet/dist/images/marker-shadow.png' )
  });
};

export default useConfigureLeaflet;
