import React, { useState, useEffect } from 'react';
import SimpleModal from "./simpleModal"

const SearchBooks: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [rating, setRating] = useState<number>(4);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await fetch('/assets/BOOKS/books.csv');
                const text = await response.text();
                const parsedBooks = parseCSV(text);
                setBooks(parsedBooks);
            } catch (error) {
                console.error('Error fetching or parsing CSV:', error);
            }
        };
        loadBooks();
    }, []);

    function parseCSV(csv: string): any[] {
      const lines = csv.trim().split('\n'); // Filter out empty lines
      const headers = lines[0].split(',').map(header => header.trim());
      
      return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const entry: any = {};
        headers.forEach((header, index) => {
          entry[header] = values[index] || ''; // Handle missing values
        });
        return entry;
      });
    }

    function searchByTitle(query: string): any[] {
        return books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const searchResults = searchByTitle(query);
        const limitedResults = searchResults.slice(0, 50);
        setResults(limitedResults);
    }

    function saveBookLocally(book: any) {
        setModalOpen(false);
        const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
        const isBookAlreadySaved = savedBooks.some((savedBook: any) => savedBook.book_id === book.book_id);
        if (!isBookAlreadySaved) {
            const bookWithRating = { ...book, rating };
            savedBooks.push(bookWithRating);
            localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
            console.log(`Book saved: ${book.title} with rating: ${rating}`);
        } else {
            console.log(`Book already saved: ${book.title}`);
        }
        setRating(4)
    }

    function deleteFromLocal(bookId: number) {
        let savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
        savedBooks = savedBooks.filter((savedBook: any) => savedBook.book_id !== bookId);
        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
        console.log(`Book deleted with ID: ${bookId}`);
    }

    function handleBookClick(book: any) {
        setSelectedBook(book);
        setModalOpen(true);
    }

    // TODO: allow user to select which books they want their recomendations based on
    return (
        <div>
            <div className="flex flex-col items-center">
                <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                    <input 
                        type="text" 
                        value={query} 
                        onChange={handleInputChange} 
                        placeholder="Search for a book by title"
                        className="bg-blue-200 w-56 p-2 rounded-md"
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Search
                    </button>
                </form>
                <div className="p-4">
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {results.map((book, index) => (
                        <div onClick={() => handleBookClick(book)} key={index} className="flex flex-col bg-white border border-gray-200 rounded-md shadow-md overflow-hidden hover:bg-gray-300 transition-colors duration-300">
                          <div className="flex justify-center items-center p-4">
                            <img src={book.small_image_url} alt={book.title} className="h-48 w-32 object-cover" />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-black">{book.title}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No results found</p>
                  )}
                </div>
            </div>

            <SimpleModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className='flex flex-col gap-2'>
                    <p>Do you want to add this book to your collection?</p>
                    <div className='flex gap-3'>
                        <p>If so rate this book 1-5:</p>
                        <input className='grow text-center' type="number" min="1" max="5"                             value={rating} 
                            onChange={(e) => setRating(Number(e.target.value))}/>
                    </div>
                    <button onClick={() => saveBookLocally(selectedBook)} className="bg-blue-500 justify-center text-white px-2 rounded-xl hover:bg-blue-600 transition duration-300 ease-in-out transform">Confirm</button>
                </div>
            </SimpleModal>
        </div>
    );
};

export default SearchBooks;
