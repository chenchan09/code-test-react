import React, { lazy, Suspense } from 'react'
// import Spinner from './Spinner/Spinner';
const CardComponent = lazy(() => import('./CardComponent'));

const LoadingComponent = (prop) =>{
    return (
        <>
            
            {prop.data.map((item,index) => (                
                <div className="card" key={index}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CardComponent item={item}></CardComponent>
                       
                        
                    </Suspense>
                </div>
                ))

            
            }
             {  prop.listloading ?  <div className="spinner-container">
      <div className="spinner"></div>
    </div>
                        : <div className='card nodata' key='-1'>
                        End of list
                        </div>
                        }
        </>
    )
}

export default LoadingComponent;