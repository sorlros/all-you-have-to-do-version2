import { sendFCMNotification } from "@/actions/send-fcm";
import schedule from "node-schedule";

function setupScheduledJob(data, token) {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = 2; // 화요일
  rule.hour = 15;
  rule.minute = 40;
  rule.tz = "Asia/Seoul";

  schedule.scheduleJob(rule, async function() {
    await sendFCMNotification({ ...data, token });
  });
}