
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { link } from './components/keys'
import Result from './components/Result'

function App() {
  
  const [Query,setQuery] = useState('')
   const [Responsive, setResponsive] = useState([])

   const [chatHistory,setHistory] = useState(JSON.parse(localStorage.getItem('history')) )

   const[selectHistory, setSelectHistory] = useState('')

   const [isHistoryVisible, setIsHistoryVisible] = useState(false)
   const scrollDown = useRef();
  
  

  const askQuery = async()=>{

    if (!Query && !selectHistory){
      return false;
    }

    if(Query){
      if (localStorage.getItem('history')) {

      let history = JSON.parse(localStorage.getItem('history'));
      history = [Query, ...history]
      localStorage.setItem('history', JSON.stringify(history))
      setHistory(history)
    } else {
      localStorage.setItem('history', JSON.stringify([Query]))
      setHistory([Query])
    }

    }

    const data = Query?Query:selectHistory

    const payload = {

    "contents": [{"parts":[{"text": `you are an expert in "Machine learning" & "Deep Learning" and you give information about any one Machine learning topic whenever someone asks you a question or says something. so answer ${data} and sneak in a reference to atleast one machinelearning or deep learning topic which is relatable to this question.` }]}]  //answer it and also provide isnight into some particular 'Machine learning' topic which is relatable to the query, throughout your answer subtly. also keep in mind it should be some particular topic, but dont write that you've been asked to provide machine learning reference
  }




    

    
    let res = await fetch(link, {
      method:"POST",
      body:JSON.stringify(payload)
    })

    res = await res.json()

    // setResponsive(res.candidates[0].content.parts[0].text)
   

    let dataString = res.candidates[0].content.parts[0].text
    dataString = dataString.split("* ")
    dataString = dataString.map((item)=>item.trim())
    
    console.log(dataString)
     setResponsive([...Responsive, {type: 'q', text: Query?Query:selectHistory}, {type:'a', text: dataString}])

     setQuery('')

     setTimeout(() => {
      scrollDown.current.scrollTop = scrollDown.current.scrollHeight;
     }, 800);
  }

  // console.log(Responsive);
  
  const deleteHistory = ()=> {
    localStorage.clear();
    setHistory([])

  }

  const doneEnter = (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      askQuery();
    }
    
  }


  useEffect(()=>{
    // console.log(selectHistory);
    askQuery()
    
  },[selectHistory])


  const toggleHistory = ()=>{
    setIsHistoryVisible(!isHistoryVisible)
  }

  




  return (
  <div className='overflow-hidden w-full  h-screen text-center'  style={{
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(99, 102, 241, 0.15) 5px, rgba(99, 102, 241, 0.15) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(99, 102, 241, 0.15) 5px, rgba(99, 102, 241, 0.15) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(139, 92, 246, 0.12) 10px, rgba(139, 92, 246, 0.12) 11px, transparent 11px, transparent 30px),
        repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(139, 92, 246, 0.12) 10px, rgba(139, 92, 246, 0.12) 11px, transparent 11px, transparent 30px)
      `,
    }} >
    
    
    <div className='text-centre text-red-800 font-bold p-5 m-auto '>yapML</div>
      <button 
        onClick={toggleHistory}
        className=" fixed top-9 left-4 z-50 overflow-auto px-4 py-2 font-bold text-white bg-black border border-white rounded-3xl  hover:bg-gradient-to-b from-black to-red-700 hover:text-black "
      > 
        {isHistoryVisible ? <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>}
      </button>

    <div className={`fixed top-0 left-0 w-80 bg-gradient-to-t from-red-700 to-black border-r border-r-white h-screen text-center transform transition-transform duration-500 ease-in-out ${isHistoryVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <h2 className='font-semibold italic  text-y pb-4 text-3xl text-white text-shadow-blue-100 shadow-lg '>CHAT HISTORY <button onClick={deleteHistory}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M600-240v-80h160v80H600Zm0-320v-80h280v80H600Zm0 160v-80h240v80H600ZM120-640H80v-80h160v-60h160v60h160v80h-40v360q0 33-23.5 56.5T440-200H200q-33 0-56.5-23.5T120-280v-360Zm80 0v360h240v-360H200Zm0 0v360-360Z"/></svg></button></h2>
      <ul className='overflow-auto pt-4 pr-3 pl-4'>
        {
          chatHistory && chatHistory.map((i)=>(
          <li onClick={()=>setSelectHistory(i)} className='text-gr text-white pb-2 m-auto flex justify-start truncate cursor-pointer hover:bg-gray-500 rounded-3xl p-2 hover:text-black'> <button><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M480.23-288Q560-288 616-344.23q56-56.22 56-136Q672-560 615.77-616q-56.22-56-136-56Q400-672 344-615.77q-56 56.22-56 136Q288-400 344.23-344q56.22 56 136 56Zm.05 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Z"/></svg></button>  {i} </li>))
        }
      </ul>
      
    </div>

    
    <div className='col-span-4 '>
      <div ref={scrollDown} className='container overflow-x-auto h-150 m-auto' > 
        <div className='text-white'>
          <ul>
          {
            Responsive.map((i, index)=>(
              
              i.type == 'q'? 
              <div className='flex justify-end pr-4 pb-4 pt-17'><li key={index + Math.random()} className='text-right shadow-gray-700 shadow-md p-2 px-4 w-fit bg-red-800 rounded-4xl'> <Result result={i.text} index={index} /></li> </div> : i.text.map((resItem, resIndex)=>(
                <div className='pr-4'><li key={index + Math.random()} className='text-left px-4'><Result result={resItem} index={resIndex} /></li> </div>
              ))
            ))
          }
          </ul>
          {/* <ul> */}
        {/* {Responsive}  */}
        {/* {
          Responsive && Responsive.map((i, index)=>( 
          <Result key={index + Math.random()} result={i} index={index} /> 
        ) )
        } */}

        {/* </ul> */}

        </div>
       
        </div>

      <div className='mt-6 bg-gradient-to-r from-lime-950 to-black w-3xl m-auto max-w-80 rounded-3xl border border-l-white text-white flex' >
        <input type="text" value={Query}
        onKeyDown={doneEnter}
         onChange={(e)=>setQuery(e.target.value)} className='w-full h-full p-3 outline-none' placeholder='Ask me Anything' />
        <button onClick={askQuery} className='px-4'>Shoot</button>
      </div>

    </div>




  </div>
  )
}

export default App
