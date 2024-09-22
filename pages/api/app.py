import torch
import torch.nn.functional as F
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

df_books = pd.read_csv('/Users/jesusgonzalez/BookProject/book-recommender/public/assets/BOOKS/books.csv')
book_embeddings = torch.load('/Users/jesusgonzalez/BookProject/book-recommender/public/assets/book_embeddings.pth')
all_books = set(df_books['book_id'].unique())

def get_new_user_embedding(new_user_ratings, book_embeddings):
    user_embedding = torch.zeros_like(book_embeddings[0])
    for rating in new_user_ratings:
        book_id = rating['bookId']  # Access the value of 'bookId' correctly
        book_embedding = book_embeddings[int(book_id) - 1]  # Convert the value to an integer
        user_embedding += rating['rating'] * book_embedding
    user_embedding /= len(new_user_ratings)
    return user_embedding


def get_recommendations_using_cos_sim(new_user_embedding, book_embeddings, all_books):
    predictions = []
    with torch.no_grad():
        for book_id in all_books:
            book_emb = book_embeddings[book_id-1]
            cos_sim = F.cosine_similarity(new_user_embedding, book_emb, dim=0)
            predictions.append((book_id, cos_sim.item())) 
    predictions.sort(key=lambda x: x[1], reverse=True)
    return predictions

@app.route('/recommend_cos_sim', methods=['POST'])
def recommend_cos_sim():
    data = request.json
    new_user_ratings = data['ratings']
    new_user_embedding = get_new_user_embedding(new_user_ratings, book_embeddings)
    recommendations = get_recommendations_using_cos_sim(new_user_embedding, book_embeddings, all_books)
    
    top_recommendations = []
    for recommendation in recommendations[:50]:
        book_id = recommendation[0]
        title = df_books[df_books['book_id'] == book_id]['title'].values[0]
        predicted_rating = recommendation[1]
        # top_recommendations.append({'title': title, 'book_id': book_id, 'predicted_rating': predicted_rating})
        top_recommendations.append({'title': title})
    
    return jsonify(top_recommendations)

if __name__ == '__main__':
    app.run(debug=True)