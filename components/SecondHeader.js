import Head from 'next/head'
import React, { useState } from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Link from 'next/link'
function SecondHeader() {
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
  }
  function PastRides() {
    setPast('cursor-pointer font-semibold text-white underline')
    setNearest('cursor-pointer font-light text-[#D0CBCB]')
    setUpcoming('cursor-pointer font-light text-[#D0CBCB]')
  }
  function UpcomingRides() {
    setUpcoming('cursor-pointer font-semibold  text-white underline')
    setNearest('cursor-pointer font-light text-[#D0CBCB]')
    setPast('cursor-pointer font-light text-[#D0CBCB]')
  }

  return (
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
        <Link href="/upcoming">
          <h1 className={` ${upcoming}`} onClick={UpcomingRides}>
            Upcoming Rides
          </h1>
        </Link>

        <Link href="/past">
          <h1 className={` ${past}`} onClick={PastRides}>
            Past Rides
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
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
    </div>
  )
}

export default SecondHeader
