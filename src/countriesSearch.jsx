import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"


function CountryCard({flagImg, name,flagAltTxt}){
    return(
        <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            border:"1px black solid",
            borderRadius: "8px",
            padding: "10px",
            height:"200px",
            width:"200px",
            margin:"10px"
        }} className="countryCard">
            <img src={flagImg} alt={flagAltTxt} style={{height:"100px",width:"100px"}}/>
            <h2>{name}</h2>
        </div>
    )
}



export default function CountrySearch (){

   const API_URL = "https://restcountries.com/v3.1/all"
   const [countries,setcountries] = useState([]);
   const [filteredCountries,setfilteredCountries] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [error, setError] = useState(null);

    // const fetchData = async()=>{
    //     try{
    //         const response = await axios.get(API_URL);
     
    //         return response.data
    //     }catch (error){
    //         setError(error.message);
    //         console.error(error)
    //     }
    // }

    // useEffect(()=>{
    //     fetchData().then((data)=>{setcountries(data);setfilteredCountries(data)})
    // },[])


    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            if (!response.ok) {
              throw new Error("Failed to fetch countries");
            }
            const data = await response.json();
            setcountries(data);
            setfilteredCountries(data);
          } catch (error) {
            setError(error.message);
            console.error(error);
          }
        };
        fetchCountries();
      }, [])

    const handleChange=(e)=>{
        const search = e.target.value
        setSearchTerm(search)
        const filtered=countries.filter((country)=>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setfilteredCountries(filtered)
        if(!e.target.value){
            setfilteredCountries(countries)
        }
    }

    return(
        <div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <input
                    type="text"
                    placeholder="Search for countries"
                    onChange={handleChange}
                    value={searchTerm}
                    style={{width: "500px", height:"25px"}}
                />
            </div>

            <div style={{
                display:"flex",
                flexDirection: "row",
                flexWrap:"wrap"
            }}>

               {
                filteredCountries.map((country)=>(
                    <CountryCard name= {country.name.common} flagImg={ country.flags.png} flagAltTxt={country.flags.alt} />
                ))}
            </div>
        </div>
    )
}