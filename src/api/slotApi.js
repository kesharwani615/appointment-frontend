import api from "./axios";

export const getSlots = async ({
    date = "",
    status = "",
    page = 1,
    limit = 10,
} = {}) => {

    try {

        const queryParams = new URLSearchParams();


        if (date) {
            queryParams.append("date", date);
        }

        if (status) {
            queryParams.append("status", status);
        }

        if (page) {
            queryParams.append("page", page);
        }

        if (limit) {
            queryParams.append("limit", limit);
        }


        // API Call
        const response = await api.get(
            `/slots?${queryParams.toString()}`
        );

        return response.data;

    } catch (error) {

        throw error;
    }
};

// Book Appointment
export const bookAppointment = async (
    slotId
) => {

    try {

        const response = await api.post(
            "/appointments/book",
            {
                slotId,
            }
        );

        return response.data;

    } catch (error) {

        throw error;
    }
};


// Cancel Appointment
export const cancelAppointment = async (
    slotId,
    reason
) => {

    try {

        const response = await api.delete(
            `/appointments/cancel/${slotId}`,
            {
                data: {
                    reason,
                },
            }
        );

        return response.data;

    } catch (error) {

        throw error;
    }
};