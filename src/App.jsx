
import './App.css';
import LoadingComponent from './components/LoadingComponent';
import React, { useState, useEffect, useRef } from 'react';


function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listloading, setListLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [searcKey, setSearcKey] = useState(0);

  const loadData = (_searchKey = '', _offset)=>{
    fetch(`https://api.spacexdata.com/v3/launches?mission_name=${_searchKey}&limit=5&offset=${_offset}`)
      .then((response) => response.json()) // Parse the response as JSON
      .then((_data) => {
        if(_offset !==0){
          setData((prev)=>[...prev,..._data]);
          console.log(data);
        }
        else{
          setData((prev)=>[..._data]);
          console.log(data);
        }
        setLoading(false); // Stop loading
        setListLoading(false);
      })
      .catch((err) => {
        setError(err); // Handle errors
        setLoading(false);
      });
  }
  const inputRef = useRef(null);
  const handleScroll = () => {
    if (inputRef.current) {
      const scrollTop = inputRef.current.scrollTop; // Get the scroll position of the div
      //console.log('Div Scroll Position:', scrollTop); // Log the scroll position to the console
     // Update the scroll position state
    if(scrollTop > inputRef.current.scrollHeight - 501){
      setListLoading(true);
      setOffset((prev)=> prev + 1);
    }
    console.log('Div Scroll Position:', scrollTop);
    console.log('Scroll Height (total content):', inputRef.current.scrollHeight); 
    console.log('Client Height (visible area):', inputRef.current.clientHeight);
    }// Get the current scroll position
    ; // Log to the console
    
  };
  
  useEffect(() => {
    // Make the API request
    if(offset> 0)
      loadData('', offset * 5);
    console.log(offset);
  }, [offset]); // Empty dependency array to run once when the component mounts

  useEffect(() => {
    loadData('', 0);
    let divElement = inputRef.current;
    setTimeout(()=>{
      divElement = inputRef.current;
      
      console.log(divElement);
      // Add scroll event listener to the div element
      if (divElement) {
        divElement.addEventListener('scroll', handleScroll);
      }
    },1500);

    // Cleanup function to remove the event listener
    return () => {
      if (divElement) {
        divElement.removeEventListener('scroll', handleScroll);
      }
    };
  },[]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div>
      <input type="text" className="search-box" placeholder="Search..." 
        onChange={(key)=>{loadData(key.target.value,0); setOffset(0)}}
      />
      </div>
      <div className="card-list" ref={inputRef} >
        <LoadingComponent data={data} listloading={listloading} ></LoadingComponent>   
      </div>
    </>
  );
}

export default App;
