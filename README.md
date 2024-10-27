# Blog Post Viewer

## Project Overview

This project is a simple blog post viewer application built with React and Redux Toolkit. It demonstrates skills in:

- Working with layouts
- UI design
- State management
- REST API integration
- Attention to technical requirements

## Technologies Used

- Vite
- React (Functional components)
- Redux Toolkit
- SCSS

## Features

### Home Page

- Displays a list of blog posts
  - Post image
  - Post title
  - Author name
  - Link to detailed view
- Pagination (10 posts per page)

### Detailed Post View

- Displays full post information
  - Post image
  - Post title
  - Author name
  - Post content

## API Integration

The application integrates with the following APIs:

- Post list: GET `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1`
- User list: GET `https://jsonplaceholder.typicode.com/users`
- Single post: GET `https://jsonplaceholder.typicode.com/posts/<id>`
- Single user: GET `https://jsonplaceholder.typicode.com/users/<id>`
- Random image: SRC `https://picsum.photos/1500/1500.jpg`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
