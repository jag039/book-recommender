import React, { useState, useEffect } from "react";
import SimpleModal from "./simpleModal";

const Collection: React.FC = () => {
    const [savedBooks, setSavedBooks] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const books = JSON.parse(localStorage.getItem('savedBooks') || '[]');
            setSavedBooks(books);
        }
    }, []);

    function deleteFromLocal(bookId: number) {
        let savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
        savedBooks = savedBooks.filter((savedBook: any) => savedBook.book_id !== bookId);
        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
        setSavedBooks(savedBooks);
        console.log(`Book deleted with ID: ${bookId}`);
        setModalOpen(false)
    }

    function handleBookClick(book: any) {
        setSelectedBook(book);
        setModalOpen(true);
    }

    return (
        <div className="h-screen overflow-y-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedBooks.map((book: any, index: number) => (
                    <div 
                        onClick={() => handleBookClick(book)}
                        key={index} 
                        className="flex flex-col bg-white border border-gray-200 rounded-md shadow-md overflow-hidden hover:bg-gray-300 transition-colors duration-300"
                    >
                        <div className="flex justify-center items-center p-4">
                            <img src={book.small_image_url} alt={book.title} className="h-48 w-32 object-cover" />
                        </div>
                        <div className="flex flex-col gap-3 p-4">
                            <h3 className="text-lg font-semibold text-black">{book.title}</h3>
                            <h3 className="text-lg font-semibold text-black">You rated {book.rating}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <SimpleModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className='flex flex-col gap-2'>
                    <p>Do you want to delete this book from your collection?</p>
                    <button onClick={() => deleteFromLocal(selectedBook.book_id)} className="bg-blue-500 justify-center text-white px-2 rounded-xl hover:bg-blue-600 transition duration-300 ease-in-out transform">Delete</button>
                </div>
            </SimpleModal>


        </div>
    );
};

export default Collection;

