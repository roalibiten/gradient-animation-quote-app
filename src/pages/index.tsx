import React, { useState, useEffect } from 'react';

export default function Home() {
  const [bgColor, setBgColor] = useState('#FF0000'); // Initial background color
  const [maskBgColor, setMaskBgColor] = useState('#FF0000'); // Initial background color
  const [isAnimating, setIsAnimating] = useState(false);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleChangeColor = () => {
    getNewQuote()
    if (!isAnimating) {
      setIsAnimating(true);
      const newColor = getRandomColor();
      setMaskBgColor(newColor);
      setTimeout(()=>{
        setBgColor(newColor)
      },2000)
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    getNewQuote()

    setInterval(()=>{ handleChangeColor()},3000)
  }, []);



  const getNewQuote = async () =>{
    try {
      const res = await fetch(`http://safetybelt.pythonanywhere.com/quotes/random`);
      
      if(!res.ok){
        getNewQuote()
        
      }
      
      const data = await res.json();
      
      var newQuote=data
      setQuote(newQuote.quote)
      setAuthor(newQuote.author)

    } catch (err) {
      console.log(err);
      getNewQuote()
    }
  }

  return (
    <main
      className=" overflow-none main  flex max-w-[100vw] max-h-screen h-screen items-center justify-center background"
      style={{
        background: bgColor,
      }}
    > 
      <div
        className={ isAnimating? ` mask  `: ""}
        style={{
          backgroundColor: maskBgColor
        }}
      ></div>
      
      <div className=" shadow-md absolute z-10 bg-white text-black text-center  rounded-md w-[30vw] py-[2rem]">
        <p className=" mx-auto pl-2 pr-2 ">{quote}</p>
        {author&&<p className=" mx-auto  pl-2 pr-2">- {author}</p>}
        {/* <div  onClick={handleChangeColor} className=" cursor-pointer text-white mx-auto  mt-6 py-1 rounded-md w-1/3 bg-purple-500">
          <p>Get a quote!</p>
        </div> */}
      </div>
    </main>
  )
}
