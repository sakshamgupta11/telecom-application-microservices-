import logger from "../../logging-service/logger.js";
import con from "../config.js";
import { v4 as uuidv4 } from "uuid";

export const logRequestResponse = (req, res, next) => {
    const oldSend = res.send;

    // Capture response body
    res.send = function (body) {
        res.responseBody = body;
        return oldSend.apply(res, arguments);
    };

    res.on("finish", async () => {
        const logData = {
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            status: res.statusCode,
            response: res.responseBody || null,
            message: res.statusMessage || "OK",
        };

        // File logging
        if (res.statusCode >= 400) {
            logger.error(logData);
        } else {
            logger.info(logData);
        }

        // DB logging
        try {
            await con.query(
                `INSERT INTO logs.user_service 
        (id, method, url, request_body, status, response_body, message) 
        VALUES (?,?,?,?,?,?,?)`,
                [
                    uuidv4(),
                    logData.method,
                    logData.url,
                    JSON.stringify(logData.body),
                    logData.status,
                    JSON.stringify(logData.response),
                    logData.message,
                ]
            );
        } catch (err) {
            logger.error({ msg: "DB insert failed for logs.user_service", error: err.message });
        }
    });

    next();
};
