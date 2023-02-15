import React, {useEffect, useState} from 'react';
 
import "./App.css"

function App() {
    const [data, setData] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [page , setPage] = useState(1);
    const [totalpage , settotalpage] = useState([10]);
    // GET request function to your Mock API
    console.log(page);
    console.log(totalpage);

   
    const fetchInventory = () => {
        fetch('https://dev.ylytic.com/ylytic/test')
            .then(res => res.json())
            .then((result) => {
              let a = result.comments;
           //   console.log(result);
            //  console.log(a);
              setData(a);
              setfilterData(a);
            })
            
            .catch((err) => console.log("error"));
    }

    const incr = () => {
      let page1 = page ;
      if(((page1 + 1) * totalpage) < 101){
        setPage( page +1);
    //    console.log((page1 +1) + "page value after incr");
     
      }
      }
    const decr = () => {
      let page2 = page;
      if((page2 - 1) >= 1){
        setPage(page-1);
        console.log((page2 -1) + "page value after decr");

      }
     
    }

    const selectedValue = (e) => {
        const selected = e.target.value;
        settotalpage(selected);
    }

    const sortdataasec = () => {
      const asec = data.sort((a,b) => a.author.localeCompare(b.author));
      
      setData(asec)
      setfilterData(asec);
      
   //   console.log(asec);

    }

    const sortdatadsec = () => {
      const dsec = data.sort((a,b) => b.author.localeCompare(a.author));
   //   console.log(dsec)
      setData(dsec);
      setfilterData(dsec);

    }

   
    


    const handleSearch = (e) => {
      const getSearch = e.target.value;
     
     // console.log(getSearch);

      if(getSearch.length > 0){
        const searchdata = data.filter((item) => item.author.toLowerCase().includes(getSearch));
        setData(searchdata);
      }
      else {
        setData(filterData);
      }
     
      
    } 
    
  
    useEffect(() => {
        fetchInventory();
    }, []);


    return (
      
        <div className="container">
                      <h3>Made with ❤️ by <a href='https://krishnampurwar.netlify.app/'>Krishnam Purwar</a></h3>

         <div id='val'>
          <h1>Simple Table(Assignment)</h1>
            <h3>total pages {data.length}</h3>
            <h3>{(page*(totalpage)-totalpage )} - {(page*totalpage)}</h3>
         <div>
            <button onClick={() => decr()}>prev</button>

 <button onClick={() => incr()}>next</button>
 </div>
            <input onChange = {(e) => handleSearch(e)} placeholder="Enter some value"></input>
            <select onChange={(e) => selectedValue(e)} >
            <option value="10">Total Element 10</option>
            <option value="20">Total Element 20</option>
            <option value="50">Total Element 50</option>
            </select>
            </div>
           
            <table>
                <thead>
                <tr>
                    <th>AT</th>
                    <th><button onClick={() => sortdataasec()}>🔺</button>Author <button onClick={() => sortdatadsec()}>🔻</button></th>
                    <th  > like</th> 
                    <th>reply</th>
                    <th>text</th>
                </tr>
                </thead>
                <tbody>
                    {
                      data && data.slice(page*(totalpage)-totalpage, page*totalpage).map((e) => (
                            <tr key={e.at}>
                              <td>{e.at}</td>
                            
                                <td >{e.author}</td>
                                <td >{e.like}</td>
                                <td>{e.reply}</td>
                                <td>{e.text}</td>
                                <td/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <h3>made with ❤️ by <a href='https://krishnampurwar.netlify.app/'>Krishnam Purwar</a></h3>
        </div>
    );
}

export default App;
