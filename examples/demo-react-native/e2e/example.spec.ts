export const TestIDS = {
  CounterCount: 'counter-count',
  CounterPlus: 'counter-plus',
  CounterMinus: 'counter-minus',
  CounterReset: 'counter-rest',
  CounterText: 'counter-text',
  TextEditor: 'text-editor',
  TextEditorInput: 'text-editor-input',
  TextEditorSubmit: 'text-editor-submit',
  TextKeepValue: 'text-keep-value',
  TextEditorToggle: 'text-editor-toggle',

  PageButton: 'page-button',
  PageHeader: 'page-header'
};

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
    const el = element(by.id('welcome-text'));
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

  // COUNTER
  it('should show word Counter', async () => {
    const el = element(by.id(TestIDS.CounterText));
    await expect(el).toBeVisible();
    await expect(el).toHaveText('Counter');
  });

  it('should be value zero', async () => {
    const el = element(by.id(TestIDS.CounterCount));
    await expect(el).toBeVisible();
    await expect(el).toHaveText('0');
  });

  it('symbol plus should add +1 and reset button add initial value', async () => {
    const el_res = element(by.id(TestIDS.CounterReset));
    const el_plus = element(by.id(TestIDS.CounterPlus));
    const el_count = element(by.id(TestIDS.CounterCount));

    await el_plus.multiTap(4);
    await expect(el_count).toHaveText('4');
    await expect(el_res).toBeVisible();
    await el_res.tap();
    await expect(el_count).toHaveText('0');
  });

  it('symbol minus should add -2', async () => {
    const el_minus = element(by.id(TestIDS.CounterMinus));
    const el_count = element(by.id(TestIDS.CounterCount));
    await el_minus.multiTap(2);
    await expect(el_count).toHaveText('-2');
  });

  //TEXT EDITOR

  it('should show NO TEXT text', async () => {
    const el_edit = element(by.id(TestIDS.TextEditor));
    await expect(el_edit).toBeVisible();
    await expect(el_edit).toHaveText('NO TEXT');
  });
  it('should show in text editor type text', async () => {
    const el_in = element(by.id(TestIDS.TextEditorInput));
    await expect(el_in).toBeVisible();
    await el_in.typeText('Andrejka je nej');
    await expect(el_in).toHaveText('Andrejka je nej');
  });

  it('after click on submit should show text instead of NOTEXT', async () => {
    const el_sub = element(by.id(TestIDS.TextEditorSubmit));
    const el_in = element(by.id(TestIDS.TextEditorInput));
    const el_edit = element(by.id(TestIDS.TextEditor));

    await el_in.typeText('Andrejka je nej');
    await expect(el_in).toHaveText('Andrejka je nej');
    await el_sub.tap();
    await expect(el_edit).toHaveText('Andrejka je nej');
  });

  //text keep the same value, functionality of toggle
  it('visible text Keep the same value and functionality of toggle', async () => {
    const el_toggle = element(by.id(TestIDS.TextEditorToggle));
    const el_text = element(by.id(TestIDS.TextKeepValue));
    const el_in = element(by.id(TestIDS.TextEditorInput));
    const el_edit = element(by.id(TestIDS.TextEditor));

    await expect(el_text).toHaveText('Keep the same value');
    await expect(el_toggle).toBeVisible();
    await expect(el_toggle).toHaveToggleValue(false);
    await el_toggle.tap();
    await expect(el_toggle).toHaveToggleValue(true);
    await el_in.typeText('David je nej');
    await expect(el_edit).toHaveText('David je nej');
  });

  // Pages
  it('page 2', async () => {
    const el_page = element(by.id(TestIDS.PageButton));
    await el_page.atIndex(1).tap();
    await expect(el_page.atIndex(1)).toBeVisible();
  });
  it('page 1', async () => {
    const el_page = element(by.id(TestIDS.PageButton));
    await el_page.atIndex(0).tap();
    await expect(el_page.atIndex(0)).toBeVisible();
  });
  it('page 3', async () => {
    const el_page = element(by.id(TestIDS.PageButton));
    await el_page.atIndex(2).tap();
    await expect(el_page.atIndex(2)).toBeVisible();
  });
  it('page 4', async () => {
    const el_page = element(by.id(TestIDS.PageButton));
    await el_page.atIndex(3).tap();
    await expect(el_page.atIndex(3)).toBeVisible();
  });
  it('page 5', async () => {
    const el_page = element(by.id(TestIDS.PageButton));
    await el_page.atIndex(4).tap();
    await expect(el_page.atIndex(4)).toBeVisible();
  });
});
