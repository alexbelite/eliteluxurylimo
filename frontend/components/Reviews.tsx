import { reviews } from "@/utils";
import Image from 'next/image';



export default function Reviews(){

    return(
        <section>
        <div className="w-full grid grid-cols-1 grid-rows-1 gap-2">
            <h4 className="text-center text-2xl max-sm:text-3xl">It&apos;s a Simple Choice</h4>
        </div>
        <div className=" container items-baseline h-auto py-9 grid max-sm:grid-cols-1 grid-cols-3 grid-flow-row gap-3">
            {
                reviews.map((el, index) => (    
            <div className="gap-3 flex flex-col justify-center items-center w-full h-[300px]" key={index}>
                <div className=" relative flex justify-center items-center w-24 h-24">
                        <Image className="object-cover" fill src={el.image} alt={el.description} />
                </div>
                        <h3 className="text-medium">{el.label }</h3>
                        <p className="w-[300px] h-auto text-start text-[14px]">{el.description}</p>
            </div>
                    ))
            }
        </div>
        </section>
        )
}                        