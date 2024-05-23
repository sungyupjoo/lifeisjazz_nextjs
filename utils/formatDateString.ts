import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";

// Function to format the date string
export const formatDate = (dateString: string) => {
  // Parse the input date string
  const parsedDate = parse(dateString, "EEE MMM d yyyy", new Date());

  // Format the parsed date to the desired format
  const formattedDate = format(parsedDate, "yy년 M월 d일 (E)", { locale: ko });

  return formattedDate;
};
