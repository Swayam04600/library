import { useState, useEffect } from 'react';
import { Book, Member, Checkout, BookStatus, MemberStatus } from '../types';
import { format, addDays, subDays } from 'date-fns';

// Sample data for books
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'available',
    genre: 'Fiction',
    publicationYear: 1960,
    description: 'A classic novel about racial injustice and moral growth in the American South.',
    isbn: '9780061120084',
    publisher: 'HarperCollins',
    language: 'English',
    pages: 324,
    totalCheckouts: 142,
    totalReservations: 8,
    checkoutHistory: [
      {
        id: 'ch1',
        memberId: '1',
        memberName: 'John Smith',
        checkedOutDate: 'Mar 15, 2023',
        dueDate: 'Mar 29, 2023',
        returnDate: 'Mar 27, 2023',
      },
      {
        id: 'ch2',
        memberId: '3',
        memberName: 'Emma Davis',
        checkedOutDate: 'Feb 2, 2023',
        dueDate: 'Feb 16, 2023',
        returnDate: 'Feb 12, 2023',
      }
    ]
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'borrowed',
    genre: 'Classic',
    publicationYear: 1925,
    description: 'A novel depicting the extravagance of the Jazz Age and the American Dream.',
    isbn: '9780743273565',
    publisher: 'Scribner',
    language: 'English',
    pages: 180,
    totalCheckouts: 98,
    totalReservations: 5
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'available',
    genre: 'Fantasy',
    publicationYear: 1937,
    description: 'A fantasy novel about the journey of Bilbo Baggins to reclaim dwarf treasure from a dragon.',
    isbn: '9780547928227',
    publisher: 'Houghton Mifflin',
    language: 'English',
    pages: 310,
    totalCheckouts: 211,
    totalReservations: 12
  },
  {
    id: '4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverUrl: 'https://images.pexels.com/photos/2767814/pexels-photo-2767814.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'reserved',
    genre: 'Non-fiction',
    publicationYear: 2011,
    description: 'A book exploring the history and impact of Homo sapiens on the world.',
    isbn: '9780062316097',
    publisher: 'Harper',
    language: 'English',
    pages: 443,
    totalCheckouts: 76,
    totalReservations: 15
  },
  {
    id: '5',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    coverUrl: 'https://images.pexels.com/photos/3956089/pexels-photo-3956089.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'available',
    genre: 'Science Fiction',
    publicationYear: 2008,
    description: 'A dystopian novel set in a future where children compete in a televised fight to the death.',
    isbn: '9780439023481',
    publisher: 'Scholastic',
    language: 'English',
    pages: 374,
    totalCheckouts: 187,
    totalReservations: 9
  },
  {
    id: '6',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'borrowed',
    genre: 'Romance',
    publicationYear: 1813,
    description: 'A classic novel of manners about the relationship between Elizabeth Bennet and Mr. Darcy.',
    isbn: '9780141439518',
    publisher: 'Penguin Classics',
    language: 'English',
    pages: 432,
    totalCheckouts: 154,
    totalReservations: 6
  },
  {
    id: '7',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.pexels.com/photos/3747531/pexels-photo-3747531.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'lost',
    genre: 'Dystopian',
    publicationYear: 1949,
    description: 'A dystopian novel set in a totalitarian society where critical thought is suppressed.',
    isbn: '9780451524935',
    publisher: 'Signet Classic',
    language: 'English',
    pages: 328,
    totalCheckouts: 201,
    totalReservations: 11
  },
  {
    id: '8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverUrl: 'https://images.pexels.com/photos/3696663/pexels-photo-3696663.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'processing',
    genre: 'Fiction',
    publicationYear: 1988,
    description: 'A philosophical novel about a shepherd boy seeking his personal legend.',
    isbn: '9780062315007',
    publisher: 'HarperOne',
    language: 'English',
    pages: 197,
    totalCheckouts: 132,
    totalReservations: 7
  }
];

