# REST API for blog posts

> A posts API that can be used to query information about blog posts with tags. Fully compliant with the JSON API specification. The API always returns a JSON response and implements REST to access resources.

## Table of Contents

1. [Requirements](#requirements)
2. [Usage](#Usage)
3. [API Routes](#REST-API-Routes)
4. [API Examples](#API-Examples)
5. [Testing](#Testing)
6. [Future Features](#Future-features)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.10.0

## Usage
Insert API client ID and secret in server/config/indexExample.js, then rename it to index.js.
 
From within the root directory:
```sh
npm install
npm start
```
- In a browser, go to: localhost:3000

## REST API Routes

| Type  | Route | Description |
| ------------- | ------------- |------------- |
| GET  | ```/api/ping```  | Returns a 200 response affirming the API is working |
| GET  | ```/api/posts```  | Returns posts in JSON format. The 'tags' query parameter is requied. SortBy and direction params are optional. |

```/api/posts?tags={tags}```
| Field  | Type | Description | Example | 
| ------------- | ------------- |------------- |------------- |
| tags  | ```String (required)```  | Comma delimited tags | health,tech,history |
| sortBy  | ```String (optional)```  | One of id, reads, likes, or popularity | popularity |
| direction  | ```String (optional)```  | Whether to sort ascending or descending order. One of asc or desc | desc |

## API Examples

- Ping:
```GET: /api/ping/```
```
{
  data: {
    success: true
  };
}
  ```

- Posts:
```GET: /api/posts?tags=tech```
```
{
  "posts": [
    {
      "author": "Rylee Paul",
      "authorId": 9,
      "id": 1,
      "likes": 960,
      "popularity": 0.13,
      "reads": 50361,
      "tags": [
        "tech",
        "health"
      ]
    },
    ...
  ]
}
  ```

- SortBy:
```GET: /api/posts?tags=tech&sortBy=likes```
```
{
  "posts": [
    {
      "author": "Bryson Bowers",
      "authorId": 6,
      "id": 85,
      "likes": 25,
      "popularity": 0.18,
      "reads": 16861,
      "tags": [
        "tech"
      ]
    },
    ...
  ]
}
  ```

- direction:
```GET: /api/posts?tags=tech&sortBy=likes&direction=desc```
```
{
  "posts": [
    {
      "author": "Jon Abbott",
      "authorId": 4,
      "id": 95,
      "likes": 985,
      "popularity": 0.42,
      "reads": 55875,
      "tags": [
        "politics",
        "tech",
        "health",
        "history"
      ]
    },
    ...
  ]
}
  ```

## Testing

From within the root directory:
```sh
npm test
```

## Future features
Todo:
  - Add Redis caching (it's late and I have to go to bed)
  - Deploy to AWS, horizontally scale EC2 instances
  - Support additional endpoints for field selection
  - More comprehensive payloads with custom error messages
  - Allow overriding HTTP method to support certain proxies
  - Allow pagination

