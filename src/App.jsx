import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const [length, setlength]=useState(8)
 const [number, setnum]=useState(false)
 const [char, setchar]=useState(false)
 const [password, setpassword]=useState("")
 //useRef Hook
 const passref=useRef(null)
 const copypassword = useCallback(()=>{
  passref.current?.select()
  window.navigator.clipboard.writeText(password)
 },[password])

 const Passwordgenerator=useCallback(()=>{
  let pass=""
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(number)
  {
    str+="0123456789"
  }
  if(char)
  {
    str+="@#$%^&*()|:<>?/\][~"
  }
  for (let i= 1; i <= length; i++) {
    let char =Math.floor(Math.random()*str.length+1);
    pass+=str.charAt(char)
  }
  setpassword(pass)
},[length,number,char,setpassword])

useEffect(()=>{Passwordgenerator()},[length,number,char,Passwordgenerator] )

  return (
    <>
    <div className='w-full max-w-md mx-auto shawdow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700 text-center'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-5 '>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passref}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 'onClick={copypassword}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex item-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer' 
        onChange={(e)=>{setlength(e.target.value)}}/>
        <label >Length: {length} </label>
        </div>

        <div className='flex item-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={number}
        id='numberInput'
        onChange={()=>{setnum((prev)=>!prev)}}/>
       <label >Numbers {number} </label>
        </div>

        <div className='flex item-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={char}
        id='CharInput'
        onChange={()=>{setchar((prev)=>!prev)}}/>
       <label >Characters {char} </label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
