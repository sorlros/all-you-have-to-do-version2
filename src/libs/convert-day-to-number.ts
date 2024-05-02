export default function convertDayOfWeekToNumber(day: string) {
  switch (day) {
      case "월요일":
          return 1;
      case "화요일":
          return 2;
      case "수요일":
          return 3;
      case "목요일":
          return 4;
      case "금요일":
          return 5;
      case "토요일":
          return 6;
      case "일요일":
          return 0;
      default:
          return -1; // 잘못된 입력이 들어온 경우
  }
}