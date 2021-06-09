// import dayjs from "dayjs";
import moment from "moment";

export const isValid = (date: string) => {
  return moment(date, "YYYY-MM-DD", true).isValid();
};
