import ReactOnRails from 'react-on-rails';

import Photo from '../bundles/MyDrive/components/PhotoServer';

// This is how react_on_rails can see the PhotoServer in the browser.
ReactOnRails.register({
  PhotoServer,
});
