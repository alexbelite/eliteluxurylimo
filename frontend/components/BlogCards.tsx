"use client";
import { Card, Image, CardBody } from "@nextui-org/react";
import type { CardProps } from "@nextui-org/react";
import { BlogCardsProps } from "@/types";

export default function BlogCards({
  images,
  ...props
}: { images: BlogCardsProps[] } & CardProps) {
  return (
    <>
      {images.map((el, index) => (
        <Card
          id={el.id}
          key={index}
          className="scroll-mt-10 w-full bg-black text-white"
          radius="none"
          shadow="none"
          {...props}
        >
          <CardBody
            className={`flex ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center p-0 `}
          >
            <Image
              radius="none"
              removeWrapper
              alt={el.label}
              className=" w-full md:w-1/2 flex-none object-contain object-center"
              src={el.image.toString()}
            />
            <div className="px-4 py-5 w-full md:w-1/2">
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
