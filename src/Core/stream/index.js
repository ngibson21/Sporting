import axios from "axios";

const postRequest = async (endPoint, body, appConfig) => {
    const apiConnector = axios.create(appConfig.stream_ENV.API);

    try {
        const response = await apiConnector.post(endPoint, body);

        return { ...response, success: true };
    } catch (error) {
        const streamError = error.response ? error.response : error;
        console.log(streamError)
        return { streamError, success: false };
    }
};

const createStreamCustomer = (id, name, appConfig) => {
    const endPoint = "/init";
    const body = {
        id: id,
        name: name
    };

    return postRequest(endPoint, body, appConfig);
};

export const streamDataManager = {
    createStreamCustomer
};
