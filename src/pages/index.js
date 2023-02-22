import Head from "next/head";
import styles from "@/styles/Home.module.css";
// Graph Ql
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(process.env.API_KEY);

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
        publishedAt {
          createdBy {
            id
          }
          url
        }
      }
    }
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Bloggie</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>Hello World</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aperiam
          facilis unde quibusdam tenetur delectus accusantium doloremque, et
          assumenda dolorem earum adipisci ipsum! Dicta!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          accusantium similique sequi distinctio magni.
        </p>
      </main>
    </>
  );
}
