const validationProfileEditData = (req) => {
  const allowEditFields = ["firstName", "lastName", "age", "skills", "about"];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowEditFields.includes(field)
  );
  return isAllowed;
};

const validPasswordEditData = (req) => {
  const allowedEditField = ["password"];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedEditField.includes(field)
  );
  return isAllowed;
};

module.exports = { validPasswordEditData, validationProfileEditData };
