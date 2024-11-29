import { Star } from 'lucide-react'

const Testimonials = () => {
    return (
        <section className='py-12 md:py-24 bg-gray-50'>
            <div className='container px-4 md:px-40'>
                <h2 className='text-3xl text-left'>What Our Customers</h2>
                <h2 className='text-3xl text-left mb-12'>Are Saying</h2>
                <div className='grid gap-8 md:grid-cols-3'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='bg-white p-6 rounded-lg shadow-sm'>
                            <div className='flex items-center gap-4 mb-4'>
                                <div className='w-12 h-12 rounded-full overflow-hidden'>
                                    <img
                                        src='https://static.thenounproject.com/png/363640-200.png'
                                        alt={`Customer ${i}`}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div>
                                    <h3 className='font-semibold'>Customer Name</h3>
                                    <div className='flex gap-1'>
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className='text-gray-600 text-sm'>
                                "Great experience with InsureGuard. The team was professional and helped me find the perfect coverage for my needs."
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials;