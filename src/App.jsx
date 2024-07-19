import { useState } from 'react'
import './App.css'

function App() {

  const API_KEY = "9d53ee747dcdabdc87cc9fcfc827687a"
  // var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

  const [srch, setSrch] = useState()
  const [data, setData] = useState()
  const [long, setLong] = useState()
  const [lat, setLat] = useState()

  const cloc = async () => {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    const lc = await res.json();
    setData(lc)
  }

  const myfun = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${srch}&appid=${API_KEY}&units=metric`);
    const result = await res.json();
    console.log(result);
    setData(result)
  }

  const search = (e) => {
    // const cty = e.target.value;
    setSrch(e.target.value);
  }

  const suc = async (e) => {
    setLat(e.coords.latitude)
    setLong(e.coords.longitude)
    console.log(lat);
    console.log(long);
    await cloc()
  }

  function fail() {
    console.log("Fail");
  }

  const icn = document.querySelector(".icn")
  const location = async () => {
    navigator.geolocation.getCurrentPosition(suc, fail)
    icn.style.color = "red";
  }

  return (
    <>
      <div className='main w-full flex justify-center h-full'>
        <div className='box rounded-3xl w-4/5 h-3/5 mt-6'>

          <div className='flex justify-center'>
            <div className='srch w-4/6 rounded-lg mt-5 flex h-10 text-white'>
              <input className='w-full h-10 bg-transparent p-5 outline-none' onChange={search} type="text" placeholder='Search the City' />
              <button onClick={myfun} className='w-16 h-10 outline-none'><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>

          {/* Location */}

          <div className='flex justify-center text-white mt-5'>
            <div>
              <button onClick={location} className='ml-16 mb-2'><i class="fa-solid fa-location-dot icn"></i></button>
              <h1>Grant Your Loaction</h1>
            </div>
          </div>

          <div className='tempbox text-white h-3/4 bg-transparent mt-5 flex justify-around'>
            <div>
              {
                data && data.weather ?
                  <div>
                    <h1 className='text-3xl mt-5 font-bold'>{data.name}</h1>
                    <h1 className='mt-3 text-xl'>{data.weather[0].description}</h1>
                    <h1 className='mt-10 text-5xl font-semibold'>{Math.trunc(data.main.temp)} °C</h1>
                  </div> : ""
              }



            </div>

            <div className='w-32 h-32'>
              {
                data && data.weather ?
                  <div className='mt-12'>
                    <img src={data.weather[0].main == "Clouds" ? "/clouds.png" : ""} />
                    <img src={data.weather[0].main == "Rain" ? "/Rain.png" : ""} />
                    <img src={data.weather[0].main == "Clear" ? "/Sun.png" : ""} />
                    <img src={data.weather[0].main == "Mist" ? "/mist.png" : ""} />
                    <img src={data.weather[0].main == "Haze" ? "/haze.png" : ""} />

                  </div> : ""

              }
            </div>


          </div>

          <div className='flex mt-5 justify-center'>

            {

              data && data.weather ?
                <div className='det w-5/6 h-4/5 rounded-2xl'>


                  <div className='flex text-white justify-around'>

                    <div className='mt-10'>
                      <img className='w-8 absolute -ml-8 h-8' src="/thermometer.png" alt="" />
                      <h3 className='text-xl'>Feel Like</h3>
                      <h1 className='text-xl pt-1'>{Math.trunc(data.main.feels_like)} °C</h1>
                    </div>


                    <div className='mt-10 text-xl'>
                      <img className='w-7 h-7 absolute -ml-9' src="/wind.png" alt="" />
                      <h3>Wind</h3>
                      <h1 className='pt-1'>{data.wind.speed} Km/H</h1>
                    </div>
                  </div>

                  <div className='flex justify-around mt-10 mb-7 text-white'>


                    <div className='mt-10'>
                      <img className='w-8 absolute -ml-11 h-8' src="/humidity.png" alt="" />
                      <h3 className='text-xl'>Humidity</h3>
                      <h1 className='text-xl pt-1'>{data.main.humidity} g.m-3</h1>
                    </div>

                    <div className='mt-10'>
                      <img className='w-8 absolute -ml-10 h-8' src="/typhoon.png" alt="" />
                      <h3 className='text-xl'>Gust</h3>
                      <h1 className='text-xl pt-1'>{data.wind.gust} M/Sec</h1>
                    </div>

                  </div>


                </div> : ""
            }
          </div>

        </div>
      </div>

      <div className='flex justify-center font-semibold text-6xl mt-20'>
        <img className='w-36 mr-5 h-36' src="/weather.png" alt="" />
        <h3>Weather <br />App</h3>
      </div>
    </>
  )
}

export default App
