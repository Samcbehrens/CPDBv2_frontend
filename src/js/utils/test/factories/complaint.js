import { Factory } from 'rosie';
import { date, lorem, helpers, address, random, internet, name } from 'faker';
import moment from 'moment';


/* istanbul ignore next */
const dateGenerator = () => (moment(date.past()).format('YYYY-MM-DD'));
/* istanbul ignore next */
const percentileGenerator = () => (random.number({ min: 10, max: 1000 }) / 10.0);


/* istanbul ignore next */
export const RawComplaintSummaryFactory = Factory.define('RawComplaintSummaryFactory')
  .attr('crid', () => (helpers.replaceSymbolWithNumber('107####')))
  .attr('summary', lorem.paragraph)
  .attr('incident_date', dateGenerator)
  .attr('category_names', () => {
    return [helpers.shuffle(['Use of Force', 'Illegal Search', 'Domestic', 'Unknown'])[0]];
  });

/* istanbul ignore next */
export const ComplaintSummaryFactory = Factory.define('ComplaintSummaryFactory')
  .attr('crid', () => (helpers.replaceSymbolWithNumber('107####')))
  .attr('summary', lorem.paragraph)
  .attr('incidentDate', dateGenerator)
  .attr('categoryNames', () => {
    return [helpers.shuffle(['Use of Force', 'Illegal Search', 'Domestic', 'Unknown'])[0]];
  });

/* istanbul ignore next */
export const CoaccusedFactory = Factory.define('CoaccusedFactory')
  .sequence('id')
  .attr('full_name', () => name.firstName())
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('allegation_count', () => random.number())
  .attr('sustained_count', () => random.number())
  .attr('age', () => random.number())
  .attr('final_outcome', lorem.word)
  .attr('final_finding', lorem.word)
  .attr('category', lorem.words)
  .attr('percentile_allegation', percentileGenerator)
  .attr('percentile_allegation_civilian', percentileGenerator)
  .attr('percentile_allegation_internal', percentileGenerator)
  .attr('percentile_trr', percentileGenerator);

/* istanbul ignore next */
const PersonDemographicFactory = Factory.define('PersonDemographicFactory')
  .attr('gender', 'Male')
  .attr('race', 'White')
  .attr('age', () => random.number());

/* istanbul ignore next */
export const InvestigatorFactory = Factory.define('InvestigatorFactory')
  .sequence('officer_id')
  .attr('involved_type', 'investigator')
  .attr('full_name', () => name.firstName())
  .attr('current_rank', () => lorem.word())
  .attr('percentile_allegation_civilian', percentileGenerator)
  .attr('percentile_allegation_internal', percentileGenerator)
  .attr('percentile_trr', percentileGenerator);

/* istanbul ignore next */
export const PoliceWitnessFactory = Factory.define('PoliceWitnessFactory')
  .sequence('officer_id')
  .attr('involved_type', 'police_witness')
  .attr('full_name', () => name.firstName())
  .attr('allegation_count', () => random.number())
  .attr('sustained_count', () => random.number())
  .attr('percentile_allegation_civilian', percentileGenerator)
  .attr('percentile_allegation_internal', percentileGenerator)
  .attr('percentile_trr', percentileGenerator);

/* istanbul ignore next */
export const AttachmentFactory = Factory.define('AttachmentFactory')
  .attr('title', () => lorem.word())
  .attr('url', () => internet.url())
  .attr('preview_image_url', () => internet.url())
  .attr('file_type', 'document');

/* istanbul ignore next */
export const ComplaintFactory = Factory.define('ComplaintFactory')
  .attr('crid', () => String(random.number({ min: 1000000, max: 2000000 })))
  .attr('coaccused', () => CoaccusedFactory.buildList(1))
  .attr('complainants', () => PersonDemographicFactory.buildList(1))
  .attr('victims', () => PersonDemographicFactory.buildList(1))
  .attr('summary', lorem.paragraph)
  .attr('incident_date', dateGenerator)
  .attr('start_date', dateGenerator)
  .attr('end_date', dateGenerator)
  .attr('location', 'Police Building')
  .attr('address', address.streetAddress)
  .attr('beat', '23')
  .attr('point', { lat: 1, lon: 2 })
  .attr('involvements', () => InvestigatorFactory.buildList(1))
  .attr('attachments', () => AttachmentFactory.buildList(10));

export const RelatedComplaintFactory = Factory.define('RelatedComplaintFactory')
  .attr('crid', () => String(random.number({ min: 1000000, max: 2000000 })))
  .attr('complainants', () => PersonDemographicFactory.buildList(1))
  .attr('category_names', ['Use Of Force'])
  .attr('point', { lat: 43.87, lon: -23.43 })
  .attr('coaccused', [name.firstName()]);
