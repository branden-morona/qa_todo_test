class TodoPage { }

import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";

const chromeDriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

describe("the todo app", () => {
  it("can add a todo", () => { });
  it("can mark a todo with a star", () => { });
  it("can separate completed todos", () => { });
  it("can clear completed todos", () => { });
});

// this is for the "What needs to be done?" input
const todoInput: By = By.css(".new-todo");
// this locator will find the text of a todo FROM the todo
const todoLabel: By = By.css("label");
// this locator will find ALL the todos
const todos: By = By.css("li.todo");
// this locator will find the checkbox for the todo FROM the todo
const todoComplete: By = By.css("path");
// this locator will find the star for the todo
const todoStar: By = By.css('input');
// this locator is for the "Completed" button at the bottom
const todoDone: By = By.className("completed");
// this locator is for the "Clear complete" button in the corner
const clearCompletedButton: By = By.className("clear-completed")
// this locator will find All button for todos
const toDoAll: By = By.xpath('//a[text()="all"]')

test("the todo app can add, favorite, complete, separate, and clear a todo", async () => {
  //  Load the page
  await driver.get("https://devmountain.github.io/qa_todos/");
  await driver.wait(until.elementLocated(todoInput));
  //  Add a todo
  await driver.findElement(todoInput).sendKeys("Dishes To-Do\n");
  //  Add another todo
  await driver.findElement(todoInput).sendKeys("Laundry To-Do\n");
  //  Find all the todos
  let myTodos = await driver.findElements(todos);
  //  Filter them to get any that match our test todo
  let myTodo = await myTodos.filter(async (todo) => {
    (await (await todo.findElement(todoLabel)).getText()) == "Dishes To-Do";
  });
  //  We should have 2 todos
  expect(myTodo.length).toEqual(2);
  //  Favorite Dishes todo
  await (await myTodo[0].findElement(todoStar)).click();
  //  Mark Dishes complete
  await (await myTodo[0].findElement(todoComplete)).click();
  //  Open completed list
  await (await driver.findElement(todoDone)).click();
  //  Find all the todos
  let myTodos = await driver.findElements(todos);
  //  Filter them to get any that match our test todo
  let myTodo = await myTodos.filter(async (todo) => {
    (await (await todo.findElement(todoLabel)).getText()) == "Dishes To-Do";
  });
  //  We should only have the one
  expect(myTodo.length).toEqual(1);
  //  Clear complete todos
  await (await driver.findElement(clearCompletedButton)).click();
  //  Return to All todos page
  await (await driver.findElement(toDoAll)).click();
  //  Get the todos and filter again
  myTodos = await driver.findElements(todos);
  myTodo = await myTodos.filter(async (todo) => {
    (await (await todo.findElement(todoLabel)).getText()) == "Dishes To-Do";
  });
  //  We should have one matching todo
  expect(myTodo.length).toEqual(1);
});

afterAll(async () => {
  await driver.quit();
});
