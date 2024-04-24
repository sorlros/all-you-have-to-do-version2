// export const sendMessage = () => {
//   router.post("/push", (req, res, next) => {
//     const query = req.query;
//     const token = query.token;
//     const from = query.from;
//     const text = query.text;

//     let message = {
//       notification: {
//         title: from,
//         body: text,
//       },
//       token: token,
//     };

//     admin
//       .messaging()
//       .send(message)
//       .then(function (response) {
//         console.log("Successfully sent message: : ", response);
//         res.send(true);
//       })
//       .catch(function (err) {
//         console.log("Error Sending message!!! : ", err);
//         res.send(false);
//       });
//   });
// };

// // exports.sendScheduledMessage = functions.pubsub.schedule('every day 08:00').onRun(async (context) => {
// //   const payload = {
// //     notification: {
// //       title: '일일 안내',
// //       body: '오늘의 할 일을 확인하세요!',
// //     },
// //   };
