import { Component } from "../components/base-component.js";
import { validate, ValidatableObject } from "../util/validation.js";
import { projectState } from "../state/project-state";
import { autobind } from "../decorators/autobind";
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  peopleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.configure();
  }

  renderContent() {}
  private getUserInput(): [string, string, number] | void {
    const title = this.titleInput.value;
    const people = this.peopleInput.value;
    const description = this.descriptionInput.value;

    const titleValidatble: ValidatableObject = {
      value: title,
      required: true,
    };
    const peopleValidatble: ValidatableObject = {
      value: +people,
      required: true,
      min: 0,
    };
    const descriptionValidatble: ValidatableObject = {
      value: description,
      minLength: 5,
      required: true,
    };

    if (
      !validate(titleValidatble) ||
      !validate(peopleValidatble) ||
      !validate(descriptionValidatble)
    ) {
      alert("invalid input , please try again ");
      return;
    } else {
      return [title, description, +people];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, +people);
    }
    this.clearInputs();
  }

  private clearInputs() {
    this.titleInput.value = "";
    this.peopleInput.value = "";
    this.descriptionInput.value = "";
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
