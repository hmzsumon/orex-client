"use client";
import Logo from "@/public/logo_1.png";
import localFont from "next/font/local";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "./Container";

import Link from "next/link";

const beaufortLol = localFont({
  src: "../../app/fonts/BeaufortforLOL-Regular.ttf",
});

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 border border-b-primary/10 header z-50 ">
      <Container>
        <div className="flex justify-between items-center">
          <div className=" flex items-center gap-1 cursor-pointer">
            {/* <Sheet>
							<SheetTrigger asChild>
								<Menu className='md:hidden ' size={34} />
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Edit profile</SheetTitle>
								</SheetHeader>
								<div>
									<SheetClose asChild>
										<Link
											href='/contact'
											className='bg-red-500 w-full px-4 py-2'
										>
											<span className='text-primary hover:text-primary-dark'>
												Contact
											</span>
										</Link>
									</SheetClose>
								</div>
							</SheetContent>
						</Sheet> */}

            <div>
              <Image
                src={Logo}
                alt="Orex logo"
                className="w-36 md:w-44"
                onClick={() => router.push("/")}
              />
            </div>
          </div>
          {/* <div>
						<div className='hidden md:flex gap-3'>
							<Link href='/contact'>
								<span className='text-primary hover:text-primary-dark'>
									Contact
								</span>
							</Link>
							<Link href='/contact'>
								<span className='text-primary hover:text-primary-dark'>
									About
								</span>
							</Link>
						</div>
					</div> */}
          <div className=" flex items-center gap-3">
            <div className={` ${beaufortLol.className} flex gap-2`}>
              <Link href="/login">
                <button className=" button button--secondary w-20 md:w-24  h-9">
                  <span className="button__title"> Log in </span>
                </button>
              </Link>
              <Link href="/sign-up">
                <button className=" button button--secondary w-20 md:w-24 h-9">
                  <span className="button__title">Sign up</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
