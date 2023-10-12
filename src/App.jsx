import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharactersAllowed, setIsCharactersAllowed] = useState(false);
  const [password, setPassword] = useState('')
  const inputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkalmnopqrstuvwxyz';
    if(isNumberAllowed) {
      str+='1234567890'
    }
    if(isCharactersAllowed) {
      str+='~!@#$%^&*()_-+=|}]{[":;<,>.?/'
    }

    for(let i=0; i <length; i++) {
      const char = Math.floor(Math.random()*str.length + 1);
      pass+=str.charAt(char);
    }
    
    setPassword(pass)


  }, [length, isNumberAllowed, isCharactersAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharactersAllowed])



  return (
    <>
      <div 
        className="relative bg-fixed bg-center bg-cover bg-no-repeat h-screen w-screen bg-[url('background.jpg')]"
        >
          <h1 className='text-center text-white py-4 text-3xl font-medium'>Password generator</h1>
        <div
          className='flex flex-wrap justify-center py-2 text-2xl text-white'
        >
            <input type="text" ref = {inputRef} value = {password} className='text-black rounded-3xl p-2 w-2/6'/>
            <button 
              className='outline-none px-4 font-medium bg-white text-black hover:bg-slate-400 hover:text-white duration-500 rounded-full mx-2'
              onClick={() => {
                window.navigator.clipboard.writeText(password);
                inputRef.current?.select();
              }}
            >
              COPY
            </button>
        </div>
        <div>
          <div className='flex flex-wrap justify-center py-2 text-md text-white'>
            <div>
              <input 
                type='range'
                value = {length}
                min={6} 
                max={100} 
                onChange={(e) => setLength(e.target.value)}
                className='range pr-6 text-blue-600'
                />
              <label className='font-bold px-2'>Length ({length})</label>
            </div>
            <div>
              <input 
                type='checkbox'
                value = {isNumberAllowed}
                onChange={() => setIsNumberAllowed((prev) => !prev)}
                className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
              <label className='font-medium px-2'>Numbers</label>
            </div>
            <div>
              <input 
                type='checkbox'
                value = {isCharactersAllowed}
                onChange={() => setIsCharactersAllowed((prev) => !prev)}
                className=' text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
              <label className='font-medium px-2'>Characters</label>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
