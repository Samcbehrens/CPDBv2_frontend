import { RawOfficerCardFactory, RawOfficersPairCardFactory } from 'utils/test/factories/activity-grid';

export default () => {
  const officerCards = RawOfficerCardFactory.buildList(2);
  const pairCards = RawOfficersPairCardFactory.buildList(1);
  return officerCards.concat(pairCards);
};
