import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api'
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;

  // function to format % numbers with 2 decimals
  const formatPercent = number =>
    `${new Number(number).toFixed(2)}%`

  // function to formar integers to dollars $
  const formatDollar = (number, digits) =>
    new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'usd',
        maximumSignificantDigits: digits,
      }
    ).format(number)
    console.log(data)
  return (

    <div className={styles.container}>
      <Head>
        <title>Coinmarketcap Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Coinmarketcap Clone</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Low 24h</th>
            <th>High 24h</th>
            <th>Market Cap</th>
            <th>Marketcap Change 24h</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(coin => (
            <tr key={coin.id}>
              <td>
                <img 
                  src={coin.image}
                  style={{width: 25, height: 25, marginRight: 10}}
                />
                {coin.symbol.toUpperCase()}
              </td>
              <td>
                {coin.name}
              </td>
              <td>
                {formatDollar(coin.current_price)}
              </td>
              <td>
                {formatDollar(coin.low_24h)}
              </td>
              <td>
                {formatDollar(coin.high_24h)}
              </td>
              <td>
                {formatDollar(coin.market_cap)}
              </td>
              <td>
                <span className={coin.price_change_percentage_24h > 0 ? 
                  'text-success' : 'text-danger'}
                >
                  {formatPercent(coin.price_change_percentage_24h)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
