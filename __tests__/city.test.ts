// locators
// span.jqx-tree-grid-checkbox - checkbox  -- when selected => div is rendered

// row0treeGrid === dynamic part is 0.

// import locators from "../locators";
const locators = require("../locators");
const data = require("../data");

const timeout = 0;
jest.setTimeout(60000);

// const locators = {
//   checkbox:
//     "table#tabletreeGrid tbody tr#row__index__treeGrid td span.jqx-tree-grid-checkbox",
//   listBox: "div#listBoxSelected span",
//   button: "button#btn",
// };

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

  // return page.evaluate((list) => {
  //   return list.textContent;
  // }, listbox);
};

describe("verify city of origin", () => {
  test("sample test", () => {
    expect(true).toEqual(true);
    console.log(`locators: `, locators);
    console.log(`data: `, data);
  });

  test("navigate to site", async () => {
    await page.goto(
      "file:///Users/anandganesh/anand/dev-cloud/glovo/ui-test-assessment/employees.html"
    );

    await page.waitFor(100);
  });

  data.map((employee) => {
    test("check Andrew", async () => {
      await selectEmployee(employee.index);
      await clickButton();

      const finalText = await getListBoxText();

      expect(finalText).toEqual(`${employee.name} is from ${employee.city}`);
    });

    test("uncheck Andrew", async () => {
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
    await page.goto(
      "file:///Users/anandganesh/anand/dev-cloud/glovo/ui-test-assessment/employees.html"
    );

    await page.waitFor(100);
  });

  data.map((employee) => {
    test("check Andrew", async () => {
      await selectEmployee(employee.index);
      await clickButton();

      const finalText = await getListBoxText();

      expect(finalText).toEqual(
        `${employee.name} is from ${employee.city} BLR`
      );
    });

    test("uncheck Andrew", async () => {
      await deselectEmployee(employee.index);
      await clickButton();
    });
  });
});
