const locators = require("../locators");
const data = require("../data");

const timeout = 0;
jest.setTimeout(60000);
const baseURL = ''

let deselectEmployee = async (index) => {
  // we must find if the checkbox is selected
  // if so, we can uncheck the checkbox
  // this can be done by inspecting the innerHTML of parent (span) tag
  // when span contains div with chekced property, the check box is checked

  const checkbox = await page.$(locators.checkbox.replace("__index__", index));
  await checkbox.click();

  await page.waitFor(timeout);
};

let selectEmployee = async (index) => {
  const checkbox = await page.$(locators.checkbox.replace("__index__", index));
  await checkbox.click();

  await page.waitFor(timeout);
};

let clickButton = async () => {
  const listBoxBtn = await page.$(locators.button);
  await listBoxBtn.click();

  await page.waitFor(timeout);
};

let getListBoxText = async () => {
  const listbox = await page.$(locators.listBox);
  const txt = await page.evaluate((list) => {
    return list.textContent;
  }, listbox);

  return txt;
};

describe("verify city of origin", () => {
  test("sample test", () => {
    expect(true).toEqual(true);
    console.log(`locators: `, locators);
    console.log(`data: `, data);
  });

  test("navigate to site", async () => {
    await page.goto(baseURL);

    await page.waitFor(100);
  });

  data.map((employee) => {
    test(`check ${employee.name}`, async () => {
      await selectEmployee(employee.index);
      await clickButton();

      const finalText = await getListBoxText();

      expect(finalText).toEqual(`${employee.name} is from ${employee.city}`);
    });

    test(`uncheck ${employee.name}`, async () => {
      await deselectEmployee(employee.index);
      await clickButton();
    });
  });
});

describe("verify city of origin === failing tests", () => {
  test("sample test", () => {
    expect(true).toEqual(true);
    console.log(`locators: `, locators);
    console.log(`data: `, data);
  });

  test("navigate to site", async () => {
    await page.goto(baseURL);

    await page.waitFor(100);
  });

  data.map((employee) => {
    test(`check ${employee.name}`, async () => {
      await selectEmployee(employee.index);
      await clickButton();

      const finalText = await getListBoxText();

      expect(finalText).toEqual(
        `${employee.name} is from ${employee.city} BLR`
      );
    });

   test(`uncheck ${employee.name}`, async () => {
      await deselectEmployee(employee.index);
      await clickButton();
    });
  });
});
