import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api'
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Coinmarketcap Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}

// this is going to receive an object => context
export async function getServerSideProps (context) {
  // query the api of coingecko w/ certain params
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await coinGeckoClient.coins.markets(params);
  return {
    props: {
      result
    }
  }
}
