# HackerOne REST API

> A HackerOne API that can be used to query information about reports. Fully compliant with the JSON API specification. The API always returns a JSON response and implements REST to access resources.

## Table of Contents

1. [Requirements](#requirements)
2. [Seeding Database](#Seeding-Database)
3. [Usage](#Usage)
4. [REST API Routes](#REST-API-Routes)
5. [API Examples](#API-Examples)
6. [Testing](#Testing)
7. [Future Features](#Future-features)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.10.0

### Seeding Database

## Usage

From within the root directory:
```sh
npm install
npm start
npm run seed
```
- In a broswer, go to: localhost:3000

## REST API Routes

| Type  | Route | Description |
| ------------- | ------------- |------------- |
| GET  | ```/api/v1/reports```  | Responds with entry in database corresponding to specified id. Responds with 200 status code if successful, 404 if not found. |
| PUT  | ```/api/v1/reports```  | Updates entry corresponding to specified id and responds with 200 status code if successful, 404 if entry is not found. |
| POST  | ```/api/v1/reports```  | Responds with entry in database corresponding to specified id. Responds with 201 status code if successful, 400 if the request is malformed. See example request body. |
| DELETE  | ```/api/v1/reports```  | Deletes entry corresponding to specified id and responds with 204 status code upon successful scheduling. A 404 status code is sent if no such entry exists. |

## API Examples

- Read all Report objects, example response (enveloped):
```GET: /api/v1/reports```
```
{
  data: [{
    "_id": "1337",
    "type": "report",
    "attributes": {
      "title": "XSS in login form",
      "created_at": "2016-02-02T04:05:06.000Z",
    },
    "relationships": {
      "reporter": {
        "data": {
          "_id": "1337",
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
          "_id": "1337",
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

- Read a single Report object with a particular id:
```GET: /api/v1/reports/:id```
or
```GET: /api/v1/reports?_id=500```

- Create a Report object on the server:
```POST: /api/v1/reports```
Example request body:

```
{
  "type": "report",
  "attributes": {
    "title": "XSS in login form",
  },
  "relationships": {
    "weakness": {
      "data": {
        "type": "weakness",
        "attributes": {
          "name": "Cross-Site Request Forgery (CSRF)",
          "description": "The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.",
        }
      }
    }
  }
}
```

Note: A user with username 'root' is automatically created if user is not specified. Each entry is automatically timestamped. If entry structure differs, a 400 (Bad request) is returned.

- Update a specific Report object:
```PUT: /api/v1/reports``` (Requires "_id" field in request body)
or 
```PUT: /api/v1/reports/:id```
Example request body:

```
{
  "attributes": {
    "title": "New report title",
  }
}
```
- Delete a specific Report object:
```DELETE: /api/v1/reports``` (Requires "_id" field in request body)
or 
```DELETE: /api/v1/reports/:id```
Example request body:

```
{
  "_id": 300
}
```

## Testing

From within the root directory:
```sh
npm test
```

## Future features

```
  Todo:

  - Pagination
  - Filter by users, and Report title
  - Add additional endpoints for returning server-filtered data
```