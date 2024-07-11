"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import * as zod from "zod";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";

import { auth } from "@/constants/pages";
import { login, register } from "@/utilities/APIS/groceryStoreAPIs";
import Spinner from "@/components/shared/Spinner";

const loginSchema = zod.object({
    Email: zod.string().email("Invalid email"),
    Password: zod.string().min(1, "Password is required"),
});
const registerSchema = zod.object({
    FirstName: zod.string(),
    LastName: zod.string(),
    Email: zod.string().email("Invalid email"),
    Password: zod.string().min(8, "Password is required"),
    PasswordConfirmation: zod.string().min(8, "Password is required"),
    check: zod.boolean(),
});
const page = () => {
    const router = useRouter();
    const SearchParams = useSearchParams();
    const user = SearchParams.get("user") || "false";
    const redirect = SearchParams.get("redirect")
        ? SearchParams.get("redirect")
        : "";

    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PasswordConfirmation: "",
        check: false,
    });

    const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user === "true") {
            // validation
            const isValid = loginSchema.safeParse(form);
            if (!isValid.success) return null;

            //   send a log in request
            setIsLoading(true);
            const res = await login({
                identifier: form.Email,
                password: form.Password,
            });

            //   throw an error
            if (res.status !== "success")
                throw Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: res.message,
                }).finally(() => {
                    setIsLoading(false);
                });
            sessionStorage.setItem("user", JSON.stringify(res.data.user));

            redirect === "false" || redirect === ""
                ? router.push("/", {
                      scroll: false,
                  })
                : router.push("/" + redirect, {
                      scroll: false,
                  });

            setIsLoading(false);

            toast.success("Logged in successfully", {
                draggable: true,
                closeButton: true,
            });
        } else {
            // validation
            const isValid = registerSchema.safeParse(form);
            if (!isValid.success)
                return toast.error("Make sure to write valid data");

            if (form.Password !== form.PasswordConfirmation)
                return toast.error("Password not matched");

            //   send a log in request
            setIsLoading(true);
            const res = await register({
                username: form.FirstName + " " + form.LastName,
                email: form.Email,
                password: form.Password,
            });

            //   throw an error
            if (res.status !== "success")
                return Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: res.message,
                }).finally(() => {
                    setIsLoading(false);
                });
            sessionStorage.setItem("user", JSON.stringify(res.data.user));

            redirect === "false" || redirect === ""
                ? router.push("/", {
                      scroll: false,
                  })
                : router.push("/" + redirect, {
                      scroll: false,
                  });
            setIsLoading(false);

            toast.success("Registered successfully", {
                draggable: true,
            });
        }
    };

    useEffect(() => {
        if (!sessionStorage.getItem("user")) return;

        router.push("/");
        Swal.fire({
            title: "<h3 className='text-bold text-lg'>We think you are already logged in</h3>",
            titleText:
                "If you want to change your account just log out and sign in with another one",
            icon: "info",
        });
    }, []);

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <Image
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        alt=""
                        width={834}
                        height={962}
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />
                    <div className="hidden lg:relative lg:block lg:p-12">
                        <Link className="block text-white" href="auth">
                            <Image
                                src={auth.image.src}
                                alt={auth.image.alt as string}
                                width={auth.image.width}
                                height={auth.image.height}
                            />
                        </Link>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Squid 🦑
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Eligendi nam dolorum aliquam, quibusdam
                            aperiam voluptatum.
                        </p>
                    </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <Link
                                className="inline-flex mb-12 p-6 items-center justify-center rounded-xl bg-white text-blue-600"
                                href="#"
                            >
                                <Image
                                    src={auth.image.src}
                                    alt={auth.image.alt as string}
                                    width={127}
                                    height={127}
                                />
                            </Link>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                {auth.title}
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                {auth.description}
                            </p>
                        </div>

                        <form
                            onSubmit={formHandle}
                            className="mt-8 grid grid-cols-6 gap-6"
                        >
                            {user !== "true" && (
                                <>
                                    {/* first name */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="FirstName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="FirstName"
                                            name="first_name"
                                            value={form.FirstName}
                                            onChange={inputHandle}
                                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            autoFocus={true}
                                            required={true}
                                        />
                                    </div>

                                    {/* last name */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="LastName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="LastName"
                                            name="last_name"
                                            value={form.LastName}
                                            onChange={inputHandle}
                                            className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            required={true}
                                        />
                                    </div>
                                </>
                            )}

                            {/* email */}
                            <div className="col-span-6">
                                <label
                                    htmlFor="Email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    value={form.Email}
                                    onChange={inputHandle}
                                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    required={true}
                                    autoFocus={user === "true" ? true : false}
                                />
                            </div>

                            {/* password */}
                            <div
                                className={twMerge(
                                    "col-span-6",
                                    user !== "true" && "sm:col-span-3"
                                )}
                            >
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    value={form.Password}
                                    onChange={inputHandle}
                                    minLength={user === "true" ? 1 : 8}
                                    required={true}
                                    className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            {user !== "true" && (
                                <>
                                    {/* password confirmation */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="PasswordConfirmation"
                                            className="block  text-sm font-medium text-gray-700"
                                        >
                                            Password Confirmation
                                        </label>

                                        <input
                                            type="password"
                                            id="PasswordConfirmation"
                                            name="password_confirmation"
                                            value={form.PasswordConfirmation}
                                            onChange={inputHandle}
                                            className="mt-1 px-3 py-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                            minLength={8}
                                            required={true}
                                        />
                                    </div>

                                    {/* checkBox */}
                                    <div className="col-span-6">
                                        <label
                                            htmlFor="MarketingAccept"
                                            className="flex gap-4"
                                        >
                                            <input
                                                type="checkbox"
                                                id="MarketingAccept"
                                                name="marketing_accept"
                                                className="size-5 rounded-lg cursor-pointer"
                                                onChange={() => {
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        check: !prev.check,
                                                    }));
                                                }}
                                                checked={form.check}
                                                required={true}
                                            />
                                            <span className="text-sm text-gray-700">
                                                I want to receive emails about
                                                events, product updates and
                                                company announcements.
                                            </span>
                                        </label>
                                    </div>

                                    <div className="col-span-6">
                                        <p className="text-sm text-gray-500">
                                            By creating an account, you agree to
                                            our
                                            <Link
                                                href="#"
                                                className="text-gray-700 underline"
                                            >
                                                {" "}
                                                terms and conditions{" "}
                                            </Link>
                                            and
                                            <Link
                                                href="#"
                                                className="text-gray-700 underline"
                                            >
                                                {" "}
                                                privacy policy
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </>
                            )}

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    className="px-12 py-3 font-medium text-sm bg-green-600 hover:bg-green-700 rounded-md transition-all"
                                    disabled={isLoading ? true : false}
                                >
                                    {isLoading ? (
                                        <Spinner />
                                    ) : user === "true" ? (
                                        "Log in"
                                    ) : (
                                        "Create an account"
                                    )}
                                </Button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link
                                        href={
                                            "/auth?" +
                                            (redirect === "false" ||
                                            redirect === ""
                                                ? ""
                                                : "redirect=" +
                                                  redirect +
                                                  "&") +
                                            (user === "false"
                                                ? "user=true"
                                                : "user=false")
                                        }
                                        className="ms-2 text-gray-700 underline"
                                    >
                                        {user === "true"
                                            ? "Create a new account"
                                            : "Log in"}
                                    </Link>
                                    .
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default page;
