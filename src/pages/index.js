import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import axios from "axios";
import { useFormik } from 'formik';

const IndexPage = () => {
  let APIKey = "05999112ed464d9b9cccbaa799a9405f"
  let URL = "https://newsapi.org/v2/top-headlines?"
  const formik = useFormik({
    initialValues: {
     country:"us", 
     keyword:""
    },
    onSubmit: (values) => {
      getBoth(values.country, values.keyword)
      console.log("Submit", values);
      
    },
  });

  const [newsData, setNewsData] = useState( {articles: []} )
  console.log({newsData}, formik.values)
 
  async function getNews(country){
    let param = "country=" + country + "&"
    let response = await axios.get(URL+param+ "apiKey=" + APIKey );
    console.log({response})
    setNewsData({articles : response.data.articles})
  }
 async function getNewsKeyword(keyword){
  let param = "q=" + keyword + "&"
  try{
    let response = await axios.get(URL+param+ "apiKey=" + APIKey );
    console.log({response})
    setNewsData({articles : response.data.articles})
  }catch(exception){
    console.log(exception)
  }
 }
 async function getBoth(country,keyword){
  let param = "country=" + country 
  param = param+ "&q=" + keyword + "&"

  try{
    let response = await axios.get(URL+param+ "apiKey=" + APIKey );
    console.log({response})
    setNewsData({articles : response.data.articles})
  }catch(exception){
    
    console.log(exception)
  }

 }

  useEffect(() => {
    getNews("us")

  }, []);

  useEffect(() => {
    getNews(formik.values.country)

  }, [formik.values.country]);
 
  useEffect(() => {
    if(formik.values.keyword!==""){
      getNewsKeyword(formik.values.keyword)
    }
  

  }, [formik.values.keyword]);





return (
  <Layout>
    <SEO title="Home" />
    <form onSubmit={formik.handleSubmit}> 
    <label htmlFor="keyword">KeyWord</label>
    <input type="text" id="keyword" value={formik.values.keyword} onChange={formik.handleChange}></input>
    <select name="country" id="country" value = {formik.values.country} onChange={formik.handleChange}>
      <option value ="ae">ae</option>
      <option value = "ar">ar</option>
      <option value = "at">at</option>
      <option value = "au">au</option>
      <option value = "us">us</option>
    </select>
    <button type="submit">Filter Both</button>
    </form>

    <ul>
      {newsData.articles.map((item, index) => (
        <li key={index}>
          <h1>{item.title}</h1>
          <h4>{item.description}</h4>
          <img src={item.urlToImage} alt ={item.title}></img>
        </li>
      ))}
    </ul>
   
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>

)

}


export default IndexPage