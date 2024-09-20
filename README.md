
# Manufactura Web

This project is the frontend for the Manufacture API, built with Angular 17. It provides a user interface to manage the stock of products in a manufacturing plant. The frontend allows the following operations:

- View products in stock, filtered by status.
- Register new products (individual and massive).
- Mark products as defective.
- Register the exit of products.

### Tech Stack

- Angular: Version 17.3.8 (CLI).
- Angular Material: For UI components.
- TypeScript.
- JWT Authentication: Integrated with the backend API.

### Requirements

- Node.js 18+
- npm (Node Package Manager)
- Angular CLI 17.3.8

## Run Locally

Clone the project

```bash
  git clone https://github.com/Brayan9812omeroN/ManufacturaWeb.git
```

Go to the project directory

```bash
  cd ManufacturaWeb
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ng serve
```

### Build the project

If you want to build the project for production, run:

```bash
  ng build --prod

```

The production-ready files will be generated in the folder.`dist/`
## API Integration

This frontend consumes the RESTful API provided by the Manufacture API backend, which handles all the business logic and data management. Make sure the backend is running at `http://localhost:8080` or configure the `apiUrl` in the environment files:

```bash
  // src/environments/environment.ts
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080'
  };


```

If you need more information, you can consult the backend repository:
- Backend repository: [Manufacture API](https://github.com/Brayan9812omeroN/Manufacture-API.git)
## Authentication

This app uses JWT tokens for authentication. After logging in, the token is stored and automatically included in API requests. The login is handled through the endpoint.
`/auth/login`
## Support

For support, email `brayan2402romero@gmail.com` 


## Authors

- [@Brayan Romero](https://github.com/Brayan9812omeroN)


## Sources

- Angular. (s. f.). https://v17.angular.io/docs 
- CodigoEstudiante. (s. f.). GitHub - CodigoEstudiante/126_ANGULAR17_AUTHENTICATION_JWT. GitHub. https://github.com/CodigoEstudiante/126_ANGULAR17_AUTHENTICATION_JWT.git
