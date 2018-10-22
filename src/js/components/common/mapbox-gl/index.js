import React, { PropTypes, Component } from 'react';
import { each } from 'lodash';
import { Promise } from 'es6-promise';

import { mapboxgl } from 'utils/vendors';
import { MAPBOX_STYLE } from 'utils/constants';


export default class MapboxGL extends Component {
  componentDidMount() {
    const {
      minZoom, maxZoom, scrollZoom, dragRotate, onMouseMove,
      dragPan, defaultZoom, center, onMouseLeave, onClick
    } = this.props;

    this._mapBox = new mapboxgl.Map({
      minZoom,
      maxZoom,
      center,
      scrollZoom,
      dragRotate,
      dragPan,
      defaultZoom,
      container: this._mapContainer,
      style: this.props.mapStyle
    });

    this._mapBox.addControl(new mapboxgl.NavigationControl(), 'top-left');

    this.mapBoxLoaded = new Promise((resolve, reject) => {
      this.cancelMapBoxLoad = () => reject('cancelled');
      this._mapBox.on('load', () => {
        resolve();
      });
    });

    this.mapBoxLoaded.then(() => {
      this._mapBox.dragPan.enable();
      this._mapBox.setMaxBounds(this._mapBox.getBounds());
      this.updateSource();
      this.updateLayer();
      /* istanbul ignore next */
      each(onMouseMove, (args) => this._mapBox.on('mousemove', ...args));
      each(onMouseLeave, (args) => this._mapBox.on('mouseleave', ...args));
      each(onClick, (args) => this._mapBox.on('click', ...args));
    }).catch(reason => {
      if (reason !== 'cancelled') {
        throw reason;
      }
    });
  }

  componentDidUpdate() {
    this.mapBoxLoaded.then(() => {
      this.updateSource();
      this.updateLayer();
    }).catch(reason => {
      /* istanbul ignore next */
      if (reason !== 'cancelled') {
        throw reason;
      }
    });
  }

  componentWillUnmount() {
    this.cancelMapBoxLoad();
    this._mapBox.remove();
  }

  updateSource() {
    const { sources } = this.props;
    each(sources, ({ name, ...rest }) => {
      let source = this._mapBox.getSource(name);
      if (!source && rest.data !== null) {
        this._mapBox.addSource(name, rest);
      }
    });
  }

  updateLayer() {
    const { layers, filters } = this.props;
    each(layers, layer => {
      let _layer = this._mapBox.getLayer(layer.id);
      if (!_layer) {
        this._mapBox.addLayer(layer);
      }
    });
    each(filters, args => this._mapBox.setFilter(...args));
  }

  render() {
    return (
      <div ref={ (mapContainer) => { this._mapContainer = mapContainer; } }
        style={ this.props.style }/>
    );
  }
}

MapboxGL.propTypes = {
  mapStyle: PropTypes.string,
  style: PropTypes.object,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  scrollZoom: PropTypes.bool,
  dragRotate: PropTypes.bool,
  dragPan: PropTypes.bool,
  defaultZoom: PropTypes.number,
  center: PropTypes.array,
  onMouseMove: PropTypes.array,
  onMouseLeave: PropTypes.array,
  onClick: PropTypes.array,
  filters: PropTypes.array,
  sources: PropTypes.array,
  layers: PropTypes.array,
  sourceDataLoaded: PropTypes.func,
  trackResize: PropTypes.bool,
};

MapboxGL.defaultProps = {
  mapStyle: MAPBOX_STYLE,
  minZoom: 9.5,
  maxZoom: 17,
  scrollZoom: false,
  dragRotate: false,
  dragPan: false,
  defaultZoom: 9.5,
  center: [-87.4024055, 41.83677],
  sources: [],
  layers: [],
  onMouseMove: [],
  onMouseLeave: [],
  filters: [],
  onClick: [],
};
