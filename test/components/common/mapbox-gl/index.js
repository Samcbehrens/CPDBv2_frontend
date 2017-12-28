import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MapboxGL from 'components/common/mapbox-gl';
import { mapboxgl } from 'utils/vendors';


describe('MapboxGL component', function () {
  let instance;

  beforeEach(function () {
    mapboxgl._addSourceSpy.reset();
    mapboxgl._addLayerSpy.reset();
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    MapboxGL.should.be.renderable();
  });

  it('should add sources and layers on load', function () {
    const sources = [{
      name: 'abc',
      type: 'geojson',
      data: 'path/to/geojson'
    }];
    const layers = [{
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'abc',
      paint: {}
    }];
    instance = renderIntoDocument(<MapboxGL sources={ sources } layers={ layers }/>);
    instance._mapBox.addSource.calledWith('abc', {
      type: 'geojson',
      data: 'path/to/geojson'
    }).should.be.true();
    instance._mapBox.addLayer.calledWith({
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'abc',
      paint: {}
    }).should.be.true();
  });
});
