import 'mapbox-gl/dist/mapbox-gl.css';

/* istanbul ignore next */
import TwitterWidgetsLoader from 'twitter-widgets';
import _mapboxgl from 'mapbox-gl';
import { spy, stub } from 'sinon';

import config from 'config';
import { MAPBOX_ACCESS_TOKEN } from 'utils/constants';


export function loadTwitter(cb) {
  if (global.Mocha !== undefined) {
    const mockTwttr = {
      widgets: {
        createTimeline: () => {}
      }
    };
    cb(mockTwttr);
  } else {
    /* istanbul ignore next */
    TwitterWidgetsLoader.load(cb);
  }
}

_mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

if (config.appEnv === 'live-test' || global.mocha !== undefined) {
  const addSourceSpy = spy();
  const getSourceSpy = stub().returns(undefined);
  const addLayerSpy = spy();
  const getLayerSpy = stub().returns(undefined);
  const setFilterSpy = spy();
  const addControlSpy = spy();
  const navigationControlSpy = spy();
  const removeSpy = spy();
  const easeToSpy = spy();
  const getZoomStub = stub();
  const setLngLatSpy = spy();
  const setPopupSpy = spy();
  const addToSpy = spy();

  class MockMap {
    constructor() {
      this.addSource = addSourceSpy;
      this.getSource = getSourceSpy;
      this.getZoom = getZoomStub;
      this.addLayer = addLayerSpy;
      this.easeTo = easeToSpy;
      this.getLayer = getLayerSpy;
      this.setFilter = setFilterSpy;
      this.addControl = addControlSpy;
      this.remove = removeSpy;
    }
    on() {
      arguments[arguments.length - 1]();
    }
  }

  class MockMarker {
    constructor() {
      this.setLngLat = setLngLatSpy;
      this.addTo = addToSpy;
      this.setPopup = setPopupSpy;
    }
  }

  _mapboxgl.Map = MockMap;
  _mapboxgl.Marker = MockMarker;
  _mapboxgl._addSourceSpy = addSourceSpy;
  _mapboxgl._getSourceSpy = getSourceSpy;
  _mapboxgl._addLayerSpy = addLayerSpy;
  _mapboxgl._getLayerSpy = getLayerSpy;
  _mapboxgl._setFilterSpy = setFilterSpy;
  _mapboxgl._addControlSpy = addControlSpy;
  _mapboxgl._removeSpy = removeSpy;
  _mapboxgl.NavigationControl = navigationControlSpy;
}

export const mapboxgl = _mapboxgl;
