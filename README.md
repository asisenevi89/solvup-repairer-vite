# Repairer Frontend

## Tech Spec
- ReactJs
- Vite
- Typescript
- Storybook

## Node version
 - `v22.14.0`

## Setup
- go into directory
- copy `.env.example` and paste `.env`
- update `VITE_BACKEND_URL`, `VITE_SOLVUP_BACKEND_URL` and `VITE_GOOGLE_MAP_API_KEY` accordingly
- run `npm install`
- run `npm run dev`

## Create a Production Build
- go into directory
- run `npm run build` command
- Build content will be create in the `/build` directory
- Serve the contents from the `/build` directory. (Point WebServer's root to this or use `serve -s /build` command)

## Run StoryBook
- go into directory
- run `npm run storybook` command


## Create a Production Instance of StoryBook
- go into directory
- run `npm run build-storybook` command
- Build content will be create in the `/storybook-static` directory
- Serve the contents from the `/storybook-static` directory. (Point WebServer's root to this or use `npx http-server storybook-static` command) 

## Docker Guide 
- go into directory
- build Docker image by running `docker build -t repairer-frontend .`
- create container and run the application `docker run -d -p 80:80 repairer-frontend`
- P.S add `.env` to the `.dockerignore` after configuring environment variables