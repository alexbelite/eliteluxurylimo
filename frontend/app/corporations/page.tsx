import { Metadata } from 'next'
import private_driver from "@/public/corporate page pic 03142024 three.jpg";
import corp2 from '@/public/createaccountcorp.jpg'
import Image from "next/image";
import ad from "@/public/corporation_banner.jpg";
import React from "react";
import CorporationsForm from "@/components/corporations-form";

export const metadata: Metadata = {
  title: 'Corporations',
}

export default function CorporationsPage() {
  return (
    <React.Fragment>
      <section className=" max-sm:mt-3 mt-[36px] pt-10">
        <article className="w-full shadow-lg relative max-sm:h-[100px] h-[300px] max-sm:my-3">
          <div className="font-timesroman text-white absolute z-10 text-sm sm:text-5xl max-sm:left-[10%]  max-sm:top-10 left-16 top-[45%] max-sm:text-white/70">
            Make your trip an unforgettable moment together.
          </div>
          <Image
            priority
            fill
            className="brightness-50 w-full object-cover object-top backdrop-brightness-50"
            src={ad}
            alt="Order limo"
          />
        </article>
        <section className="w-full max-sm:h-auto flex h-[400px] max-md:flex-col justify-between items-start ">
          <div className="max-md:w-full max-sm:h-auto  w-1/2 h-full gap-4 flex flex-col justify-start items-start p-4">
            <h2 className="max-sm:text-2xl text-4xl">
              Budget Friendly Corporate Service
            </h2>
            <p>
              Corporate Limousine can be used for a variety of reasons. For
              example, to transport their executives, business partners and
              clients. Elite Luxury Limousine provides professional limousine
              services for our corporate partners no matter the event or
              required needs. When courting new clients there is nothing more
              important than image and it begins with the moment you’ve arranged
              their transportation. Our fleet can accommodate any occasion
              whether the need is a sedan, SUV, to large busses.
            </p>
          </div>
          <div className="max-md:w-full max-sm:h-[300px] w-1/2 h-full relative">
            <Image
              src={private_driver}
              fill
              priority
              objectFit="cover"
              alt="driver corporations"
            />
          </div>
        </section>
      </section>
      <section className=" text-[#D4D4D8] flex-row w-full sm:h-[700px] max-sm:gap-2 max-sm:py-2  flex max-sm:h-auto  max-sm:flex-col max-md:flex-row max-md:h-[90vh] max-lg:h-[400px] lg:flex-row ">
        <div className="h-1/2 relative max-sm:h-1/2 max-sm:w-full max-md:w-1/2 max-md:h-full max-lg:w-1/2 max-lg:h-full lg:w-3/5 lg:h-full">
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.3vw, 100vw"
            src={corp2}
            quality={100}
            alt="order driver"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className=" w-2/5 h-full flex justify-center items-center max-sm:h-1/2 max-sm:w-full">
          <div className="container mx-auto h-full flex justify-center items-center  max-sm:gap-1 gap-2">
            <CorporationsForm/>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
