import { Star } from 'lucide-react'

const Testimonials = () => {
    const reviews = [
        { customerName: 'Karan Bisht', review: 'Excellent service from Paaras! The staff was friendly and ensured my home was spotless in no time.' },
        { customerName: 'Ayush Kumar', review: 'Had a great experience with Paaras. They quickly helped me find the right insurance.' },
        { customerName: 'Raj Kumar', review: 'Impressed by Paaras! The team handled my relocation smoothly and took great care of my belongings.' }
    ]

    return (
        <section className='py-12 md:py-24 bg-gray-50'>
            <div className='px-4 md:px-20 lg:px-40'>
                <h2 className='text-3xl text-left'>What Our Customers</h2>
                <h2 className='text-3xl text-left mb-12'>Are Saying</h2>
                <div className='grid gap-8 md:grid-cols-3'>
                    {reviews.map(({ customerName, review }, index) => (
                        <div key={index} className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='flex items-center gap-4 mb-4'>
                                <div className='size-12 md:size-6 lg:size-12 rounded-full overflow-hidden'>
                                    <img
                                        src='https://static.thenounproject.com/png/363640-200.png'
                                        alt={customerName}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div>
                                    <h3 className='font-semibold'>{customerName}</h3>
                                    <div className='flex gap-1'>
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className='text-gray-600 text-sm'>
                                {review}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials;