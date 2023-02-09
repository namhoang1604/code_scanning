import { UtilsService } from './utils.service';

describe('Utils functions', () => {
  const service: UtilsService = UtilsService.getInstance();

  describe('When call randomSleep method', () => {
    const sleepTime = 2; // 2 seconds

    it('should not throw', async () => {
      await expect(service.randomSleep(sleepTime)).resolves.not.toThrow();
    });

    it('should sleep less than sleepTime', async () => {
      const start = Date.now();
      let sleepDuration: number;
      await service
        .randomSleep(sleepTime)
        .then(() => (sleepDuration = Date.now() - start));
      sleepDuration = Math.round(sleepDuration / 1000); //convert millisecond to second
      expect(sleepDuration).toBeLessThanOrEqual(sleepTime);
    });
  });

  describe('When call randomInteger method', () => {
    const maxNumber = 10;
    it('should be less than maxNumber', async () => {
      expect(service.randomInteger(maxNumber)).toBeLessThanOrEqual(maxNumber);
    });
  });
});
