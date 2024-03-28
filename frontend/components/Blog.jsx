
import BlogCards from './BlogCards';


export default function Blog() {
    const images = [
        {
            id: 'airport',
            // image: 'https://res.cloudinary.com/dxvf93ovn/image/upload/v1706915757/airtransport_fzsw07.jpg',
            image: 'https://res.cloudinary.com/dxvf93ovn/image/upload/v1710723377/alexlimoimg/airtransport_pkxsdl.jpg',
            label: 'Airport Transportation',
            description: `We are the premier service to utilize for airport transportation service whether it’s to or from the airport. We serve
        all major airports as well as all private jet centers. We offer world class airport car service our chauffeurs go above and beyond to
        provide the service you expect. We take great pride in making sure our clients enjoy first-class service and comfort as you travel
        in style to and from your destinations.`
        },
        {
            id: 'corporate',
            image: 'https://res.cloudinary.com/dxvf93ovn/image/upload/v1710717113/alexlimoimg/corporate_meeting_gil4fa.jpg',
            // image: '/corporate meeting.jpg',
            label: 'Corporate Serviсes',
            description: `We are committed to providing our corporate limo service clientele with the best corporate transportation service
        available. Whether you’re entertaining existing or potential clients, company employees or just simply traveling to business
        meetings…Elite Luxury Limousine has the vehicles and professionalism to serve all your corporate transportation needs. All of our
        chauffeurs are professionally trained drivers who are dedicated to making your business transportation service experience with
        Elite Luxury Limousine the best possible.`,
        },
        {
            id: 'tours',
            image: 'https://res.cloudinary.com/dxvf93ovn/image/upload/v1710717301/alexlimoimg/private_excursion_evymmt.jpg',
            // image: '/private excursion.jpg',
            label: 'Private Excursion & Tours',
            description: `We offer charter services in order to afford you a way to explore in luxury many well-known beautiful and
        exciting locations throughout Chicagoland. Our clients travel in the ultimate comfort driven by our professional chauffeurs that
        have in-depth knowledge of all landmarks and exciting destinations you’re seeking to visit. If you wish to visit somewhere off the
        beaten path it’s not an issue simply provide your chauffer with the details and address if available and they’ll be more than happy
        to take you there.`,
        },
        {
            id: 'events',
            image: 'https://res.cloudinary.com/dxvf93ovn/image/upload/v1710717116/alexlimoimg/events_pic_03142024_four_edp67y.jpg',
            // image: '/events pic 03142024 four.jpg',
            label: 'Events & Special Occasions',
            description: `We specialize in providing you the highest level of professional transportation limousine services for any and all
        of your big moment and once-in-a-lifetime events and occasions. Let our professional chauffeurs drive you to that special
        moment in your life you’ll be driven in comfort unrushed and arrive on time.`,
        },
    ]
    return (
        <div id="services" className="scroll-mt-20 grid grid-cols-1 grid-flow-row sm:grid-cols-1 md:grid-cols-2  sm:grid-rows-2  max-lg:gap-y-3">
            <BlogCards images={images} />
        </div>
    )

}