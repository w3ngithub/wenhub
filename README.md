### Project Architecture

1. app

   > The app directory is where our application actually lives. I like the approach of having the application files, which are not dedicated to the framework bundled in a specific directory.<br/><br/> > ![Image](./app/assets/images/md/CAPTURE.PNG)

2. api

   > This folder contains all code we need to access the APIs of our application. Personally, I like to have one folder for each REST API controller. Each folder then contains the functions for the API calls as well as the tests.

3. assets

   > This folder contains all your images, icons , vectors and other documents.

4. RestClient.ts

   > The RestClient contains basic functions like get, post, delete, and so on. Those functions are then used by the APIs. I like to use axios for this one.

5. components

   > The components directory contains all your elements, modules, templates, and layouts

   - elements

     > This directory contains all the basic building blocks for your app. For example a button or a headline component.

   - modules

     > Create all your components here which are more than a basic building block. This could be a header or a footer component. Most likely those modules are built out of multiple elements.

   - templates

     > In the templates directory, you should place all your page templates which are then called from your Next.js specific pages. You can find an example of this pattern in the Repository.

   - layouts
     > Layouts are used to wrap your Templates and provide them with the components which will be displayed by default in a specific layout. For example, you would include the Footer and the Header in a default layout.

6. constants

   > Put all your global constants here. A good example would be your action types.

7. hooks

   > Your custom hooks may find their place here.

8. styles

   > Place all your global styles here

9. utils

   > Most likely you will have some JS functions which you will use over and over again.

10. pages

    > All the routes of your Next.js application will be placed in this directory. For each route, you will have a separate file, which is named as the route.

<br/>
<br/>

### Rules

1. Always create a camelcase folder unless it is a component folder with root file(index.js)<br/><br/>
   ![Image](./app/assets/images/md/CAPTURE1.PNG)

2. Always create component filename with Pascal casing.<br/><br/>
   ![Image](./app/assets/images/md/CAPTURE2.PNG)

3. Always place css/sccs file specific for a component on resptive component folder. <br/><br/>
   ![Image](./app/assets/images/md/CAPTURE3.PNG)

4. Only place global styles inside styles folder.<br/><br/>
   ![Image](./app/assets/images/md/CAPTURE4.PNG)

5. Be careful while installing packages, dev mode packages should not got to production build.

6. Install eslint and prettifier extension for better code management. (eslint and prettifier rules has been setup in project - code must follow the rules defined)

7. Required absolute path has been setup , if any new absolute path has to added add it in jconfig.json file and in eslintrc file if required.