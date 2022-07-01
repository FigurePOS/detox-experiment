export const TestIDS = {
  CounterCount: "counter-count",
  CounterPlus: "counter-plus",
  CounterMinus: "counter-minus",
  CounterReset: "counter-rest",
  CounterText: "counter-text",
  TextEditor: "text-editor",
  TextEditorInput: "text-editor-input",
  TextEditorSubmit: "text-editor-submit",
  TextEditorToggle: "text-editor-submit",

  PageButton: "page-button",
  PageHeader: "page-header"
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

//counter

  it('should show word Counter', async () => {
    const el = element(by.id(TestIDS.CounterText))
    await expect(el).toBeVisible();
    await expect(el).toHaveText('Counter');
  });

  it('should be value zero', async () => {
    const el = element(by.id(TestIDS.CounterCount))
    await expect(el).toBeVisible();
    await expect(el).toHaveText('0');
  });

  it('symbol plus should add +1 and reset button add initial value', async () => {
    const el_res = element(by.id(TestIDS.CounterReset))
    const el_plus = element(by.id(TestIDS.CounterPlus))
    const el_count = element(by.id(TestIDS.CounterCount))

    await (el_plus).multiTap(4);
    await expect(el_count).toHaveText('4');
    await expect(el_res).toBeVisible();
    await (el_res).tap();
    await expect (el_count).toHaveText('0');
  });

  it('symbol minus should add -2', async () => {
    const el_minus = element(by.id(TestIDS.CounterMinus))
    const el_count = element(by.id(TestIDS.CounterCount))
    await (el_minus).multiTap(2);
    await expect (el_count).toHaveText('-2');
  });

});
