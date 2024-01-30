import { useEffect, useState } from 'react'
import './App.css'
import { fetchUsers } from './Fakerapi/userService'
import Users from './components/Users';
import appWorker from './app.worker';
import WebWorker from './WebWorker';
import { fa } from '@faker-js/faker';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  
  const webWorker = new WebWorker(appWorker);

  useEffect(()=>{

    fetchUsers().then(users=>{
    
      setUsers(users)
      setIsLoading(false)
    })

    return ()=>{
      webWorker.terminate()
    }

  },[])

  // ascending 
  const sortAscending = ()=>{
    // console.log('Ascending')
    webWorker.postMessage({users, type:'asc'});
    setIsLoading(true);
    setIsSorting(true);

    webWorker.addEventListener('message',(event)=>{
      const sortedList = event.data;

      setUsers(sortedList);
      setIsLoading(false)
      setIsSorting(false)
    })
    return;
  }

  // Desending
  const sortDecending = ()=>{
    // console.log('sortDecending')
    webWorker.postMessage({users, type:'desc'});
    setIsLoading(true);
    setIsLoading(true);

    webWorker.addEventListener('message', (event)=>{
      const sortedList = event.data;

      setUsers(sortedList);
      setIsLoading(false);
      setIsSorting(false)
    })
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header"> <h1>React Web Worker How to Work</h1></div>
          <div className="card-body ">
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group mr-2 mt-2">
                <button className="btn btn-primary"
                  onClick={sortAscending} 
                  type='button'
                  disabled={isLoading}
                  >Sort Ascending Number of Comments</button>

                <button className="btn btn-success " style={{marginLeft:'10px'}}
                onClick={sortDecending}
                type='button'
                disabled={isLoading}>Sort Decending Number of Comments</button>

              

              </div>
            </div>
            <div className="col-md-12">


                {isLoading && <div className='mt-4'>Loading...</div>}
                {
                  !isLoading && <Users users={users} />
                }
                
              
                

         

              
            </div>
          </div>
       </div>
        </div>
     
        
      </div>
    </>
  )
}

export default App
