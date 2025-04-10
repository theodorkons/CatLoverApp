# Catlover

A React application for cat enthusiasts, powered by [The Cat API](https://developers.thecatapi.com/). It provides three distinct views for browsing random cat images, exploring cat breeds, and managing your favorite cat images. This project is built with **Vite** for a fast development workflow and leverages **Tailwind CSS**, **React Router**, **TanStack Query**, and **Framer Motion** for smooth animations.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Improvements](#Improvements)
- [Deployment](#deployment)

## Features

1. **Random Cat Images (View 1)**

   - Fetch 10 random cat images from The Cat API.
   - Display them in a grid with a "Load More" button to fetch additional images.
   - Clicking on an image opens a **Flip Modal**. By default, the front side shows the cat image itself. Clicking the image in the modal flips it to reveal more breed information on the back side (if available).
   - The modal has a shareable URL, allowing others to see the same image directly.
   - Mark images as favorites using a form inside the modal.

2. **Cat Breeds (View 2)**

   - Displays a list of cat breeds.
   - Each breed opens a modal showing cat images for that breed.
   - Each of those breed images can be clicked to open the same cat info modal from View 1, showing a larger image and breed info.

3. **Favorite Cats (View 3)**

   - Displays a grid of all your favorited cat images.
   - Remove an image from favorites via a provided UI control.

## Technologies

- **React** with **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **TanStack Query**
- **Framer Motion**
- **npm**

### Prerequisites

- **Node.js**
- **npm**for package management
- **(Optional) Postman** or any HTTP client for testing API endpoints

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/theodorkons/CatLoverApp
   cd CatLoverApp
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Environment Configuration

Create a `.env` file in the root directory and add your TMDB API key:

```plaintext
# The Cat API Key
VITE_CAT_API_KEY=your_cat_api_key_here

# The Cat API Base URL
VITE_CAT_API_BASE_URL="https://api.thecatapi.com/v1"
```

## Running the Application

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Access the application**: Open your browser and navigate to `http://localhost:5173/`.

## Usage

1. **Random Cat Images**

   - On the homepage ("/"), you’ll see a grid of 10 random cat images.
   - Click on an image to open a Flip Modal. The front side shows the cat image, and clicking that image again flips the modal to reveal breed details (if available).
   - Load More button fetches and appends additional random images to the list.

2. **Cat Breeds**

   - Navigate to the "/breeds" route to see a list of cat breeds.
   - Clicking on any breed opens a modal with multiple images of that breed.
   - Each breed image links to the same cat info modal as in View 1, displaying the cat’s image and breed info.

3. **Favorite Cats**

   - Navigate to the "/favourites" route to see a grid of your favorited cat images.
   - Remove favorites by clicking the heart icon.

4. **Modal URLs**

   - When a modal is open, the URL updates with query parameters.
   - Copy and share this URL to allow others to open the same cat image directly.

## Improvements

    - Write unit tests and integration tests to validate components, API calls, and overall application flow.

## Deployment

CatLoverApp is deployed on Vercel. You can access it here:
[CatLoverApp on Vercel](https://cat-lover-app-nine.vercel.app/)

---
