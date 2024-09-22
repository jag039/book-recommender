# Book Recommender System

This project is a book recommendation system that allows users to search for books, save their favorite ones with ratings, and get personalized recommendations using machine learning. The front-end is built with **React**, while the back-end is powered by **Flask** with **PyTorch** for generating book recommendations based on user input.

## Features

- **Search for Books**: Users can search for books by title from a dataset of books in CSV format.
- **Save Books**: Users can save books with a rating (1-5) to their local collection stored in `localStorage`.
- **Book Recommendations**: Based on the user's saved book ratings, the system generates personalized book recommendations using cosine similarity between book embeddings.
- **Book Ratings**: The system allows users to rate the books they save, which is then used to generate more accurate recommendations.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Endpoints](#endpoints)
5. [Future Enhancements](#future-enhancements)

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **TypeScript**: Used in React for type safety.
- **Tailwind CSS**: For styling components.

### Backend:
- **Flask**: Python web framework for handling the API.
- **PyTorch**: For machine learning computations.
- **Pandas**: For handling the book dataset.
- **Torch Embeddings**: Pre-trained book embeddings used for similarity calculations.

### Data:
- **books.csv**: A CSV file containing book information such as title, author, and book ID.
- **book_embeddings.pth**: A PyTorch file that contains pre-trained embeddings of books.


## Installation

### Prerequisites

- **Node.js** (for frontend)
- **Python 3.8+** (for backend)
- **PyTorch** (for machine learning in the backend)
- **Flask** (for backend server)

### Frontend Setup

1. Navigate to the `frontend` folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

   The app will run on `http://localhost:3000`.

### Backend Setup

1. Navigate to the `backend` folder:

    ```bash
    cd backend
    ```

2. Create a virtual environment and install dependencies:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3. Start the Flask API:

    ```bash
    python app.py
    ```

   The backend will run on `http://localhost:5000`.

## Usage

### 1. Search for Books
- Navigate to the homepage.
- Use the search bar to search for books by title.
- The search results will be displayed in a grid format.

### 2. Save a Book with a Rating
- Click on a book to open a modal.
- Rate the book (1-5) and confirm to save it in `localStorage`.

### 3. Get Book Recommendations
- Go to the "Get Recommendations" page.
- Click the **Get Recommendations** button to retrieve book suggestions based on your saved ratings.
- You can choose between different recommendation algorithms (currently only **Cosine Similarity**).

## Endpoints

The backend provides the following endpoint for generating book recommendations:

### `POST /recommend_cos_sim`

**Description**: Recommends books based on cosine similarity between the user's saved book ratings and all available books.

**Request Body**:

```
json
{
  "ratings": [
    { "userId": 0, "bookId": 1, "rating": 4 },
    { "userId": 0, "bookId": 23, "rating": 5 }
  ]
}
```

**Response**:

```
[
  { "title": "Book Title 1" },
  { "title": "Book Title 2" },
  ...
]
```

## Future Enhancements
1. **Expectation Maximization Algorithm**: Implement the additional algorithm for generating book recommendations.
2. **Authentication**: Add user authentication to allow users to securely save their favorite books and ratings.
3. **Pagination**: Implement pagination for search results and recommendation lists.
4. **Enhanced UI**: Add more detailed book information in the recommendation list, such as cover images, authors, and descriptions.

