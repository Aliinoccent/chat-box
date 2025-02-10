
exports.User = async (req, res) => {
    try {
        res.status(200).json({
            data: 'hello world',
            statusCode: 200,
            status: true
        });
    } catch (error) {
        console.error("Error in user function:", error);
        res.status(500).json({
            message: "Internal Server Error",
            statusCode: 500,
            status: false
        });
    }
};
