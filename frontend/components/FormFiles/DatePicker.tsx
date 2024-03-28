"use client";
import React from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useDispatch } from "react-redux";
import { updatePickupDate, updatePickupTime } from "@/store/googleMapSlice";

const DateComponent: React.FC = () => {
  const dispatch = useDispatch();

  // const handleDateChange = (date: string | null) => {
  //   if (date) {
  //     dispatch(updatePickupDate(date));
  //   }
  // };

  // const handleTimeChange = (time: string | null) => {
  //   if (time) {
  //     dispatch(updatePickupTime(time));
  //   }
  // };

  return (
    <div className="p-4 gap-3 w-full flex justify-between items-start">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
             label={<span className="">Pick-up Date</span>} 
              className="w-full bg-white  text-white" 
          defaultValue={dayjs(new Date())}
          // onChange={(e) => e && handleDateChange(e.toDate().toDateString())}

               slotProps={{ 
                textField: { InputProps: { color: 'primary' },
               }}}
               />
            <TimePicker 
            // onChange={(e) => e && handleTimeChange(e.format('HH:mm'))}  
            label={<span className="">Pick-up Time</span>} className="w-full  text-white" defaultValue={dayjs('2022-04-17T15:30')} />
      </LocalizationProvider>
    </div>
  );
};

export default DateComponent;
