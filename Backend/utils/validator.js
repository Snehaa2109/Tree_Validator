const validateInputs = (data) => {
    const validEdges = [];
    const invalidEntries = [];
    const duplicateEdges = [];

    const seen = new Set();

    for (let entry of data) {
        if (typeof entry !== "string") {
            invalidEntries.push(entry);
            continue;
        }

        const clean = entry.trim();

        // Format check
        const regex = /^[A-Z]->[A-Z]$/;

        if (!regex.test(clean)) {
            invalidEntries.push(entry);
            continue;
        }

        const [parent, child] = clean.split("->");

        // Self loop
        if (parent === child) {
            invalidEntries.push(entry);
            continue;
        }

        // Duplicate check
        if (seen.has(clean)) {
            if (!duplicateEdges.includes(clean)) {
                duplicateEdges.push(clean);
            }
            continue;
        }

        seen.add(clean);
        validEdges.push([parent, child]);
    }

    return { validEdges, invalidEntries, duplicateEdges };
};

module.exports = { validateInputs };