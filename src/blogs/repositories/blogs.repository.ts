import { db } from "../../db/in-memory.db";
import { Blog } from "../types/blog";

export const blogsRepository = {
    findAll(): Blog[] {
        return db.blogs;
    },

    findById(id: string): Blog | null {
        return db.blogs.find((b) => b.id === id) ?? null;
    },

    create(newBlog: Omit<Blog, 'id'>): Blog {
        const lastBlog = db.blogs[db.blogs.length - 1];
        const nextId = lastBlog ? lastBlog.id + 1 : 1

        const created: Blog = {
            id: String(nextId),
            ...newBlog,
        };

        db.blogs.push(created);
        return created;
    },

    update(id: string, blog: Omit<Blog, 'id'>): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        db.blogs[index] = { ...db.blogs[index], ...blog };
        return true;
    },

    delete(id: string): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        db.blogs.splice(index, 1);
        return true;
    },
};
