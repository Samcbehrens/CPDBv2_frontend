import React from 'react';

import { CAROUSEL_TYPES } from 'utils/constants';
import OfficerCard from 'components/common/officer-card';
import CarouselWrapper from '../carousel-wrapper';

export default CarouselWrapper(OfficerCard, CAROUSEL_TYPES.ALLEGATION);
