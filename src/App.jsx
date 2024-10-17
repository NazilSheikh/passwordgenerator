

import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  // we are using hooks for length 8 is default value;

  const [length, setLength] = useState(8)
  // we are using hooks for no.  to change no, chahiye ya nhi .

  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  
// apn directly update tho kr nhi sakte password ki value we need something :

  const [password, setPassword] = useState("")

  //useRef hook :

  // we did not know ke button agr mai click karongaa tho jo password generate hoaa hai vo hi copy hoo :::::
  // button apnee aaap mai alg entity hai and input alg entity hai aaps mai koe link nhi hai inkaa 
  // therefore we use useRef HOOKS  // KISI BHI CHEEZE KAA MUJHE REFERENCE LENAA HOTAA HAI THO YE TAB KAAM AATAA HAI .
  
  // NEECHE INPUT OR BUTTON KI BAAT HO RAHI HAI  .
  const passwordRef = useRef(null)


  // isme hmne do chizze likhi ej function and dusri array hai caal backs kaa

  const passwordGenerator = useCallback(() => {
  
  // pass becoz generated password bnake set password kar denge
// 
      let pass = ""
  // str becoz string ke ander jo data jisse hm password bnaayengee

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
 
// num agr hme allowed tho vo add karo 

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
// imp hai ki hm kitni baar loop chalaaye ye govern length se hogaa password kitni length ka generate karna hai :
//   random char generate karegaa

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
 
// string mai se charactor uthanaa padegaa

      pass += str.charAt(char)
      
    }
// value read ki phle value empty thi na therefore password value is set now

    setPassword(pass)

// ye sab dependecies and hmne setpassword liyaa because we want optimisation and we want ke isko bhi memeory mai rakho
  }, [length, numberAllowed, charAllowed, setPassword])



  // ye hook what is the right way to call the setpassword method it will give error to many renders
  // in react kb konsi value render hm control nhi karsakte therefore hooks ki madad li to call the method :
  // it reqires 1) callback function , depedency array 
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



   // ye method se hmaree copy se password copy hogaa clipboard mai
   // passwordref per dependent jin jin se baat ho rahi hai vo vo liyee 
   
  const copyPasswordToClipboard = useCallback(() => {
    // user ko accha effect dene ke liye jb copy ho tho text select ye karne ke liye hmne ref select liyaa hai 
    passwordRef.current?.select();
    // optimisation kitni range selext karni hai 0 se leker 999 letter ya words select honge
    passwordRef.current?.setSelectionRange(0, 999);

    window.navigator.clipboard.writeText(password)  
  }, [password])


{/* max width medium size */}
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly

            // REFRRENCE PASS KIYAA USEREF HOOK KE LIYE :::: 
            ref={passwordRef}
        />

{/* ab hm chahte hai ki button per click karne se password copy ho jaaye...clipboard */}
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
           type="range"
           min = {6} 
           max={100} 
           value={length}
           className='cursor-pointer'
          //  onchange se range km jyada hogi range se hmko length bhi attach karna hoga vp show karegaa 
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>Length:{length}</label>
        </div>

          
          <div className='flex items-center gap-x-1'>

          <label htmlFor="numberInput">Numbers</label>
          <input 
         type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          // prev value se reverse kardo yani click pr tick or click per tick ht jaygaa true false;
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}
          />


            </div> 

            <div className='flex items-center gap-x-1'>

          <label htmlFor="characterInput">Characters</label>

                   <input type="checkbox"
                   
                   defaultChecked={charAllowed}
                   onChange={()=>
                    setCharAllowed((prev)=>!prev)
                   }
                   id='charaterInput'

                   
                   />
 

            </div>
      </div>
    </div>

    
  )
}

export default App
