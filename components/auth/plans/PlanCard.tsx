"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCreatePackageMutation } from "@/redux/features/package/packageApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

/* ────────── PlanCard ────────── */
const PlanCard = ({ pkg }: any) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  /* ────────── mutation: create package ────────── */
  const [
    createPackage,
    {
      isLoading: isCreating,
      isError: isCreatingError,
      isSuccess: isCreateSuccess,
      error: createError,
    },
  ] = useCreatePackageMutation();

  /* ────────── handlers ────────── */
  const handleCreatePackage = async (packageId: string) => {
    if (!user?._id) {
      toast.warn("Please sign in first");
      return;
    }
    // Block if KYC not verified
    if (!user?.kyc_verified) {
      toast.info("Please complete KYC verification before investing.");
      return;
    }
    createPackage({ packageId });
  };

  /* ────────── effects ────────── */
  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Package created successfully");
      router.push("/my-plans");
    }
    if (isCreatingError) {
      toast.error(
        (createError as fetchBaseQueryError)?.data?.message ||
          "Failed to create package"
      );
    }
  }, [isCreateSuccess, isCreatingError, createError, router]);

  /* ────────── drawer state ────────── */
  const [isOpen, setIsOpen] = useState(false);
  const [sPackage, setSPackage] = useState(pkg);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => {
    if (!isCreating) setIsOpen(false);
  };

  const handleSelectPackage = (p: any) => {
    setSPackage(p);
    openDrawer();
  };

  const goKyc = () => router.push("/kyc");

  const isKycVerified = Boolean(user?.kyc_verified);

  return (
    <div>
      {/* ────────── package card ────────── */}
      <div className="package-card text-center bg_img">
        <h4 className="package-card__title base--color mb-2">{pkg.title}</h4>
        <ul className="package-card__features mt-4">
          <li>Return: {pkg.return}</li>
          <li>{pkg.days}</li>
          <li>
            Total Return: <span className="font-bold">2x</span>
          </li>
        </ul>
        <div className="package-card__range mt-5 base--color">${pkg.price}</div>

        <button
          className="cmn-btn font-bold"
          onClick={() => handleSelectPackage(pkg)}
        >
          Invest Now
        </button>
      </div>

      {/* ────────── drawer ────────── */}
      <Drawer
        open={isOpen}
        onOpenChange={(open) => !isCreating && setIsOpen(open)}
      >
        <DrawerContent className="drawer-card border-t-2 border-l-2 border-r-2 border-[#cca354]">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-base-color">
                {isKycVerified
                  ? "Are you sure you want to invest?"
                  : "KYC Verification Required"}
              </DrawerTitle>

              {/* Description zone */}
              {isKycVerified ? (
                <DrawerDescription>
                  <span className="text-gray-50">Investing in this plan </span>
                  <span className="text-base-color font-semibold">
                    {sPackage?.title}
                  </span>
                </DrawerDescription>
              ) : (
                <div className="rounded-md border border-yellow-400/30 bg-yellow-900/30 p-3 text-sm leading-5">
                  <p className="text-yellow-200 font-semibold">
                    Your KYC is not verified yet.
                  </p>
                  <p className="text-yellow-100/90 mt-1">
                    Please complete your KYC verification before activating a
                    package.
                  </p>
                </div>
              )}
            </DrawerHeader>

            <DrawerFooter>
              {/* If KYC verified → show Confirm; else → show Go to KYC */}
              {isKycVerified ? (
                <button
                  className="cmn-btn font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleCreatePackage(sPackage._id)}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <PulseLoader color="#fff" size={8} />
                  ) : (
                    "Confirm"
                  )}
                </button>
              ) : (
                <Button
                  className="bg-[#cca354] hover:bg-[#b58f47] text-white font-semibold"
                  onClick={goKyc}
                  disabled={isCreating}
                >
                  Go to KYC
                </Button>
              )}

              <DrawerClose asChild>
                <Button
                  variant="destructive"
                  onClick={closeDrawer}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PlanCard;
