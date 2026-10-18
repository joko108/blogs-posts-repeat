import { db } from "../../db/in-memory.db";
import { Blog } from "../types/blog";

export const blogsRepository = {
    findAll(): Blog[] {
        return db.blogs;
    },

    findById(id: number): Blog | null {
        return db.blogs.find((b) => b.id === id) ?? null;
    },

    create(newBlog: Omit<Blog, 'id'>): Blog {
        const lastBlog = db.blogs[db.blogs.length - 1];
        const created: Blog = {
            id: lastBlog ? lastBlog.id - 1 : 1,
            ...newBlog,
        };

        db.blogs.push(created);
        return created;
    },

    update(id: number, blog: Omit<Blog, 'id'>): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        db.blogs[index] = { ...db.blogs[index], ...blog };
        return true;
    },

    delete(id: number): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        db.blogs.splice(index, 1);
        return true;
    },
};