// Sample data for members
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    status: 'active',
    booksCheckedOut: 3,
    memberSince: new Date(2022, 5, 12),
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    birthdate: new Date(1985, 3, 15),
    overdueBooks: 0,
    feesDue: 0,
    currentCheckouts: [
      {
        id: 'co1',
        bookId: '2',
        bookTitle: 'The Great Gatsby',
        memberId: '1',
        memberName: 'John Smith',
        checkedOutDate: new Date(2023, 3, 10),
        dueDate: new Date(2023, 3, 24),
        status: 'active'
      },
      {
        id: 'co2',
        bookId: '6',
        bookTitle: 'Pride and Prejudice',
        memberId: '1',
        memberName: 'John Smith',
        checkedOutDate: new Date(2023, 3, 15),
        dueDate: new Date(2023, 3, 29),
        status: 'active'
      }
    ],
    checkoutHistory: [
      {
        id: 'ch1',
        bookId: '1',
        bookTitle: 'To Kill a Mockingbird',
        memberId: '1',
        memberName: 'John Smith',
        checkedOutDate: new Date(2023, 2, 15),
        dueDate: new Date(2023, 2, 29),
        returnDate: new Date(2023, 2, 27),
        status: 'returned'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    status: 'active',
    booksCheckedOut: 1,
    memberSince: new Date(2022, 7, 5),
    phone: '(555) 987-6543',
    address: '456 Elm St, Somewhere, USA',
    birthdate: new Date(1990, 6, 22),
    overdueBooks: 1,
    feesDue: 2.50,
    currentCheckouts: [
      {
        id: 'co3',
        bookId: '4',
        bookTitle: 'Sapiens: A Brief History of Humankind',
        memberId: '2',
        memberName: 'Jane Doe',
        checkedOutDate: new Date(2023, 2, 20),
        dueDate: new Date(2023, 3, 3),
        status: 'overdue'
      }
    ]
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    status: 'inactive',
    booksCheckedOut: 0,
    memberSince: new Date(2021, 11, 10),
    phone: '(555) 456-7890',
    address: '789 Oak Ave, Elsewhere, USA',
    overdueBooks: 0,
    feesDue: 0
  },
  {
    id: '4',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    status: 'suspended',
    booksCheckedOut: 0,
    memberSince: new Date(2022, 3, 18),
    phone: '(555) 246-8102',
    address: '321 Pine Rd, Nowhere, USA',
    overdueBooks: 2,
    feesDue: 15.75,
    notes: 'Account suspended due to lost books and unpaid fees.'
  },
  {
    id: '5',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    profileImageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'active',
    booksCheckedOut: 2,
    memberSince: new Date(2022, 9, 30),
    phone: '(555) 135-7924',
    address: '654 Maple Dr, Anytown, USA',
    birthdate: new Date(1988, 9, 14),
    overdueBooks: 0,
    feesDue: 0
  },
  {
    id: '6',
    name: 'David Brown',
    email: 'david.brown@example.com',
    profileImageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'active',
    booksCheckedOut: 4,
    memberSince: new Date(2023, 0, 15),
    phone: '(555) 864-2097',
    address: '987 Cherry Ln, Somewhere, USA',
    birthdate: new Date(1975, 5, 8),
    overdueBooks: 0,
    feesDue: 0
  },
  {
    id: '7',
    name: 'Olivia Wilson',
    email: 'olivia.wilson@example.com',
    status: 'pending',
    booksCheckedOut: 0,
    memberSince: new Date(2023, 4, 2),
    phone: '(555) 753-1908',
    address: '159 Birch St, Elsewhere, USA',
    birthdate: new Date(1995, 2, 27),
    overdueBooks: 0,
    feesDue: 0,
    notes: 'Pending approval of application and ID verification.'
  }
];

// Sample data for checkouts
const mockCheckouts: Checkout[] = [
  {
    id: 'co1',
    bookId: '2',
    bookTitle: 'The Great Gatsby',
    bookCover: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=800',
    memberId: '1',
    memberName: 'John Smith',
    checkedOutDate: new Date(2023, 3, 10),
    dueDate: new Date(2023, 3, 24),
    status: 'active'
  },
  {
    id: 'co2',
    bookId: '6',
    bookTitle: 'Pride and Prejudice',
    bookCover: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=800',
    memberId: '1',
    memberName: 'John Smith',
    checkedOutDate: new Date(2023, 3, 15),
    dueDate: new Date(2023, 3, 29),
    status: 'active'
  },
  {
    id: 'co3',
    bookId: '4',
    bookTitle: 'Sapiens: A Brief History of Humankind',
    bookCover: 'https://images.pexels.com/photos/2767814/pexels-photo-2767814.jpeg?auto=compress&cs=tinysrgb&w=800',
    memberId: '2',
    memberName: 'Jane Doe',
    checkedOutDate: new Date(2023, 2, 20),
    dueDate: new Date(2023, 3, 3),
    status: 'overdue'
  },
  {
    id: 'co4',
    bookId: '1',
    bookTitle: 'To Kill a Mockingbird',
    bookCover: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=800',
    memberId: '1',
    memberName: 'John Smith',
    checkedOutDate: new Date(2023, 2, 15),
    dueDate: new Date(2023, 2, 29),
    returnDate: new Date(2023, 2, 27),
    status: 'returned'
  },
  {
    id: 'co5',
    bookId: '3',
    bookTitle: 'The Hobbit',
    bookCover: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=800',
    memberId: '5',
    memberName: 'Sarah Williams',
    checkedOutDate: new Date(2023, 3, 5),
    dueDate: new Date(2023, 3, 19),
    status: 'active'
  },
  {
    id: 'co6',
    bookId: '5',
    bookTitle: 'The Hunger Games',
    bookCover: 'https://images.pexels.com/photos/3956089/pexels-photo-3956089.jpeg?auto=compress&cs=tinysrgb&w=800',
    memberId: '6',
    memberName: 'David Brown',
    checkedOutDate: new Date(2023, 3, 8),
    dueDate: addDays(new Date(), 2),
    status: 'active'
  },
  {
    id: 'co7',
    bookId: '8',
    bookTitle: 'The Alchemist',
    bookCover: 'https://images.pexels.com/photos/3696663/pexels-photo-3696663.jpeg?auto=compress&cs=tinysrgb&w=800',
    memberId: '6',
    memberName: 'David Brown',
    checkedOutDate: new Date(2023, 2, 25),
    dueDate: new Date(2023, 3, 8),
    returnDate: new Date(2023, 3, 7),
    status: 'returned'
  }
];

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadBooks = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setBooks(mockBooks);
      setIsLoading(false);
    };

    loadBooks();
  }, []);

  return { books, isLoading };
}

export function useBook(id: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadBook = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const foundBook = mockBooks.find(book => book.id === id) || null;
      setBook(foundBook);
      setIsLoading(false);
    };

    loadBook();
  }, [id]);

  return { book, isLoading };
}

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadMembers = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMembers(mockMembers);
      setIsLoading(false);
    };

    loadMembers();
  }, []);

  return { members, isLoading };
}

export function useMember(id: string) {
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadMember = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const foundMember = mockMembers.find(member => member.id === id) || null;
      setMember(foundMember);
      setIsLoading(false);
    };

    loadMember();
  }, [id]);

  return { member, isLoading };
}

export function useCheckouts() {
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadCheckouts = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCheckouts(mockCheckouts);
      setIsLoading(false);
    };

    loadCheckouts();
  }, []);

  return { checkouts, isLoading };
}