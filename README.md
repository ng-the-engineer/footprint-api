# Footprint Api

## Quick start

In project root, run

```
$ docker-compose up -d
```

To create footprint

```
curl --location --request POST 'http://localhost:5010/visit' \
--header 'Content-Type: application/json' \
--data-raw '{
  "url": "http://YOUR_URL",
  "element": "home"
 }'
```

To retrieve by date range

```
http://localhost:5010/visits?startDate=2021-06-09&endDate=2021-06-09
```

## Development

- Live code update in Docker container

- The backend container starts with `nodemon ./build/app.js` by `CMD ["yarn", "dev"]`.
  The `/app/build` folder in the container is mounted to host machine project folder `footprint-api/backend/build`.

- On host machine, run `yarn build` to use nodemon to run Typescript compile upon code change.

- Run `docker logs footprint-api_backend_1 -f` for viewing changes.

## Unit test

Run `npx jest`
