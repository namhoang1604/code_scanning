/**
 * The utility service
 */
export class UtilsService {
  /**
   * The UtilsService instance
   */
  private static instance: UtilsService;

  /**
   * To control access to the instance
   *
   * @returns The instance
   */
  public static getInstance(): UtilsService {
    if (!this.instance) {
      this.instance = new UtilsService();
    }

    return this.instance;
  }
  /**
   *
   * To sleep the current process in random seconds in range from 1 to an input number,
   * with default the input number is 10 seconds
   *
   * @param {number} inSeconds the max range of sleep
   */
  randomSleep(inSeconds = 10): Promise<void> {
    const time = (Math.floor(Math.random() * inSeconds) + 1) * 1000;
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  /**
   * To generate a random number from 0 to the max input number
   *
   * @param maxNumber the max number for random range
   */
  randomInteger(maxNumber): number {
    return Math.floor(Math.random() * (maxNumber + 1));
  }
}
