import Logo2 from "@/public/logo_2.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" pt-10 border-t border-[#cca354]">
      <div className=" px-4">
        <div className=" grid grid-cols-2 items-center ">
          <div className=" space-y-3 ">
            <Image src={Logo2} alt="logo" className=" w-28 " />
            <div>
              <p className=" text-sm">Milledgeville, GA, 31061-7076, USA"</p>
            </div>
          </div>

          <div className=" justify-self-end">
            <ul className=" space-y-1 ">
              <h2 className=" font-semibold">
                Quick <span className="text-[#cca354]"> Links</span>
              </h2>
              <li className=" text-sm">
                <Link href="/" className="text-sm hover:text-[#cca354]">
                  Home
                </Link>
              </li>
              <li className=" text-sm">
                <Link href="/privacy" className="text-sm hover:text-[#cca354]">
                  Privacy & Policy
                </Link>
              </li>
              <li className=" text-sm">
                <Link href="/terms" className="text-sm hover:text-[#cca354]">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className=" py-4 bg-slate-950 mt-6">
        <p className=" text-center text-xs">
          © 2025 Orex Trade. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
