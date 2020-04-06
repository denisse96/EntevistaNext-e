import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import axios from "axios";


const IndexPage = () => {
  let APIKey = "05999112ed464d9b9cccbaa799a9405f"
  const [newsData, setNewsData] = useState({})
  
  async function getNews(country){
    let param = "country=" + country + "&"
    let response = await axios.get("https://newsapi.org/v2/top-headlines?"+param+ "apiKey=" + APIKey );
    console.log({response})
    setNewsData({artiles : response.data.artiles})
  }



  useEffect(() => {
    getNews("us")

   

  }, []);

useEffect(() =>{
console.log({newsData})
}, [newsData])

function handleCountryChange(event){
  console.log(event)

}

return (
  <Layout>
    <SEO title="Home" />
    <input id="country"  type= "text"></input>

    <ol>
      {newsData.map(data => (
        <li >{data.title} 
        {data.description}
        <image >{data.url}</image>
        </li>
      ))}
    </ol>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>

)

}


export default IndexPage
