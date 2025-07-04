import { useRef, useEffect, useState} from "react";

export const AutoFocus = () =>{

        const[countdown,setCountDown] = useState(5);
        const[showReset,setShowReset] = useState(false);
        const inputRef = useRef(null);
        const audioRef = useRef(null);

        useEffect(()=>{
            
            const timer = setTimeout(()=>{setCountDown((prev)=>prev-1)},1000);
            if(countdown===0){
                inputRef.current.focus();
                setShowReset(true);
                return;
            }
            return () => clearTimeout(timer);
        },[countdown])

        function handleReset(){
            setCountDown(5);
            inputRef.current.blur();
            inputRef.current.value = "";
        }

    return(
        <>
            <div className="h-screen w-screen p-4 bg-black flex justify-center items-center">
                <div className="backdrop-blur-md bg-white/10 border-white/20 rounded-2xl shadow-2xl w-[90%] p-10 max-w-lg text-center space-y-6">
                    <h1 className="text-3xl font-semibold text-white">Focus Timer</h1>
                    <p className="text-xl text-white">{countdown >0 ? `Starting in ${countdown}...`:`Type Below`}</p>
                    <input type='text' ref={inputRef} placeholder="Type Something..." className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus ring-2 focus:ring-purple-600 transition "></input>
                  {showReset &&   <button onClick={handleReset} className="cursor-pointer mt-4 px-4 py-2 rounded bg-white/20 text-white font-medium hover:bg-white/30 transition border border-white/20">🔁 Reset</button>}   
                </div>
            </div>      
            <audio ref={audioRef}>
                <source src="https://www.soundjay.com/button/beep-07.wav" type="audio/wav"></source>
            </audio>
        </>
    )
}
