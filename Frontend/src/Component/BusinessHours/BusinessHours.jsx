import React from "react";
import { FaClock } from "react-icons/fa";

const BusinessHours = () => {
  const hours = [
    { day: "Monday", open: "09:00 AM", close: "05:00 PM" },
    { day: "Tuesday", open: "09:00 AM", close: "05:00 PM" },
    { day: "Wednesday", open: "09:00 AM", close: "05:00 PM" },
    { day: "Thursday", open: "09:00 AM", close: "05:00 PM" },
    { day: "Friday", open: "09:00 AM", close: "05:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "02:00 PM" },
    { day: "Sunday", open: "Closed", close: "" },
  ];

  return (
    <section className=" pb-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <FaClock className="text-[#F7A582] text-3xl" />
          <h2 className="text-2xl font-semibold text-gray-700">Business Hours</h2>
        </div>

        <div className="border rounded-lg overflow-hidden">
          {hours.map((hour, index) => (
            <div
              key={index}
              className={`flex justify-between px-4 py-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <span className="text-gray-700 font-medium">{hour.day}</span>
              <span className="text-gray-500">
                {hour.open === "Closed" ? (
                  <span className="text-red-500">Closed</span>
                ) : (
                  `${hour.open} - ${hour.close}`
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessHours;
