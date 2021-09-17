import Head from 'next/head';
import Header from '../components/Layout/Header/Header';
import MainNavigation from '../components/Layout/Navigation/MainNavigation';
import Results from '../components/Results/Results';
import requests from '../utils/requests';

export default function HomePage({ results }) {
  console.log(results);
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* Header */}
      <Header />
      {/* Nav */}
      <MainNavigation />
      {/* Results */}
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
