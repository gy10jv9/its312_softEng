import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// +------------------------+
// |        Functions       |
// +------------------------+
const findOrCreateAuthor = async (firstName: string, lastName: string) => {
  let author = await prisma.author.findFirst({
    where: { firstName, lastName },
  });

  // ma create author if wala may nakita
  if (!author) {
    author = await prisma.author.create({
      data: { firstName, lastName },
    });
  }

  return author.id;
};

const findOrCreateAdvisor = async (firstName: string, lastName: string) => {
  let advisor = await prisma.advisor.findFirst({
    where: { firstName, lastName },
  });

  // ma create author if wala may nakita
  if (!advisor) {
    advisor = await prisma.author.create({
      data: { firstName, lastName },
    });
  }

  return advisor.id;
};

// +--------------------------------+
// |        Main Controllers        |
// +--------------------------------+
export const addBook = async (req: Request, res: Response) => {
  const {
    title,
    abstract,
    language,
    keywords,
    yearOfSubmission,
    authors,
    advisors,
    coverImage,
  } = req.body;

  // gamit promise para mahultanay matapus anay ang mga execution sa promises
  const authorIds = await Promise.all(
    authors.map(
      ({ firstName, lastName }: { firstName: string; lastName: string }) =>
        findOrCreateAuthor(firstName, lastName),
    ),
  );
  const advisorIds = await Promise.all(
    advisors.map(
      ({ firstName, lastName }: { firstName: string; lastName: string }) =>
        findOrCreateAdvisor(firstName, lastName),
    ),
  );

  const test = await prisma.book.create({
    data: {
      title,
      abstract,
      language,
      keywords,
      yearOfSubmission,
      authorIds,
      advisorIds,
      coverImage,
    },
  });
  res.json(test);
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        authors: true,
        advisors: true,
        school: true,
        uploadedBy: true,
      },
    });
    res.json(books);
  } catch {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`fetching book with id: ${id}`);
  try {
    const book = await prisma.book.findUnique({
      where: { id: String(id) },
      include: {
        authors: true,
        advisors: true,
        school: true,
        uploadedBy: true,
      },
    });
    if (book) {
      console.log(book);
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the book." });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.delete({
      where: { id: String(id) },
    });
    res.json({ message: "Book deleted successfully.", book });
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book." });
  }
};

export const editBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    abstract,
    language,
    keywords,
    yearOfSubmission,
    authors,
    advisors,
    coverImage,
  } = req.body;

  try {
    const authorIds = await Promise.all(
      authors.map(
        ({ firstName, lastName }: { firstName: string; lastName: string }) =>
          findOrCreateAuthor(firstName, lastName),
      ),
    );
    const advisorIds = await Promise.all(
      advisors.map(
        ({ firstName, lastName }: { firstName: string; lastName: string }) =>
          findOrCreateAdvisor(firstName, lastName),
      ),
    );

    const updatedBook = await prisma.book.update({
      where: { id: String(id) },
      data: {
        title,
        abstract,
        language,
        keywords,
        yearOfSubmission,
        authorIds,
        advisorIds,
        coverImage,
      },
    });
    res.json(updatedBook);
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while updating the book." });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  const { searchQuery } = req.body; // 💬[vincent]: nag sala ko kay dapat req.body, inde req.query

  if (!searchQuery) {
    return res.status(400).json({
      success: false,
      error: "searchQuery parameter is required",
    });
  }

  try {
    // 💬[vincent]: gn pa slplit ko na lang ang search query into words para kada words na lang ang ma search
    const searchWords = searchQuery
      .replace(/[,.]/g, "") // 💬[vincent]: para madula ang commas, colons, kag period
      .split(" ")
      .filter((word: string) => word.length > 0);

    const searchResults = await prisma.book.findMany({
      where: {
        OR: searchWords.flatMap((word: string) => [
          {
            title: {
              contains: word,
              mode: "insensitive", // case insensitive
            },
          },
          {
            keywords: {
              contains: word,
              mode: "insensitive",
            },
          },
          {
            abstract: {
              contains: word,
              mode: "insensitive",
            },
          },
          {
            yearOfSubmission: {
              contains: word,
              mode: "insensitive",
            },
          },
          {
            departmentId: {
              contains: word,
              mode: "insensitive",
            },
          },
          {
            programId: {
              contains: word,
              mode: "insensitive",
            },
          },
        ]),
      },
    });
    res.status(200).json({
      success: true,
      message: "Search successful",
      data: searchResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const addEditBook = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (id) {
    // edit book
    req.params.id = id; // set the id in req.params for editBookById to use
    await editBookById(req, res);
  } else {
    // add book
    await addBook(req, res);
  }
};

export const addRecommendationCounter = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedBook = await prisma.book.update({
      where: { id: String(id) },
      data: {
        recommendations: {
          increment: 1,
        },
      },
    });
    res.json(updatedBook);
  } catch {
    res.status(500).json({
      error: "An error occurred while updating the recommendation counter.",
    });
  }
};

export const bookController = {
  addBook,
  getAllBooks,
  getBookById,
  deleteBookById,
  editBookById,
  searchBooks,
  addEditBook,
  addRecommendationCounter,
};
