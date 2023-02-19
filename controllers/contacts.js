const Contact = require("../models/contact");

const handleNewContact = async (req, res, next) => {
  const {
    fullName,
    emailAddress,
    mobile,
    companyName,
    country,
    city,
    reference,
    message,
  } = req.body;
  if (
    !fullName ||
    !emailAddress ||
    !mobile ||
    !companyName ||
    !country ||
    !city ||
    !reference ||
    !message
  ) {
    res
      .status(400)
      .json({ error: true, message: "Please provide all the fields!" });
  } else {
    try {
      const newContact = new Contact({
        fullName: fullName,
        emailAddress: emailAddress,
        mobile: mobile,
        companyName: companyName,
        country: country,
        city: city,
        reference: reference,
        message: message,
      });
      const savedContact = await newContact.save();
      res.status(201).json({
        error: false,
        data: savedContact,
        message:
          "Your details have been recorded successfully! We will get back to you shortly!",
      });
    } catch {
      res.status(500).json({ error: true, message: err.message });
    }
  }
};

module.exports = { handleNewContact };
