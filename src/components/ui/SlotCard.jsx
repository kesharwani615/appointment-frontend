import React from "react";


const SlotCard = ({
    slot,
    onBook,
    onCancel,
    bookingId,
}) => {

    console.log("slot:", bookingId);

    return (

        <div
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-xl
                hover:shadow-indigo-500/10
                transition-all
                duration-500
                hover:-translate-y-1
                p-8
            "
        >

            {/* Glow Effect */}

            <div
                className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    bg-gradient-to-br
                    from-indigo-500/5
                    to-purple-500/5
                "
            />


            {/* Top Badge */}

            <div className="flex items-center justify-between mb-8">

                <div
                    className="
                        px-4
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
                    "
                >
                    Appointment Slot
                </div>


                <div
                    className={`
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        font-bold
                        tracking-wide
                        border

                        ${slot?.isBooked
                            ? `
                                    bg-red-500/10
                                    text-red-300
                                    border-red-500/20
                                `
                            : `
                                    bg-green-500/10
                                    text-green-300
                                    border-green-500/20
                                `
                        }
                    `}
                >

                    {
                        slot?.isBooked
                            ? "Booked"
                            : "Available"
                    }

                </div>

            </div>


            {/* Time Icon */}

            <div className="flex justify-center mb-8">

                <div
                    className="
                        w-24
                        h-24
                        rounded-3xl
                        bg-gradient-to-br
                        from-indigo-500
                        to-purple-600
                        flex
                        items-center
                        justify-center
                        text-5xl
                        shadow-2xl
                        shadow-indigo-500/20
                        group-hover:scale-110
                        transition-transform
                        duration-500
                    "
                >
                    🕒
                </div>

            </div>


            {/* Slot Details */}

            <div className="text-center mb-8">

                <h2
                    className="
                        text-3xl
                        font-black
                        text-white
                        mb-3
                        tracking-tight
                    "
                >
                    {slot?.date}
                </h2>

                <p
                    className="
                        text-lg
                        text-gray-300
                        font-medium
                    "
                >
                    {slot?.startTime}
                    {" "}→{" "}
                    {slot?.endTime}
                </p>

            </div>


            {/* Information Grid */}

            <div className="space-y-4 mb-10">

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        p-4
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/5
                    "
                >

                    <span
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-gray-500
                            font-black
                        "
                    >
                        Slot Type
                    </span>

                    <span
                        className="
                            text-sm
                            font-bold
                            text-white
                        "
                    >
                        General Consultation
                    </span>

                </div>


                <div
                    className="
                        flex
                        items-center
                        justify-between
                        p-4
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/5
                    "
                >

                    <span
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-gray-500
                            font-black
                        "
                    >
                        Duration
                    </span>

                    <span
                        className="
                            text-sm
                            font-bold
                            text-white
                        "
                    >
                        30 Minutes
                    </span>

                </div>

            </div>


            {/* Book Button */}
            <button
                onClick={() => {

                    if (slot?.isBooked) {

                        onCancel(slot?._id);

                    } else {

                        onBook(slot?._id);
                    }
                }}
                disabled={
                    bookingId === slot?._id
                }
                className={`
        relative
        z-10
        w-full
        py-4
        rounded-2xl
        font-bold
        transition-all
        duration-300

        ${slot?.isBooked
                        ? `
                    bg-red-500
                    text-white
                    hover:bg-red-600
                `
                        : `
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-600
                    text-white
                    hover:scale-[1.02]
                `
                    }
    `}
            >

                {
                    bookingId === slot?._id
                        ? "Processing..."
                        : slot?.isBooked
                            ? "Cancel Appointment"
                            : "Book Appointment"
                }

            </button>

        </div>
    );
};

export default SlotCard;