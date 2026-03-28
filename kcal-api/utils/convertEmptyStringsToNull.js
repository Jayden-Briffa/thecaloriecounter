export default function convertEmptyStringsToNull(obj) {
    for (const [key, val] of Object.entries(obj)) {
        if (val === "") {
            obj[key] = null;
        } else if (val && typeof val === "object") {
            convertEmptyStringsToNull(val);
        }
    }
};
