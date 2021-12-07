import React from 'react';
import { ExternalLinkIcon, LockClosedIcon,PencilIcon } from '@heroicons/react/solid';
import ImageSliders from './ImageSliders';
import { Button, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router'

export default function HeroSlipWithImage(props) {

    const {slideData} = props;
    const router = useRouter()

  return (
//  <div className="relative bg-gray-800 px-20">
    <div className='relative bg-transparent pt-5 hero-slpit-with-image'>
      <div className="h-56 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2 md:pl-10">
        {/* <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply" alt=""  /> */}
        <ImageSliders data={slideData} /> 
      </div>
      <div className="relative max-w-7xl mx-auto px-4 pt-12 sm:px-6 lg:px-8 lg:py-16 hero-split-text-first">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-base font-semibold uppercase tracking-wider ">Welcome To The Online Recruitment System</h2>
          <p className="mt-2  text-3xl font-extrabold tracking-tight sm:text-4xl">We’re here to help you</p>
          <p className="mt-3 text-lg ">
            To be able apply for your interest you first need to be a user on this platform, kindly click on the button below to register or login 
            and read every peice of information carfully before submitting your final request because after doing so you may not be able to revert any change done.
          </p>
          {/* <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
              >
                Visit the help center
                <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 " aria-hidden="true" />
              </a>
            </div> 
          </div> */}
                <Grid.Container gap={2} justify='center'>
                    <Grid>
                        {/* <Button
                        auto
                        bordered 
                        className='system-buttons'
                        onClick={()=>{router.push('/signup')}}
                        >
                            <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            <span>SignIn / Register</span>
                        </Button>    */}
                        <span
                            onClick={()=>{router.push('/signin')}}
                            className="inline-flex items-center justify-center px-5 py-3  border-transparent text-base font-medium rounded-md text-gray-900 bg-lime-200 hover:bg-lime-500  pointer border-3 "
                        >
                            <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Log-In
                            {/* <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 " aria-hidden="true" /> */}
                        </span>
                    </Grid>
                    <Grid>
                        {/* <Button
                        auto
                        bordered 
                        className='system-buttons'
                        onClick={()=>{router.push('/signup')}}
                        >
                            <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            <span>SignIn / Register</span>
                        </Button>    */}
                        <span
                            onClick={()=>{router.push('/signup')}}
                            className="inline-flex items-center justify-center px-5 py-3 border-2 border-transparent text-base font-medium rounded-md text-gray-900 bg-red-200 hover:bg-red-400 pointer border-slate-900"
                        >
                            <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Register
                            
                        </span>
                    </Grid>       
                </Grid.Container>







        </div>
      </div>
    </div>  )
}
