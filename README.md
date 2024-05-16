# AssignmentPayever

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.
This project, named assignment-payever, has been created to facilitate the management of tasks and events on a calendar. To utilize this project, please adhere to the following steps:

1. Begin by installing the necessary Node.js modules using the command `npm install`.

2. Additionally, install JSON Server from https://www.npmjs.com/package/json-server. After installation, initiate the local server database using the command `npx json-server db.json`.

3. Once setup is complete, access the application via http://localhost:4200/.

4. Within this project, users can perform the following actions:
   - Create events using the 'Add Event' button located below the calendar.
   - View events scheduled for specific dates by clicking on the calendar displayed on the homepage.
   - Access event details by clicking on the respective event.
   - Edit previously created events with a simple click.
   - Delete events as needed.
   - Utilize drag-and-drop functionality to reschedule events within time slots.

5. The development of this app has leveraged several technological features, including:
   - Angular and Angular Material/CDK version 16.2.0.
   - Implementation of JSON Server for local server functionality.
   - Utilization of services, date pipe, and reactive forms with validation.
   - Implementation of lazy loading within the app module.
   - Incorporation of Material's components/modules for enhanced views.

6.The code comprises various services, modules, and components, each serving a specific purpose:

- **Modules**: 
  - The primary module, `app.module.ts`, serves as the core module and encompasses all functionality. It does not include any other module or feature module.

- **Components**:
  - The code features three components:
    1. `app-component`: This component serves as the main entry point and includes the calendar for viewing events. It also integrates the `calendar-view-component` for displaying event listings via a calendar view.
    2. `calendar-view-component`: Responsible fosr rendering event cards based on time slots.
    3. `event-dialog-component`: Provides an additional dialog box for interacting with events.

- **Models**:
  - Data structure support is provided through models. An `interface.ts` file has been created within the models directory to define the required interfaces.

- **Services**:
  - To streamline frequently used code and improve accessibility, various services have been developed.

- **Settings**:
  - The `settings` folder contains an array that is extensively utilized for time iteration purposes.

- **Routing**:
  - The `app-routing.ts` file has been created solely to illustrate lazy loading within the project, demonstrating how modules are loaded dynamically as needed.

This modular structure ensures a well-organized and maintainable codebase, enhancing readability and scalability.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
