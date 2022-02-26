import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import RideComponent from '../components/RideComponent'
import SecondHeader from '../components/SecondHeader'
import React, { useState } from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Select from 'react-select'
import { Country, State, City } from 'country-state-city'
export default function Home({ data, user }) {
  const [state, setState] = useState({})
  const [city, setCity] = useState({})

  var option_state = []
  var list_state = []
  var option_city = []
  var list_city = []

  data.map((item) => {
    option_state = { value: item.state, label: item.state }
    option_city = { value: item.city, label: item.city }

    list_state.push(option_state)

    if (state?.value == '') list_city.push(option_city)
  })

  const newlist_state = [
    ...list_state
      .reduce((map, obj) => map.set(obj.value, obj), new Map())
      .values(),
  ]

  if (state) {
    data.map((item) => {
      option_city = { value: item.city, label: item.city }

      if (state?.value === item.state) list_city.push(option_city)
    })
  }

  const newlist_city = [
    ...list_city
      .reduce((map, obj) => map.set(obj.value, obj), new Map())
      .values(),
  ]

  const filter = function () {
    setFilterState(true)
  }

  const [filterState, setFilterState] = useState(false)
  const [upcomingListener, setupcomingListener] = useState(false)
  const [PastListener, setPastListener] = useState(false)
  const [nearest, setNearest] = useState(
    ' cursor-pointer font-semibold   text-white underline '
  )
  const [upcoming, setUpcoming] = useState(
    ' cursor-pointer font-light text-[#D0CBCB] '
  )
  const [past, setPast] = useState('cursor-pointer font-light text-[#D0CBCB] ')

  function NearestRides() {
    setNearest('cursor-pointer font-semibold   text-white underline')
    setPast('cursor-pointer font-light text-[#D0CBCB]')
    setUpcoming('cursor-pointer font-light text-[#D0CBCB]')
    setupcomingListener(false)
    setPastListener(false)
  }
  function PastRides() {
    setPast('cursor-pointer font-semibold text-white underline')
    setNearest('cursor-pointer font-light text-[#D0CBCB]')
    setUpcoming('cursor-pointer font-light text-[#D0CBCB]')
    setPastListener(true)
    setupcomingListener(false)
  }
  function UpcomingRides() {
    setUpcoming('cursor-pointer font-semibold  text-white underline')
    setNearest('cursor-pointer font-light text-[#D0CBCB]')
    setPast('cursor-pointer font-light text-[#D0CBCB]')
    setupcomingListener(true)
    setPastListener(false)
  }

  const nearestRidesSort = function (a, b) {
    var distance_a, distance_b
    for (var i = 0; i < a.station_path.length; i++) {
      if (a.station_path[i] >= a.destination_station_code) {
        distance_a = a.station_path[i] - a.destination_station_code
        break
      } else
        distance_a =
          a.destination_station_code - a.station_path[a.station_path.length - 1]
    }

    for (var i = 0; i < b.station_path.length; i++) {
      if (b.station_path[i] >= b.destination_station_code) {
        distance_b = b.station_path[i] - b.destination_station_code
        break
      } else
        distance_b =
          b.destination_station_code - b.station_path[b.station_path.length - 1]
    }

    return distance_a - distance_b
  }

  const nearestRides = data.sort(nearestRidesSort)

  return (
    <div className="min-h-screen bg-[#292929] ">
      <Head>
        <title>Edvora</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Header name={user?.name} img={user?.url} />
      <div className="flex items-center justify-between p-3 px-5">
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
        </Head>
        <div className="flex items-center gap-5">
          <h1 className={`${nearest}  `} onClick={NearestRides}>
            Nearest Rides
          </h1>

          <h1 className={` ${upcoming}`} onClick={UpcomingRides}>
            Upcoming Rides
          </h1>

          <h1 className={` ${past}`} onClick={PastRides}>
            Past Rides
          </h1>
        </div>

        {filterState ? (
          <div>
            <h1 className="text-semibold cursor-default text-[#A5A5A5]">
              Filters
            </h1>
            <hr className=" bg-[#CBCBCB]" />

            <Select
              options={newlist_state}
              placeholder="Select State"
              onChange={setState}
              className="mt-3 p-2"
              isClearable={true}
            />
            <Select
              options={newlist_city}
              placeholder="Select City"
              onChange={setCity}
              className="mb-2 p-2"
              isClearable={true}
            />
          </div>
        ) : (
          <div
            className="flex cursor-pointer items-center gap-1 "
            onClick={filter}
          >
            <Button
              color="white"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={true}
              ripple="dark"
            >
              <Icon name="sort" className="" />
            </Button>
            <h1 className="text-sm text-white">Filter</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 py-1">
        {upcomingListener
          ? data.map((item, index) => {
              var d1 = new Date().getTime()
              var d2 = new Date(item.date).getTime()

              if (d1 < d2)
                if (state?.value != undefined || city?.value != undefined) {
                  //    if(city.value==item.city)
                  // return(<RideComponent city={item.city} date={item.date} destination_code={item.destination_station_code} id={item.id} img={item.map_url} origin_station={item.origin_station_code} state={item.state} key={index} station_path={item.station_path} />)

                  if (state?.value == item.state && city?.value == undefined)
                    return (
                      <RideComponent
                        city={item.city}
                        date={item.date}
                        destination_code={item.destination_station_code}
                        id={item.id}
                        img={item.map_url}
                        origin_station={item.origin_station_code}
                        state={item.state}
                        key={index}
                        station_path={item.station_path}
                      />
                    )
                  else if (city?.value !== undefined) {
                    if (city?.value == item.city)
                      return (
                        <RideComponent
                          city={item.city}
                          date={item.date}
                          destination_code={item.destination_station_code}
                          id={item.id}
                          img={item.map_url}
                          origin_station={item.origin_station_code}
                          state={item.state}
                          key={index}
                          station_path={item.station_path}
                        />
                      )
                  }
                } else
                  return (
                    <RideComponent
                      city={item.city}
                      date={item.date}
                      destination_code={item.destination_station_code}
                      id={item.id}
                      img={item.map_url}
                      origin_station={item.origin_station_code}
                      state={item.state}
                      key={index}
                      station_path={item.station_path}
                    />
                  )
              else return <p className="hidden"></p>
            })
          : PastListener
          ? data.map((item, index) => {
              var d1 = new Date().getTime()
              var d2 = new Date(item.date).getTime()

              if (d1 > d2)
                if (state?.value != undefined || city?.value != undefined) {
                  //    if(city.value==item.city)
                  // return(<RideComponent city={item.city} date={item.date} destination_code={item.destination_station_code} id={item.id} img={item.map_url} origin_station={item.origin_station_code} state={item.state} key={index} station_path={item.station_path} />)

                  if (state?.value == item.state && city?.value == undefined)
                    return (
                      <RideComponent
                        city={item.city}
                        date={item.date}
                        destination_code={item.destination_station_code}
                        id={item.id}
                        img={item.map_url}
                        origin_station={item.origin_station_code}
                        state={item.state}
                        key={index}
                        station_path={item.station_path}
                      />
                    )
                  else if (city?.value !== undefined) {
                    if (city?.value == item.city)
                      return (
                        <RideComponent
                          city={item.city}
                          date={item.date}
                          destination_code={item.destination_station_code}
                          id={item.id}
                          img={item.map_url}
                          origin_station={item.origin_station_code}
                          state={item.state}
                          key={index}
                          station_path={item.station_path}
                        />
                      )
                  }
                } else
                  return (
                    <RideComponent
                      city={item.city}
                      date={item.date}
                      destination_code={item.destination_station_code}
                      id={item.id}
                      img={item.map_url}
                      origin_station={item.origin_station_code}
                      state={item.state}
                      key={index}
                      station_path={item.station_path}
                    />
                  )
              else return <p className="hidden"></p>
            })
          : nearestRides.map((item, index) => {
              if (state?.value != undefined || city?.value != undefined) {
                //    if(city.value==item.city)
                // return(<RideComponent city={item.city} date={item.date} destination_code={item.destination_station_code} id={item.id} img={item.map_url} origin_station={item.origin_station_code} state={item.state} key={index} station_path={item.station_path} />)

                if (state?.value == item.state && city?.value == undefined)
                  return (
                    <RideComponent
                      city={item.city}
                      date={item.date}
                      destination_code={item.destination_station_code}
                      id={item.id}
                      img={item.map_url}
                      origin_station={item.origin_station_code}
                      state={item.state}
                      key={index}
                      station_path={item.station_path}
                    />
                  )
                else if (city?.value !== undefined) {
                  if (city?.value == item.city)
                    return (
                      <RideComponent
                        city={item.city}
                        date={item.date}
                        destination_code={item.destination_station_code}
                        id={item.id}
                        img={item.map_url}
                        origin_station={item.origin_station_code}
                        state={item.state}
                        key={index}
                        station_path={item.station_path}
                      />
                    )
                }
              } else
                return (
                  <RideComponent
                    city={item.city}
                    date={item.date}
                    destination_code={item.destination_station_code}
                    id={item.id}
                    img={item.map_url}
                    origin_station={item.origin_station_code}
                    state={item.state}
                    key={index}
                    station_path={item.station_path}
                  />
                )
            })}
      </div>

      <main></main>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await fetch('https://assessment.api.vweb.app/rides').then(
    (response) => response.json()
  )
  const user = await fetch('https://assessment.api.vweb.app/user').then(
    (response) => response.json()
  )
  return {
    props: {
      data,
      user,
    },
  }
}
