import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image from next/image

const Header = () => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use useEffect to update the clock and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  // Format date as Month Day, Year (e.g., October 26, 2024)
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Navbar */}
      <nav className="flex w-full items-center justify-between bg-[#0442B1] px-4 py-2 text-white">
        <div className="flex items-center">
          {/* Logo Image */}
          <Image
            src="/MANGGAD LOGO.png" // Replace with the path to your logo image
            alt="Logo"
            width={128} // Adjust width as needed
            height={128} // Adjust height as needed
            className="mr-2 hidden lg:block" // Adjust height and width as needed
          />
          <div className="text-lg font-extrabold lg:text-2xl">
            Manggad Research Repository
          </div>
        </div>

        {/* Centered Navigation Links and Real-time/ Admin section */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex space-x-5">
            <a
              className="cursor-pointer text-lg hover:underline"
              onClick={() => router.push("/home")}
            >
              Home
            </a>
            <a
              className="cursor-pointer text-lg hover:underline"
              onClick={() => router.push("/about")}
            >
              About
            </a>
            <a
              className="cursor-pointer text-lg hover:underline"
              onClick={() => router.push("/contact")}
            >
              Contact
            </a>
          </div>

          {/* Divider Line */}
          <div className="mx-4 hidden h-10 border-l border-white lg:block"></div>

          {/* Real-time Date, Time and Admin Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden text-right font-mono text-lg lg:block">
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>

            {/* Profile Icon Button for Admin Login */}
            <button
              className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => router.push("/login")}
            >
              {/* SVG Icon for Person */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c2.485 0 4.5-2.015 4.5-4.5S14.485 2 12 2 7.5 4.015 7.5 6.5 9.515 11 12 11zM4 20c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Image Banner */}
      <div className="w-full">
        <Image
          src="/Librarysample.jpg"
          alt="Banner"
          width={1920} // Adjust width as needed
          height={200} // Adjust height as needed
          className="object-cover lg:h-[200px]" // Adjust height as needed
        />
      </div>
    </div>
  );
};

export default Header;
