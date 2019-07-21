# HackerOne REST API

> A HackerOne API that can be used to query information about reports. Fully compliant with the JSON API specification. The API always returns a JSON response and implements REST to access resources.

## Table of Contents

1. [Requirements](#requirements)
2. [Seeding Database](#Seeding-Database)
3. [Usage](#Usage)
4. [REST API Routes](#REST-API-Routes)
5. [API Examples](#API-Examples)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.10.0

### Seeding Database

## Usage

From within the root directory:
```sh
npm install
npm run build
npm start
```
- In a broswer, go to: localhost:3000

## REST API Routes

| Type  | Route | Description |
| ------------- | ------------- |------------- |
| GET  | ```/api/reports```  | Responds with entry in database corresponding to specified id. Responds with 200 status code if successful, 404 if not found. |
| PUT  | ```/api/reports```  | Updates entry corresponding to specified id and responds with 200 status code if successful, 204 if entry is not found. |
| POST  | ```/api/reports```  | Responds with entry in database corresponding to specified id. Responds with 201 status code if successful, 404 if not found. See example request body. |
| DELETE  | ```/api/reports```  | Deletes entry corresponding to specified id and responds with 204 status code upon successful scheduling. A 405 status code is sent if no such entry exists. |

## API Examples

```POST: /api/reports```
Example request body:

```
{
  todo: FILL ME IN
}
  ```

  ```PUT: /api/reports```
Example request body:

```
{
  todo: FILL ME IN
}
```

```GET: /api/reports```
Example response:

```
{
  data: [{
    "id": "1337",
    "type": "report",
    "attributes": {
      "title": "XSS in login form",
      "created_at": "2016-02-02T04:05:06.000Z",
    },
    "relationships": {
      "reporter": {
        "data": {
          "id": "1337",
          "type": "user",
          "attributes": {
            "username": "api-example",
            "name": "API Example",
            "created_at": "2016-02-02T04:05:06.000Z",
          }
        }
      },
      "weakness": {
        "data": {
          "id": "1337",
          "type": "weakness",
          "attributes": {
            "name": "Cross-Site Request Forgery (CSRF)",
            "description": "The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.",
            "created_at": "2016-02-02T04:05:06.000Z"
          }
        }
      }
    }
  }]
}
  ```

If entry structure differs, a 400 (Bad request) is returned.

