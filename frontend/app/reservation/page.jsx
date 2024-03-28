"use client";
import DateComponent from "@/components/FormFiles/DatePicker";
import PeopleForm from "@/components/FormFiles/PeopleForm";
import SearchLocation from "@/components/FormFiles/SearchLocation";
import SelectService from "@/components/FormFiles/SelectService";
import Map from '@/components/GoogleMapFiles/GoogleMap';


export default function BookOnline() {
  return (
    <section className=" max-sm:h-auto bg-white h-[800px] py-10 flex-wrap container flex max-sm:flex-col-reverse justify-between items-center mt-3">
      <div className=" w-1/2 max-sm:w-full h-full flex flex-col items-center justify-center">
        <SelectService />
        <DateComponent />
        <SearchLocation />
        <div className="w-full px-4">
          <PeopleForm />
        </div>
      </div>
      <div className="w-1/2 max-sm:w-full flex justify-start items-start h-1/2 max-md:h-full md:h-[540px] max-sm:h-[300px]">
        <Map />
      </div>
    </section>
  )

}