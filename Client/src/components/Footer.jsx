import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLinkedin, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const buttonOptions = [
    {
      id: 0,
      logo: <FaGithub />,
      to: "https://github.com/mr21sanger",
      tooltip: "GitHub",
    },
    {
      id: 1,
      logo: <SiGmail />,
      to: "mailto:shiwang21projects@gmail.com",
      tooltip: "Email",
    },
    {
      id: 2,
      logo: <FaLinkedin />,
      to: "https://www.linkedin.com/in/shiwang-sanger-470750222/",
      tooltip: "LinkedIn",
    },
    {
      id: 3,
      logo: <FaWhatsapp />,
      to: "https://wa.me/9891061356",
      tooltip: "WhatsApp",
    },
    {
      id: 4,
      logo: <FaTelegramPlane />,
      to: "https://t.me/Mr_21sanger",
      tooltip: "Telegram",
    },
  ];

  return (
    <footer className="w-full relative bottom-0 bg-neutral-900 text-gray-300">
      {/* Stay in Touch Section */}
      <div className="w-full h-[20vh] flex flex-col items-center justify-center border-b border-neutral-700">
        <p className="text-lg text-neutral-400 font-bold text-center my-2">
          Stay in Touch
        </p>
        <div className="flex justify-center items-center gap-4">
          {buttonOptions.map((currElem) => (
            <a
              key={currElem.id}
              href={currElem.to}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent w-12 h-12 rounded-full flex justify-center items-center transition-all duration-200 text-xl hover:bg-neutral-500 text-gray-300"
              title={currElem.tooltip}
            >
              {currElem.logo}
            </a>
          ))}
        </div>
      </div>


      {/* Contact Information */}
      <div className="w-full h-[10vh] flex flex-col items-center justify-center border-b border-neutral-700">
        <h4 className="text-lg font-semibold text-neutral-400">Contact Us</h4>
        <p className="text-sm text-neutral-400 mt-2">
          Email: shiwang21projects@gmail.com | Phone: +91 98910 61356
        </p>
      </div>

      {/* Copyright Section */}
      <div className="w-full h-[10vh] flex items-center justify-center bg-neutral-800">
        <p className="text-sm text-neutral-500 text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
