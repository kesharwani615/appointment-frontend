import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import SlotCard from "../components/ui/SlotCard";

import {
    getSlots,
    bookAppointment,
    cancelAppointment
} from "../api/slotApi";


const Dashboard = () => {

    const [slots, setSlots] = useState([]);

    const [loading, setLoading] = useState(true);

    const [bookingId, setBookingId] = useState(null);


    // Filters
    const [selectedDate, setSelectedDate] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");


    // Fetch Slots API
    const fetchSlots = async () => {

        try {

            setLoading(true);

            const response = await getSlots({

                date: selectedDate,

                status:
                    statusFilter === "all"
                        ? ""
                        : statusFilter,

                page: 1,

                limit: 20,
            });

            console.log("Slots Response:", response);

            setSlots(
                response?.data?.slots || []
            );

        } catch (error) {

            console.log(
                "Fetch Slots Error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // Fetch Slots On Filter Change
    useEffect(() => {

        fetchSlots();

    }, [selectedDate, statusFilter]);


    const uniqueDates = Array.from(
        { length: 7 },
        (_, index) => {

            const date = new Date();

            date.setDate(
                date.getDate() + index
            );

            return date
                .toISOString()
                .split("T")[0];
        }
    );


    // Handle Booking
    const handleBook = async (slotId) => {

        try {

            console.log("booked:", slotId)

            setBookingId(slotId);

            const response =
                await bookAppointment(slotId);

            console.log(
                "Booking Response:",
                response
            );


            // Update UI instantly
            setSlots((prev) =>
                prev.map((slot) =>
                    slot._id === slotId
                        ? {
                            ...slot,
                            isBooked: true,
                        }
                        : slot
                )
            );


            alert(
                response?.message ||
                "Appointment booked successfully"
            );

        } catch (error) {

            console.log(
                "Booking Error:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Booking failed"
            );

        } finally {

            setBookingId(null);
        }
    };

    const handleCancel = async (slotId) => {

        try {

            const reason = prompt(
                "Enter cancellation reason"
            );

            if (!reason) return;

            setBookingId(slotId);

            const response =
                await cancelAppointment(
                    slotId,
                    reason
                );

            console.log(
                "Cancel Response:",
                response
            );


            // Update UI
            setSlots((prev) =>
                prev.map((slot) =>
                    slot._id === slotId
                        ? {
                            ...slot,
                            isBooked: false,
                        }
                        : slot
                )
            );

            alert(
                response?.message ||
                "Appointment cancelled"
            );

        } catch (error) {

            console.log(
                "Cancel Error:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Cancellation failed"
            );

        } finally {

            setBookingId(null);
        }
    };

    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-br
                from-slate-950
                via-slate-900
                to-black
                relative
                overflow-hidden
            "
        >

            <Navbar />


            {/* Glow Background */}

            <div
                className="
                    absolute
                    top-[-120px]
                    right-[-120px]
                    w-[350px]
                    h-[350px]
                    bg-indigo-500/20
                    rounded-full
                    blur-[140px]
                "
            />

            <div
                className="
                    absolute
                    bottom-[-120px]
                    left-[-120px]
                    w-[350px]
                    h-[350px]
                    bg-purple-500/20
                    rounded-full
                    blur-[140px]
                "
            />


            <main
                className="
                    relative
                    z-10
                    max-w-7xl
                    mx-auto
                    px-6
                    py-14
                "
            >

                {/* Header */}

                <div className="mb-14 text-center">

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-2
                            rounded-full
                            bg-indigo-500/10
                            border
                            border-indigo-500/20
                            text-indigo-300
                            text-xs
                            font-bold
                            tracking-[0.2em]
                            uppercase
                            mb-6
                        "
                    >
                        Appointment Booking System
                    </div>


                    <h1
                        className="
                            text-5xl
                            md:text-6xl
                            font-black
                            text-white
                            leading-tight
                            tracking-tight
                            mb-6
                        "
                    >
                        Book Your
                        <span
                            className="
                                bg-gradient-to-r
                                from-indigo-400
                                to-purple-500
                                bg-clip-text
                                text-transparent
                                ml-4
                            "
                        >
                            Appointment
                        </span>
                    </h1>


                    <p
                        className="
                            text-lg
                            text-gray-400
                            max-w-2xl
                            mx-auto
                        "
                    >
                        Choose your preferred appointment slot
                        and securely reserve your consultation.
                    </p>

                </div>


                {/* Filters */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        gap-5
                        justify-between
                        items-center
                        mb-12
                    "
                >

                    {/* Date Filter */}

                    <select
                        value={selectedDate}
                        onChange={(e) =>
                            setSelectedDate(e.target.value)
                        }
                        className="
                            w-full
                            md:w-[240px]
                            bg-white/5
                            border
                            border-white/10
                            rounded-2xl
                            px-5
                            py-4
                            text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                        "
                    >

                        <option
                            value=""
                            className="bg-slate-900"
                        >
                            All Dates
                        </option>

                        {
                            uniqueDates.map((date) => (

                                <option
                                    key={date}
                                    value={date}
                                    className="bg-slate-900"
                                >
                                    {date}
                                </option>

                            ))
                        }

                    </select>


                    {/* Status Filter */}

                    <div className="flex gap-3">

                        {
                            ["all", "available", "booked"].map((status) => (

                                <button
                                    key={status}
                                    onClick={() =>
                                        setStatusFilter(status)
                                    }
                                    className={`
                                        px-5
                                        py-3
                                        rounded-2xl
                                        font-semibold
                                        capitalize
                                        transition-all

                                        ${statusFilter === status
                                            ? `
                                                    bg-indigo-500
                                                    text-white
                                                    shadow-lg
                                                    shadow-indigo-500/20
                                                `
                                            : `
                                                    bg-white/5
                                                    text-gray-300
                                                    border
                                                    border-white/10
                                                    hover:bg-white/10
                                                `
                                        }
                                    `}
                                >
                                    {status}
                                </button>

                            ))
                        }

                    </div>

                </div>


                {/* Loading State */}

                {
                    loading ? (

                        <div
                            className="
                                text-center
                                text-white
                                py-20
                                text-2xl
                                font-semibold
                            "
                        >
                            Loading Slots...
                        </div>

                    ) : (

                        <>
                            {/* Slot Count */}

                            <div className="mb-8">

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        text-white
                                    "
                                >
                                    Showing
                                    <span className="text-indigo-400 ml-2">
                                        {slots.length}
                                    </span>
                                    Slots
                                </h2>

                            </div>


                            {/* Slot Grid */}

                            {
                                slots.length > 0 ? (

                                    <div
                                        className="
                                            grid
                                            grid-cols-1
                                            md:grid-cols-2
                                            xl:grid-cols-3
                                            gap-8
                                        "
                                    >

                                        {
                                            slots.map((slot) => (

                                                <SlotCard
                                                    key={slot._id}
                                                    slot={slot}
                                                    onBook={handleBook}
                                                    onCancel={handleCancel}
                                                    bookingId={bookingId}
                                                />

                                            ))
                                        }

                                    </div>

                                ) : (

                                    <div
                                        className="
                                            text-center
                                            py-24
                                        "
                                    >

                                        <div className="text-7xl mb-6">
                                            📅
                                        </div>

                                        <h3
                                            className="
                                                text-3xl
                                                font-bold
                                                text-white
                                                mb-4
                                            "
                                        >
                                            No Slots Found
                                        </h3>

                                        <p className="text-gray-400">
                                            Try changing filters
                                        </p>

                                    </div>
                                )
                            }
                        </>
                    )
                }

            </main>

        </div>
    );
};

export default Dashboard;