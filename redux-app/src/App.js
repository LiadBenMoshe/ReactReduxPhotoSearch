import { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import PhotoGrid from './component/PhotoGrid';
import myStore from './store'
import './App.css';


function App() {


  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/items`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);

  if(!data){
    return (<div>
      <h1>Loading...</h1>
    </div>)
  }

  return (
    <div>
      <Provider store={myStore}>
        <PhotoGrid />
      </Provider>
    </div>
  );
}

export default App;


