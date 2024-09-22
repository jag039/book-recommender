import React, { useState } from "react";

interface Rating {
    userId: number;
    bookId: number;
    rating: number;
}

interface Recommendation {
    book_id: number;
    title: string;
    predicted_rating: number;
}

const GetRecommendations: React.FC = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [selectedOption, setSelectedOption] = useState('Cosine Similarity');

    const getRecommendations = async () => {
        console.log(selectedOption)
        if (selectedOption == "Cosine Similarity"){
            cosSim();
        } else if (selectedOption == "Expectation Maximization"){
            cosSim()
        }
    }

    const cosSim = async () => {
        let userRatings: Rating[] = [];
        const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
        savedBooks.forEach((book: any) => {
            userRatings.push({ userId: 0, bookId: book.book_id, rating: book.rating });
        });

        try {
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ratings: userRatings }),
            });

            const data: Recommendation[] = await response.json();
            setRecommendations(data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    const handleSelectChange = (e: any) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="flex flex-col h-screen p-2">
            <div className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-95 flex flex-col items-center space-x-4">
                <button
                    
                    onClick={getRecommendations}
                >
                    Get Recommendations
                </button>
                <select className="text-black rounded-md px-2 py-1 h-7 w-5/6" value={selectedOption} onChange={handleSelectChange}>
                    <option value="Cosine Similarity">Cosine Similarity</option>
                    <option value="Expectation Maximization">Expectation Maximization</option>
                </select>
            </div>

            <div className="mt-4 flex-grow overflow-y-auto">
                <ul className="space-y-2">
                    {recommendations.map((rec) => (
                        <li
                            key={rec.book_id}
                            className="bg-blue-100 text-gray-700 rounded-lg p-4 shadow-md hover:bg-blue-200 transition duration-300 ease-in-out transform hover:scale-95"
                        >
                            {rec.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GetRecommendations;
