/**
 * The interface for event in the queue
 */
export interface EventInterface {
  /**
   * eventId is the uuid of the ScanEvent entity
   */
  eventId: string;
  /**
   * The event action
   */
  action: string;
  /**
   * The respository is scanned
   */
  repsositoryName: string;
}
