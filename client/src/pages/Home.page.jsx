import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import ServicesGrid from "../components/ServicesGrid";
import InsuranceServices from "../components/InsuranceServices";

const Home = () => {
    return (
        <div className="flex flex-col">
            <main className="flex-1 pt-16">
                <Hero />
                <ServicesGrid />
                <InsuranceServices />
                <Testimonials />
            </main>
        </div>
    );
}

export default Home;