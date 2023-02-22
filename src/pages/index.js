import Head from "next/head";
import styles from "@/styles/Home.module.css";

// Components
import BlogCard from "@/components/BlogCard";
import Nav from "@/components/Nav";

// Graph Ql
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  `https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cleeg3grl5pip01ujbmje834p/master`
);

const graphQuery = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`;
export async function getStaticProps() {
  const { posts } = await graphcms.request(graphQuery);
  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bloggy</title>
        <meta name="description" content="A blog tutorial made with JAMstack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}
