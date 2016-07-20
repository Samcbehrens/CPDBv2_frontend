import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import { openBottomSheetWithStory, closeBottomSheet, openBottomSheetWithFAQ } from 'actions/landing-page/bottom-sheet';


describe('bodyScrollMiddleware', function () {
  afterEach(function () {
    document.body.className = '';
  });

  it('should disable bodyscroll on OPEN_BOTTOM_SHEET_WITH_STORY', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithStory({});
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should disable bodyscroll on OPEN_BOTTOM_SHEET_WITH_FAQ', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithFAQ({});
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should enable bodyscroll on CLOSE_BOTTOM_SHEET', function () {
    let dispatched;
    document.body.className = 'noscroll';
    const dispatchAction = closeBottomSheet();
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.not.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });
});