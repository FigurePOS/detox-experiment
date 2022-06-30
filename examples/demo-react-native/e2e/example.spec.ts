export const TestIDS = {
  CounterCount: "counter-count",
  CounterPlus: "counter-plus",
  CounterMinus: "counter-minus",
  CounterReset: "counter-rest",
}
describe('Example', () => {
  before(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should show Welcome 2 text', async () => {
    const el = element(by.id('welcome-text'))
    await expect(el).toBeVisible();
    await expect(el).toHaveText('Welcome 2');
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('hello_button')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });
  
  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });

  it('should show say goodbye screen after tap', async () => {
    await element(by.id('goodbye_button')).tap();
    await expect(element(by.text('Goodbye, World!!!'))).toBeVisible();
  });
});
