import React from 'react'

function RideComponent({
  img,
  city,
  destination_code,
  date,
  id,
  origin_station,
  state,
  station_path,
}) {
  for (var i = 0; i < station_path.length; i++) {
    if (station_path[i] >= destination_code) {
      var distance = station_path[i] - destination_code
      break
    } else
      var distance = destination_code - station_path[station_path.length - 1]
  }

  return (
    <div className="mx-5 flex items-center gap-2 rounded-xl  bg-[#171717] p-4">
      <img
        src={img}
        alt=""
        className="h-40 w-auto rounded-2xl object-contain p-3"
      />
      <div className="flex flex-grow items-start justify-between">
        <div className="flex   flex-col">
          <h1 className="text-[#CFCFCF]">
            Ride id : <span className="text-white">{id}</span>
          </h1>
          <h1 className="text-[#CFCFCF]">
            Origin Station :{' '}
            <span className="text-white">{origin_station}</span>
          </h1>
          <h1 className="text-[#CFCFCF]">
            Station path :{' '}
            <span className="text-white">[{station_path.join(',')}]</span>
          </h1>
          <h1 className="text-[#CFCFCF]">
            Date : <span className="text-white">{date}</span>
          </h1>
          <h1 className="justify-end text-[#CFCFCF]">
            Distance: <span className=" text-white">{distance}</span>
          </h1>
        </div>
        <h1 className="justify-end text-[#CFCFCF]">
          <span className=" text-white">{city}</span>
        </h1>
      </div>
    </div>
  )
}

export default RideComponent
