"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
/** Formats date as YYYY-MM-DD as a string */
const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
};
exports.formatDate = formatDate;
