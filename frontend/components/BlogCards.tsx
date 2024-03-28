"use client";
import { Card, Image, CardBody } from "@nextui-org/react";
import type { CardProps } from "@nextui-org/react";
import {BlogCardsProps} from '@/types'

export default function BlogCards({ images, ...props }: { images: BlogCardsProps[] } & CardProps) {
    return (
        <>
            {images.map((el, index) => (
                <Card id={el.id} key={index} className="scroll-mt-10 w-full bg-black text-white " radius="none" shadow="none" {...props}>
                    <CardBody className="flex max-lg:flex-col gap-2 flex-wrap p-0 sm:flex-nowrap">
                        <Image
                            radius="none"
                            removeWrapper
                            alt={el.label}
                            className=" max-md:h-[340px] w-full flex-none object-cover h-[340px] object-center"
                            src={el.image.toString()}
                        />
                        <div className="px-4 py-5">
                            <h3 className="text-large font-medium">{el.label}</h3>
                            <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
                                <p>{el.description}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}