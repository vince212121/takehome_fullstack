# PlanEasy

## Project setup instructions

The IDE we use is Visual Studio Code. If you don't already have it installed you can grab it here: https://code.visualstudio.com/.  

Follow the instructions specific to your operating system or use Docker to setup this project.

We recommend using Docker as it's the simplest to get up and running but if that does not work - we have included OS specific instructions.

### Install with Docker

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop). This will install related tools such as docker-compose.
2. In a terminal run `docker-compose up` in the root directory of this project where `docker-compose.yml` is located. 
3. You can run `docker-compose up -d` to run the containers in the background.
4. You should see the logs showing the migration has run and the server is running on port 8000. Visit http://localhost:8000/graphql to view the GraphiQL interface.
5. To execute `manage.py` commands, e.g. creating migrations and applying them, you have to run them through the docker container. For example to create a super user to access the django admin you would run `docker-compose exec backend python manage.py createsuperuser`. 

### Other install instructions

**Windows:**

**_Setting up the backend server_**

1. Install the latest version of python onto your computer
2. After python is installed, use pip to install the virtualenvwrapper for windows https://pypi.org/project/virtualenvwrapper-win/
3. Create a virtual envorinment to work off of for this take home test with `mkvirtualenv takehome`
   Note: any time you close the command prompt if you want to get back into the virtual envorinment you'll need to use `workon takehome`
   also, after you submit the take home test the virtual envorinment can be deleted with the command `rmvirtualenv takehome`
4. Open an instance of command prompt or powershell (if you use powershell you will want to switch it to command prompt mode by typing cmd)
5. Navigate to the takehome-full-stack\api folder in the terminal
6. With your virtual envorinment activated run `pip install -r requirements.txt` to install the backend packages that the test uses
7. Run `python manage.py migrate` to create the sql database
8. you can now run the backend server any time with python manage.py runserver (ensure you are in the virtual envorinment before running this command)

**Setting up the frontend server**

1. Install the LTS version of nodejs from https://nodejs.org/en/
2. Install the yarn package manager https://classic.yarnpkg.com/en/
3. Open an additional instance of command prompt or powershell (if you use powershell you will want to switch it to command prompt mode by typing cmd)
4. Navigate to the takehome-full-stack\src folder
5. run `yarn` to install the frontend packages that the test uses
6. you can now run the frontend server any time with `yarn dev`

<br />
<br />

**Mac:**

1. Install JS dependancies - `cd src && yarn install` (you may need to install yarn globally)
2. Create virtualenv for python deps - Make sure you are using python3.6 or later. Run `python -m venv venv` in the root directory. Activate virtual env by `source ./venv/bin/activate`
3. Install python packages - `cd api && pip install -r requirements.txt`
4. Run migrate to setup database `cd api && python manage.py migrate`
5. Run python server `cd api && python manage.py runserver`

<br />
<br />



<br />

## Graphql basics
With the API server running you can test GraphQL queries and mutations here: http://localhost:8000/graphql/  
The frontend is accessible through: http://localhost:3000/  

You can enter this to show all the test query responses

```
query {
  examples {
    test
  }
  message(text: "hello!")
}
```

Entering this will show the example mutation

```
mutation {
  placeholderMutation(num1: 5, num2: 2) {
    output
    message
  }
}
```

<br />

## Documentation

### Backend

**Django Getting Started**

[Django tutorial refresher](https://docs.djangoproject.com/en/4.0/intro/tutorial01/)

[Django Model docs](https://docs.djangoproject.com/en/4.0/topics/db/models/)

[Django ORM docs](https://docs.djangoproject.com/en/4.0/topics/db/queries/)


**Graphene Docs (GraphQL API)**

[Django Graphene (GraphQL server library)](https://docs.graphene-python.org/projects/django/en/latest/)


**Django Pagination**

https://docs.djangoproject.com/en/4.0/topics/pagination/


### Frontend

**URQL**

[How to run a query with URQL](https://formidable.com/open-source/urql/docs/basics/react-preact/#queries)

[How to run a mutation with URQL](https://formidable.com/open-source/urql/docs/basics/react-preact/#mutations)

**NextJS**

[NextJS Docs](https://nextjs.org/docs)

**Formik**

[Creating a Formik Form](https://formik.org/docs/api/formik)

[Formik Fields](https://formik.org/docs/api/field)

[Formik Validation](https://formik.org/docs/guides/validation)

**Tailwind**

[Tailwind Core Concepts](https://tailwindcss.com/docs/utility-first)

[Changing styles on hover, focus, etc](https://tailwindcss.com/docs/hover-focus-and-other-states)

[Responsive Styling](https://tailwindcss.com/docs/responsive-design)

[Flex layout](https://tailwindcss.com/docs/flex-direction)

[List of colour options](https://tailwindcss.com/docs/customizing-colors)

<br />
<br />

## Examples

### Formik

An example for the basic usage of formik can be found at `src/pages/examples/formik.js`.

In the example you can find:
- Basic setup for formik
- Some basic Tailwind styling
- How to apply specific styling when hovering an html element
- How to apply specific styling when focusing an html element


### URQL

An example for the usage of URQL can be found at `src/pages/examples/urql.js`.

In the example you can find:
- Running a query without paramaters
- Passing in a paramater to a query
- Calling a mutation
- Some basic tailwind styling


<br />
<br />

## Backend Tasks

- In `core/models.py` Create a GuestBookEntry model with the following fields

  - `slug` uuid field (can be taken from the ExampleModel)
  - `username` with a max length of 50 characters
  - `message` textarea
  - `created_at` DateField which should automatically be set on model creation

- In `core/schema.py` add the following graphql endpoints

  - A Query to view all GuestBookEntry objects
  - A Query to view a specific GuestBookEntry using the slug
  - A Mudation for creating a GuestBookEntry object
  - A Mutation for deleting a GuestBookEntry object

- After you have created the above end-points and the Front-end for them, Add pagination to the query for all GuestBookEntry objects
  <br />
  <br />

## Frontend Tasks

- Create a Component with a Formik form which will call your create GuestBookEntry mutation

  - the formik onSubmit event should run the mutation you made for creating a GuestBookEntry
  - Clicking create should take them back to guestbook/ [NextJS Router](https://nextjs.org/docs/api-reference/next/router)
  - Formik validation to ensure the message is under 255 characters
  - Formik validation to ensure the username is under 50 characters
  - Update `pages/guestbook/create.js` to display the component

- Create a Component for displaying the data of a GuestBookEntry object

  - Update `pages/guestbook/[slug].js` to display the component

- Update `pages/index.js` to display the results of the all GuestBookEntry query

  - There should be a link on each object that takes you to `pages/guestbook/[slug].js` to view the details [NextJS Link](https://nextjs.org/docs/api-reference/next/link#if-the-route-has-dynamic-segments)
  - There should also be a button on each object to delete the GuestBookEntry object

- Styling
  - Apply TailwindCSS classes to style your pages, forms, components to be aesthetically pleasing.
  - Add focus and hover states where possible, you can see more info on that here [https://tailwindcss.com/docs/hover-focus-and-other-states](https://tailwindcss.com/docs/hover-focus-and-other-states)
  - Use font-weight or colour to give emphasis to elements

<br />
<br />
