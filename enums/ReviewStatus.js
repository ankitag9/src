var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus[ReviewStatus["SENT_TO_BLOGGER"] = 1] = "SENT_TO_BLOGGER";
    ReviewStatus[ReviewStatus["REVIEWED_BY_BLOGGER"] = 2] = "REVIEWED_BY_BLOGGER";
    ReviewStatus[ReviewStatus["ACCEPTED_BY_ADMIN"] = 3] = "ACCEPTED_BY_ADMIN";
    ReviewStatus[ReviewStatus["ACCEPTED_BY_AUTHOR"] = 4] = "ACCEPTED_BY_AUTHOR";
    ReviewStatus[ReviewStatus["REJECTED_BY_ADMIN"] = 5] = "REJECTED_BY_ADMIN";
    ReviewStatus[ReviewStatus["REJECTED_BY_AUTHOR"] = 6] = "REJECTED_BY_AUTHOR";
})(ReviewStatus || (ReviewStatus = {}));

module.exports = ReviewStatus;
//# sourceMappingURL=ReviewStatus.js.map
