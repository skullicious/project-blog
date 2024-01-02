import React from "react";

import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";

import { COMPONENT_MAP } from "./component-map";

export async function generateMetadata({ params }) {
  const blog = await loadBlogPost(params.postSlug);
  return {
    title: `${blog.frontmatter.title}`,
    description: `${blog.frontmatter.abstract}`,
  };
}

async function BlogPost({ params }) {
  const blog = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blog.frontmatter.title}
        publishedOn={blog.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blog.content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
