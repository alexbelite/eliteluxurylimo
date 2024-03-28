"use client";
import React from "react";
import { Image } from "next/image";
import { StarIcon } from "./icons";
import { Card, ScrollShadow } from "@nextui-org/react";

export default function Testimonals() {
    const testimonals = [
        {
            name: "Garret Knorr",
            role: "Reginal VIP",
            // date: "3 days ago",
            text: `I've used many limo services for many
            decades but found Elite Luxury Limousine
            to be the best. Their drivers are courteous
            and their dispatcher (Norm) was especially
            helpful during our recent travels.`,
            rating: 5,
        },
        {
            name: "Robert Williams",
            role: "Workplace Advisor",
            // date: "18 days ago",
            text: `Our driver was waiting for us when we
            arrived at the airport. The drive was smooth
            and uneventful just how I like it! Extremely
            professional from start to finish. We will be
            using Elite Luxury Limousine again.`,
            rating: 5,
        },
        {
            name: "Elizabeth Alvarez",
            role: "Office Manager",
            // date: "1 month ago",
            text: `The quality of service and their
            flexibility is top notch. I’ve been
            fortunate to use their services a few
            times and not once have I not been
            satisfied.`,
            rating: 5,
        },
        {
            name: "Mitch Mccrea",
            role: "Associate Professor",
            // date: "1 month ago",
            text: `We were happy with our drivers Alexis and
            Chris. They were able to get us through
            parade traffic and then airport construction
            so we could make our flight in plenty of
            time. We will definitely be contacting Elite
            Luxury Limousine for our next visit.`,
            rating: 5,
        },
        {
            name: "Scott A",
            role: "Mechanical Engineer",
            // date: "1 month ago",
            text: `Top notch service. Gladly recommend this
            company. Will use again for sure!`,
            rating: 5,
        },
        {
            name: "Phillip Weber",
            role: "CEO",
            // date: "1 month ago",
            text: `Our driver was waiting for us when
            we arrived at the airport as they track
            the flight. The drive was smooth and
            uneventful just how I like it!
            Extremely professional from start to
            finish. Will be using Elite Luxury
            Limousine again.`,
            rating: 5,
        },
    ];
    return (
        // <ScrollShadow
        //     hideScrollBar
        //     orientation="horizontal"
        //     isEnabled
        //     size={300}
        //     style={{
        //         // @ts-ignore
        //         "--gap": "100px",
        //         "--duration": `${15}s`,
        //     }}
        //     className="max-w-full p-4 space-x-4 overflow-x-scroll  rounded-none relative">
        //     <div className=" max-smpl-0 pl-[100px] flex animate-scrolling-banner w-max items-stretch gap-[20px]">
        <div
            className="grid overflow-x-auto max-sm:flex  max-sm:px-5 grid-cols-6 gap-2 px-1">
            {testimonals.map((el, index) => (
                <Card
                    className="text-[#fff] w-full h-[300px] carousel-item p-4 bg-black/50 flex flex-col gap-2"
                    key={index}>
                    <h6 className="text-md">{el.name}</h6>
                    <span className="text-sm">{el.role}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, starIndex) => (
                            <StarIcon key={starIndex} />
                        ))}
                    </div>
                    <p className="text-default-400 text-xs">{el.text}</p>
                </Card>
            ))}
        </div>
        //     </div>
        // </ScrollShadow>
    );
}
