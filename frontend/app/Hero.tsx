import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
    return (
        <div className="flex justify-center bg-secondary">
            <div className="w-full sm:w-2/3 flex items-center flex-col p-4">
                <div className="pt-30 pb-20">
                    <h1 className="text-6xl font-bold text-center mb-5">
                        Flight Price Tracker
                    </h1>
                    <h3 className="text-xl text-center text-muted-foreground">
                        Your partner in getting the best flights, at the best
                        prices
                    </h3>
                </div>
                <SearchBar />
            </div>
        </div>
    );
};

export default Hero;
