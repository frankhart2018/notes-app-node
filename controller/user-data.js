let loggedInUser = null;

exports.getUser = () => {
    return loggedInUser;
}

exports.setUser = user => {
    loggedInUser = user;
}