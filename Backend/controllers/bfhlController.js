const { validateInputs } = require("../utils/validator");
const { buildGraphAndAnalyze } = require("../services/graphService");

const processData = (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Input must be an array"
            });
        }

        // Step 1: Validate
        const { validEdges, invalidEntries, duplicateEdges } =
            validateInputs(data);

        // Step 2: Process Graph
        const { hierarchies, summary } =
            buildGraphAndAnalyze(validEdges);

        // Step 3: Response
        return res.status(200).json({
            user_id: "SnehaGupta_21-09-2004",
            email_id: "sg5613@srmist.edu.in",
            college_roll_number: "RA2311056030034",

            hierarchies,
            invalid_entries: invalidEntries,
            duplicate_edges: duplicateEdges,
            summary
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            is_success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { processData };