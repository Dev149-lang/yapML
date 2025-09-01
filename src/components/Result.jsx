import { useEffect, useState } from "react"
import { afterArrange, arrange } from "./Arranger";

const Result = ({result, index})=> {
    // console.log(result, index);

    const [line,setLine] = useState(false) ;
    const [resu, setResult] = useState(result)

    

  
    

    useEffect(()=>{
        // console.log(ans);
        
        if( arrange(result)){
            setLine(true);
            setResult(afterArrange(result))
        }
        
    },[])


    
    
    return (
       <>
            
            {/* {result} */}
            {line?<span className=" text-gray-200 pt-4.5 block italic text-lg">{resu}</span> : <span className=" pt-0 pb-1 text-sm">{resu}</span>} 
         </> 
    )
}

export default Result