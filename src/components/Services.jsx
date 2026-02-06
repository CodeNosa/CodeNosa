import { useEffect, useState } from "react";
import axios from "axios";

const API_SERVICES = "http://localhost:5000/api/services";

export default function Services({ lang }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(API_SERVICES);
        setServices(res.data);
      } catch (err) {
        console.error("Erreur récupération services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-16 bg-white dark:bg-night/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nos Services</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Technologies utilisées</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service._id} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

              <ul className="space-y-2">
                {service.features && service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
