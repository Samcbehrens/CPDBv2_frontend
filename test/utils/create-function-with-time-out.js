import { spy, useFakeTimers } from 'sinon';

import createFunctionWithTimeout from 'utils/create-function-with-timeout';


describe('createFunctionWithTimeout', function () {
  it('should call function after timeout', function () {
    const spyFunc = spy();
    const clock = useFakeTimers();
    createFunctionWithTimeout(spyFunc, 100);
    clock.tick(110);
    spyFunc.called.should.be.true();
  });

  it('should be called once', function () {
    const spyFunc = spy();
    const clock = useFakeTimers();
    const timeoutFunc = createFunctionWithTimeout(spyFunc, 100);
    timeoutFunc();
    clock.tick(110);
    spyFunc.calledOnce.should.be.true();
  });
});
