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
| POST  | ```/api/reports```  | Responds with entry in database corresponding to specified id. Responds with 200 status code if successful, 404 if not found. See example request body. |
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
  "id": "1337",
  "type": "report",
  "attributes": {
    "title": "XSS in login form",
    "state": "new",
    "created_at": "2016-02-02T04:05:06.000Z",
    "vulnerability_information": "...",
    "triaged_at": null,
    "closed_at": null,
    "last_reporter_activity_at": null,
    "first_program_activity_at": null,
    "last_program_activity_at": null,
    "bounty_awarded_at": null,
    "swag_awarded_at": null,
    "disclosed_at": null,
    "last_public_activity_at": null,
    "last_activity_at": null,
    "issue_tracker_reference_url": "https://example.com/reference",
    "cve_ids": []
  },
  "relationships": {
    "reporter": {
      "data": {
        "id": "1337",
        "type": "user",
        "attributes": {
          "username": "api-example",
          "name": "API Example",
          "disabled": false,
          "created_at": "2016-02-02T04:05:06.000Z",
          "profile_picture": {
            "62x62": "/assets/avatars/default.png",
            "82x82": "/assets/avatars/default.png",
            "110x110": "/assets/avatars/default.png",
            "260x260": "/assets/avatars/default.png"
          },
          "reputation": 7,
          "signal": 7.0,
          "impact": 30.0
        }
      }
    },
    "program": {
      "data": {
        "id": "1337",
        "type": "program",
        "attributes": {
          "handle": "security",
          "created_at": "2016-02-02T04:05:06.000Z",
          "updated_at": "2016-02-02T04:05:06.000Z"
        }
      }
    },
    "swag": {
      "data": [

      ]
    },
    "attachments": {
      "data": [

      ]
    },
    "weakness": {
      "data": {
        "id": "1337",
        "type": "weakness",
        "attributes": {
          "name": "Cross-Site Request Forgery (CSRF)",
          "description": "The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.",
          "external_id": "cwe-352",
          "created_at": "2016-02-02T04:05:06.000Z"
        }
      }
    },
    "activities": {
      "data": [

      ]
    },
    "bounties": {
      "data": [

      ]
    },
    "summaries": {
      "data": [

      ]
    }
  }
}
  ```

If entry structure differs, a 400 (Bad request) is returned.

