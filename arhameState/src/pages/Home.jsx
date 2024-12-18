import React, { useEffect, useState } from 'react';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);





    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Real Estate Listings</h1>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {properties?.map((property, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={property?.thumbnailUrl}
                            alt={property?.title || 'Property'}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg text-gray-800 truncate">{property?.title || 'Unnamed Property'}</h2>
                            {/* <p className="text-sm text-gray-600">Price: {property?.price ? `$${property.price}` : 'N/A'}</p>
                            <p className="text-sm text-gray-600">Location: {property?.location || 'Unknown'}</p> */}
            {/* </div>
                    </div >
                ))}
            </div > */}
        </div >
    );
};

export default Home;
