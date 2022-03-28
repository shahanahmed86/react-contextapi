import _ from "lodash";

export const debounce = _.debounce((cb, value) => cb(value), 500);

export const timeOut = (ms) => Promise((resolve) => setTimeout(resolve, ms));
