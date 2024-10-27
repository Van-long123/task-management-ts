"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchHelper = (query) => {
    let objectSearch = {
        keyword: "",
    };
    if (query.keyword) {
        objectSearch.keyword = query.keyword.trim();
        objectSearch.regex = new RegExp(objectSearch.keyword, "i");
    }
    return objectSearch;
};
exports.default = searchHelper;
