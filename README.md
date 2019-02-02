<h1 align="center"><strong>React PWA Boilerplate</strong></h1>

<p>The purpose of this repo is to get you up and running with a working sample progressive web app.</p>

> **note:** _This is an opinionated set up. However, you can easily replace things like the state management and ui library with anything of your choosing_

## Table of Contents

| Section                       | Description                                                    |
| :---------------------------- | :------------------------------------------------------------- |
| **Getting Started**           | How to pull down the repo and get started with development     |
| **Project Structure**         | Directory structure of the project                             |
| **Service Worker**            | Configuration of Service Worker using **Work Box**             |
| **State Management Setup**    | Redux configuration using **Easy Peasy**                       |
| **State Management DevTools** | Redux devtools configuration                                   |
| **UI Toolkit**                | Abstractions wrapping **Material UI** components               |
| **Routing Setup**             | Configuration for routing and stubbed out Authenticated Routes |
| **Netlify Config**            | Notes on config for **Netlify** to support **react router**    |
| **iOS Support**               | Notes on **iOS** and **Safari** support                        |
| **Additional Resources**      | Resources used to build out this Repo                          |

> **note:** _This project was initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

## Service Worker

- **build step configuration:**
  _this is already set up within the project in the `config-overrides` file._
  <img width="732" alt="screen shot 2019-01-20 at 4 58 36 pm" src="https://user-images.githubusercontent.com/15992455/52167436-ee12fa00-26e8-11e9-8543-f6a4e38fc4bf.png">

## State Management DevTools

- **using tracing on actions within redux:**
  _this is already set up within project. All that's needed on your end is to adjust the configuration on your redux dev tools extension. As shown below_
  ![redux-trace-demo](https://user-images.githubusercontent.com/15992455/52167363-f0288900-26e7-11e9-8ec8-7ac35ab23572.gif)
