

const roleCheck = (req, res, next) => {

    const userRole = req.user.role; // Assuming the user's role is stored in req.user.role

    if (userRole === 'user') {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: "Access denied. You do not have permission to perform this action." });
    }
}

module.exports = roleCheck;
