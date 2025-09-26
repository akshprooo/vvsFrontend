import React from 'react'

const Banner = () => {
  return (
    <div className="page1 min-h-[70vh] w-full p-2 sm:p-3 overflow-hidden">
        <div className='w-full h-full bg-black/90 rounded-xl relative flex flex-col lg:flex-row gap-2 lg:gap-2 p-2 sm:p-3'>
            {/* actual content */}
            <div className='w-full lg:w-2/3 h-auto lg:h-full p-2 sm:p-4 z-10 flex flex-col items-center lg:items-end justify-center lg:justify-end order-2 lg:order-1'>
                <p className='text-sm sm:text-lg md:text-xl lg:text-2xl text-center lg:text-right text-white leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam molestiae recusandae, labore totam repellendus dolorum saepe, sequi ipsa omnis id esse quis aspernatur praesentium unde eius laborum vero sed sapiente provident maxime quas! Fugiat quis praesentium architecto veritatis in. Autem ullam praesentium, odit consequatur fuga fugit quam quibusdam minima sequi!</p>
            </div>
            <div className='w-full lg:w-1/3 z-10 bg-blue-400/40 h-auto lg:h-full rounded-xl flex-col flex p-3 sm:p-4 items-center justify-center gap-3 sm:gap-4 lg:gap-6 min-h-[250px] order-1 lg:order-2'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white leading-tight'>Ready To Vote?</h2>
                <p className='text-sm sm:text-lg md:text-xl lg:text-2xl text-center text-white/90 leading-relaxed'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam eveniet non cum maiores debitis repudiandae recusandae voluptatum praesentium aut nostrum, molestiae necessitatibus. Sunt, ratione ea?</p>
                <button className='mt-2 sm:mt-4 bg-white text-blue-600 font-semibold text-lg sm:text-xl lg:text-2xl py-2 sm:py-3 w-full rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200'>Vote Now</button>
            </div>
        </div>
    </div>
  )
}

export default Banner