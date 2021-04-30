import emailjs, { init } from "emailjs-com";

/* sample templateParams:
    {
        to_name: "Everett Shen",
        edit_link: "editlink",
        share_link: "sharelink",
        reply_to: "myyearinquarantine@gmail.com",
        to_email: "eshen3245@gmail.com",
    }
*/
const sendEmail = async (
  templateParams,
  serviceID = "service_739k3lt",
  templateID = "template_7bqdeho",
  userID = "user_fGvWB0lKVN8rtGNllW9Ut"
) => {
  //   init("user_fGvWB0lKVN8rtGNllW9Ut");
  return emailjs
    .send(serviceID, templateID, templateParams, userID)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      return true;
    })
    .catch((error) => {
      console.log("FAILED...", error);
      return false;
    });
};

export { sendEmail };
