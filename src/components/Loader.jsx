
import { Watch } from 'react-loader-spinner';


export function Loader() {
    
  return (
    
   <div style={{display:"flex", justifyContent:"center", alignItems:"center", background:"black", height:"100vh"}}>
<Watch
  visible={true}
  height="100"
  width="100"
  radius="48"
  color="white"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
 
  )
}

