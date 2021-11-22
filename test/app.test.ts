import { row, getNextDay } from "../src/utils";

describe('test func', () => {
  beforeAll(() => {
    /* Runs before all tests */
  })
  afterAll(() => {
    /* Runs after all tests */
  })
  beforeEach(() => {
    /* Runs before each test */
  })
  afterEach(() => {
    /* Runs after each test */
  })

  test('some test', () => {
    const Row = row(1);
    expect(Row).toBeTruthy();
  });

  test('should return valide date', () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const nextDate = getNextDay(currentDate, 1);
    expect(nextDate).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

})
