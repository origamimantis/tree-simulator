import React, {useState} from 'react';
import { Link,useNavigate, useSearchParams} from "react-router-dom"

export default function Search({getState,setState}) {

  const [searchParams, updateSearchParams] = useSearchParams();
  let currentSearch = searchParams.get("query")
  let nav = useNavigate()
  React.useEffect(()=>{
    if (currentSearch=="")
      nav("/");
  })

  const [lastSearch, setLastSearch] = useState(null);
  const [searchResult,setResult] = useState(null)

  async function obtainSearchResults(searchText)
  {
    console.log("weee")
    let res = await fetch("/api/search",
      {
	method: 'POST',
	headers:
	{
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify({searchText:searchText})
      }
    );
    let result = await res.json();

    setResult(result.result);
    setLastSearch(searchText);
  }

  if (lastSearch != currentSearch)
  {
    obtainSearchResults(currentSearch)
  }


  let DisplayData=()=>
  {
    let arr = []
    searchResult.forEach( (o, i)=>
      {
	arr.push(<li key={i}><Link to={`/user/${o.username}`}>{o.username}</Link></li>)
      }
    );

    return (<ol>{arr}</ol>);
  }


  return (
    <>
    <p/>
    <h3>Search results for '{currentSearch}'</h3>
    Most similar-looking names first:
    {(() =>{
      if (searchResult === null)
      {
	return <p>WOW look at these invisible search results</p>
      }
      else
      {
	return <>{<DisplayData/>}</>
      }
    })()}
    </>
  );

}
