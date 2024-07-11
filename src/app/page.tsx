import Header from "@/components/Header";
import Categories from "@/components/home/Categories";
import Products from "@/components/home/Products";
import Banner from "@/components/shared/Banner";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import ReduxProvider from "@/components/providers/ReduxProvider";

const App = () => {
     
    return (
        <>
            <ReduxProvider>
                <Header />
            </ReduxProvider>

            <Hero />

            <ReduxProvider>
                <Categories />
            </ReduxProvider>

            <Products />

            <Banner />

            <Footer />
        </>
    );
};

export default App;
